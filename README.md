# Locket · Plan digital 30/60/90

Reporte web (HTML, CSS y JavaScript sin dependencias) y script de Python para monitorear precios.
Todos los archivos viven en la raíz del repositorio, en la misma carpeta.

## Estructura
```
index.html            Página principal
styles.css            Estilos (paleta Locket: #F26632 y #1B3F95)
script.js             Pestañas, tablas y simulador de sensibilidad
data.json             Contenido del reporte (diagnóstico, competencia, plan, herramientas, KPIs, referencias)
logo.png              Logotipo
monitor_precios.py    Monitoreo semanal de precios por número de parte
partes.csv            Números de parte y precio de Locket
competidores.json     Sitios a consultar (URL de búsqueda y selector CSS del precio)
requirements.txt      Dependencias de Python
```

## Ver la página
`index.html` lee `data.json`, así que no funciona con doble clic ni desde el botón "Raw" de GitHub.
Publícala con GitHub Pages (Settings → Pages → Deploy from a branch → `main`, carpeta `/ (root)`)
o ábrela en local con un servidor, por ejemplo la extensión Live Server de VS Code.

Para cambiar el contenido del reporte edita `data.json`; no hace falta tocar el HTML.

## Monitoreo de precios (Python 3.10+)
```
pip install -r requirements.txt
python monitor_precios.py
```
1. Llena `partes.csv` con 30 a 50 números de parte y tu precio.
2. En `competidores.json` pon la URL de búsqueda de cada sitio (`{parte}` se reemplaza)
   y el selector CSS del precio. Se obtiene inspeccionando la página (clic derecho → Inspeccionar).
3. El resultado queda en `resultados/precios_AAAA-MM-DD.csv` y marca `revisar = si`
   cuando Locket está más de 10% arriba.

Notas: respeta `robots.txt`, espera 3 a 6 segundos entre solicitudes y no recoge datos personales.
Revisa los términos de servicio de cada sitio. Los marketplaces suelen bloquear esto y ofrecen API oficial.
Los datos del reporte son un plan: las líneas base están por medir y las referencias externas no son metas.
