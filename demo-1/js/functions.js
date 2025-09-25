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

// Smooth transition parallax effect

let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Get all parallax layers
    const layer1 = document.getElementById('layer1');
    const layer2 = document.getElementById('layer2');
    const layer3 = document.getElementById('layer3');
    
    // No transform movement - let CSS background-attachment handle parallax
    
    // Transitions every 1 screen heights
    if (scrolled < windowHeight * 1) {
        const fadePoint = scrolled / (windowHeight * 1);
        if (layer1) layer1.style.opacity = 1 - fadePoint;
        if (layer2) layer2.style.opacity = fadePoint;
        if (layer3) layer3.style.opacity = 0;
    } else if (scrolled < windowHeight * 2) {
        const fadePoint = (scrolled - windowHeight * 1) / (windowHeight * 1);
        if (layer1) layer1.style.opacity = 0;
        if (layer2) layer2.style.opacity = 1 - fadePoint;
        if (layer3) layer3.style.opacity = fadePoint;
    } else {
        if (layer1) layer1.style.opacity = 0;
        if (layer2) layer2.style.opacity = 0;
        if (layer3) layer3.style.opacity = 1;
    }
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

