import React from 'react';

const FAQ = () => {
  const faqs = [
    {
      question: '¿Qué ofrecen los cursos de Graykids Academy?',
      answer: 'Los cursos de Graykids Academy están diseñados para ayudarte a perfeccionar tus habilidades de producción musical, independientemente de tu nivel de experiencia. Ofrecemos cursos en una amplia variedad de temas, desde mezcla y mastering hasta sound design y beatmaking. Nuestros cursos están diseñados para ser prácticos y relevantes, y están impartidos por profesionales experimentados de la industria musical.'
    },
    {
      question: '¿Cómo funcionan los cursos?',
      answer: 'Los cursos de Graykids Academy son completamente en línea, lo que significa que puedes estudiar desde cualquier lugar del mundo en cualquier momento que te resulte conveniente. Los cursos consisten en videos pre-grabados, ejercicios prácticos y tareas para completar. También tendrás la oportunidad de interactuar con tus compañeros de clase y recibir retroalimentación y ayuda de tus instructores.'
    },
    {
      question: '¿Hay algún requisito previo para tomar los cursos?',
      answer: 'No hay requisitos previos para tomar nuestros cursos. Sin embargo, sugerimos tener al menos un nivel básico de conocimientos de producción musical y estar familiarizado con el software de producción musical que estás utilizando. Pero... para que no te desanimes, tenemos testimonios de primera mano de alumnos que tomaron un curso de producción o de mezcla sin tener experiencia previa, y nos garantizaron que aprendieron a usar el DAW mientras aprendían a producir viendo el curso!'
    },
    {
      question: '¿Cómo puedo inscribirme en un curso?',
      answer: 'Puedes inscribirte en un curso en nuestro sitio web. Simplemente selecciona el curso que te interesa, completa el formulario de inscripción y realiza el pago. Una vez que hayas completado la inscripción, recibirás un correo electrónico con información sobre cómo acceder al curso.'
    },
    {
      question: '¿Qué es Graykids Members?',
      answer: 'Graykids Members es una membresía que te da acceso a una serie de episodios sobre mezcla, mastering, beatmaking, deconstrucciones, sound design, samples, entre otros temas relacionados con la producción musical y negocios musicales. Se van agregando varios episodios al mes o material relevante dentro de la membresía. Funciona como NETFLIX, por un mínimo cargo al mes o un pago anual (pagando anual ahorras más) obtienes todos los beneficios de Graykids Members.'
    },
    {
      question: '¿Cuáles son los métodos de pago?',
      answer: 'Por el momento solo contamos con la pasarela de pagos PayPal, sin embargo, si eres de Perú, puedes hacer tu pago en Soles o Dólares a nuestras números de cuenta disponibles, solo ponte en contacto con nosotros.'
    },
    {
      question: '¿Puedo obtener un certificado al completar un curso?',
      answer: 'Sí, ofrecemos certificados de finalización para todos nuestros cursos. Para obtener un certificado, debes completar todas las tareas y ejercicios requeridos para el curso.'
    },
    {
      question: '¿Cómo puedo ponerme en contacto con el equipo?',
      answer: 'Tenemos distintos canales de atención al cliente y de soporte técnico, puedes comunicarte por esos canales, estos son, el correo de soporte, nuestro número de WhatsApp y también a nuestro Instagram @graykidsacademy. Recuerda que estamos aquí para ayudarte y responder a cualquier pregunta que tengas. ¡Gracias por tu interés en Graykids Academy!'
    }
  ];

  return (
    <section id="faq" className="faq">
      <div className="faq__container container">
        <h3 className="faq__title">Preguntas frecuentes</h3>
        
        <div className="faq__list">
          {faqs.map((faq, index) => (
            <details key={index} className="faq__item">
              <summary className="faq__question">{faq.question}</summary>
              <p className="faq__answer">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

