document.addEventListener('DOMContentLoaded', () => {
    // El botón "Entrar" siempre redirige a Login.html
    // const isLoggedIn = localStorage.getItem('isLoggedIn');
    // const user = localStorage.getItem('user');
    // const headerAuthButton = document.getElementById('headerAuthButton');

    // if (headerAuthButton && isLoggedIn && user) {
    //     headerAuthButton.innerHTML = '<a href="campus.html" class="btn btn--primary">Mi Campus</a>';
    // }

    const headerToggle = document.querySelector('.header__toggle');
    const headerMenu = document.querySelector('.header__menu');
    const headerOverlay = document.querySelector('.header__overlay');
    const body = document.body;

    if (!(headerToggle && headerMenu && headerOverlay)) {
        return;
    }

    const closeMenu = () => {
        headerMenu.classList.remove('header__menu--open');
        headerToggle.classList.remove('header__toggle--open');
        headerToggle.setAttribute('aria-expanded', 'false');
        headerToggle.setAttribute('aria-label', 'Abrir menú de navegación');
        headerOverlay.hidden = true;
        body.classList.remove('no-scroll');
    };

    headerToggle.addEventListener('click', () => {
        const willOpen = !headerMenu.classList.contains('header__menu--open');
        headerMenu.classList.toggle('header__menu--open', willOpen);
        headerToggle.classList.toggle('header__toggle--open', willOpen);
        headerToggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        headerToggle.setAttribute('aria-label', willOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
        headerOverlay.hidden = !willOpen;
        body.classList.toggle('no-scroll', willOpen);
    });

    headerOverlay.addEventListener('click', closeMenu);

    const headerMenuClose = document.querySelector('.header__menu-close');
    if (headerMenuClose) {
        headerMenuClose.addEventListener('click', closeMenu);
    }

    headerMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && headerMenu.classList.contains('header__menu--open')) {
            closeMenu();
        }
    });

    const mediaQuery = window.matchMedia('(min-width: 769px)');
    const handleViewportChange = event => {
        if (event.matches) {
            closeMenu();
        }
    };

    if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleViewportChange);
    } else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleViewportChange);
    }
});

