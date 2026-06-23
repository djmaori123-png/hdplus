window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';
  }, 1200);

  renderContent();

  // Iniciar carrusel automático
  startCarousel();

  const wrapper = document.getElementById("carouselWrapper");

  if (wrapper) {
    wrapper.addEventListener("mouseenter", stopCarousel);
    wrapper.addEventListener("mouseleave", startCarousel);
  }
});

/* =========================
   CONTENIDO MANUAL
========================= */
const peliculas = [
  {
    title: "Hidden: Terror en Kingsville (2015)",
    category: "terror",
    img: "https://tse4.mm.bing.net/th/id/OIP.HQc18vAAr24dhwyyGNTVeQAAAA?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3",
    desc: "Terror psicológico...",
    video: "https://vimeos.net/embed-5lv1x1gibjic.html"
  },

  {
    title: "Buenas Noches, Mami (2022)",
    category: "terror",
    img: "https://lamovie.org/wp-content/uploads/thumbs/59007a9969b51bd2d083a052f9acbed6_hd.webp",
    desc: "Buenas Noches, Mami  Dos hermanos gemelos llegan a la casa de campo de su madre y descubren que tiene la cara cubierta con una venda, a causa, según ella, de una reciente cirugía plástica. Su comportamiento se hace cada vez más errático y extraño, por eso surge una idea en los niños: la fuerte sospecha de que la mujer debajo de la gaza no es su madre real.",
    video: "https://vimeos.net/embed-xks2r0uanfo5.html"
  },

  {
    title: "La posesión de la momia (2026)",
    category: "terror",
    img: "https://lamovie.org/wp-content/uploads/thumbs/c22fdaaf2da7157fd0ecc757f34ff726_hd.webp",
    desc: "La joven hija de un periodista desaparece en el desierto sin dejar rastro. Ocho años después, la familia rota se sorprende cuando ella regresa con ellos, mientras lo que debería ser una reunión alegre se convierte en una pesadilla viviente.",
    video: "https://vimeos.net/embed-rm46q7vy3t52.html"
  },

  {
    title: "HappynessEl menú (2022)",
    category: "terror",
    img: "https://lamovie.org/wp-content/uploads/thumbs/80fb1b62e3b533cad152dfa274841bc9_hd.webp",
    desc: "El menú Una joven pareja viaja a uno de los destinos más exclusivos del mundo para cenar en un restaurante que ofrece una experiencia culinaria única. Sin embargo, el chef (Fiennes) ha preparado un ingrediente secreto que tendrá un resultado sorprendente en los dos enamorados.",
    video: "https://vimeos.net/embed-0xw2x9uteple.html"
  },
   
  {
    title: "Háblame (2023)",
    category: "terror",
    img: "https://lamovie.org/wp-content/uploads/thumbs/6660aeb149e7cda318c31ce413d2983d_hd.webp",
    desc: "Háblame La solitaria adolescente Mia se engancha a la emoción de invocar espíritus utilizando una mano embalsamada, pero cuando se enfrenta a un alma que dice ser su madre muerta, desata una plaga de fuerzas sobrenaturales y se debate entre decidir en quién puede confiar: en los vivos o en los muertos.",
    video: "https://vimeos.net/embed-8wefdjfu810w.html"
  },
  {
    title: "Mortal Kombat II (2026)",
    category: "accion",
    img: "https://lamovie.org/wp-content/uploads/thumbs/83d2aeedc57230d8d320d1c7f55a199a_hd.webp",
    desc: "Los campeones favoritos de los fans —ahora acompañados por el mismísimo Johnny Cage— se enfrentan entre sí en la batalla definitiva, sangrienta y sin reglas, para derrotar el oscuro dominio de Shao Kahn, que amenaza con destruir el Reino de la Tierra y a sus defensores.",
    video: "https://vimeos.net/embed-5yif23ty43ku.html"
  },
  {
    title: "Proyecto Fin del Mundo (2026)",
    category: "aventura",
    img: "https://lamovie.org/wp-content/uploads/thumbs/4f7fc4c101128f501a402a3f6ee8c6dd_hd.webp",
    desc: "El profesor de ciencias Ryland Grace despierta en una nave espacial a años luz de su hogar sin recordar quién es ni cómo llegó allí. A medida que recupera la memoria, comienza a descubrir su misión: resolver el enigma de la misteriosa sustancia que está causando la extinción del sol Géneros: Aventura Ciencia ficción",
    video: "https://vimeos.net/embed-5yif23ty43ku.html"
  },
   {
    title: "Michael (2026)",
    category: "drama",
    img: "https://lamovie.org/wp-content/uploads/thumbs/273671f175a059f3315e7492c4b83266_hd.webp",
    desc: "Narra la vida de Michael Jackson más allá de la música, recorriendo su trayectoria desde el descubrimiento de su extraordinario talento como líder de los Jackson Five hasta convertirse en un artista visionario cuya ambición creativa le impulsó a convertirse en el artista más grande del mundo.",
    video: "https://vimeos.net/embed-6opwlcemtzs9.html"
  },
  {
    title: "El Drama (2026)",
    category: "comedia",
    img: "https://lamovie.org/wp-content/uploads/thumbs/7573478c11c82bf32781fe8fb472eb86_hd.webp",
    desc: "Cuenta la historia de una pareja cuyo romance cambia radicalmente antes de su gran día.",
    video: "https://vimeos.net/embed-v0f2qzieze5h.html"
  }
];

/* =========================
   CARRUSEL PERSONALIZADO
========================= */

const carrusel = [
  {
    title: "La posesión de la momia (2026)",
    category: "terror",
    img: "https://tse2.mm.bing.net/th/id/OIP.vQp6a8Oqy2poH45g9uqn6gHaD4?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3",
    desc: "La joven hija de un periodista desaparece en el desierto sin dejar rastro. Ocho años después, la familia rota se sorprende cuando ella regresa con ellos, mientras lo que debería ser una reunión alegre se convierte en una pesadilla viviente.",
    video: "https://vimeos.net/embed-rm46q7vy3t52.html"
  },
  {
    title: "Mortal Kombat II (2026)",
    category: "accion",
    img: "https://cdn.bolivia.com/sdi/2021/02/22/mortal-kombat-nuevo-trailer-pelicula-warner-bros-895126-1.jpg",
    desc: "Los campeones favoritos de los fans —ahora acompañados por el mismísimo Johnny Cage— se enfrentan entre sí en la batalla definitiva, sangrienta y sin reglas, para derrotar el oscuro dominio de Shao Kahn, que amenaza con destruir el Reino de la Tierra y a sus defensores.",
    video: "https://vimeos.net/embed-5yif23ty43ku.html"
  },
  {
    title: "Proyecto Fin del Mundo (2026)",
    category: "accion",
    img: "https://tse2.mm.bing.net/th/id/OIP.zUKz6333LMW4joYHlHEJkAHaEo?cb=thfvnextfalcon2&rs=1&pid=ImgDetMain&o=7&rm=3",
    desc: "El profesor de ciencias Ryland Grace despierta en una nave espacial a años luz de su hogar sin recordar quién es ni cómo llegó allí. A medida que recupera la memoria, comienza a descubrir su misión: resolver el enigma de la misteriosa sustancia que está causando la extinción del sol",
    video: "https://vimeos.net/embed-5yif23ty43ku.html"
  },

  {
    title: "Michael (2026)",
    category: "drama",
    img: "https://d2e1hu1ktur9ur.cloudfront.net/wp-content/uploads/2025/11/Michel.jpg",
    desc: "Narra la vida de Michael Jackson más allá de la música, recorriendo su trayectoria desde el descubrimiento de su extraordinario talento como líder de los Jackson Five hasta convertirse en un artista visionario cuya ambición creativa le impulsó a convertirse en el artista más grande del mundo.",
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
  if (!container) {
    console.error("No existe #content en el HTML");
    return;
  }

  container.innerHTML = "";

  renderCarousel(carrusel);
   const grouped = {
  accion: [],
  comedia: [],
   aventura: [],
   drama: [],
  terror: []
};

peliculas.forEach(p => {
  if (grouped[p.category]) {
    grouped[p.category].push(p);
  }
});

  // 🔥 SI EXISTEN LOS APARTADOS LOS USA, SI NO NO ROMPE NADA
  const accionBox = document.getElementById("accion");
const comediaBox = document.getElementById("comedia");
const aventuraBox = document.getElementById("aventura");
const dramaBox = document.getElementById("drama");
const terrorBox = document.getElementById("terror");

if (accionBox) {
  accionBox.innerHTML = `
    <h2 class="category-title">🔥 Acción</h2>
    <div class="row">
      ${grouped.accion.map(p => `
        <div class="card" onclick='openMovie(${JSON.stringify(p)})'>
          <img src="${p.img}">
          <div class="card-info">${p.title}</div>
        </div>
      `).join("")}
    </div>
  `;
}

if (comediaBox) {
  comediaBox.innerHTML = `
    <h2 class="category-title">😂 Comedia</h2>
    <div class="row">
      ${grouped.comedia.map(p => `
        <div class="card" onclick='openMovie(${JSON.stringify(p)})'>
          <img src="${p.img}">
          <div class="card-info">${p.title}</div>
        </div>
      `).join("")}
    </div>
  `;
}

if (aventuraBox) {
  aventuraBox.innerHTML = `
    <h2 class="category-title">🏕 Aventura</h2>
    <div class="row">
      ${grouped.aventura.map(p => `
        <div class="card" onclick='openMovie(${JSON.stringify(p)})'>
          <img src="${p.img}">
          <div class="card-info">${p.title}</div>
        </div>
      `).join("")}
    </div>
  `;
}

if (dramaBox) {
  dramaBox.innerHTML = `
    <h2 class="category-title">� Drama</h2>
    <div class="row">
      ${grouped.drama.map(p => `
        <div class="card" onclick='openMovie(${JSON.stringify(p)})'>
          <img src="${p.img}">
          <div class="card-info">${p.title}</div>
        </div>
      `).join("")}
    </div>
  `;
}

if (terrorBox) {
  terrorBox.innerHTML = `
    <h2 class="category-title">👻 Terror</h2>
    <div class="row">
      ${grouped.terror.map(p => `
        <div class="card" onclick='openMovie(${JSON.stringify(p)})'>
          <img src="${p.img}">
          <div class="card-info">${p.title}</div>
        </div>
      `).join("")}
    </div>
  `;
}
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


const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    searchMovies(query);
  });
}

function searchMovies(query) {
  const container = document.getElementById("content");
  if (!container) return;

  if (!query) {
    renderContent(); // si no hay texto, vuelve a mostrar todo
    return;
  }

  const results = peliculas.filter(p =>
    p.title.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query)
  );

  container.innerHTML = "";

  if (results.length === 0) {
    container.innerHTML = `<p style="padding:20px;">No se encontraron resultados</p>`;
    return;
  }

  container.innerHTML = `
    <div class="section">
      <h2>🔎 Resultados</h2>
      <div class="row">
        ${results.map(p => `
          <div class="card" onclick='openMovie(${JSON.stringify(p)})'>
            <img src="${p.img}">
            <div class="card-info">${p.title}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}
/* =========================
   MENU MOVIL (FIX DEFINITIVO)
========================= */

const menuIcon = document.getElementById("menuIcon");
const submenu = document.getElementById("submenu");

if (menuIcon && submenu) {

  menuIcon.addEventListener("click", (e) => {
    e.stopPropagation();

    const isOpen = submenu.classList.toggle("active");

    // icono dinámico
    menuIcon.textContent = isOpen ? "✖" : "☰";
  });

  // cerrar al hacer click fuera
  document.addEventListener("click", (e) => {
    if (!submenu.contains(e.target) && !menuIcon.contains(e.target)) {
      submenu.classList.remove("active");
      menuIcon.textContent = "☰";
    }
  });

  // cerrar al hacer click en un link (mejor UX)
  submenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      submenu.classList.remove("active");
      menuIcon.textContent = "☰";
    });
  });

}