import React from 'react';
import { Link } from 'react-router-dom';
import spotifyLogo from '../assets/spotify.png';

const Header = () => {
  return (
    <header className="bg-dark p-3 shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        <img src={spotifyLogo} alt="Spotify Logo" style={{ width: '50px', height: '50px' }} />
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#SpotifyPlayer">Reproductor</a></li>
            <li className="nav-item">
              <a className="nav-link" href="#about">Acerca de</a></li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

