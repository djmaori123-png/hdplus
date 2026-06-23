window.addEventListener('load', () => {

  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';
  }, 1200);

  renderContent();
  startCarousel();

  const wrapper = document.getElementById("carouselWrapper");
  if (wrapper) {
    wrapper.addEventListener("mouseenter", stopCarousel);
    wrapper.addEventListener("mouseleave", startCarousel);
  }

  /* MENU MOVIL - MEJORADO */
  const menuIcon = document.getElementById("menuIcon");
  const submenu = document.getElementById("submenu");

  console.log("menuIcon:", menuIcon);
  console.log("submenu:", submenu);

  if (menuIcon && submenu) {
    
    // Click en el icono del menú
    menuIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("Click en menú icon");
      
      submenu.classList.toggle("active");
      
      menuIcon.textContent = submenu.classList.contains("active") ? "✖" : "☰";
    });

    // Click fuera del menú para cerrarlo
    document.addEventListener("click", (e) => {
      if (!submenu.contains(e.target) && !menuIcon.contains(e.target)) {
        submenu.classList.remove("active");
        menuIcon.textContent = "☰";
      }
    });

    // Click en los links del menú
    const links = submenu.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", () => {
        submenu.classList.remove("active");
        menuIcon.textContent = "☰";
      });
    });
  }

  /* BUSCADOR */
  const searchInput = document.getElementById("searchInput");
  
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      searchMovies(query);
    });
  }

});

/* =========================
   CONTENIDO MANUAL
========================= */

const estrenos = [
   {
    title: "La posesión de la momia (2026)",
    category: "terror",
    img: "https://lamovie.org/wp-content/uploads/thumbs/c22fdaaf2da7157fd0ecc757f34ff726_hd.webp",
    desc: "La joven hija de un periodista desaparece en el desierto sin dejar rastro. Ocho años después, la familia rota se sorprende cuando ella regresa con ellos, mientras lo que debería ser [...]",
    video: "https://vimeos.net/embed-rm46q7vy3t52.html",
     icon: "🔥"

  },
  {
    title: "Mortal Kombat II (2026))",
    category: "accion",
    img: "https://lamovie.org/wp-content/uploads/thumbs/83d2aeedc57230d8d320d1c7f55a199a_hd.webp",
    desc: "Los campeones favoritos de los fans —ahora acompañados por el mismísimo Johnny Cage— se enfrentan entre sí en la batalla definitiva, sangrienta y sin reglas, para derrotar el osc[...]",
    video: "https://vimeos.net/embed-5yif23ty43ku.html"
  },
  {
    title: "Proyecto Fin del Mundo (2026)",
    category: "accion",
    img: "https://lamovie.org/wp-content/uploads/thumbs/4f7fc4c101128f501a402a3f6ee8c6dd_hd.webp",
    desc: "El profesor de ciencias Ryland Grace despierta en una nave espacial a años luz de su hogar sin recordar quién es ni cómo llegó allí. A medida que recupera la memoria, comienza a de[...]",
    video: "https://vimeos.net/embed-5yif23ty43ku.html"
  },
  {
    title: "Michael (2026)",
    category: "drama",
    img: "https://lamovie.org/wp-content/uploads/thumbs/273671f175a059f3315e7492c4b83266_hd.webp",
    desc: "Narra la vida de Michael Jackson más allá de la música, recorriendo su trayectoria desde el descubrimiento de su extraordinario talento como líder de los Jackson Five hasta converti[...]",
    video: "https://vimeos.net/embed-6opwlcemtzs9.html"
  },
   {
    title: "El Drama (2026)",
    category: "drama",
    category: "comedia",
    img: "https://lamovie.org/wp-content/uploads/thumbs/7573478c11c82bf32781fe8fb472eb86_hd.webp",
    desc: "Cuenta la historia de una pareja cuyo romance cambia radicalmente antes de su gran día.",
    video: "https://vimeos.net/embed-v0f2qzieze5h.html"
  }

];

const PELICULAS_POPULARES = [
  {
    title: "Hidden: Terror en Kingsville (2015)",
    img: "https://tse4.mm.bing.net/th/id/OIP.HQc18vAAr24dhwyyGNTVeQAAAA?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3",
    desc: "301 días han pasado desde que Ray, Claire y su hija, Zoe encontrasen un refugio bajo tierra. Con nada que les distraiga de su propio miedo, se aferran a la esperanza de poder vivir al[...]",
    video: "https://vimeos.net/embed-5lv1x1gibjic.html",
    views: "5.1M",
    icon: "🔥"
  },
   {
    title: "La posesión de la momia (2026)",
    category: "terror",
    img: "https://lamovie.org/wp-content/uploads/thumbs/c22fdaaf2da7157fd0ecc757f34ff726_hd.webp",
    desc: "La joven hija de un periodista desaparece en el desierto sin dejar rastro. Ocho años después, la familia rota se sorprende cuando ella regresa con ellos, mientras lo que debería ser[...]",
    video: "https://vimeos.net/embed-rm46q7vy3t52.html",
    icon: "🔥"
  },
  {
    title: "Proyecto Fin del Mundo (2026)",
    category: "accion",
    img: "https://lamovie.org/wp-content/uploads/thumbs/4f7fc4c101128f501a402a3f6ee8c6dd_hd.webp",
    desc: "El profesor de ciencias Ryland Grace despierta en una nave espacial a años luz de su hogar sin recordar quién es ni cómo llegó allí. A medida que recupera la memoria, comienza a d[...]",
    video: "https://vimeos.net/embed-5yif23ty43ku.html"
  },
   {
    title: "El Drama (2026)",
    category: "drama",
    category: "comedia",
    img: "https://lamovie.org/wp-content/uploads/thumbs/7573478c11c82bf32781fe8fb472eb86_hd.webp",
    desc: "Cuenta la historia de una pareja cuyo romance cambia radicalmente antes de su gran día.",
    video: "https://vimeos.net/embed-v0f2qzieze5h.html"
  }
];

const Dibujos_Animados = [];
const series = [];
const anime = [];

/* =========================
   CARRUSEL PERSONALIZADO
========================= */

const carrusel = [
{
    title: "La posesión de la momia (2026)",
    category: "terror",
    img: "https://tse2.mm.bing.net/th/id/OIP.vQp6a8Oqy2poH45g9uqn6gHaD4?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3",
    desc: "La joven hija de un periodista desaparece en el desierto sin dejar rastro. Ocho años después, la familia rota se sorprende cuando ella regresa con ellos, mientras lo que debería ser[...]",
    video: "https://vimeos.net/embed-rm46q7vy3t52.html"
  },
  {
    title: "Mortal Kombat II (2026)",
    category: "accion",
    img: "https://cdn.bolivia.com/sdi/2021/02/22/mortal-kombat-nuevo-trailer-pelicula-warner-bros-895126-1.jpg",
    desc: "Los campeones favoritos de los fans —ahora acompañados por el mismísimo Johnny Cage— se enfrentan entre sí en la batalla definitiva, sangrienta y sin reglas, para derrotar el os[...]",
    video: "https://vimeos.net/embed-5yif23ty43ku.html"
  },
  {
    title: "Proyecto Fin del Mundo (2026)",
    category: "accion",
    img: "https://tse2.mm.bing.net/th/id/OIP.zUKz6333LMW4joYHlHEJkAHaEo?cb=thfvnextfalcon2&rs=1&pid=ImgDetMain&o=7&rm=3",
    desc: "El profesor de ciencias Ryland Grace despierta en una nave espacial a años luz de su hogar sin recordar quién es ni cómo llegó allí. A medida que recupera la memoria, comienza a d[...]",
    video: "https://vimeos.net/embed-5yif23ty43ku.html"
  },
   {
    title: "Michael (2026)",
    category: "drama",
    img: "https://d2e1hu1ktur9ur.cloudfront.net/wp-content/uploads/2025/11/Michel.jpg",
    desc: "Narra la vida de Michael Jackson más allá de la música, recorriendo su trayectoria desde el descubrimiento de su extraordinario talento como líder de los Jackson Five hasta convert[...]",
    video: "https://vimeos.net/embed-6opwlcemtzs9.html"
  },
    {
    title: "El Drama (2026)",
    category: "drama",
    category: "comedia",
    img: "https://tse3.mm.bing.net/th/id/OIP.H-jnc-s5bnjSEEYUFGwscAHaEK?cb=thfvnextfalcon2&rs=1&pid=ImgDetMain&o=7&rm=3",
    desc: "Cuenta la historia de una pareja cuyo romance cambia radicalmente antes de su gran día.",
    video: "https://vimeos.net/embed-v0f2qzieze5h.html"
  }


];

/* =========================
   CARRUSEL RENDER
========================= */

let currentSlide = 0;

function renderCarousel(items) {
  const wrapper = document.getElementById("carouselWrapper");
  const dots = document.getElementById("carouselDots");

  if (!wrapper || !items.length) return;

  wrapper.innerHTML = items.map(item => `
    <div class="carousel-slide"
      style="background-image:url('${item.img}')"
      onclick='openMovie(${JSON.stringify(item)})'>

      <div>
        <h1>${item.title}</h1>
        <p>${item.desc || ""}</p>
      </div>

    </div>
  `).join("");

  dots.innerHTML = items.map((_, i) => `
    <span class="dot ${i === 0 ? "active" : ""}" onclick="goToSlide(${i})"></span>
  `).join("");

  updateCarousel();
}

function updateCarousel() {
  const wrapper = document.getElementById("carouselWrapper");
  wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === currentSlide);
  });
}

function nextSlide() {
  const wrapper = document.getElementById("carouselWrapper");
  const total = wrapper.children.length;

  currentSlide = (currentSlide + 1) % total;
  updateCarousel();
}

function prevSlide() {
  const wrapper = document.getElementById("carouselWrapper");
  const total = wrapper.children.length;

  currentSlide = (currentSlide - 1 + total) % total;
  updateCarousel();
}

function goToSlide(i) {
  currentSlide = i;
  updateCarousel();
}

let autoSlide;

function startCarousel() {
  autoSlide = setInterval(() => {
    nextSlide();
  }, 5000);
}

function stopCarousel() {
  clearInterval(autoSlide);
}


/* =========================
   SECCIONES
========================= */

const container = document.getElementById("content");

function renderSection(title, items) {
  if (!items || items.length === 0) return;

  let html = `
    <div class="section">
      <h2>${title}</h2>
      <div class="row">
  `;

  items.forEach(p => {
    html += `
      <div class="card" onclick='openMovie(${JSON.stringify(p)})'>
        <span class="views">${p.views || ""}</span>
        <span class="favorite">${p.icon || "🔥"}</span>

        <img src="${p.img}" alt="${p.title}">
        <div class="card-info">
          <div class="card-title">${p.title}</div>
        </div>
      </div>
    `;
  });

  html += `</div></div>`;
  container.innerHTML += html;
}

/* =========================
   RENDER GENERAL
========================= */

function renderContent() {
  if (!container) return;

  container.innerHTML = "";

  renderCarousel(carrusel);

  renderSection("Estrenos", estrenos);
  renderSection("Películas Populares", PELICULAS_POPULARES);
  renderSection("Dibujos Animados", Dibujos_Animados);
  renderSection("Series", series);
  renderSection("Anime", anime);
}

/* =========================
   MODAL
========================= */

function openMovie(data) {
  document.getElementById("modal").style.display = "flex";
  document.getElementById("img").src = data.img;
  document.getElementById("title").innerText = data.title;
  document.getElementById("description").innerText = data.desc || "";
  document.getElementById("player").src = data.video;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("player").src = "";
}

/* =========================
   FUNCIÓN DE BÚSQUEDA
========================= */

// Combina todas las películas para buscar
const allMovies = [
  ...estrenos,
  ...PELICULAS_POPULARES,
  ...Dibujos_Animados,
  ...series,
  ...anime
];

function searchMovies(query) {
  const container = document.getElementById("content");
  if (!container) return;

  if (!query) {
    renderContent(); // si no hay texto, vuelve a mostrar todo
    return;
  }

  const results = allMovies.filter(p =>
    p.title.toLowerCase().includes(query) ||
    (p.category && p.category.toLowerCase().includes(query))
  );

  container.innerHTML = "";

  if (results.length === 0) {
    container.innerHTML = `<p style="padding:20px; text-align: center; color: #999;">No se encontraron resultados para "${query}"</p>`;
    return;
  }

  container.innerHTML = `
    <div class="section">
      <h2>🔎 Resultados (${results.length})</h2>
      <div class="row">
        ${results.map(p => `
          <div class="card" onclick='openMovie(${JSON.stringify(p)})'>
            <span class="favorite">${p.icon || "🔥"}</span>
            <img src="${p.img}" alt="${p.title}">
            <div class="card-info">
              <div class="card-title">${p.title}</div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}
