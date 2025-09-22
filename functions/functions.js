const sidebar = document.querySelector('.sidebar');
const navbar = document.querySelector('.logo-navigation');
const mainContent = document.querySelector('body');

const showSidebar = () => sidebar.classList.add('active');
const hideSidebar = () => sidebar.classList.remove('active');

/* Update body padding based on navbar height */
const setBodyPadding = () => {
  const navbarHeight = navbar.offsetHeight;
  mainContent.style.paddingTop = `${navbarHeight}px`;
};

/* Hide sidebar on desktop resize */
const handleResize = () => {
  if (window.innerWidth > 1024) {
    hideSidebar();
  }
  setBodyPadding();
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

/* IMMEDIATE NAVBAR STATE CHECK - PREVENTS FLASH */
// This runs immediately when the script loads, before DOMContentLoaded
(function() {
  // Check scroll position immediately
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const navbar = document.querySelector('.logo-navigation');
  
  if (navbar && window.innerWidth > 1024 && scrollTop > 50) {
    // Add scrolled class immediately if needed
    navbar.classList.add('scrolled');
  }
})();

/* Initial setup on page load */
window.addEventListener('DOMContentLoaded', () => {
  // Add class to temporarily disable transitions
  document.documentElement.classList.add('no-transition');

  // Immediate update without timeout
  updateNavbarScrollState();
  setBodyPadding();
  
  // Re-enable transitions after allowing one frame for rendering
  requestAnimationFrame(() => {
    document.documentElement.classList.remove('no-transition');
  });
});

        window.addEventListener("DOMContentLoaded", () => {
            const hero = document.querySelector(".hero");
            if (hero) {
                requestAnimationFrame(() => {
                    hero.classList.add("fade-in");
                });
            }
        });