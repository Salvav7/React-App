import React, { useEffect, useState } from 'react';
import { getSpotifyAuthUrl, getTokenFromUrl, fetchPlaylists, fetchCurrentlyPlaying, searchTracks } from '../service/spotifyService';

const SpotifyPlayer = () => {
    const [token, setToken] = useState('');
    const [playlists, setPlaylists] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [player, setPlayer] = useState(null);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [likedSongs, setLikedSongs] = useState([]);

    useEffect(() => {
        const hash = getTokenFromUrl();
        const _token = hash?.access_token;

        if (!_token) {
            window.location.href = getSpotifyAuthUrl();
        } else {
            setToken(_token);
            fetchPlaylists(_token)
                .then(playlists => setPlaylists(playlists || []))
                .catch(err => setError('Error al obtener listas de reproducción.'));

            initializeSpotifyPlayer(_token);
        }
    }, []);

    const initializeSpotifyPlayer = (token) => {
        const player = new window.Spotify.Player({
            name: 'React Spotify Player',
            getOAuthToken: cb => { cb(token); },
            volume: 0.5,
        });

        player.addListener('ready', ({ device_id }) => {
            console.log('Player is ready with Device ID', device_id);
        });

        player.addListener('not_ready', ({ device_id }) => {
            console.log('Player is not ready with Device ID', device_id);
        });

        player.connect();
        setPlayer(player);
    };

    const playTrack = async (trackUri) => {
        if (!token || !player) return;

        try {
            await fetch(`https://api.spotify.com/v1/me/player/play`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uris: [trackUri] }),
            });
            fetchCurrentlyPlaying(token).then(track => setCurrentTrack(track));
            setIsPlaying(true);
        } catch (error) {
            console.error('Error playing track:', error);
        }
    };

    const togglePlayPause = async () => {
        if (!player) return;

        const currentState = await player.getCurrentState();
        if (currentState && currentState.paused) {
            player.togglePlay();
            setIsPlaying(true);
        } else {
            player.togglePlay();
            setIsPlaying(false);
        }
    };

    const nextTrack = async () => {
        if (!token) return;

        try {
            await fetch(`https://api.spotify.com/v1/me/player/next`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchCurrentlyPlaying(token).then(track => setCurrentTrack(track));
        } catch (error) {
            console.error('Error skipping to next track:', error);
        }
    };

    const previousTrack = async () => {
        if (!token) return;

        try {
            await fetch(`https://api.spotify.com/v1/me/player/previous`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchCurrentlyPlaying(token).then(track => setCurrentTrack(track));
        } catch (error) {
            console.error('Error skipping to previous track:', error);
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        if (searchQuery.length === 0) return;

        try {
            const results = await searchTracks(token, searchQuery);
            setSearchResults(results?.tracks?.items || []);
        } catch (error) {
            console.error('Error searching tracks:', error);
        }
    };

    return (
        <div className="spotify-player container text-center my-5">
            <h2>Reproductor</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            {currentTrack && currentTrack.item ? (
                <div className="current-track">
                    <h3>Ahora suena:</h3>
                    <h4>{currentTrack.item.name} - {currentTrack.item.artists[0].name}</h4>
                    <img src={currentTrack.item.album.images[0].url} alt={currentTrack.item.name} style={{ width: '200px' }} />
                </div>
            ) : (
                <p>No hay ninguna canción reproduciéndose.</p>
            )}

            <div className="controls my-4">
                <button onClick={previousTrack} className="btn btn-secondary">
                    <i className="fas fa-step-backward"></i>
                </button>
                <button onClick={togglePlayPause} className="btn btn-secondary">
                    {isPlaying ? (
                        <i className="fas fa-pause"></i>
                    ) : (
                        <i className="fas fa-play"></i>
                    )}
                </button>
                <button onClick={nextTrack} className="btn btn-secondary">
                    <i className="fas fa-step-forward"></i>
                </button>
            </div>

            <form onSubmit={handleSearch} className="mb-4 d-flex">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="¿Qué quieres escuchar?"
                    className="form-control me-2"
                />
                <button type="submit" className="btn btn-primary">Buscar</button>
            </form>

            {searchResults.length > 0 && (
                <div className="search-results mt-4">
                    <h3>Resultados de búsqueda:</h3>
                    <ul className="list-group">
                        {searchResults.map((track) => (
                            <li key={track.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    {track.name} - {track.artists.map(artist => artist.name).join(', ')}
                                </div>
                                <i
                                    className="fas fa-play-circle"
                                    onClick={() => playTrack(track.uri)}
                                    style={{ cursor: 'pointer', color: '#1db954' }}
                                    title="Reproducir"
                                ></i>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    );
};

export default SpotifyPlayer;

