// Hiding & Showing Sidebar
const sidebar = document.querySelector('.sidebar');
const navbar = document.querySelector('.logo-navigation');
const mainContent = document.querySelector('body');
const showSidebar = () => sidebar.classList.add('active');
const hideSidebar = () => sidebar.classList.remove('active');

// Navbar transition from "wide" to "narrow"
const setBodyPadding = () => {
  const navbarHeight = navbar.offsetHeight;
  mainContent.style.paddingTop = `${navbarHeight}px`;
};

// Hide sidebar on desktop resize
const handleResize = () => {
  if (window.innerWidth > 1024) {
    hideSidebar();
  }
  setBodyPadding();
  updateNavbarScrollState();
};
window.addEventListener('resize', handleResize);

// Update navbar scroll state
const updateNavbarScrollState = () => {
  if (window.innerWidth > 1024) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    navbar.classList.toggle('scrolled', scrollTop > 50);
  }
};

window.addEventListener('scroll', updateNavbarScrollState);

// Ensure correct navbar state on Home click
const homeLink = document.querySelector('.logo-navigation li:first-child a');
if (homeLink) {
  homeLink.addEventListener('click', () => {
    setTimeout(updateNavbarScrollState, 100);
  });
}

// Hide sidebar when clicking outside
document.addEventListener('click', (event) => {
  if (sidebar.classList.contains('active') && !sidebar.contains(event.target) && !event.target.closest('.menu-button')) {
    hideSidebar();
  }
});

// Menu link behavior
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

// IMMEDIATE NAVBAR STATE CHECK - PREVENTS FLASH!
(function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const navbar = document.querySelector('.logo-navigation');
  if (navbar && window.innerWidth > 1024 && scrollTop > 50) {
    navbar.classList.add('scrolled');
  }
})();

// Initial fade-in on page load
window.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('no-transition');
  updateNavbarScrollState();
  setBodyPadding();
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

// Scroll-triggered Animation
        const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const header = dropdown.querySelector('.dropdown-header');
        
        header.addEventListener('click', function() {
            const currentDropdown = this.parentElement;
            const isCurrentlyActive = currentDropdown.classList.contains('active');

            dropdowns.forEach(d => d.classList.remove('active'));

            if (!isCurrentlyActive) {
                currentDropdown.classList.add('active');
            }
        });
    });
});