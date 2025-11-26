import React from 'react';

const Membership = () => {
  return (
    <section id="membresia" className="membership">
      <div className="membership__container container">
        <div className="membership__content">
          <h3 className="membership__title">Se miembro del club en Graykids Members</h3>
          <p className="membership__description">
            Esta seccion dispondras en que categoria quieres desarrolarte, 
            en donde pondremos a tu disposición las herramientas y recursos necesarios 
            para potenciar tus habilidades y conocimientos para crear y desarrollar 
            tus proyectos musicales.
          </p>
          <p className="membership__description">
            Con la suscripción a Graykids Members, tendrás acceso a tutoriales exclusivos, cursos exclusivos de Graykids Members*, contenido y recursos exclusivos, descuentos en cursos premium*, packs y mucho más...
          </p>
          <a href="/graykids-members" className="btn btn--primary">Más Info</a>
        </div>
      </div>
    </section>
  );
};

export default Membership;

