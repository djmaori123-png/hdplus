// script.js (modular, compatible con fetch de JSON)
const state = {
  carrusel: [],
  estrenos: [],
  populares: [],
  dibujos: [],
  series: [],
  anime: [],
  allMovies: [],
  currentSlide: 0,
  autoSlide: null,
  touchStartX: 0,
  lastFocused: null
};

const PLACEHOLDER = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600"><rect width="100%" height="100%" fill="%230f172a"/><text x="50%" y="50%" fill="%23ffffff" font-size="20" text-anchor="middle">No+Imagen</text></svg>';

window.addEventListener('load', async () => {
  const loader = document.getElementById('loader');
  setTimeout(() => { if (loader) loader.style.display = 'none'; }, 600);

  // menu
  initMenu();

  // fetch data
  await loadData();

  // render
  renderContent();
  startCarousel();
  addCarouselHoverHandlers();
  addGlobalKeyHandlers();
  initTouch();
});

async function loadData(){
  try{
    const res = await fetch('./data/movies.json');
    const json = await res.json();

    state.carrusel = json.carrusel || [];
    state.estrenos = json.estrenos || [];
    state.populares = json.populares || [];
    state.dibujos = json.dibujos || [];
    state.series = json.series || [];
    state.anime = json.anime || [];

    recomputeAllMovies();
  }catch(e){
    console.error('Error cargando movies.json', e);
  }
}

function recomputeAllMovies(){
  state.allMovies = [
    ...state.estrenos,
    ...state.populares,
    ...state.dibujos,
    ...state.series,
    ...state.anime
  ];
}

/* MENU */
function initMenu(){
  const menuIcon = document.getElementById('menuIcon');
  const submenu = document.getElementById('submenu');
  if(!menuIcon || !submenu) return;

  menuIcon.addEventListener('click', (e) =>{
    e.stopPropagation();
    submenu.classList.toggle('active');
    const expanded = submenu.classList.contains('active');
    menuIcon.setAttribute('aria-expanded', expanded);
    menuIcon.textContent = expanded ? '✖': '☰';
  });

  document.addEventListener('click', (e) =>{
    if(!submenu.contains(e.target) && !menuIcon.contains(e.target)){
      submenu.classList.remove('active');
      menuIcon.setAttribute('aria-expanded', false);
      menuIcon.textContent = '☰';
    }
  });
}

/* CAROUSEL */
function renderCarousel(items){
  const wrapper = document.getElementById('carouselWrapper');
  const dots = document.getElementById('carouselDots');
  if(!wrapper) return;
  wrapper.innerHTML = '';
  dots.innerHTML = '';

  if(!items || items.length === 0) return;

  items.forEach((item, idx) =>{
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.style.backgroundImage = `url('${escapeAttr(item.img)}')`;
    slide.setAttribute('data-index', idx);
    slide.innerHTML = `<div><h1>${escapeHtml(item.title)}</h1><p>${escapeHtml(item.desc || '')}</p></div>`;
    slide.addEventListener('click', ()=> openMovie(item));
    wrapper.appendChild(slide);

    const dot = document.createElement('span');
    dot.className = 'dot' + (idx===0? ' active':'');
    dot.setAttribute('role','tab');
    dot.addEventListener('click', ()=> goToSlide(idx));
    dots.appendChild(dot);
  });

  state.currentSlide = 0;
  updateCarousel();
}

function updateCarousel(){
  const wrapper = document.getElementById('carouselWrapper');
  if(!wrapper) return;
  wrapper.style.transform = `translateX(-${state.currentSlide * 100}%)`;
  document.querySelectorAll('.dot').forEach((d,i)=> d.classList.toggle('active', i===state.currentSlide));
}

function nextSlide(){
  const wrapper = document.getElementById('carouselWrapper');
  if(!wrapper) return;
  const total = wrapper.children.length || 1;
  state.currentSlide = (state.currentSlide + 1) % total;
  updateCarousel();
}
function prevSlide(){
  const wrapper = document.getElementById('carouselWrapper');
  if(!wrapper) return;
  const total = wrapper.children.length || 1;
  state.currentSlide = (state.currentSlide - 1 + total) % total;
  updateCarousel();
}
function goToSlide(i){ state.currentSlide = i; updateCarousel(); }

function startCarousel(){
  stopCarousel();
  state.autoSlide = setInterval(()=> nextSlide(), 5000);
}
function stopCarousel(){ if(state.autoSlide) clearInterval(state.autoSlide); state.autoSlide = null; }

function addCarouselHoverHandlers(){
  const wrapper = document.getElementById('carouselWrapper');
  if(!wrapper) return;
  wrapper.addEventListener('mouseenter', stopCarousel);
  wrapper.addEventListener('mouseleave', startCarousel);
  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');
  if(prev) prev.addEventListener('click', prevSlide);
  if(next) next.addEventListener('click', nextSlide);
}

/* SECCIONES */
function renderSection(title, items){
  if(!items || items.length === 0) return;
  const container = document.getElementById('content');
  let section = document.createElement('div');
  section.className = 'section';
  section.innerHTML = `<h2>${escapeHtml(title)}</h2>`;
  const row = document.createElement('div');
  row.className = 'row';

  items.forEach(p =>{
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('tabindex','0');
    card.setAttribute('role','button');
    card.setAttribute('aria-pressed','false');

    const img = document.createElement('img');
    img.src = p.img || PLACEHOLDER;
    img.alt = p.title || 'Portada';
    img.loading = 'lazy';
    img.onerror = ()=> img.src = PLACEHOLDER;

    const views = document.createElement('span');
    views.className = 'views';
    views.textContent = p.views || '';

    const fav = document.createElement('span');
    fav.className = 'favorite';
    fav.textContent = p.icon || '🔥';

    const info = document.createElement('div');
    info.className = 'card-info';
    info.innerHTML = `<div class="card-title">${escapeHtml(p.title)}</div>`;

    card.appendChild(views);
    card.appendChild(fav);
    card.appendChild(img);
    card.appendChild(info);

    card.addEventListener('click', ()=> openMovie(p));
    card.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter') openMovie(p);
      if(e.key === 'ArrowRight') focusNextCard(card);
      if(e.key === 'ArrowLeft') focusPrevCard(card);
      if(e.key === 'ArrowDown') focusNextRow(card);
      if(e.key === 'ArrowUp') focusPrevRow(card);
    });

    row.appendChild(card);
  });

  section.appendChild(row);
  container.appendChild(section);
}

function renderContent(){
  const container = document.getElementById('content');
  if(!container) return;
  container.innerHTML = '';

  renderCarousel(state.carrusel);
  renderSection('Estrenos', state.estrenos);
  renderSection('Películas Populares', state.populares);
  renderSection('Dibujos Animados', state.dibujos);
  renderSection('Series', state.series);
  renderSection('Anime', state.anime);
}

/* BUSQUEDA */
const searchInput = () => document.getElementById('searchInput');
if(searchInput()){
  searchInput().addEventListener('input', (e)=> searchMovies(e.target.value));
}

function searchMovies(query){
  const container = document.getElementById('content');
  if(!container) return;
  const q = String(query || '').toLowerCase().trim();
  if(!q){ renderContent(); return; }

  const results = state.allMovies.filter(p => (p.title && p.title.toLowerCase().includes(q)) || (p.category && p.category.toLowerCase().includes(q)) );

  container.innerHTML = '';
  if(results.length === 0){
    container.innerHTML = `<p style="padding:20px; text-align:center; color:#999">No se encontraron resultados para "${escapeHtml(q)}"</p>`;
    return;
  }

  const section = document.createElement('div');
  section.className = 'section';
  section.innerHTML = `<h2>🔎 Resultados (${results.length})</h2>`;
  const row = document.createElement('div'); row.className = 'row';

  results.forEach(p =>{
    const card = document.createElement('div'); card.className = 'card'; card.setAttribute('tabindex','0');
    card.innerHTML = `<span class="favorite">${escapeHtml(p.icon || '🔥')}</span><img src="${escapeAttr(p.img || PLACEHOLDER)}" alt="${escapeAttr(p.title||'Portada')}" loading="lazy"><div class="card-info"><div class="card-title">${escapeHtml(p.title)}</div></div>`;
    card.addEventListener('click', ()=> openMovie(p));
    row.appendChild(card);
  });

  section.appendChild(row);
  container.appendChild(section);
}

/* MODAL */
function openMovie(data){
  const modal = document.getElementById('modal');
  const img = document.getElementById('img');
  const title = document.getElementById('title');
  const desc = document.getElementById('description');
  const player = document.getElementById('player');
  const openExternal = document.getElementById('openExternal');

  state.lastFocused = document.activeElement;
  modal.setAttribute('aria-hidden','false');
  img.src = data.img || PLACEHOLDER; img.onerror = ()=> img.src = PLACEHOLDER;
  title.innerText = data.title || '';
  desc.innerText = data.desc || '';
  player.src = data.video || '';
  openExternal.href = data.video || '#';

  // focus management
  const close = document.getElementById('modalClose');
  close.focus();

  // close handlers
  close.onclick = closeModal;
  document.addEventListener('keydown', modalKeyHandler);
}

function closeModal(){
  const modal = document.getElementById('modal');
  const player = document.getElementById('player');
  modal.setAttribute('aria-hidden','true');
  player.src = '';
  document.removeEventListener('keydown', modalKeyHandler);
  if(state.lastFocused) state.lastFocused.focus();
}

function modalKeyHandler(e){
  if(e.key === 'Escape') closeModal();
}

/* Focus helpers for TV remote */
function focusNextCard(el){
  const cards = Array.from(document.querySelectorAll('.card'));
  const idx = cards.indexOf(el);
  if(idx >=0 && idx < cards.length -1) cards[idx+1].focus();
}
function focusPrevCard(el){
  const cards = Array.from(document.querySelectorAll('.card'));
  const idx = cards.indexOf(el);
  if(idx > 0) cards[idx-1].focus();
}
function focusNextRow(el){
  // jump roughly 4 items ahead for next row on TV
  const cards = Array.from(document.querySelectorAll('.card'));
  const idx = cards.indexOf(el);
  const next = Math.min(cards.length -1, idx + 4);
  if(cards[next]) cards[next].focus();
}
function focusPrevRow(el){
  const cards = Array.from(document.querySelectorAll('.card'));
  const idx = cards.indexOf(el);
  const prev = Math.max(0, idx - 4);
  if(cards[prev]) cards[prev].focus();
}

/* Global keyboard for D-pad on main */
function addGlobalKeyHandlers(){
  document.addEventListener('keydown', (e)=>{
    // when modal open, ignore global
    const modal = document.getElementById('modal');
    if(modal && modal.getAttribute('aria-hidden') === 'false') return;
    if(e.key === 'ArrowLeft') prevSlide();
    if(e.key === 'ArrowRight') nextSlide();
  });
}

/* Touch swipe for carousel */
function initTouch(){
  const wrapper = document.getElementById('carouselWrapper');
  if(!wrapper) return;
  wrapper.addEventListener('touchstart', (e)=> { state.touchStartX = e.touches[0].clientX; stopCarousel(); }, {passive:true});
  wrapper.addEventListener('touchend', (e)=> { const dx = (e.changedTouches[0].clientX - state.touchStartX); if(Math.abs(dx) > 40){ if(dx < 0) nextSlide(); else prevSlide(); } startCarousel(); }, {passive:true});
}

/* UTILS */
function escapeHtml(str){ return String(str||'').replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s])); }
function escapeAttr(str){ return String(str||'').replace(/"/g,'&quot;'); }

/* helpers to compute allMovies when data changes */
function recomputeAllMovies(){
  state.allMovies = [...state.estrenos, ...state.populares, ...state.dibujos, ...state.series, ...state.anime];
}

// expose some functions for debugging
window._hdplus = { state, renderContent, startCarousel, stopCarousel };
