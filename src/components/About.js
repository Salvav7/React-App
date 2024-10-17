// About.js
import React from 'react';

const About = () => {
  return (
    <div id="about" className="my-5">
      <h2>Acerca de</h2>
      <p>Nacimos de la pasión por la música y el deseo de conectar a artistas y oyentes en un solo lugar.</p>

      <h3>Nuestra Misión y Visión</h3>
      <ul>
        <li><strong>Misión:</strong> Ofrecer una experiencia musical única y accesible para todos.</li>
        <li><strong>Visión:</strong> Convertirnos en el lugar donde la música cobra vida.</li>
      </ul>

      <h3>¿Qué Ofrecemos?</h3>
      <div className="features">
        <div className="feature">
          <i className="fas fa-music"></i>
          <p>Descubrimiento de Música</p>
        </div>
        <div className="feature">
          <i className="fas fa-list"></i>
          <p>Listas de Reproducción Personalizadas</p>
        </div>
        <div className="feature">
          <i className="fas fa-star"></i>
          <p>Recomendaciones Personalizadas</p>
        </div>
      </div>

      <blockquote>
        "La música es el lenguaje del alma." - Platón
      </blockquote>

      <h3>Únete a Nuestra Comunidad</h3>
      <p>Comparte tu amor por la música con nosotros. Conéctate, descubre y disfruta.</p>
    </div>
  );
};

export default About;
