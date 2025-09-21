const sidebar = document.querySelector('.sidebar');
const navbar = document.querySelector('.logo-navigation');

const showSidebar = () => sidebar.classList.add('active');
const hideSidebar = () => sidebar.classList.remove('active');

/* Hide sidebar on desktop resize */
const handleResize = () => {
  if (window.innerWidth > 1024) {
    hideSidebar();
    navbar.style.transform = 'translateY(0)';
  }
};

window.addEventListener('resize', handleResize);

/* Update navbar scroll state */
const updateNavbarScrollState = () => {
  if (window.innerWidth > 1024) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    navbar.classList.toggle('scrolled', scrollTop > 50);
  }
};

window.addEventListener('scroll', updateNavbarScrollState);
window.addEventListener('DOMContentLoaded', updateNavbarScrollState);

/* Ensure correct navbar state on Home click */
const homeLink = document.querySelector('.logo-navigation li:first-child a');
if (homeLink) {
  homeLink.addEventListener('click', () => {
    setTimeout(updateNavbarScrollState, 100);
  });
}

/* Hide sidebar when clicking outside */
document.addEventListener('click', (event) => {
  if (sidebar.classList.contains('active') && !sidebar.contains(event.target) && !event.target.closest('.menu-button')) {
    hideSidebar();
  }
});

/* Menu link behavior */
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href="#"]');
  if (!link) return;
  e.preventDefault();

  if (link.closest('.menu-button')) {
    showSidebar();
  } else if (link.closest('.sidebar')) {
    hideSidebar();
  }
}, true);

/* Page fade overlay logic */
window.addEventListener('load', () => {
  updateNavbarScrollState(); // ✅ ensures correct state on refresh
  document.documentElement.classList.remove('no-transition');

  const overlay = document.getElementById('page-fade-overlay');
  if (!overlay) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    overlay.remove();
    return;
  }

  requestAnimationFrame(() => {
    overlay.classList.add('fade-out');
    overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
  });
});
