const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page-content');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
let currentPage = 'home';

// Define page order
const pageOrder = ['home', 'services', 'about', 'contact'];

// Mobile menu toggle
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    mainNav.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mainNav.classList.contains('active') && 
        !mainNav.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        mainNav.classList.remove('active');
    }
});

// Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href').substring(1);
        
        if (targetId === currentPage) {
            mainNav.classList.remove('active');
            return;
        }
        
        // Close mobile menu
        mainNav.classList.remove('active');
        
        // Update active nav link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Get current and target pages
        const currentPageEl = document.getElementById(currentPage);
        const targetPageEl = document.getElementById(targetId);
        
        // Determine direction based on page order
        const currentIndex = pageOrder.indexOf(currentPage);
        const targetIndex = pageOrder.indexOf(targetId);
        const goingRight = targetIndex > currentIndex;
        
        // Slide out current page
        currentPageEl.classList.remove('active');
        currentPageEl.classList.add(goingRight ? 'slide-out-left' : 'slide-out-right');
        
        // Prepare target page
        targetPageEl.classList.add(goingRight ? 'slide-in-right' : 'slide-in-left');
        
        // Small delay to ensure classes are applied
        setTimeout(() => {
            // Slide in target page
            targetPageEl.classList.remove(goingRight ? 'slide-in-right' : 'slide-in-left');
            targetPageEl.classList.add('active');
            
            // Clean up after transition
            setTimeout(() => {
                currentPageEl.classList.remove('slide-out-left', 'slide-out-right');
            }, 500);
        }, 10);
        
        currentPage = targetId;
        
        // Update URL
        history.pushState({ page: targetId }, '', '?' + targetId);
        
        // Scroll to top immediately
        window.scrollTo(0, 0);
    });
});

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page) {
        const targetLink = document.querySelector(`a[href="#${e.state.page}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }
});

// Initialize first state
history.replaceState({ page: 'home' }, '', window.location.pathname);

// Form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
    
    e.target.reset();
});

// CTA button navigation
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.getAttribute('href') === '#contact') {
            e.preventDefault();
            const contactLink = document.querySelector('a[href="#contact"].nav-link');
            if (contactLink) {
                contactLink.click();
            }
        }
    });
});

// Footer navigation links
document.querySelectorAll('footer a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetNavLink = document.querySelector(`a[href="#${targetId}"].nav-link`);
        if (targetNavLink) {
            targetNavLink.click();
        }
    });
});