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

if (hamburger && navSidebar) {
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
}

// Scroll-triggered fade-in
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

document.querySelectorAll('.fade-in1').forEach(el => {
    observer.observe(el);
});
document.querySelectorAll('.fade-in2').forEach(el => {
    observer.observe(el);
});

// Lightbox functionality
class MasonryLightbox {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = document.getElementById('lightbox-img');
        this.lightboxTitle = document.getElementById('lightbox-title');
        this.lightboxDescription = document.getElementById('lightbox-description');
        this.lightboxClose = document.getElementById('lightbox-close');
        this.lightboxPrev = document.getElementById('lightbox-prev');
        this.lightboxNext = document.getElementById('lightbox-next');
        
        this.galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
        this.currentIndex = 0;
        
        // Only initialize if all elements exist
        if (this.lightbox && this.lightboxImg && this.lightboxClose && 
            this.lightboxPrev && this.lightboxNext && this.galleryItems.length > 0) {
            this.init();
        }
    }
    
    init() {
        // Add click listeners to gallery items
        this.galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.openLightbox(index);
            });
        });
        
        // Lightbox controls
        this.lightboxClose.addEventListener('click', () => this.closeLightbox());
        this.lightboxPrev.addEventListener('click', () => this.prevImage());
        this.lightboxNext.addEventListener('click', () => this.nextImage());
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (this.lightbox.classList.contains('active')) {
                switch(e.key) {
                    case 'Escape':
                        this.closeLightbox();
                        break;
                    case 'ArrowLeft':
                        this.prevImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            }
        });
        
        // Click outside to close
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });
    }
    
    openLightbox(index) {
        this.currentIndex = index;
        const item = this.galleryItems[index];
        const imgSrc = item.dataset.src;
        
        // Get title and description from the gallery item
        const title = item.querySelector('.gallery-overlay h3')?.textContent || '';
        const description = item.querySelector('.gallery-overlay p')?.textContent || '';
        
        this.lightboxImg.src = imgSrc;
        this.lightboxTitle.textContent = title;
        this.lightboxDescription.textContent = description;
        
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset image src after animation
        setTimeout(() => {
            this.lightboxImg.src = '';
            this.lightboxTitle.textContent = '';
            this.lightboxDescription.textContent = '';
        }, 300);
    }
    
    prevImage() {
        this.currentIndex = this.currentIndex === 0 ? this.galleryItems.length - 1 : this.currentIndex - 1;
        this.updateImage();
    }
    
    nextImage() {
        this.currentIndex = this.currentIndex === this.galleryItems.length - 1 ? 0 : this.currentIndex + 1;
        this.updateImage();
    }
    
    updateImage() {
        const item = this.galleryItems[this.currentIndex];
        const imgSrc = item.dataset.src;
        const title = item.querySelector('.gallery-overlay h3')?.textContent || '';
        const description = item.querySelector('.gallery-overlay p')?.textContent || '';
        
        // Fade out
        this.lightboxImg.style.opacity = '0';
        
        setTimeout(() => {
            this.lightboxImg.src = imgSrc;
            this.lightboxTitle.textContent = title;
            this.lightboxDescription.textContent = description;
            
            // Fade in
            this.lightboxImg.style.opacity = '1';
        }, 150);
    }
}

// Initialize lightbox when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MasonryLightbox();
});

/* Testimonial functionality */
const testimonials = document.querySelectorAll('.testimonial-item');

if (testimonials.length > 0) {
    let currentTestimonial = 0;
    const testimonialInterval = 5000; // 5 seconds

    function rotateTestimonials() {
        testimonials[currentTestimonial].classList.remove('active');
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].classList.add('active');
    }

    setInterval(rotateTestimonials, testimonialInterval);
}

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    
    if (contactForm && thankYouMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Hide the form
            contactForm.style.display = 'none';
            
            // Show the thank you message
            thankYouMessage.style.display = 'block';
        });
    }
});