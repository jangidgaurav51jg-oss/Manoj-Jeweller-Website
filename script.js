// Manoj Jewellers - Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mainNav = document.querySelector('.main-nav');

  if (mobileBtn && mainNav) {
    mobileBtn.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });

    // Close menu when clicking any nav link
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !mobileBtn.contains(e.target)) {
        mainNav.classList.remove('active');
      }
    });
  }

  // Active navigation link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Image Lightbox for Gallery & Jewellery Cards
  const lightboxModal = document.createElement('div');
  lightboxModal.className = 'lightbox-modal';
  lightboxModal.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Close">&times;</button>
      <img src="" alt="Enlarged Jewellery View" class="lightbox-img">
      <div class="lightbox-caption"></div>
    </div>
  `;
  document.body.appendChild(lightboxModal);

  const lightboxImg = lightboxModal.querySelector('.lightbox-img');
  const lightboxCaption = lightboxModal.querySelector('.lightbox-caption');
  const lightboxClose = lightboxModal.querySelector('.lightbox-close');

  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '';
    lightboxModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // Gallery items trigger lightbox
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const tag = item.querySelector('.gallery-tag');
      if (img) openLightbox(img.src, tag ? tag.textContent : img.alt);
    });
  });

  // Product cards & Hero images trigger lightbox on click
  document.querySelectorAll('.necklace-design-card > img, .necklace-hero-image img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.title = 'Click to zoom in';
    img.addEventListener('click', () => {
      const card = img.closest('.necklace-design-card');
      const title = card ? card.querySelector('h3')?.textContent : img.alt;
      openLightbox(img.src, title || img.alt);
    });
  });
});

// Handle Contact Form Submit -> WhatsApp
function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const message = document.getElementById('custMsg').value.trim();

  let waText = `*Namaste Manoj Jewellers!*%0A%0A`;
  waText += `*Naya Sandesh (Website Enquiry):*%0A`;
  waText += `👤 *Naam:* ${encodeURIComponent(name)}%0A`;
  waText += `📞 *Phone:* ${encodeURIComponent(phone)}%0A`;
  waText += `💬 *Sandesh:* ${encodeURIComponent(message)}%0A%0A`;
  waText += `_Manoj Jewellers, Jaipur website enquiry._`;

  const waUrl = `https://wa.me/919079093411?text=${waText}`;
  window.open(waUrl, '_blank');
}
