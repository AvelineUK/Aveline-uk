// Sidebar functionality    

const hamburger = document.getElementById('hamburger');
const navSidebar = document.getElementById('navSidebar');
const body = document.body;

function toggleMenu() {
    navSidebar.classList.toggle('active');
    body.classList.toggle('nav-open');
}

function closeMenu() {
    navSidebar.classList.remove('active');
    body.classList.remove('nav-open');
}

hamburger.addEventListener('click', toggleMenu);

// Close menu when clicking on nav links
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Hide sidebar when clicking outside
document.addEventListener('click', (event) => {
    if (navSidebar.classList.contains('active') && !navSidebar.contains(event.target) && !event.target.closest('#hamburger')) {
        closeMenu();
    }
});

// Close menu when pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && navSidebar.classList.contains('active')) {
        closeMenu();
    }
});

/* Scroll-triggered fade-in */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

// Observe both fade-in1 and fade-in2 elements with the same observer
document.querySelectorAll('.fade-in1').forEach(el => {
    observer.observe(el);
});
document.querySelectorAll('.fade-in2').forEach(el => {
    observer.observe(el);
});