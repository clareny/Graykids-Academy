import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      author: '@yefferzone',
      text: `Inicié en Graykids Academy con el curso para hacer beats y aprendí bastante. Luego entré a Graykids+, donde hay clases en vivo en las que se tocan temas de producción, mezcla, finanzas y todo sobre la industria.

Lo recomiendo porque, además del feedback que se recibe y todo lo que se aprende, también nos rodeamos de gente que sabe y vive cerca de la música. Sin duda, lo mejor que he tenido para mejorar cada día más y más 🔥`
    },
    {
      author: '@alandaniel0001',
      text: `🎤 Empezar como artista emergente no es fácil. Aprendí a mezclar mis voces viendo tutoriales en YouTube, pero cada video era diferente y solo me llenaban de dudas y más dudas.

Cuando me suscribí a Graykids Members luego de ver el contenido que había ahí, no dudé en tomar el curso de beats y seguido por el de mezcla de voces. El tiempo que te ahorras y todo lo que he aprendido es sorprendente. Recomendado al 100%.🔥`
    },
    {
      author: '@alien.flp',
      text: `Mis habilidades como productor e ingeniero de mezcla y mastering han mejorado muchísimo desde que estoy en Graykids+ y tengo los cursos de Mezcla Creativa y Mastering. Salí de dudas que tenía, aprendí cosas nuevas que no vi en la carrera universitaria que estudié.

Y es increíble que se vayan actualizando sin costo adicional. Sin mencionar la comunidad, que es una comunidad que apoya muchísimo tu talento y nos ayudamos mutuamente en cualquier duda. Recomiendo 100% Graykids Academy.`
    }
  ];

  return (
    <section className="testimonials">
      <div className="testimonials__container container">
        <h3 className="testimonials__title">Que dice nuestra comunidad...</h3>
        
        <div className="testimonials__grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial">
              <h4 className="testimonial__author">{testimonial.author}</h4>
              <p className="testimonial__text">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

