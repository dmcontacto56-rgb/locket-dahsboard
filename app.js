// Locket · Plan digital 30/60/90 — pestañas, tablas y simulador
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const tbl=(h,r)=>`<table><thead><tr>${h.map(x=>`<th>${x}</th>`).join("")}</tr></thead><tbody>${r.map(a=>`<tr>${a.map(x=>`<td>${x}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const TG={A:["Alta","t-a"],M:["Media","t-m"],R:["Rápida","t-r"]};
const DIAG=[
["A","El catálogo gratuito no descarga","El botón “Descargar” apunta a la propia página de inicio. Conviértelo en un formulario (correo o WhatsApp) que alimente el CRM."],
["A","Posicionamiento mezclado","El título dice “tractocamiones”, pero el primer carrusel de más vendidos es Motul para auto. Define el foco pesado y deja la línea ligera como secundaria."],
["A","Búsqueda sin número de parte visible","“Elige tu vehículo” solo ofrece Carga y Transporte. Prueba el buscador con 20 números de parte reales y mide las búsquedas sin resultados."],
["M","Poca confianza visible","No vi reseñas, teléfono ni WhatsApp en la home (pueden cargarse con JavaScript; por confirmar)."],
["M","Pagos limitados","Visibles: Visa, Mastercard, OXXO y SPEI. Sin meses sin intereses ni crédito para flotillas; en Mercado Libre sí hay meses sin intereses."],
["M","Perfil de Empresa en Google","Optimiza categorías, fotos y un enlace con UTM hacia Shopify para aprovechar la entrega el mismo día en CDMX."],
["R","Agotados en “Más vendidos”","Un producto agotado aparece en el carrusel. Quítalo o refuerza “Avísame”, y no lo pautes."],
["R","Precios duplicados","“Precio habitual” y “Precio de oferta” muestran lo mismo cuando no hay descuento. Es un ajuste de plantilla."],
["R","SEO básico","Título genérico y sin acentos, “Camáras” mal escrito en el menú, banners sin texto alternativo y marcas de la meta descripción (Wabco, SKF) ausentes del carrusel."]];
$("#dg").innerHTML=DIAG.map(([k,t,x])=>`<div class="c ${k=="A"?"o":""}"><span class="tg ${TG[k][1]}">${TG[k][0]}</span><h3>${t}</h3><p>${x}</p></div>`).join("");
$("#cd").innerHTML=tbl(["Competidor","Lectura para Locket"],[
["Bpartes","Tienda en línea especializada en camiones y tractocamiones con entrega nacional. Maneja el mismo gobernador D-2 Bendix OR275491."],
["Diesel México","Envío gratis desde $3,000; Locket lo ofrece desde $800."],
["El Camionero","Más de 5,000 refacciones, precios y atención por WhatsApp para flotillas. Referente B2B."],
["Go Trakto","Multimarca en Teoloyucan, Edo. Méx., con cotización. El más cercano a CDMX."],
["Refaccionaria Guerra Diesel","Envío nacional y páginas por SKU con aviso de compatibilidad."],
["JOHESA","Guadalajara, mayoreo y menudeo; fuerte en suspensión de aire y frenos."]]);
$("#ci").innerHTML=tbl(["Competidor","Lectura para Locket"],[
["Mercado Libre","Presiona el precio: un gobernador D-2 “tipo Bendix” va de unos $400 a unos $920 según el vendedor, con envío gratis y meses sin intereses. Locket también vende ahí."],
["Grupo DAR / SYD","Mayorista de suspensión y dirección fundado en CDMX en 1966. Compite en línea ligera y es canal B2B de talleres."],
["AutoZone y MiRefacción","Cadenas de línea ligera. AutoZone llegó a 1,000 tiendas en México; MiRefacción permite pedir en línea y recoger en tienda."],
["Marcas y agencias","Nissan con tienda oficial en Amazon México y Mercedes-Benz Autobuses con línea de refacciones originales."],
["Físicas en CDMX y zona norte","Promare y Balatas Internacionales (GAM). Datos de directorio o antiguos: verificar en Google Maps."]]);
const PLAN=[
["Mes 1: Fundación",["Semana 1: pedir accesos (Shopify, GA4, Search Console, Merchant Center, anuncios, Mercado Libre, inventario), duplicar el tema, respaldar e instalar GA4, Tag Manager y Clarity.","Semana 2: botón del catálogo, precios duplicados, agotados y SEO básico.","Semanas 3 y 4: línea base de 10 KPIs, prueba del buscador con 20 números de parte y botón de WhatsApp con UTM.","Día 30: metas de resultado definidas con la línea base."]],
["Mes 2: Activación",["Flujo de carritos abandonados y aviso “avísame”.","Reseñas y compatibilidad visibles en las fichas.","Primeras piezas de contenido B2B y B2C; Perfil de Empresa en Google.","Monitoreo semanal de 30 a 50 números de parte en 2 o 3 competidores."]],
["Mes 3: Optimización",["Embudo de WhatsApp con etapas en CRM y motivos de pérdida.","Sección para flotillas: cotización y crédito.","Automatizaciones con Shopify Flow (Make o n8n si hace falta).","Prueba A/B y reporte contra las metas del día 30."]]];
$("#pl").innerHTML=PLAN.map(([t,l])=>`<div class="c o"><h3>${t}</h3><ul>${l.map(x=>`<li>${x}</li>`).join("")}</ul></div>`).join("");
$("#st").innerHTML=tbl(["Capa","Herramienta","Rol","Cuándo","Costo"],[
["Seguridad","Duplicar el tema y respaldo","Evitar romper la tienda","Día 1","Bajo"],
["Medición","GA4, Tag Manager, Search Console, Merchant Center, Clarity","Línea base y comportamiento","Semana 1","Gratis"],
["Reportes","Looker Studio y Sheets","Dashboard semanal","Mes 1","Gratis"],
["SEO","Semrush, Screaming Frog","Posiciones, brechas y auditoría","Mes 1","Pago / gratis hasta 500 URLs"],
["Catálogo","Matrixify, Search & Discovery, app de compatibilidad","Cargas masivas, filtros y sinónimos","Mes 1 a 2","Mixto"],
["Conversión","App de reseñas, botón de WhatsApp","Confianza visible","Mes 1 a 2","Pago"],
["Correo","Shopify Email, luego Klaviyo","Carritos y recompra","Mes 2","Mixto"],
["CRM","HubSpot gratuito","Leads y cotizaciones B2B","Mes 2","Gratis"],
["Automatización","Shopify Flow; Make o n8n (uno solo)","Alertas y sincronía de inventario","Mes 2 a 3","Mixto"],
["Creativo","Adobe CC o Figma, Canva, CapCut","Banners, fichas y redes","Continuo","Pago"]]);
const D="Se define al día 30";
$("#kp").innerHTML=tbl(["KPI","Se mide con","Línea base","Referencia externa (no es meta)","Meta"],[
["Sesiones y % orgánico","GA4 y Search Console","Por medir","—",D],
["Conversión","GA4 y Shopify","Por medir","Autopartes: ~1.4% a 2.1% (agencias, EE. UU. y global; confiabilidad baja)",D],
["Ticket promedio","Shopify","Por medir","—",D],
["Abandono de checkout","Shopify","Por medir","70.22% promedio mundial (Baymard, 50 estudios)",D],
["Recuperación de carritos","Shopify y Klaviyo","Por medir","3.33% de pedido por correo (Klaviyo 2024, mayormente EE. UU.)","Flujo activo en el mes 2"],
["Leads de WhatsApp y primera respuesta","WhatsApp y CRM","Por medir","—","Embudo medido en el mes 3"],
["Búsquedas sin resultados","Shopify Search","Por medir","—",D],
["Disponibilidad de SKU top","Shopify e inventario","Por medir","—",D],
["Posiciones top 10 (20 a 30 palabras)","Semrush","Por medir","—",D],
["Velocidad móvil","PageSpeed Insights","Por medir","—",D]]);
$("#rf").innerHTML=["E-commerce retail en México: 941 mil millones de pesos en 2025, +19.2% (AMVO 2026). Confiabilidad alta.","Autopartes: cerca de 25% de las compras de refacciones se hace en línea; devoluciones de 8% frente a 23% del e-commerce general (Publimetro 2025). Confiabilidad media.","Conversión promedio general: 2.68% en los 12 meses a septiembre de 2026 (Dynamic Yield).","Compradores B2B: 73% prefiere cerrar en digital sin vendedor (Concepto Móvil, proveedor de tecnología). Confiabilidad baja a media.","WhatsApp: el Inegi atribuye parte del crecimiento de 2024 del comercio minorista en línea al comercio social. Confiabilidad alta."].map(x=>`<li>${x}</li>`).join("");
const S=$$("main section");
S.forEach(s=>{const b=document.createElement("button");b.type="button";b.textContent=s.dataset.t;b.dataset.id=s.id;b.onclick=()=>{location.hash=s.id};$("#tabs").append(b)});
function go(){const c=S.find(s=>s.id==location.hash.slice(1))||S[0];S.forEach(s=>s.classList.toggle("on",s==c));$$("#tabs button").forEach(b=>b.classList.toggle("on",b.dataset.id==c.id));scrollTo(0,0)}
addEventListener("hashchange",go);go();
$("#th").onclick=()=>{const r=document.documentElement,d=r.dataset.theme?r.dataset.theme=="dark":matchMedia("(prefers-color-scheme:dark)").matches;r.dataset.theme=d?"light":"dark"};
const M=n=>n.toLocaleString("es-MX",{style:"currency",currency:"MXN",maximumFractionDigits:0});
function calc(){const v=i=>Math.max(0,+$("#"+i).value||0),s=v("ses"),c=v("cvr")/100,a=v("aov"),ab=Math.min(v("abn"),95)/100,r=v("rec")/100,m=v("mej")/100;
const p1=s*c,p2=s*c*(1+m),rc=p2*ab/(1-ab)*r;
const i1=p1*a,i2=(p2+rc)*a,mx=Math.max(i1,i2,1);
$("#o1").textContent=M(i1);$("#o2").textContent=M(i2);$("#o3").textContent=M(i2-i1);$("#b1").style.width=i1/mx*100+"%";$("#b2").style.width=i2/mx*100+"%"}
$$(".sm input").forEach(i=>i.addEventListener("input",calc));
$$("[data-s]").forEach(b=>b.onclick=()=>{const[x,y]=b.dataset.s.split(",");$("#mej").value=x;$("#rec").value=y;calc()});
calc();
