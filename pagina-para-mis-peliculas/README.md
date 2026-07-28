# HD PLUS — Sitio estático

Este directorio contiene la versión actualizada del sitio "HD PLUS" con mejoras de accesibilidad, responsive móvil y TV, y datos externos en JSON.

Cómo probar localmente

1. Clona el repo y cambia a la rama fix/mobile-tv-responsive:

   git checkout fix/mobile-tv-responsive

2. Sirve con Python desde la raíz del repo:

   python -m http.server 8000

3. Abre en el navegador:

   http://localhost:8000/pagina-para-mis-peliculas/index.html

Qué cambié (resumen)
- Renombré la carpeta a `pagina-para-mis-peliculas` (sin espacios).
- Extraje los datos a `data/movies.json` y modifiqué `script.js` para cargar via fetch.
- Mejoras de accesibilidad (roles, aria, tabindex, focus management).
- Mejoras responsive: CSS adaptado para móvil y pantallas grandes (TV), soporte D-pad básico.
- Manejo de errores de imagen y placeholder.
- Touch-swipe para el carrusel.

Pruebas manuales recomendadas
- Abrir/ cerrar modal con mouse y teclado (Esc).
- Navegar con arrow keys (izquierda/derecha) para controlar el carrusel.
- En emulación móvil, probar swipe en el carrusel.
- Verificar que las imágenes con error se reemplacen por un placeholder.

Notas
- Los iframes usan URLs externas y podrían bloquearse por X-Frame-Options — en ese caso el botón "Abrir en nueva pestaña" permite ver el video fuera del iframe.
- Si quieres que mueva assets locales o hostee vídeos, dime y lo organizo.
