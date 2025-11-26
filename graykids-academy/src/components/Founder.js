import React from 'react';
// Note: Si la imagen clareny.png no existe, puedes usar una imagen placeholder
// import clarenyImage from '../assets/images/clareny.png';

const Founder = () => {
  return (
    <section className="founder">
      <div className="founder__container container">
        <div className="founder__content">
          <h2 className="founder__name">Clareny</h2>
          <p className="founder__role">CEO clareny ©</p>
          {/* <img src={clarenyImage} alt="Clareny" className="founder__image" /> */}
          <div className="founder__image" style={{ width: '200px', height: '200px', background: '#333', borderRadius: '50%', margin: '20px auto' }}></div>
          <p className="founder__bio">
            Clareny es un productor musical con muchos años de trayectoria en la industria musical 
            y en la creación de contenido en diferentes plataformas como YouTube, Instagram,tiktok etc.
            Siempre refleja un metodo de enseñanza claro y directo, con un enfoque en la practica y el DAW de manera profesional.

            <br />DSDSDSDSDS<br />
          </p>
          <a href="#contacto" className="btn btn--primary">Más sobre mí</a>
        </div>
      </div>
    </section>
  );
};

export default Founder;

