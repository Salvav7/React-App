import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import SpotifyPlayer from './components/SpotifyPlayer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          {/* Usa 'element' en lugar de 'component' */}
          <Route path="/" element={<Home />} />
          <Route path="/spotify-player" element={<SpotifyPlayer />} />
          {/* Si necesitas manejar la ruta de autenticación de Spotify */}
          <Route path="/callback" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
