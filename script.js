const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const tbl=(h,r)=>`<table><thead><tr>${h.map(x=>`<th>${x}</th>`).join("")}</tr></thead><tbody>${r.map(a=>`<tr>${a.map(x=>`<td>${x}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const TG={A:["Alta","t-a"],M:["Media","t-m"],R:["Rápida","t-r"]};

fetch("data.json").then(r=>{if(!r.ok)throw new Error(r.status);return r.json()}).then(init).catch(()=>{
  const e=document.createElement("div");e.className="err";
  e.innerHTML="<strong>No se pudo cargar data.json.</strong> Sube index.html, styles.css, script.js, data.json y logo.png a la misma carpeta y ábrelo desde GitHub Pages (o con un servidor local como Live Server). Abrir el HTML con doble clic bloquea la lectura del JSON.";
  document.body.prepend(e);
});

function init(D){
  const C=D.competencia;
  $("#dg").innerHTML=D.diagnostico.map(([k,t,x])=>`<div class="c ${k=="A"?"o":""}"><span class="tg ${TG[k][1]}">${TG[k][0]}</span><h3>${t}</h3><p>${x}</p></div>`).join("");
  $("#mk").innerHTML=C.marcasLocket.map(x=>`<span class="chip">${x}</span>`).join("");
  $("#mkn").textContent=C.marcasNota;
  $("#cd").innerHTML=tbl(C.directa.h,C.directa.r);
  $("#mc").innerHTML=tbl(C.comparativo.h,C.comparativo.r);
  $("#mcn").textContent=C.comparativo.nota;
  $("#ci").innerHTML=tbl(C.indirecta.h,C.indirecta.r);
  $("#cf").innerHTML=tbl(C.fisicas.h,C.fisicas.r);
  $("#cn").textContent=C.nota;
  $("#pl").innerHTML=D.plan.map(([t,l])=>`<div class="c o"><h3>${t}</h3><ul>${l.map(x=>`<li>${x}</li>`).join("")}</ul></div>`).join("");
  $("#st").innerHTML=tbl(D.herramientas.h,D.herramientas.r);
  $("#kp").innerHTML=tbl(D.kpis.h,D.kpis.r);
  $("#rf").innerHTML=D.referencias.map(x=>`<li>${x}</li>`).join("");
  $("#rfn").textContent=D.referenciasNota;
  $("#sin").innerHTML=D.simulador.map(i=>`<div><label for="${i.id}">${i.t} (KPI: ${i.k})</label><input id="${i.id}" type="number" value="${i.v}"${i.step?` step="${i.step}"`:""}${i.min!=null?` min="${i.min}"`:""}${i.max!=null?` max="${i.max}"`:""}></div>`).join("");
  tabs();sim();
}

function tabs(){
  const S=$$("main section");
  S.forEach(s=>{const b=document.createElement("button");b.type="button";b.textContent=s.dataset.t;b.dataset.id=s.id;b.onclick=()=>{location.hash=s.id};$("#tabs").append(b)});
  function go(){const c=S.find(s=>s.id==location.hash.slice(1))||S[0];S.forEach(s=>s.classList.toggle("on",s==c));$$("#tabs button").forEach(b=>b.classList.toggle("on",b.dataset.id==c.id));scrollTo(0,0)}
  addEventListener("hashchange",go);go();
}

$("#th").onclick=()=>{const r=document.documentElement,d=r.dataset.theme?r.dataset.theme=="dark":matchMedia("(prefers-color-scheme:dark)").matches;r.dataset.theme=d?"light":"dark"};

const M=n=>n.toLocaleString("es-MX",{style:"currency",currency:"MXN",maximumFractionDigits:0});
function calc(){const v=i=>Math.max(0,+$("#"+i).value||0),s=v("ses"),c=v("cvr")/100,a=v("aov"),ab=Math.min(v("abn"),95)/100,r=v("rec")/100,m=v("mej")/100;
  const p1=s*c,p2=s*c*(1+m),rc=p2*ab/(1-ab)*r;
  const i1=p1*a,i2=(p2+rc)*a,mx=Math.max(i1,i2,1);
  $("#o1").textContent=M(i1);$("#o2").textContent=M(i2);$("#o3").textContent=M(i2-i1);$("#b1").style.width=i1/mx*100+"%";$("#b2").style.width=i2/mx*100+"%"}
function sim(){
  $$(".sm input").forEach(i=>i.addEventListener("input",calc));
  $$("[data-s]").forEach(b=>b.onclick=()=>{const[x,y]=b.dataset.s.split(",");$("#mej").value=x;$("#rec").value=y;calc()});
  calc();
}
