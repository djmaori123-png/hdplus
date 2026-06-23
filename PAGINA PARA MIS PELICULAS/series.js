window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').style.display = 'none';
  }, 1800);
});

/* ELEMENTOS */
const submenu = document.getElementById('submenu');
const menuIcon = document.getElementById('menuIcon');

const estrenos = document.getElementById('estrenos');
const animeContainer = document.getElementById('anime');
const accion = document.getElementById('accion');

const player = document.getElementById('player');
const searchInput = document.getElementById('search');

const modal = document.getElementById('modal');
const modalContent = document.querySelector('.modal-content');

/* MENU */
menuIcon.addEventListener('click', (e) => {
  e.stopPropagation();
  submenu.classList.toggle('show');
});

/* ===================== */
/* DEFAULT ANIME */
/* ===================== */

const defaultAnime = [
{
title:'Devil May Cry (2025)',
image:'https://tse3.mm.bing.net/th/id/OIP.koH7LlhcK86cCRqz9iqkfgHaK-?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3',
desc:'En esta épica batalla entre el bien y el mal, los límites son difusos. Pero un cazador de demonios endiabladamente guapo podría ser la mejor opción para salvar al mundo.',
views:0,
seasons:[
{
name:'Temporada 1',
episodes:[
{title:'Capítulo 1',link:'https://vimeos.net/embed-9gaceb4qm0c0.html'},
{title:'Capítulo 2',link:'https://vimeos.net/embed-o5qxl3ewfzav.html'},
{title:'Capítulo 3',link:'https://vimeos.net/embed-5vomoa4be3g4.html'},
{title:'Capítulo 4',link:'https://vimeos.net/embed-fm7dgipa4zt0.html'},
{title:'Capítulo 5',link:'https://gscdn.cam/video/embed/c2fq1evh5cd7'},
{title:'Capítulo 6',link:'https://vimeos.net/embed-vojbh51pzye7.html'},
{title:'Capítulo 7',link:'https://gscdn.cam/video/embed/mf5dikm35chp'},
{title:'Capítulo 8',link:'https://gscdn.cam/video/embed/2d360t7h8hfr'}
]
},

{
name:'Temporada 2',
episodes:[
{title:'Capítulo 1',link:'https://gscdn.cam/video/embed/uuynd4jml0o9'},
{title:'Capítulo 2',link:'https://gscdn.cam/video/embed/q3lyp7fm3yxk'},
{title:'Capítulo 3',link:'https://gscdn.cam/video/embed/l1rauqwhelkt'},
{title:'Capítulo 4',link:'https://gscdn.cam/video/embed/jhfrr5h8fdex'},
{title:'Capítulo 5',link:'https://gscdn.cam/video/embed/e574crqs3p3o'},
{title:'Capítulo 6',link:'https://gscdn.cam/video/embed/e545jowmek8d'},
{title:'Capítulo 7',link:'https://gscdn.cam/video/embed/088g4r3350oj'},
{title:'Capítulo 8',link:'https://gscdn.cam/video/embed/et0pxrw9ddfx'}
]
}
  ]
},

{
  title:'Solo ',
  image:'https://tse4.mm.bing.net/th/id/OIP.FdyWDvIX6dc5aJsy8kRZVgHaMW?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3',
  desc:'Un cazador débil se vuelve el más fuerte del mundo.',
  views:0,
  seasons:[
    {
      name:'Temporada 1',
      episodes:[
        {title:'Capítulo 1', link:'https://example.com/video1'}
      ]
    }
  ]
},

];





/* ===================== */
/* CARGAR ANIME (FIX REAL) */
/* ===================== */

let anime = JSON.parse(localStorage.getItem('hdplus_anime')) || [];

if (!Array.isArray(anime) || anime.length === 0) {
  anime = defaultAnime;

  localStorage.setItem(
    'hdplus_anime',
    JSON.stringify(defaultAnime) // 👈 FIX CLAVE
  );
}

/* ===================== */
/* RENDER */
/* ===================== */

function render(filter = '') {
  estrenos.innerHTML = '';
  animeContainer.innerHTML = '';
  accion.innerHTML = '';

  anime.forEach(a => {
    if (a.title.toLowerCase().includes(filter.toLowerCase())) {
      const card = `
        <div class="card" onclick="openAnime('${a.title}')">
          <div class="views">👁 ${a.views}</div>
          <div class="favorite">🔥</div>
          <img src="${a.image}">
          <div class="card-info">
            <div class="card-title">${a.title}</div>
          </div>
        </div>
      `;

      estrenos.innerHTML += card;
      animeContainer.innerHTML += card;
      accion.innerHTML += card;
    }
  });
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
  const a = anime.find(x => x.title === title);
  if (!a) return;

  modal.style.display = 'flex';

  document.getElementById('img').src = a.image;
  document.getElementById('title').textContent = a.title;
  document.getElementById('desc').textContent = a.desc;

  renderSeasons(a);

  if (a.seasons?.length && a.seasons[0].episodes?.length) {
    player.src = a.seasons[0].episodes[0].link;
  }

  a.views = (a.views || 0) + 1;

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
      episodes.style.display =
        episodes.style.display === 'none' ? 'block' : 'none';
    };

    box.appendChild(btn);
    box.appendChild(episodes);
    seasonList.appendChild(box);
  });
}

/* ===================== */
/* BUSCADOR */
/* ===================== */

searchInput.addEventListener('keyup', () => {
  render(searchInput.value);
});

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