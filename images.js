// Manoj Jewellers - Official Image Assets & Fast Loader
// Ensures all jewellery photos load instantly and in full HD quality

function applySiteImages() {
  document.querySelectorAll('[data-img]').forEach(el => {
    const key = el.getAttribute('data-img');
    if (!key) return;

    if (el.tagName === 'IMG') {
      if (!el.getAttribute('src') || el.getAttribute('src') === '') {
        el.src = 'images/' + key + '.jpg';
      }
    } else {
      el.style.backgroundImage = 'url("images/' + key + '.jpg")';
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applySiteImages);
} else {
  applySiteImages();
}
