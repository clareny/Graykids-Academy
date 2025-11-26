import React from 'react';
import logo from '../assets/images/Graykids Academy Logo.png';
import { useHeader } from '../hooks/useHeader';

const Header = () => {
  const { isMenuOpen, toggleMenu, closeMenu } = useHeader();

  return (
    <>
      <header className="header">
        <div className="header__container container">
          <div className="header__logo">
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none' }}>
              <img src={logo} alt="Graykids Academy Logo" className="header__logo-img" />
              <span className="header__logo-text">GRAYKIDS ACADEMY</span>
            </a>
          </div>
          <button 
            className={`header__toggle ${isMenuOpen ? 'header__toggle--open' : ''}`}
            type="button" 
            aria-expanded={isMenuOpen}
            aria-controls="mainNavigation" 
            aria-label={isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            onClick={toggleMenu}
          >
            <svg className="header__toggle-icon header__toggle-icon--menu" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z"></path>
            </svg>
            <svg className="header__toggle-icon header__toggle-icon--close" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
            </svg>
          </button>
          <div className={`header__menu ${isMenuOpen ? 'header__menu--open' : ''}`} id="mainNavigation">
            <button className="header__menu-close" type="button" aria-label="Cerrar menú" onClick={closeMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
              </svg>
            </button>
            <nav className="header__nav">
              <a href="/cursos" className="header__link" onClick={closeMenu}>
                <span className="header__link-icon" aria-hidden="true">✦</span>
                <span className="header__link-label">Cursos Vip</span>
                <span className="header__link-trail" aria-hidden="true">▹</span>
              </a>
              <a href="/graykids-members" className="header__link" onClick={closeMenu}>
                <span className="header__link-icon" aria-hidden="true">✦</span>
                <span className="header__link-label">Graykids Members</span>
                <span className="header__link-trail" aria-hidden="true">▹</span>
              </a>
              <a href="/discord" className="header__link" onClick={closeMenu}>
                <span className="header__link-icon" aria-hidden="true">✦</span>
                <span className="header__link-label">Discord</span>
                <span className="header__link-trail" aria-hidden="true">▹</span>
              </a>
              <a href="/librerias" className="header__link" onClick={closeMenu}>
                <span className="header__link-icon" aria-hidden="true">✦</span>
                <span className="header__link-label">Librerías</span>
                <span className="header__link-trail" aria-hidden="true">▹</span>
              </a>
              <a href="/contacto" className="header__link" onClick={closeMenu}>
                <span className="header__link-icon" aria-hidden="true">✦</span>
                <span className="header__link-label">Contacto</span>
                <span className="header__link-trail" aria-hidden="true">▹</span>
              </a>
              <a href="#faq" className="header__link" onClick={closeMenu}>
                <span className="header__link-icon" aria-hidden="true">✦</span>
                <span className="header__link-label">FAQ</span>
                <span className="header__link-trail" aria-hidden="true">▹</span>
              </a>
            </nav>
            <span id="headerAuthButton" className="header__auth">
              <a href="/login" className="btn btn--outline">Entrar</a>
            </span>
          </div>
        </div>
        <div className="header__overlay" hidden={!isMenuOpen} onClick={closeMenu}></div>
      </header>
    </>
  );
};

export default Header;

