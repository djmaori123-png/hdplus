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
const animeContainer = document.getElementById('anime');
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
/* DEFAULT ANIME */
/* ===================== */
const defaultAnime = [
  {
    title:'Devil May Cry (2025)',
    image:'https://tse3.mm.bing.net/th/id/OIP.koH7LlhcK86cCRqz9iqkfgHaK-?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3',
    desc:'En esta epica batalla entre el bien y el mal, los limites son difusos. Pero un cazador de demonios endiabladamente guapo podria ser la mejor opcion para salvar al mundo.',
    category:'accion',
    section:'estrenos',
    views:0,
    seasons:[
      {
        name:'Temporada 1',
        episodes:[
          {title:'Cap�tulo 1',link:'https://vimeos.net/embed-9gaceb4qm0c0.html'},
          {title:'Cap�tulo 2',link:'https://vimeos.net/embed-o5qxl3ewfzav.html'},
          {title:'Cap�tulo 3',link:'https://vimeos.net/embed-5vomoa4be3g4.html'},
          {title:'Cap�tulo 4',link:'https://vimeos.net/embed-fm7dgipa4zt0.html'},
          {title:'Cap�tulo 5',link:'https://gscdn.cam/video/embed/c2fq1evh5cd7'},
          {title:'Cap�tulo 6',link:'https://vimeos.net/embed-vojbh51pzye7.html'},
          {title:'Cap�tulo 7',link:'https://gscdn.cam/video/embed/mf5dikm35chp'},
          {title:'Cap�tulo 8',link:'https://vimeos.net/embed/2d360t7h8hfr'}
        ]
      },
      {
        name:'Temporada 2',
        episodes:[
          {title:'Cap�tulo 1',link:'https://gscdn.cam/video/embed/uuynd4jml0o9'},
          {title:'Cap�tulo 2',link:'https://gscdn.cam/video/embed/q3lyp7fm3yxk'},
          {title:'Cap�tulo 3',link:'https://vimeos.net/embed-l1rauqwhelkt'},
          {title:'Cap�tulo 4',link:'https://vimeos.net/embed-jhfrr5h8fdex'},
          {title:'Cap�tulo 5',link:'https://vimeos.net/embed-e574crqs3p3o'},
          {title:'Cap�tulo 6',link:'https://vimeos.net/embed-e545jowmek8d'},
          {title:'Cap�tulo 7',link:'https://vimeos.net/embed-088g4r3350oj'},
          {title:'Cap�tulo 8',link:'https://vimeos.net/embed-et0pxrw9ddfx'}
        ]
      }
    ]
  },
  {
    title:'Solo',
    image:'https://tse4.mm.bing.net/th/id/OIP.FdyWDvIX6dc5aJsy8kRZVgHaMW?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3',
    desc:'Un cazador debil se vuelve el mas fuerte del mundo.',
    category:'aventura',
    section:'popular',
    views:0,
    seasons:[
      {
        name:'Temporada 1',
        episodes:[
          {title:'Cap�tulo 1', link:'https://example.com/video1'}
        ]
      }
    ]
  },
  {
    title:'Guardianes del Fuego',
    image:'https://tse3.mm.bing.net/th/id/OIP.4kGZzW8Y0wF1rZiXz-3uMgHaN3?pid=ImgDetMain&rs=1',
    desc:'Un grupo de h�roes debe enfrentarse a monstruos y salvar su ciudad de una invasi�n sobrenatural.',
    category:'acci�n',
    section:'accion',
    views:0,
    seasons:[
      {
        name:'Temporada 1',
        episodes:[
          {title:'Cap�tulo 1', link:'https://example.com/video2'}
        ]
      }
    ]
  }
];

/* ===================== */
/* CARGAR ANIME */
/* ===================== */

let anime = JSON.parse(localStorage.getItem('hdplus_anime')) || [];

if (!Array.isArray(anime) || anime.length === 0) {
  anime = defaultAnime;
  localStorage.setItem('hdplus_anime', JSON.stringify(defaultAnime));
}

anime = anime.sort((a, b) => a.title.localeCompare(b.title, 'es', { sensitivity: 'base' }));

const carouselItems = [
  {
    title: defaultAnime[0].title,
    image: defaultAnime[0].image,
    desc: defaultAnime[0].desc,
    seasons: defaultAnime[0].seasons
  },
  {
    title: defaultAnime[1].title,
    image: defaultAnime[1].image,
    desc: defaultAnime[1].desc,
    seasons: defaultAnime[1].seasons
  }
];

let currentSlide = 0;
let autoSlide;

function renderCarousel(items) {
  const wrapper = document.getElementById('carouselWrapper');
  const dots = document.getElementById('carouselDots');
  if (!wrapper || !dots || !items?.length) return;

  wrapper.innerHTML = items.map((item, index) => `
    <div class="carousel-slide" style="background-image:url('${item.image}')" onclick="openAnime('${item.title}')">
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
  const items = anime
    .filter(item => item.section === sectionKey)
    .sort((a, b) => a.title.localeCompare(b.title, 'es', { sensitivity: 'base' }));
  if (!items.length) return;

  container.innerHTML = items.map(item => `
    <div class="card" onclick="openAnime('${item.title}')">
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
  animeContainer.innerHTML = '';
  accion.innerHTML = '';

  if (!query) {
    renderSection('estrenos', estrenos);
    renderSection('popular', animeContainer);
    renderSection('accion', accion);
    return;
  }

  const results = anime
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
    <div class="card" onclick="openAnime('${item.title}')">
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

function openAnime(title) {
  const item = anime.find(x => x.title === title);
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
  localStorage.setItem('hdplus_anime', JSON.stringify(anime));
  render(searchInput.value);
}

/* ===================== */
/* TEMPORADAS */
/* ===================== */

function renderSeasons(animeData) {
  const seasonList = document.getElementById('seasonList');
  if (!seasonList) return;

  seasonList.innerHTML = '';

  animeData.seasons.forEach(season => {
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

document.addEventListener('click', (e) => {
  if (!submenu.contains(e.target) && !menuIcon.contains(e.target)) {
    submenu.classList.remove('show');
  }
});

/* INIT */
render();
