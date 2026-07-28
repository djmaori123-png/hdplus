window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';
  }, 1800);

  renderCarousel(carouselItems);
  startCarousel();

  const wrapper = document.getElementById('carouselWrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopCarousel);
    wrapper.addEventListener('mouseleave', startCarousel);
  }
});

/* ELEMENTOS */
const submenu = document.getElementById('submenu');
const menuIcon = document.getElementById('menuIcon');

const estrenos = document.getElementById('estrenos');
const seriesContainer = document.getElementById('series');
const accion = document.getElementById('accion');

const player = document.getElementById('player');
const searchInput = document.getElementById('searchInput') || document.getElementById('search');

const modal = document.getElementById('modal');
const modalContent = document.querySelector('.modal-content');

/* MENU */
if (menuIcon) {
  menuIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    submenu.classList.toggle('show');
  });
}

/* ===================== */
/* DEFAULT SERIES */
/* ===================== */

const defaultSeries = [
  {
    title:'Stranger Things',
    image:'https://tse4.mm.bing.net/th/id/OIP.n7K3j1eB2OQB4LA6PKZu-QHaEK?pid=ImgDetMain&rs=1',
    desc:'Un grupo de ninos descubre un mundo paralelo oscuro mientras luchan contra fuerzas sobrenaturales en su pueblo natal.',
    category:'suspenso',
    section:'estrenos',
    views:0,
    seasons:[
      {
        name:'Temporada 1',
        episodes:[
          {title:'Cap�tulo 1', link:'https://example.com/stranger1'},
          {title:'Cap�tulo 2', link:'https://example.com/stranger2'}
        ]
      }
    ]
  },
  {
    title:'La Casa de Papel',
    image:'https://tse4.mm.bing.net/th/id/OIP.xKqZQKnt9vByzn1MOanqHwAAAA?pid=ImgDetMain&rs=1',
    desc:'Un grupo de ladrones ejecuta un atraco monumental mientras planifica su escape con un lider carismatico.',
    category:'accion',
    section:'popular',
    views:0,
    seasons:[
      {
        name:'Temporada 1',
        episodes:[
          {title:'Cap�tulo 1', link:'https://example.com/papel1'},
          {title:'Cap�tulo 2', link:'https://example.com/papel2'}
        ]
      }
    ]
  },
  {
    title:'The Witcher',
    image:'https://tse1.mm.bing.net/th/id/OIP.MKPHm9F3A7SbLl5qzK8x8gHaE9?pid=ImgDetMain&rs=1',
    desc:'Un cazador de monstruos recorre un mundo violento en busca de su destino y de la verdad sobre su origen.',
    category:'fantasia',
    section:'accion',
    views:0,
    seasons:[
      {
        name:'Temporada 1',
        episodes:[
          {title:'Cap�tulo 1', link:'https://example.com/witcher1'},
          {title:'Cap�tulo 2', link:'https://example.com/witcher2'}
        ]
      }
    ]
  }
];

/* ===================== */
/* CARGAR SERIES */
/* ===================== */

let seriesData = JSON.parse(localStorage.getItem('hdplus_series')) || [];

if (!Array.isArray(seriesData) || seriesData.length === 0) {
  seriesData = defaultSeries;
  localStorage.setItem('hdplus_series', JSON.stringify(defaultSeries));
}

seriesData = seriesData.sort((a, b) => a.title.localeCompare(b.title, 'es', { sensitivity: 'base' }));

const carouselItems = [
  {
    title: defaultSeries[0].title,
    image: defaultSeries[0].image,
    desc: defaultSeries[0].desc,
    seasons: defaultSeries[0].seasons
  },
  {
    title: defaultSeries[1].title,
    image: defaultSeries[1].image,
    desc: defaultSeries[1].desc,
    seasons: defaultSeries[1].seasons
  }
];

let currentSlide = 0;
let autoSlide;

function renderCarousel(items) {
  const wrapper = document.getElementById('carouselWrapper');
  const dots = document.getElementById('carouselDots');
  if (!wrapper || !dots || !items?.length) return;

  wrapper.innerHTML = items.map((item, index) => `
    <div class="carousel-slide" style="background-image:url('${item.image}')" onclick="openSeries('${item.title}')">
      <div>
        <h1>${item.title}</h1>
        <p>${item.desc}</p>
      </div>
    </div>
  `).join('');

  dots.innerHTML = items.map((_, index) => `
    <span class="dot ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></span>
  `).join('');

  updateCarousel();
}

function updateCarousel() {
  const wrapper = document.getElementById('carouselWrapper');
  if (!wrapper) return;
  wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function nextSlide() {
  const wrapper = document.getElementById('carouselWrapper');
  if (!wrapper) return;
  const total = wrapper.children.length;
  currentSlide = (currentSlide + 1) % total;
  updateCarousel();
}

function prevSlide() {
  const wrapper = document.getElementById('carouselWrapper');
  if (!wrapper) return;
  const total = wrapper.children.length;
  currentSlide = (currentSlide - 1 + total) % total;
  updateCarousel();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
}

function startCarousel() {
  stopCarousel();
  autoSlide = setInterval(nextSlide, 5000);
}

function stopCarousel() {
  clearInterval(autoSlide);
}

/* ===================== */
/* RENDER */
/* ===================== */

function renderSection(sectionKey, container) {
  const items = seriesData
    .filter(item => item.section === sectionKey)
    .sort((a, b) => a.title.localeCompare(b.title, 'es', { sensitivity: 'base' }));
  if (!items.length) return;

  container.innerHTML = items.map(item => `
    <div class="card" onclick="openSeries('${item.title}')">
      <div class="views">👁 ${item.views}</div>
      <div class="favorite">🔥</div>
      <img src="${item.image}">
      <div class="card-info">
        <div class="card-title">${item.title}</div>
      </div>
    </div>
  `).join('');
}

function render(filter = '') {
  const query = filter.toLowerCase().trim();
  estrenos.innerHTML = '';
  seriesContainer.innerHTML = '';
  accion.innerHTML = '';

  if (!query) {
    renderSection('estrenos', estrenos);
    renderSection('popular', seriesContainer);
    renderSection('accion', accion);
    return;
  }

  const results = seriesData
    .filter(item =>
      item.title.toLowerCase().includes(query) ||
      (item.category && item.category.toLowerCase().includes(query))
    )
    .sort((a, b) => a.title.localeCompare(b.title, 'es', { sensitivity: 'base' }));

  if (results.length === 0) {
    estrenos.innerHTML = '<p style="padding:20px; color:#cbd5e1;">No se encontraron resultados.</p>';
    return;
  }

  const cards = results.map(item => `
    <div class="card" onclick="openSeries('${item.title}')">
      <div class="views">👁 ${item.views}</div>
      <div class="favorite">🔥</div>
      <img src="${item.image}">
      <div class="card-info">
        <div class="card-title">${item.title}</div>
      </div>
    </div>
  `).join('');

  estrenos.innerHTML = `
    <div class="section">
      <h2>🔎 Resultados (${results.length})</h2>
      <div class="row">${cards}</div>
    </div>
  `;
}

/* ===================== */
/* MODAL */
/* ===================== */

function closeModal() {
  modal.style.display = 'none';
  player.src = '';
  modalContent.style.transform = 'translateY(0)';
}

function openSeries(title) {
  const item = seriesData.find(x => x.title === title);
  if (!item) return;

  modal.style.display = 'flex';
  document.getElementById('img').src = item.image;
  document.getElementById('title').textContent = item.title;
  document.getElementById('desc').textContent = item.desc;

  renderSeasons(item);

  if (item.seasons?.length && item.seasons[0].episodes?.length) {
    player.src = item.seasons[0].episodes[0].link;
  }

  item.views = (item.views || 0) + 1;
  localStorage.setItem('hdplus_series', JSON.stringify(seriesData));
  render(searchInput.value);
}

/* ===================== */
/* TEMPORADAS */
/* ===================== */

function renderSeasons(seriesItem) {
  const seasonList = document.getElementById('seasonList');
  if (!seasonList) return;

  seasonList.innerHTML = '';

  seriesItem.seasons.forEach(season => {
    const box = document.createElement('div');
    const btn = document.createElement('button');
    btn.textContent = season.name;

    const episodes = document.createElement('div');
    episodes.style.display = 'none';

    season.episodes.forEach(ep => {
      const epBtn = document.createElement('button');
      epBtn.textContent = ep.title;
      epBtn.onclick = () => player.src = ep.link;
      episodes.appendChild(epBtn);
    });

    btn.onclick = () => {
      episodes.style.display = episodes.style.display === 'none' ? 'block' : 'none';
    };

    box.appendChild(btn);
    box.appendChild(episodes);
    seasonList.appendChild(box);
  });
}

/* ===================== */
/* BUSCADOR */
/* ===================== */

if (searchInput) {
  searchInput.addEventListener('input', () => {
    render(searchInput.value);
  });
}

/* ===================== */
/* CERRAR MENU */
/* ===================== */

document.addEventListener('click', (e) => {
  if (!submenu.contains(e.target) && !menuIcon.contains(e.target)) {
    submenu.classList.remove('show');
  }
});

/* INIT */
render();
