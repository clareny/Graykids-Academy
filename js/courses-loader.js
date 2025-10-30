// ========================================
// CARGADOR DINÁMICO DE CURSOS
// ========================================
// Este script carga los cursos dinámicamente desde localStorage
// para que los cambios del admin se reflejen automáticamente

// Obtener información de cursos guardados
function getCoursesInfo() {
    return JSON.parse(localStorage.getItem('coursesInfo') || '{}');
}

// Información por defecto si no hay datos guardados
const defaultCoursesInfo = {
    'curso-voces': {
        name: 'Mezcla y Grabación de Voces',
        description: 'Nivel Avanzado. Aprende técnicas profesionales para grabar y mezclar voces como los grandes productores. Domina el proceso completo desde la grabación hasta la mezcla final con estándares de la industria.',
        level: 'Avanzado',
        price: 99.99,
        icon: '🎤',
        videos: '60+',
        hours: '12+ Horas',
        status: 'available',
        presentationVideoUrl: 'https://www.youtube.com/watch?v=ysz5S6PUM-U'
    },
    'curso-maquetizacion': {
        name: 'Maquetización Composicional',
        description: 'Nivel Intermedio. Domina el arte de estructurar y organizar tus composiciones musicales. Aprende a crear arreglos profesionales y maquetas que conecten con tu audiencia desde el primer segundo.',
        level: 'Intermedio',
        price: 89.99,
        icon: '🎹',
        videos: '50+',
        hours: '10+ Horas',
        status: 'coming-soon',
        presentationVideoUrl: 'https://www.youtube.com/watch?v=Vx2xTI4_7oA'
    },
    'curso-beats': {
        name: 'Programación de Beats',
        description: 'Nivel Intermedio. Aprende a programar beats profesionales desde cero. Domina la creación de ritmos, patrones de batería y técnicas avanzadas de programación que harán que tus producciones destaquen.',
        level: 'Intermedio',
        price: 79.99,
        icon: '🎛️',
        videos: '55+',
        hours: '11+ Horas',
        status: 'coming-soon',
        presentationVideoUrl: 'https://www.youtube.com/watch?v=4TnQq0FJ4sI'
    }
};

// Obtener información de un curso específico
function getCourseInfo(courseId) {
    const coursesInfo = getCoursesInfo();
    return coursesInfo[courseId] || defaultCoursesInfo[courseId] || null;
}

// Renderizar curso en formato course-item (cursos.html)
function renderCourseItem(courseId, container) {
    const course = getCourseInfo(courseId);
    if (!course) return;
    
    // Determinar estado del curso
    const courseStatus = course.status || (courseId === 'curso-voces' ? 'available' : 'coming-soon');
    const isAvailable = courseStatus === 'available' || courseStatus === 'pre-sale';
    const detailLink = `curso-preview.html?course=${encodeURIComponent(courseId)}`;
    const badgeClass = course.level === 'Avanzado' ? '' : course.level === 'Intermedio' ? 'new' : 'popular';
    
    // Determinar texto y estilo del precio/estado
    let priceHtml = '';
    if (courseStatus === 'available') {
        priceHtml = `<span class="course-item__price">$${course.price ? course.price.toFixed(2) : '0.00'}</span>
                     <a href="checkout.html?type=course&id=${courseId}" class="btn btn--primary">Comprar Curso</a>`;
    } else if (courseStatus === 'pre-sale') {
        priceHtml = `<span class="course-item__price" style="color: #ff9800; font-weight: 700;">💰 Pre-Venta: $${course.price ? course.price.toFixed(2) : '0.00'}</span>
                     <a href="checkout.html?type=course&id=${courseId}" class="btn btn--primary" style="background: linear-gradient(135deg, #ff9800 0%, #ff6b00 100%);">Comprar en Pre-Venta</a>`;
    } else {
        priceHtml = `<span class="course-item__price" style="opacity: 0.6;">Próximamente</span>
                     <span class="btn btn--primary" style="opacity: 0.6; cursor: not-allowed; pointer-events: none;">Próximamente</span>`;
    }
    const detailsButton = `<a href="${detailLink}" class="btn btn--outline">Ver presentación</a>`;
    
    const courseHTML = `
        <article class="course-item" data-course-id="${courseId}">
            <div class="course-item__image">
                <div class="course-item__placeholder">
                    <span class="course-item__icon">${course.icon || '🎓'}</span>
                </div>
                <div class="course-item__badge ${badgeClass}">${course.level || 'Intermedio'}</div>
            </div>
            <div class="course-item__content">
                <h3 class="course-item__title">${course.name}</h3>
                <p class="course-item__description">${course.description}</p>
                <div class="course-item__info">
                    <div class="course-item__stat">
                        <span class="course-item__stat-icon">🎥</span>
                        <span class="course-item__stat-text">${course.videos || '0+'} Videos</span>
                    </div>
                    <div class="course-item__stat">
                        <span class="course-item__stat-icon">⏱️</span>
                        <span class="course-item__stat-text">${course.hours || '0+ Horas'}</span>
                    </div>
                    <div class="course-item__stat">
                        <span class="course-item__stat-icon">📜</span>
                        <span class="course-item__stat-text">Certificado</span>
                    </div>
                </div>
                <div class="course-item__footer">
                    ${priceHtml}
                    ${detailsButton}
                </div>
            </div>
        </article>
    `;
    
    container.innerHTML += courseHTML;
}

// Renderizar curso en formato course-card (index.html)
function renderCourseCard(courseId, container) {
    const course = getCourseInfo(courseId);
    if (!course) return;
    
    const isAvailable = course.status === 'available' || course.status === undefined;
    const detailLink = `curso-preview.html?course=${encodeURIComponent(courseId)}`;
    
    const cardHTML = `
        <article class="course-card" data-course-id="${courseId}">
            <div class="course-card__image">
                <div class="course-card__placeholder">
                    <span class="course-card__icon">${course.icon || '🎓'}</span>
                </div>
            </div>
            <div class="course-card__content">
                <h4 class="course-card__title">${course.name}</h4>
                <p class="course-card__description">${course.description}</p>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <a href="${detailLink}" class="btn btn--secondary">Ver presentación</a>
                    ${isAvailable 
                        ? `<a href="checkout.html?type=course&id=${courseId}" class="btn btn--outline">Comprar</a>`
                        : `<span class="btn btn--outline" style="opacity: 0.6; cursor: not-allowed;">Próximamente</span>`
                    }
                </div>
            </div>
        </article>
    `;
    
    container.innerHTML += cardHTML;
}

// Cargar todos los cursos disponibles
function loadAllCourses(containerId, renderFunction = renderCourseItem, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = ''; // Limpiar contenido
    
    const { onlyAvailable = false } = options || {};

    const coursesInfo = getCoursesInfo();
    const deletedCourses = JSON.parse(localStorage.getItem('deletedCourses') || '[]');
    
    // Combinar cursos por defecto con cursos nuevos guardados
    const allCourseIds = new Set([
        ...Object.keys(defaultCoursesInfo),
        ...Object.keys(coursesInfo)
    ]);
    
    // Filtrar cursos eliminados
    const activeCourseIds = Array.from(allCourseIds).filter(id => !deletedCourses.includes(id));
    
    // Ordenar: primero los default, luego los nuevos
    const defaultIds = Object.keys(defaultCoursesInfo);
    const newIds = activeCourseIds.filter(id => !defaultIds.includes(id));
    const sortedIds = [...defaultIds.filter(id => !deletedCourses.includes(id)), ...newIds];

    const filteredIds = onlyAvailable
        ? sortedIds.filter(courseId => {
            const course = getCourseInfo(courseId);
            const status = (course && course.status) || (courseId === 'curso-voces' ? 'available' : 'coming-soon');
            return status === 'available' || status === 'pre-sale';
        })
        : sortedIds;
    
    filteredIds.forEach(courseId => {
        const course = getCourseInfo(courseId);
        // Solo renderizar si el curso tiene información válida
        if (course && course.name) {
            renderFunction(courseId, container);
        }
    });
    
    const showNoCoursesMessage = filteredIds.length === 0;

    // Si no hay cursos, mostrar mensaje
    if (showNoCoursesMessage) {
        const message = onlyAvailable
            ? 'No hay cursos disponibles en este momento. Muy pronto anunciaremos nuevas fechas.'
            : 'No hay cursos disponibles. El administrador agregará cursos próximamente.';

        container.innerHTML = `<p style="color: var(--text-secondary); text-align: center; padding: 40px; font-size: 1.1rem;">${message}</p>`;
    }
}

