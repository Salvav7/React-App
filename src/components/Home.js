import React from 'react';
import SpotifyPlayer from './SpotifyPlayer';
import About from './About'; 
import Blog from './Blog';


const Home = () => {
  return (
    <div className="container text-center my-5">
      <h3 className="text-start">Buenas tardes Salvador</h3> {/* Cambiado a h3 y alineado a la izquierda */}

      <div id="music-player" className="my-5">
        <SpotifyPlayer />
      </div>

      <div id="about" className="my-5">
        <About /> {/* Agrega tu nuevo componente aquí */}
      </div>

      <div id="blog" className="my-5">
      </div>

      <div id="contact" className="my-5">
        <h2>Contacto</h2>
        {/* Aquí puedes agregar tu formulario de contacto */}
      </div>
    </div>
  );
};

export default Home;

