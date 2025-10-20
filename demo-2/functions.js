// Gallery data
const galleryProjects = [
    {
        title: "Modern Patio Design",
        image: "images/placeholder1.png",
        description: "A contemporary patio design featuring natural stone paving and integrated LED lighting. This project transformed an unused garden space into a stunning outdoor entertaining area.",
        details: {
            location: "Bristol, BS8",
            duration: "2 weeks",
            services: "Patio Installation, Lighting, Drainage"
        }
    },
    {
        title: "Country Garden Transformation",
        image: "images/placeholder2.png",
        description: "Complete garden redesign for a rural property, incorporating traditional cottage garden planting with modern sustainable practices. Features include wildflower meadow areas and wildlife-friendly habitats.",
        details: {
            location: "Somerset",
            duration: "4 weeks",
            services: "Garden Design, Planting, Landscaping"
        }
    },
    {
        title: "Water Feature Installation",
        image: "images/placeholder3.png",
        description: "Bespoke water feature with natural stone surround and aquatic planting. Creates a tranquil focal point while supporting local wildlife and biodiversity.",
        details: {
            location: "Bath, BA1",
            duration: "1 week",
            services: "Water Feature, Stonework, Planting"
        }
    },
    {
        title: "Contemporary Decking",
        image: "images/placeholder4.png",
        description: "Multi-level composite decking with glass balustrades and built-in seating. Low maintenance solution that maximizes outdoor living space on a sloped garden.",
        details: {
            location: "Bristol, BS9",
            duration: "3 weeks",
            services: "Decking, Balustrades, Built-in Features"
        }
    },
    {
        title: "Cottage Garden Border",
        image: "images/placeholder5.png",
        description: "Traditional herbaceous border featuring a succession of blooms throughout the seasons. Carefully selected plants provide year-round interest and attract pollinators.",
        details: {
            location: "Wiltshire",
            duration: "1 week",
            services: "Border Design, Planting, Soil Improvement"
        }
    },
    {
        title: "Formal Garden Design",
        image: "images/placeholder6.png",
        description: "Classical formal garden with symmetrical box hedging, topiary features, and a central fountain. Combines historical design principles with modern irrigation technology.",
        details: {
            location: "Bath, BA2",
            duration: "6 weeks",
            services: "Full Garden Design, Hedging, Water Features"
        }
    }
];

function toggleMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('active');
}

function openLightbox(index) {
    const project = galleryProjects[index];
    const lightboxBody = document.getElementById('lightboxBody');
    
    lightboxBody.innerHTML = `
        <div class="lightbox-image" style="background-image: url('${project.image}'); background-size: cover; background-position: center;"></div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="lightbox-details">
            <p><strong>Location:</strong> ${project.details.location}</p>
            <p><strong>Project Duration:</strong> ${project.details.duration}</p>
            <p><strong>Services:</strong> ${project.details.services}</p>
        </div>
    `;
    
    document.getElementById('lightbox').classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

function handleSubmit(e) {
    e.preventDefault();
    alert('Thank you for your enquiry! We\'ll get back to you within 24 hours.');
    e.target.reset();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close mobile menu if open
            document.getElementById('navMenu').classList.remove('active');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const nav = document.querySelector('nav');
    const menu = document.getElementById('navMenu');
    if (!nav.contains(e.target) && menu.classList.contains('active')) {
        menu.classList.remove('active');
    }
});

document.getElementById('hero-video').addEventListener('loadeddata', function() {
    this.classList.add('loaded');
});