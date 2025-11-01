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
function createParticles(targetSelectors = ['.hero', '.header']) {
const containers = targetSelectors
        .map(selector => document.querySelector(selector))
        .filter(Boolean);
    if (!containers.length) return;

    containers.forEach(container => {
        if (container.dataset.particlesInitialized === 'true') return;

        const computedPosition = window.getComputedStyle(container).position;
        if (computedPosition === 'static') {
            container.style.position = 'relative';
        }

        const layer = document.createElement('div');
        layer.className = 'particle-layer';
        const isHeader = container.classList.contains('header');

        if (isHeader) {
            layer.style.position = 'fixed';
            layer.style.top = '0';
            layer.style.left = '0';
            layer.style.right = '0';
            layer.style.height = '140px';
            layer.style.pointerEvents = 'none';
            layer.style.zIndex = '1001';
            document.body.appendChild(layer);
        } else {
            container.insertBefore(layer, container.firstChild);
        }

        const particleCount = isHeader ? 18 : 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('span');
            particle.className = 'particle';
            const size = (isHeader ? Math.random() * 3 + 2 : Math.random() * 6 + 3).toFixed(2);
            const floatY = isHeader ? 60 : 120;
            const floatX = isHeader ? 24 : 50;
            const hueShift = isHeader ? 0.65 : 0.8;

            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                background: rgba(57, 243, 212, ${hueShift});
                box-shadow: 0 0 8px rgba(57, 243, 212, ${hueShift}), 0 0 16px rgba(57, 243, 212, 0.35);
                animation: float ${(isHeader ? 2.8 : 3.5 + Math.random() * 3).toFixed(2)}s infinite ease-in-out;
                animation-delay: ${(Math.random() * 2).toFixed(2)}s;
                pointer-events: none;
            `;
            particle.style.setProperty('--floatY', `${floatY}px`);
            particle.style.setProperty('--floatX', `${floatX}px`);

            layer.appendChild(particle);
        }

        container.dataset.particlesInitialized = 'true';
    });
}

// Animación CSS para las partículas
const style = document.createElement('style');
style.textContent = `
    .particle-layer {
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
        mix-blend-mode: screen;
        z-index: 0;
    }

    .particle-layer .particle {
        pointer-events: none;
        mix-blend-mode: screen;
    }

    @keyframes float {
        0% {
            transform: translate(0, 0);
            opacity: 0;
        }
        35% {
            opacity: 1;
        }
        100% {
            transform: translate(var(--floatX, 50px), calc(-1 * var(--floatY, 100px)));
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
/* Animación de "entrar" al acercar el cursor */
// Este código es SCSS/CSS, no JavaScript. 
// Para conectar esta animación "entrar" con el CSS, 
// Agrega estas reglas en tu archivo CSS (por ejemplo en CSS/estilos.css):

/*
.btn {
    transition: transform 0.2s cubic-bezier(0.45,0.05,0.55,0.95), box-shadow 0.2s cubic-bezier(0.45,0.05,0.55,0.95);
    cursor: pointer;
}
.btn:hover,
.btn:focus-visible {
    transform: translateY(-4px) scale(1.04);
    box-shadow: 0 8px 26px rgba(57,243,212,0.25), 0 2px 16px rgba(0,0,0,0.08);
    z-index: 1;
}
*/

// Si quieres hacerlo con JS (NO recomendado para este caso simple), pero así sería:
document.querySelectorAll('.btn').forEach(btn => {
    btn.style.transition = "transform 0.2s cubic-bezier(0.45,0.05,0.55,0.95), box-shadow 0.2s cubic-bezier(0.45,0.05,0.55,0.95)";
    btn.style.cursor = "pointer";
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = "translateY(-4px) scale(1.04)";
        btn.style.boxShadow = "0 8px 26px rgba(57,243,212,0.25), 0 2px 16px rgba(0,0,0,0.08)";
        btn.style.zIndex = "1";
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = "";
        btn.style.boxShadow = "";
        btn.style.zIndex = "";
    });
    btn.addEventListener('focus', () => {
        btn.style.transform = "translateY(-4px) scale(1.04)";
        btn.style.boxShadow = "0 8px 26px rgba(57,243,212,0.25), 0 2px 16px rgba(0,0,0,0.08)";
        btn.style.zIndex = "1";
    });
    btn.addEventListener('blur', () => {
        btn.style.transform = "";
        btn.style.boxShadow = "";
        btn.style.zIndex = "";
    });
});
