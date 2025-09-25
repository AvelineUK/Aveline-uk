// Sidebar functionality    

const hamburger = document.getElementById('hamburger');
const navSidebar = document.getElementById('navSidebar');
const body = document.body;

function toggleMenu() {
    navSidebar.classList.toggle('active');
    body.classList.toggle('nav-open');
}

hamburger.addEventListener('click', toggleMenu);

// Close menu when clicking on nav links

const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navSidebar.classList.remove('active');
        body.classList.remove('nav-open');
    });
});