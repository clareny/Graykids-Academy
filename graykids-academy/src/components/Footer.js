import React from 'react';
import logo from '../assets/images/Graykids Academy Logo.png';

const Footer = () => {
  return (
    <footer id="contacto" className="footer">
      <div className="footer__container container">
        <div className="footer__logo">
          <img src={logo} alt="Graykids Academy Logo" className="footer__logo-img" />
        </div>
        <div className="footer__links">
          <a href="#contacto" className="footer__link">Contact</a>
          <a href="/terminos" className="footer__link">Términos y Condiciones</a>
          <a href="#faq" className="footer__link">FAQ</a>
        </div>
        <p className="footer__copyright">© 2025 Graykids Academy</p>
      </div>
    </footer>
  );
};

export default Footer;

