// Sidebar functionality
const sidebar = document.querySelector(".sidebar");
const navbar = document.querySelector(".logo-navigation");
const mainContent = document.querySelector("body");

const showSidebar = () => sidebar.classList.add("active");
const hideSidebar = () => sidebar.classList.remove("active");

const menuButton = document.querySelector(".menu-button");
menuButton && menuButton.addEventListener("click", showSidebar);

const closeButton = document.querySelector(".sidebar li:first-child");
closeButton && closeButton.addEventListener("click", hideSidebar);

// Body padding adjustment
const setBodyPadding = () => {
    const navbarHeight = navbar.offsetHeight;
    mainContent.style.paddingTop = `${navbarHeight}px`;
};

// Handle window resize
const handleResize = () => {
    if (window.innerWidth > 1024) {
        hideSidebar();
    }
    setBodyPadding();
    updateNavbarScrollState();
};

window.addEventListener("resize", handleResize);

// Navbar scroll state
const updateNavbarScrollState = () => {
    if (window.innerWidth > 1024) {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        navbar.classList.toggle("scrolled", scrollPosition > 50);
    }
};

window.addEventListener("scroll", updateNavbarScrollState);

// Home link handler
const homeLink = document.querySelector(".logo-navigation li:first-child a");
homeLink && homeLink.addEventListener("click", (() => {
    setTimeout(updateNavbarScrollState, 100);
}));

// Click outside sidebar to close
document.addEventListener("click", (e => {
    if (!sidebar.classList.contains("active")) return;
    if (sidebar.contains(e.target)) return;
    if (e.target.closest(".menu-button")) return;
    hideSidebar();
}));

// Handle anchor link clicks
document.addEventListener("click", (e => {
    const link = e.target.closest('a[href="#"]');
    if (!link) return;
    
    e.preventDefault();
    if (link.closest(".menu-button")) {
        showSidebar();
    } else if (link.closest(".sidebar")) {
        hideSidebar();
    }
}), true);

// Initial navbar state check
(function() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const nav = document.querySelector(".logo-navigation");
    if (nav && window.innerWidth > 1024 && scrollPosition > 50) {
        nav.classList.add("scrolled");
    }
})();

// DOMContentLoaded initialization
window.addEventListener("DOMContentLoaded", (() => {
    document.documentElement.classList.add("no-transition");
    updateNavbarScrollState();
    setBodyPadding();
    requestAnimationFrame((() => {
        document.documentElement.classList.remove("no-transition");
    }));
}));

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries => {
    entries.forEach((entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    }));
}));

document.querySelectorAll(".fade-in").forEach((element => {
    observer.observe(element);
}));

// Dropdown functionality with dynamic height
document.addEventListener("DOMContentLoaded", (function() {
    const dropdowns = document.querySelectorAll(".dropdown");
    
    dropdowns.forEach((dropdown => {
        const content = dropdown.querySelector(".dropdown-content");
        const header = dropdown.querySelector(".dropdown-header");
        
        header.addEventListener("click", (function() {
            const isActive = dropdown.classList.contains("active");
            
            // Close all dropdowns
            dropdowns.forEach((d => {
                const c = d.querySelector(".dropdown-content");
                d.classList.remove("active");
                c.style.maxHeight = "0";
            }));
            
            // If this wasn't active, open it
            if (!isActive) {
                dropdown.classList.add("active");
                content.style.maxHeight = content.scrollHeight + "px";
            }
        }));
    }));
}));
