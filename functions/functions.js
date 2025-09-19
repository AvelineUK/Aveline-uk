/* Sidebar functionality */

        const sidebar = document.querySelector('.sidebar');
        const navbar = document.querySelector('.logo-navigation');

        function showSidebar() {
            sidebar.classList.add('active');
        }

        function hideSidebar() {
            sidebar.classList.remove('active');
        }

/* Hide sidebar on desktop resize */

        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                sidebar.classList.remove('active');
                navbar.style.transform = 'translateY(0)';
            }
        });

/* Handle scroll behavior for navbar - desktop only */

        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            if (window.innerWidth > 1024) {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                lastScrollTop = scrollTop;
            }
        });

document.addEventListener('click', (event) => {
    if (sidebar.classList.contains('active')) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnMenuButton = event.target.closest('.menu-button');
        if (!isClickInsideSidebar && !isClickOnMenuButton) {
            hideSidebar();
        }
    }
});

document.addEventListener('click', function (e) {
  const a = e.target.closest && e.target.closest('a[href="#"]');
  if (!a) return;
  e.preventDefault();
  if (a.closest('.menu-button')) {
    showSidebar();
    return;
  }

  if (a.closest('.sidebar')) {
    hideSidebar();
    return;
  }
}, true);

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".logo-navigation");
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 50) {
    navbar.classList.add("scrolled");
  }
});

document.documentElement.classList.add("no-transition");

window.addEventListener("load", () => {
  document.documentElement.classList.remove("no-transition");
});

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".logo-navigation");
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop <= 50) {
    navbar.classList.remove("scrolled");
  }
});

// Outer FAQ dropdown

const faqDropdown = document.querySelector('.faq-dropdown');
const faqToggle = faqDropdown.querySelector('.faq-toggle');

faqToggle.addEventListener('click', () => {
  faqDropdown.classList.toggle('active');
});

// Inner accordion questions

const faqItems = faqDropdown.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const btn = item.querySelector('.faq-question');
  btn.addEventListener('click', () => {
    // Close all other items first
    faqItems.forEach(i => {
      if (i !== item) {
        i.classList.remove('active');
      }
    });
    // Toggle the clicked one
    item.classList.toggle('active');
  });
});

function smoothScrollTo(target) {
    window.scrollTo({
        top: target,
        behavior: 'smooth'
    });
}

