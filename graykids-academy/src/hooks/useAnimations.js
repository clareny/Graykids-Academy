import { useEffect } from 'react';

export const useAnimations = () => {
  useEffect(() => {
    // Animación al hacer scroll
    const observerOptions = {
      threshold: 0.001,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.course-card, .testimonial, .library-card, .faq__item');
    
    animateElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    // Header con efecto de blur al hacer scroll
    const header = document.querySelector('.header');

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      
      if (header) {
        if (currentScroll > 100) {
          header.style.background = 'rgba(10, 10, 10, 0.98)';
          header.style.boxShadow = '0 4px 20px rgba(57, 243, 212, 0.1)';
        } else {
          header.style.background = 'rgba(10, 10, 10, 0.95)';
          header.style.boxShadow = 'none';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Smooth scroll para anclas
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
      observer.disconnect();
    };
  }, []);
};

