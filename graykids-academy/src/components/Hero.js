import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__container container">
        <h1 className="hero__title">¿Producir es Facil?</h1>
        <div className="hero__content">
          <p className="hero__intro">Cursos Practicos</p>
          <h2 className="hero__subtitle">¡¿Te aburren los video de youtube?</h2>
          <p className="hero__description">
            Graykids Academy te enseñará a convertirte en un profesional completo 
            y capaz de manejarte competitivamente en cualquier escenario. No todo lo puedes encontrar en YouTube porque ahora los creadores de contenido luchan contra el algoritmo, pues solo suben contenido fácil y rápido, aquí no hacemos eso, nos tomamos las cosas en serio, muy en serio...
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

