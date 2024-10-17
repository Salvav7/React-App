import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white p-4 mt-5">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Redes sociales a la izquierda con el texto de derechos reservados debajo */}
        <div className="social-and-rights">
          <div className="social-icons mb-2">
            <a href="https://www.facebook.com" className="social-icon mx-2" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.twitter.com" className="social-icon mx-2" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com" className="social-icon mx-2" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.youtube.com" className="social-icon mx-2" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
          <p className="mb-0 small-text">&copy; 2024 MusicApp. Todos los derechos reservados.</p>
        </div>

        {/* Políticas a la derecha */}
        <div className="text-right">
          <p className="small-text mb-0">
            <a href="/privacy">
              Política de Privacidad
            </a>
            {" | "}
            <a href="/terms">
              Términos y Condiciones
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
