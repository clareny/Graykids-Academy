import React from 'react';

const FeaturedCourse = () => {
  return (
    <section className="featured-course">
      <div className="featured-course__container container">
        <div className="featured-course__header">
          <p className="featured-course__badge">Ableton Live</p>
          <h3 className="featured-course__title">De cero a Experto</h3>
          <p className="featured-course__status">¡Ya disponible! 🎹</p>
          <p className="featured-course__subtitle">Aprende a manejar cualquier daw</p>
        </div>
        
        <div className="featured-course__content">
          <div className="featured-course__info">
            <h4 className="featured-course__course-title">Ableton Live</h4>
            <h5 className="featured-course__course-subtitle">De Zero a Experto</h5>
            <p className="featured-course__text">
              <strong>¡¿Necesitas un buen DAW para crear tus producciones?¡ </strong>
              Estas perdido en tanto generos de como se hace?
              <strong>¿Usar ia y desempeñarte en tu daw?</strong>
              <br />Piensas que necesitas años de experiencia para manejarlo<br />
              Nuestro curso de  <strong>Ableton Live de Cero a Experto</strong>
              , vas a aprender a manejarlo de manera natural como si fuera parte de ti 
              el programa. Desde la técnica básica y comandos rapidos hasta la creación de tus propias producciones.
            </p>
            <p className="featured-course__signature">Unete ahora al curso 🎼</p>
            <a href="#contacto" className="btn btn--primary">Unirse</a>
          </div>
          <div className="featured-course__image">
            <div className="featured-course__placeholder">
              <span className="featured-course__icon">🎹</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourse;

