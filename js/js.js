    (function() {
        document.documentElement.classList.add('no-transition');
        function setInitialNavbarState() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const navbar = document.querySelector('.logo-navigation');
            if (navbar && window.innerWidth > 1024) {
                if (scrollTop > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        }
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setInitialNavbarState);
        } else {
            setInitialNavbarState();
        }
        window.addEventListener('pageshow', setInitialNavbarState);
    })();