// Inject nav into every page
fetch('/components/nav.html')
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML('afterbegin', html);
    initNav();
  });

function initNav() {
  // Scroll effect
  window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('scrolled', scrollY > 40);
  });

  // Hamburger toggle
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!document.getElementById('nav').contains(e.target) &&
        !mobileMenu.contains(e.target)) {
      navToggle.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });

  // Highlight active page
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
    if (link.getAttribute('href') === window.location.pathname ||
        window.location.pathname.startsWith(link.getAttribute('href').replace(/\/$/, ''))) {
      link.style.color = 'var(--blue)';
      link.style.fontWeight = '600';
    }
  });
}