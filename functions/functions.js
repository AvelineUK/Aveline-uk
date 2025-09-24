/* Hiding & Showing Sidebar */

const sidebar = document.querySelector('.sidebar');
const navbar = document.querySelector('.logo-navigation');
const mainContent = document.querySelector('body');
const showSidebar = () => sidebar.classList.add('active');
const hideSidebar = () => sidebar.classList.remove('active');

/* Navbar transition from "wide" to "narrow" */

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

/* IMMEDIATE NAVBAR STATE CHECK - PREVENTS FLASH! */

(function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const navbar = document.querySelector('.logo-navigation');
  if (navbar && window.innerWidth > 1024 && scrollTop > 50) {
    navbar.classList.add('scrolled');
  }
})();

/* Initial fade-in on page load */

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

/* Scroll-triggered Animation */

        const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

/* Dropdown functionality */

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

        document.addEventListener('DOMContentLoaded', function() {
            const dropdowns = document.querySelectorAll('.dropdown');
            
            dropdowns.forEach(dropdown => {
                const header = dropdown.querySelector('.dropdown-header');
                
                header.addEventListener('click', function() {
                    const currentDropdown = this.parentElement;
                    const isCurrentlyActive = currentDropdown.classList.contains('active');
                    
                    // Close all dropdowns
                    dropdowns.forEach(d => d.classList.remove('active'));
                    
                    // If the clicked dropdown wasn't active, open it
                    if (!isCurrentlyActive) {
                        currentDropdown.classList.add('active');
                    }
                });
            });
        });

/* Contact Form functionality */

const form = document.getElementById('contactForm');
const submitBtn = form.querySelector('.submit-btn');

// Form validation
function validateField(field, errorId, validationFn) {
    const value = field.value.trim();
    const errorElement = document.getElementById(errorId);
    const isValid = validationFn(value);
    
    if (isValid) {
        field.classList.remove('error');
        errorElement.classList.remove('show');
    } else {
        field.classList.add('error');
        errorElement.classList.add('show');
    }
    
    return isValid;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.length > 0 && emailRegex.test(email);
}

function validatePhone(phone) {
    if (phone.length === 0) return true; // Optional field
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Real-time validation
form.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('blur', function() {
        const fieldName = this.name;
        
        switch(fieldName) {
            case 'name':
                validateField(this, 'nameError', value => value.length > 0);
                break;
            case 'email':
                validateField(this, 'emailError', validateEmail);
                break;
            case 'subject':
                validateField(this, 'subjectError', value => value.length > 0);
                break;
            case 'message':
                validateField(this, 'messageError', value => value.length > 10);
                break;
        }
    });
    
    // Remove error state when typing
    input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            this.classList.remove('error');
            const errorId = this.name + 'Error';
            document.getElementById(errorId).classList.remove('show');
        }
    });
});