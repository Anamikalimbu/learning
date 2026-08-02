// Data
const palettes=[
    ["#7b1e2b","#2a0a10"], ["#1e3a5f","#0a1420"], ["#3f2a5c","#150a20"],
    ["#5c3a1e","#20130a"], ["#1e5c4a","#0a2018"], ["#5c1e50","#200a1c"],
    ["#2a4d1e","#0d1a08"], ["#5c4a1e","#201808"], ["#1e2a5c","#080a20"],
    ["#5c1e1e","#200808"], ["#2a5c58","#082020"], ["#4a1e5c","#180820"]
];
function grad(i){ const p = palettes[i % palettes.length]; return `linear-gradient(150deg, ${p[0]}, ${p[1]})`; }
 
const titles = [
  "Nightfall Protocol","Ashen Horizon","Velvet Static","Obsidian Bloom","The Glass Kingdom",
  "Salt & Circuit","Paper Tigers","Low Orbit","Ember Road","The Quiet Signal",
  "Marble & Rust","Ninth Hour","Wolves of Cinder St.","The Long Static","Hollow Season",
  "Border of Light","Iron Bloom","The Last Ferry","Copper Sky","Undertow",
  "The Painted City","Faultline","Midnight Cartography","Driftwood Kings"
];
const genresList = [
  ["Sci-Fi","Thriller"], ["Drama","Mystery"], ["Crime","Noir"], ["Fantasy","Adventure"],
  ["Romance","Drama"], ["Action","Heist"], ["Horror","Suspense"], ["Comedy","Drama"]
];
const descriptions = [
  "A fractured crew races against a countdown only one of them fully understands.",
  "Two estranged sisters inherit a house that seems to remember more than they do.",
  "A courier smuggling secrets across a border town gets pulled into the war he was avoiding.",
  "An exiled cartographer is hired to map a kingdom that keeps rearranging itself.",
  "A chance reunion unravels a decade of carefully kept lies between old friends.",
  "A retired thief is pulled back for one impossible job that isn't what it seems.",
  "Something in the static keeps calling the night-shift operator by name.",
  "A washed-up comedian tries to win back his family with one very bad plan."
];
 
function makeTitle(i){
  return {
    id:i,
    title: titles[i % titles.length],
    genres: genresList[i % genresList.length],
    year: 2019 + (i % 7),
    match: 78 + (i * 7) % 21,
    duration: (i % 2 === 0) ? `${1 + (i%3)} Season${(1+(i%3))>1?'s':''}` : `${88 + (i*3)%40}m`,
    rating: ["13+","16+","18+","PG"][i % 4],
    desc: descriptions[i % descriptions.length],
    cast: "Rae Okafor, J. Lindqvist, Priya Menon, D. Castellanos",
    gradient: grad(i)
  };
}
 
const rows = [
  { title:"Trending Now", sub:"Updated today", items:[0,1,2,3,4,5,6,7,8,9] },
  { title:"StreamFlix Originals", sub:"", items:[10,11,12,13,14,15,16] },
  { title:"Continue Watching", sub:"", items:[2,7,14,19,21] },
  { title:"Because you watched Nightfall Protocol", sub:"", items:[3,8,13,18,22,5] },
  { title:"Critically Acclaimed", sub:"⭐ Top rated this year", items:[1,6,11,17,20,9,23] },
];
 
const allTitles = titles.map((_,i)=>makeTitle(i));
 
// ---------- RENDER ----------
const rowsEl = document.getElementById('rows');
rows.forEach((row,ri)=>{
  const section = document.createElement('section');
  section.className = 'row';
  const trackId = `track-${ri}`;
  section.innerHTML = `
    <div class="row-head">
      <div class="row-title">${row.title}</div>
      ${row.sub ? `<div class="row-sub">${row.sub}</div>` : ''}
    </div>
    <div class="row-track-wrap">
      <button class="row-nav left" onclick="scrollRow('${trackId}',-1)">‹</button>
      <div class="row-track" id="${trackId}">
        ${row.items.map(idx=>{
          const t = allTitles[idx];
          return `
          <div class="card" style="background:${t.gradient}" onclick="openModal(${idx})">
            <div class="card-inner">
              <div class="card-title">${t.title}</div>
              <div class="card-extra">
                <div class="mini-btn play">▶</div>
                <div class="mini-btn">+</div>
                <div class="mini-btn">👍</div>
              </div>
              <div class="card-genres">${t.genres.join(' • ')}</div>
            </div>
          </div>`;
        }).join('')}
      </div>
      <button class="row-nav right" onclick="scrollRow('${trackId}',1)">›</button>
    </div>
  `;
  rowsEl.appendChild(section);
});
 
function scrollRow(id, dir){
  const el = document.getElementById(id);
  el.scrollBy({ left: dir * 640, behavior:'smooth' });
}
 
// ---------- MODAL ----------
function openModal(idx){
  const t = allTitles[idx];
  const box = document.getElementById('modalBox');
  box.innerHTML = `
    <div class="modal-hero" style="background:${t.gradient}">
      <button class="modal-close" onclick="closeModal()">✕</button>
      <div class="modal-title">${t.title}</div>
    </div>
    <div class="modal-body">
      <div class="modal-actions">
        <button class="btn btn-play">▶ Play</button>
        <div class="mini-btn" style="width:38px;height:38px;font-size:16px;">+</div>
        <div class="mini-btn" style="width:38px;height:38px;font-size:16px;">👍</div>
      </div>
      <div class="modal-meta">
        <span style="color:#3ad35a;font-weight:700;">${t.match}% Match</span>
        <span>${t.year}</span>
        <span class="tag">${t.rating}</span>
        <span>${t.duration}</span>
      </div>
      <div class="modal-desc">${t.desc}</div>
      <div class="modal-cast"><b>Genres:</b> ${t.genres.join(', ')}<br><b>Cast:</b> ${t.cast}</div>
    </div>
  `;
  document.getElementById('modalOverlay').classList.add('open');
}
function closeModal(){ document.getElementById('modalOverlay').classList.remove('open'); }
 
// ---------- NAVBAR SCROLL ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', ()=>{
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});