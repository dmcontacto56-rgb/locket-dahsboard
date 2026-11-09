"""Monitoreo semanal de precios por número de parte (Locket).

Uso:
    pip install -r requirements.txt
    python monitor_precios.py

Lee partes.csv y competidores.json y escribe resultados/precios_AAAA-MM-DD.csv.
Respeta robots.txt, espera entre solicitudes y no extrae datos personales.
Antes de usarlo, revisa los términos de servicio de cada sitio.
"""
import csv
import json
import random
import re
import time
from datetime import date
from pathlib import Path
from urllib import robotparser
from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup

BASE = Path(__file__).parent
UA = "LocketMonitorPrecios/1.0 (uso interno; contacto: tu-correo@locket.com.mx)"
ESPERA = (3, 6)      # segundos entre solicitudes
UMBRAL = 10.0        # % de diferencia que dispara revisión de promoción


def normalizar_parte(texto: str) -> str:
    """Quita guiones, espacios y puntos para comparar números de parte."""
    return re.sub(r"[\s\-./]", "", texto).upper()


def parsear_precio(texto: str):
    """Convierte '$1,223.86' en 1223.86. Devuelve None si no hay número."""
    m = re.search(r"\d[\d,]*\.?\d*", texto or "")
    return float(m.group().replace(",", "")) if m else None


def permitido(url: str, cache: dict) -> bool:
    host = "{0.scheme}://{0.netloc}".format(urlparse(url))
    if host not in cache:
        rp = robotparser.RobotFileParser(host + "/robots.txt")
        try:
            rp.read()
        except Exception:
            rp = None
        cache[host] = rp
    rp = cache[host]
    return True if rp is None else rp.can_fetch(UA, url)


def consultar(sesion, comp: dict, parte: str, cache: dict):
    url = comp["url_busqueda"].format(parte=parte)
    if not permitido(url, cache):
        return None, url, "bloqueado_por_robots"
    try:
        r = sesion.get(url, timeout=20)
        r.raise_for_status()
    except requests.RequestException as e:
        return None, url, f"error: {e.__class__.__name__}"
    nodo = BeautifulSoup(r.text, "html.parser").select_one(comp["selector_precio"])
    precio = parsear_precio(nodo.get_text(" ", strip=True)) if nodo else None
    return precio, url, "ok" if precio is not None else "sin_precio"


def main():
    partes = list(csv.DictReader(open(BASE / "partes.csv", encoding="utf-8")))
    competidores = json.load(open(BASE / "competidores.json", encoding="utf-8"))
    salida = BASE / "resultados"
    salida.mkdir(exist_ok=True)
    archivo = salida / f"precios_{date.today().isoformat()}.csv"
    sesion, cache = requests.Session(), {}
    sesion.headers["User-Agent"] = UA
    with open(archivo, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["fecha", "parte", "competidor", "precio_competidor",
                    "precio_locket", "diferencia_pct", "revisar", "estado", "url"])
        for p in partes:
            parte = normalizar_parte(p["parte"])
            propio = parsear_precio(p.get("precio_locket", ""))
            for c in competidores:
                precio, url, estado = consultar(sesion, c, parte, cache)
                dif = round((propio - precio) / precio * 100, 1) if precio and propio else ""
                revisar = "si" if dif != "" and dif > UMBRAL else ""
                w.writerow([date.today().isoformat(), parte, c["nombre"],
                            precio or "", propio or "", dif, revisar, estado, url])
                time.sleep(random.uniform(*ESPERA))
    print("Listo:", archivo)


if __name__ == "__main__":
    main()
