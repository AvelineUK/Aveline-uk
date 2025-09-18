/* Sidebar functionality */

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
        });

        // Handle scroll behavior for navbar - desktop only
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            // Only apply scroll behavior on desktop (> 768px)
            if (window.innerWidth > 768) {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > 50) { // After scrolling 50px
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                lastScrollTop = scrollTop;
            }
        });

/* Close sidebar when clicking outside of it */

document.addEventListener('click', (event) => {
    // Check if sidebar is open
    if (sidebar.classList.contains('active')) {
        // Check if the click was outside the sidebar and not on the menu button
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnMenuButton = event.target.closest('.menu-button');
        
        // If click is outside sidebar and not on menu button, close sidebar
        if (!isClickInsideSidebar && !isClickOnMenuButton) {
            hideSidebar();
        }
    }
});

/* Close sidebar when clicking navigation links */

sidebar.addEventListener('click', (event) => {
    // If it's a navigation link (not the close button), close the sidebar
    if (event.target.tagName === 'A' && !event.target.closest('li:first-child')) {
        hideSidebar();
    }
});