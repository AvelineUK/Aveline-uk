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