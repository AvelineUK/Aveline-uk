const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page-content');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
let currentPage = 'home';

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
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
        
        // Slide out current page
        currentPageEl.classList.remove('active');
        currentPageEl.classList.add('slide-out-left');
        
        // Prepare target page
        targetPageEl.classList.add('slide-in-right');
        
        // Small delay to ensure classes are applied
        setTimeout(() => {
            // Slide in target page
            targetPageEl.classList.remove('slide-in-right');
            targetPageEl.classList.add('active');
            
            // Clean up after transition
            setTimeout(() => {
                currentPageEl.classList.remove('slide-out-left');
            }, 500);
        }, 10);
        
        currentPage = targetId;
        
        // Update URL - use page path instead of hash to avoid auto-scroll
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
    alert('Thank you for your enquiry. A member of our team will be in touch within one business day.');
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