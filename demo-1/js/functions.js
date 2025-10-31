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
}, {
    threshold: 0.1 // % trigger of element visibility
});

// Observe all animation elements
document.querySelectorAll('.fade-in1').forEach(el => {
    observer.observe(el);
});

document.querySelectorAll('.slide-left').forEach(el => {
    observer.observe(el);
});

document.querySelectorAll('.slide-right').forEach(el => {
    observer.observe(el);
});

// Lightbox functionality
class MasonryLightbox {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = document.getElementById('lightbox-img');
        this.lightboxTitle = document.getElementById('lightbox-title');
        this.lightboxDescription = document.getElementById('lightbox-description');
        this.lightboxInfo = document.querySelector('.lightbox-info');
        this.lightboxClose = document.getElementById('lightbox-close');
        this.lightboxPrev = document.getElementById('lightbox-prev');
        this.lightboxNext = document.getElementById('lightbox-next');
        
        this.galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
        this.currentIndex = 0;
        
        // Touch swipe variables
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.touchCurrentX = 0;
        this.minSwipeDistance = 50;
        this.isSwiping = false;
        
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
        
        // Touch swipe events
        this.lightbox.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
            this.isSwiping = true;
            this.lightboxImg.style.transition = 'none';
            this.lightboxInfo.style.transition = 'none';
        }, { passive: true });
        
        this.lightbox.addEventListener('touchmove', (e) => {
            if (!this.isSwiping) return;
            this.touchCurrentX = e.changedTouches[0].screenX;
            const diff = this.touchCurrentX - this.touchStartX;
            
            // Move the image and info box with the finger
            this.lightboxImg.style.transform = `translateX(${diff}px)`;
            this.lightboxImg.style.opacity = 1 - Math.abs(diff) / 400;
            this.lightboxInfo.style.transform = `translateX(${diff}px)`;
            this.lightboxInfo.style.opacity = 1 - Math.abs(diff) / 400;
        }, { passive: true });
        
        this.lightbox.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.isSwiping = false;
            this.handleSwipe();
        }, { passive: true });
        
        // Click outside to close
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });
    }
    
    handleSwipe() {
        const swipeDistance = this.touchEndX - this.touchStartX;
        
        // Swipe left (next image)
        if (swipeDistance < -this.minSwipeDistance) {
            this.slideToImage('next');
        }
        // Swipe right (previous image)
        else if (swipeDistance > this.minSwipeDistance) {
            this.slideToImage('prev');
        }
        // Not enough swipe distance - snap back
        else {
            this.lightboxImg.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            this.lightboxImg.style.transform = 'translateX(0)';
            this.lightboxImg.style.opacity = '1';
            this.lightboxInfo.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            this.lightboxInfo.style.transform = 'translateX(0)';
            this.lightboxInfo.style.opacity = '1';
        }
    }
    
    slideToImage(direction) {
        const slideDistance = direction === 'next' ? -window.innerWidth : window.innerWidth;
        
        // Slide current image and info out
        this.lightboxImg.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        this.lightboxImg.style.transform = `translateX(${slideDistance}px)`;
        this.lightboxImg.style.opacity = '0';
        this.lightboxInfo.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        this.lightboxInfo.style.transform = `translateX(${slideDistance}px)`;
        this.lightboxInfo.style.opacity = '0';
        
        // Update index
        if (direction === 'next') {
            this.currentIndex = this.currentIndex === this.galleryItems.length - 1 ? 0 : this.currentIndex + 1;
        } else {
            this.currentIndex = this.currentIndex === 0 ? this.galleryItems.length - 1 : this.currentIndex - 1;
        }
        
        // Get new image data
        const item = this.galleryItems[this.currentIndex];
        const imgSrc = item.dataset.src;
        const title = item.querySelector('.gallery-overlay h3')?.textContent || '';
        const description = item.querySelector('.gallery-overlay p')?.textContent || '';
        
        // After slide out animation, load new image from opposite side
        setTimeout(() => {
            this.lightboxImg.src = imgSrc;
            this.lightboxTitle.textContent = title;
            this.lightboxDescription.textContent = description;
            
            // Position new image and info on opposite side
            this.lightboxImg.style.transition = 'none';
            this.lightboxImg.style.transform = `translateX(${-slideDistance}px)`;
            this.lightboxImg.style.opacity = '0';
            this.lightboxInfo.style.transition = 'none';
            this.lightboxInfo.style.transform = `translateX(${-slideDistance}px)`;
            this.lightboxInfo.style.opacity = '0';
            
            // Slide new image and info in
            setTimeout(() => {
                this.lightboxImg.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                this.lightboxImg.style.transform = 'translateX(0)';
                this.lightboxImg.style.opacity = '1';
                this.lightboxInfo.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                this.lightboxInfo.style.transform = 'translateX(0)';
                this.lightboxInfo.style.opacity = '1';
            }, 50);
        }, 300);
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

// Testimonial functionality
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

function handleGoogleReviews(e) {
    e.preventDefault();
    alert('If this were a live site, clicking this would take you to your online booking page');
}