// ============================================
// ANIMACIONES Y EFECTOS INTERACTIVOS
// ============================================

// 1. ANIMACIÓN AL HACER SCROLL
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

// Aplicar animación a elementos
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.course-card, .testimonial, .library-card, .faq__item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 2. HEADER CON EFECTO DE BLUR AL HACER SCROLL
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(57, 243, 212, 0.1)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// 3. EFECTO PARALLAX SUAVE EN HERO
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero == hero) {
        const speed = scrolled * 0.10;
        hero.style.transform = `translateY(${speed}px)`;
    }
});

// 4. EFECTO DE PARTÍCULAS FLOTANTES
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 6 + 3; // Tamaño entre 3 y 9px
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(57, 243, 212, 0.8);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            box-shadow: 0 0 10px rgba(57, 243, 212, 0.8), 0 0 20px rgba(57, 243, 212, 0.4);
            animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
            animation-delay: ${Math.random() * 2}s;
            z-index: 10;
        `;
        hero.appendChild(particle);
    }
}

// Animación CSS para las partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) translateX(50px);
            opacity: 0;
        }
    }

    /* Animación de pulso para botones */
    @keyframes pulse {
        0%, 100% {
            box-shadow: 0 0 0 0 rgba(57, 243, 212, 0.4);
        }
        50% {
            box-shadow: 0 0 0 20px rgba(57, 243, 212, 0);
        }
    }

    .btn--primary:hover {
        animation: pulse 2s infinite;
    }

    /* Rotación sutil para iconos */
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    /* Efecto de brillo */
    @keyframes shine {
        0% {
            background-position: -200% center;
        }
        100% {
            background-position: 200% center;
        }
    }
`;
document.head.appendChild(style);

// 5. EFECTO DE MOUSE TRACKER - DESACTIVADO
// (Cursor personalizado removido por solicitud del usuario)

// 6. CONTADOR ANIMADO PARA ESTADÍSTICAS
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// 7. EFECTO DE TYPING PARA EL HERO
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 8. SMOOTH SCROLL PARA ANCLA DE ENLACES
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// 9. EFECTO DE HOVER EN CARDS CON 3D
document.querySelectorAll('.course-card, .library-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// 10. LAZY LOADING PARA IMÁGENES
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// 11. EFECTO DE ONDAS AL HACER CLIC EN BOTONES
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(57, 243, 212, 0.5);
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Añadir efecto ripple a todos los botones
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', createRipple);
});

// Agregar animación ripple al CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// 12. INICIALIZAR TODO
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    console.log('✨ Animaciones activadas - Graykids Academy');
});
