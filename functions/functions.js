const sidebar = document.querySelector('.sidebar');
const navbar = document.querySelector('.logo-navigation');

function showSidebar() {
    sidebar.classList.add('active');
}

function hideSidebar() {
    sidebar.classList.remove('active');
}

// Hide sidebar on desktop resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
        navbar.style.transform = 'translateY(0)';
    }
})