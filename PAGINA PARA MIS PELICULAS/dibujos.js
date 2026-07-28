window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';

    renderCarousel(carouselItems);
    startCarousel();

    const wrapper = document.getElementById('carouselWrapper');
    if (wrapper) {
      wrapper.addEventListener('mouseenter', stopCarousel);
      wrapper.addEventListener('mouseleave', startCarousel);
    }
  }, 1200);

  renderContent();
  setupSearch();
  setupMenu();
});

const carouselItems = [
  {
    title: 'Super Mario Galaxy',
    img: 'https://i.blogs.es/67efd4/super-mario-galaxy-la-pelicula-poster/450_1000.jpeg',
    desc: 'Mario y Luigi se enfrentan a una nueva amenaza: Bowser Jr. y su plan para liberar a su padre.',
    video: 'https://vimeos.net/embed-v7hdakih9470.html'
  },
  {
    title: 'Frozen',
    img: 'https://image.tmdb.org/t/p/w500/kgwjIb2JDHRhNk13lmSxiClFjVk.jpg',
    desc: 'Aventura musical congelada con magia y amistad.',
    video: 'https://www.youtube.com/embed/TbQm5doF_Uc'
  },
  {
    title: 'Encanto',
    img: 'https://image.tmdb.org/t/p/w500/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg',
    desc: 'Una historia familiar llena de magia y música.',
    video: 'https://www.youtube.com/embed/CaimKeDcudo'
  }
];

let currentSlide = 0;
let autoSlide;

function renderCarousel(items) {
  const wrapper = document.getElementById('carouselWrapper');
  const dots = document.getElementById('carouselDots');
  if (!wrapper || !dots || !items?.length) return;

  wrapper.innerHTML = items.map((item, index) => `
    <div class="carousel-slide" style="background-image:url('${item.img}')" onclick='openMovie(${JSON.stringify(item)})'>
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

const dibujos = [
  {
    title: 'Super Mario Galaxy',
    img: 'https://i.blogs.es/67efd4/super-mario-galaxy-la-pelicula-poster/450_1000.jpeg',
    desc: 'Mario y Luigi se enfrentan a una nueva amenaza: Bowser Jr. y su plan para liberar a su padre.',
    video: 'https://vimeos.net/embed-v7hdakih9470.html',
    views: '1.2M',
    favorite: '❤️',
    section: 'Estrenos Infantiles'
  },
  {
    title: 'Frozen',
    img: 'https://image.tmdb.org/t/p/w500/kgwjIb2JDHRhNk13lmSxiClFjVk.jpg',
    desc: 'Aventura musical congelada con magia y amistad.',
    video: 'https://www.youtube.com/embed/TbQm5doF_Uc',
    views: '980K',
    favorite: '💙',
    section: 'Estrenos Infantiles'
  },
  {
    title: 'The Amazing Digital Circus: El Último Acto',
    img: 'https://image.tmdb.org/t/p/w300/sKm720uPqkh0WEZEuMmgc5dLo5S.jpg',
    desc: 'Acción digital y emoción en una aventura única.',
    video: 'https://goodstream.one/embed-vg2rthy4h5wx.html',
    views: '980K',
    favorite: '💙',
    section: 'Estrenos Infantiles'
  },
  {
    title: 'Encanto',
    img: 'https://image.tmdb.org/t/p/w500/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg',
    desc: 'Una historia familiar llena de magia y música.',
    video: 'https://www.youtube.com/embed/CaimKeDcudo',
    views: '1.1M',
    favorite: '✨',
    section: 'Disney'
  },
  {
    title: 'Coco',
    img: 'https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg',
    desc: 'Viaja al mundo de los muertos en una aventura musical.',
    video: 'https://www.youtube.com/embed/Rvr68u6k5sI',
    views: '1.8M',
    favorite: '🎸',
    section: 'Pixar'
  },
  {
    title: 'Super Mario Galaxy: La película',
    img: 'https://i.blogs.es/67efd4/super-mario-galaxy-la-pelicula-poster/450_1000.jpeg',
    desc: 'Mario y Luigi luchan entre las estrellas para detener una amenaza cósmica.',
    video: 'https://vimeos.net/embed-v7hdakih9470.html',
    views: '1.1M',
    favorite: '✨',
    section: 'Universal Pictures'
  }
];

function renderContent(filter = '') {
  const content = document.getElementById('content');
  if (!content) return;

  const normalizedFilter = filter.trim().toLowerCase();

  if (normalizedFilter) {
    const results = dibujos.filter(item =>
      item.title.toLowerCase().includes(normalizedFilter) ||
      item.section.toLowerCase().includes(normalizedFilter)
    );

    if (results.length === 0) {
      content.innerHTML = '<p style="padding:20px; color:#cbd5e1;">No se encontraron dibujos para tu búsqueda.</p>';
      return;
    }

    content.innerHTML = `
      <section class="section">
        <h2>🔎 Resultados (${results.length})</h2>
        <div class="row">
          ${results.map(item => `
            <div class="card" onclick='openMovie(${JSON.stringify(item)})'>
              <span class="views">${item.views}</span>
              <span class="favorite">${item.favorite}</span>
              <img src="${item.img}" alt="${item.title}">
              <div class="card-info">
                <div class="card-title">${item.title}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
    return;
  }

  const sections = [
    'Estrenos Infantiles',
    'Disney',
    'Pixar',
    'Universal Pictures'
  ];

  content.innerHTML = '';

  sections.forEach(sectionName => {
    const items = dibujos.filter(item => item.section === sectionName);
    if (items.length === 0) return;

    const sectionHtml = `
      <section class="section">
        <h2>${sectionName}</h2>
        <div class="row">
          ${items.map(item => `
            <div class="card" onclick='openMovie(${JSON.stringify(item)})'>
              <span class="views">${item.views}</span>
              <span class="favorite">${item.favorite}</span>
              <img src="${item.img}" alt="${item.title}">
              <div class="card-info">
                <div class="card-title">${item.title}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;

    content.innerHTML += sectionHtml;
  });
}

function setupSearch() {
  const searchInput = document.getElementById('searchInput') || document.getElementById('search');
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    renderContent(searchInput.value);
  });
}

function setupMenu() {
  const menuIcon = document.getElementById('menuIcon');
  const submenu = document.getElementById('submenu');
  if (!menuIcon || !submenu) return;

  menuIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    submenu.classList.toggle('active');
  });

  document.addEventListener('click', (event) => {
    if (!submenu.contains(event.target) && !menuIcon.contains(event.target)) {
      submenu.classList.remove('active');
    }
  });
}

function openMovie(data) {
  const modal = document.getElementById('movieModal');
  const title = document.getElementById('movieTitle');
  const image = document.getElementById('movieImg');
  const description = document.getElementById('movieDescription');
  const player = document.getElementById('moviePlayer');

  if (!modal || !title || !image || !description || !player) return;

  title.textContent = data.title;
  image.src = data.img;
  description.textContent = data.desc;
  player.src = data.video;
  modal.style.display = 'flex';
}

function closeMovie() {
  const modal = document.getElementById('movieModal');
  const player = document.getElementById('moviePlayer');
  if (!modal || !player) return;
  modal.style.display = 'none';
  player.src = '';
}
