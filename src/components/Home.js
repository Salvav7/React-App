import React from 'react';
import SpotifyPlayer from './SpotifyPlayer';
import About from './About'; 
import Contact from './Contact';


const Home = () => {
  return (
    <div className="container text-center my-5">
      <h3 className="text-start">Buenas tardes Salvador</h3> 

      <div id="music-player" className="my-5">
        <SpotifyPlayer/>
      </div>

      <div id="about" className="my-5">
        <About/> 
      </div>

      <div id="blog" className="my-5">
      </div>

      <div id="contact" className="my-5">
        <Contact/> 
      </div>
    </div>
  );
};

export default Home;

