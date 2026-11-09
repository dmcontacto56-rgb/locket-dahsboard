# Locket · Plan digital 30/60/90

Presentación web (HTML, CSS y JavaScript sin dependencias) y script de Python para monitorear precios.

## Estructura
```
index.html            Página principal
css/styles.css        Estilos (paleta Locket: #F26632 y #1B3F95)
js/app.js             Pestañas, tablas y simulador de sensibilidad
assets/logo.png       Logotipo
python/               Monitoreo semanal de precios por número de parte
```

## Ver la página
Abre `index.html` en el navegador, o publícala con GitHub Pages
(Settings → Pages → rama `main`, carpeta raíz).

## Monitoreo de precios (Python 3.10+)
```
cd python
pip install -r requirements.txt
python monitor_precios.py
```
1. Llena `partes.csv` con 30 a 50 números de parte y tu precio.
2. En `competidores.json` pon la URL de búsqueda de cada sitio (`{parte}` se reemplaza)
   y el selector CSS del precio. Se obtiene inspeccionando la página (clic derecho → Inspeccionar).
3. El resultado queda en `python/resultados/precios_AAAA-MM-DD.csv` y marca `revisar = si`
   cuando Locket está más de 10% arriba.

Notas: respeta `robots.txt`, espera 3 a 6 segundos entre solicitudes y no recoge datos personales.
Revisa los términos de servicio de cada sitio. Los marketplaces suelen bloquear esto y ofrecen API oficial.
Los datos de la presentación son un plan: las líneas base están por medir y las referencias externas no son metas.
