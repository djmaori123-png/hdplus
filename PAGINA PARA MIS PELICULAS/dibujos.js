window.addEventListener('load', () => {
  console.log("JS cargado correctamente");

  setTimeout(() => {
    const loader = document.getElementById('loader');

    if (loader) {
      loader.style.display = 'none';
      console.log("Loader ocultado");
    } else {
      console.log("No se encontró loader");
    }

  }, 1500);
});

/* MODAL */
function openMovie(data) {
  document.getElementById('movieModal').style.display = 'flex';
  document.getElementById('movieTitle').textContent = data.title;
  document.getElementById('movieImg').src = data.img;
  document.getElementById('moviePlayer').src = data.video;
}

function closeMovie() {
  document.getElementById('movieModal').style.display = 'none';
  document.getElementById('moviePlayer').src = '';
}
const menuIcon = document.getElementById("menuIcon");
const submenu = document.getElementById("submenu");
const searchInput = document.getElementById('search');

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const value = searchInput.value.trim().toLowerCase();
    document.querySelectorAll('.card').forEach(card => {
      const titleEl = card.querySelector('.card-title');
      const title = titleEl ? titleEl.textContent.toLowerCase() : card.innerText.toLowerCase();
      card.style.display = title.includes(value) ? '' : 'none';
    });
  });
}

menuIcon.addEventListener("click", () => {
submenu.classList.toggle("active");
});