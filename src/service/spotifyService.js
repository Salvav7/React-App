export const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
export const SPOTIFY_API_URL = 'https://api.spotify.com/v1';
const CLIENT_ID = 'acd5fe09265442bbb9ea693f90cf596d'; // Cambia con tu client_id de Spotify
const REDIRECT_URI = 'http://localhost:3000/callback'; // Cambia con tu URL de redireccionamiento
const SCOPES = [
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'playlist-read-private',
  'streaming',
  'user-library-read',
];
const RESPONSE_TYPE = 'token';

// Redirige a la página de autorización de Spotify
export const getSpotifyAuthUrl = () => {
  return `${SPOTIFY_AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join('%20')}&response_type=${RESPONSE_TYPE}`;
};

// Obtén el token de acceso desde la URL
export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      let parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

// Obtener listas de reproducción
export const fetchPlaylists = async (token) => {
  const response = await fetch(`${SPOTIFY_API_URL}/me/playlists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data.items; // Retorna las listas de reproducción
};

// Obtener las canciones de una playlist específica
export const fetchPlaylistTracks = async (token, playlistId) => {
  const response = await fetch(`${SPOTIFY_API_URL}/playlists/${playlistId}/tracks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener las canciones de la playlist');
  }

  const data = await response.json();
  return data;
};

// Obtener la pista que se está reproduciendo actualmente
export const fetchCurrentlyPlaying = async (token) => {
    try {
        const response = await fetch(`${SPOTIFY_API_URL}/me/player/currently-playing`, {
            headers: {
                Authorization: `Bearer ${token}`, // Asegúrate de que el token es válido
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Currently playing:', data);
        return data; // Retorna la pista que se está reproduciendo
    } catch (error) {
        console.error('Error fetching currently playing:', error);
    }
};

// Buscar canciones
export const searchTracks = async (token, query) => {
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${query}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Error al buscar canciones');
    }
  
    const data = await response.json();
    return data;
};

// Reproducir una canción específica
export const playTrack = async (token, trackUri) => {
  try {
    const response = await fetch(`${SPOTIFY_API_URL}/me/player/play`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uris: [trackUri] }),
    });

    if (!response.ok) {
      throw new Error('Error al reproducir la canción');
    }
  } catch (error) {
    console.error('Error en playTrack:', error);
  }
};

// Pausar la canción en reproducción
export const pauseTrack = async (token) => {
  try {
    const response = await fetch(`${SPOTIFY_API_URL}/me/player/pause`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al pausar la reproducción');
    }
  } catch (error) {
    console.error('Error en pauseTrack:', error);
  }
};

// Saltar a la siguiente canción
export const nextTrack = async (token) => {
  try {
    const response = await fetch(`${SPOTIFY_API_URL}/me/player/next`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al avanzar a la siguiente canción');
    }
  } catch (error) {
    console.error('Error en nextTrack:', error);
  }
};

// Regresar a la canción anterior
export const previousTrack = async (token) => {
  try {
    const response = await fetch(`${SPOTIFY_API_URL}/me/player/previous`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al regresar a la canción anterior');
    }
  } catch (error) {
    console.error('Error en previousTrack:', error);
  }
};

// Obtener las canciones que el usuario ha marcado como favoritas
export const fetchLikedSongs = async (token) => {
  try {
      const response = await fetch(`${SPOTIFY_API_URL}/me/tracks`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });

      if (!response.ok) {
          throw new Error(`Error al obtener canciones favoritas: ${response.statusText}`);
      }

      const data = await response.json();
      return data.items || []; // Devuelve un array vacío si no hay canciones
  } catch (error) {
      console.error('Error fetching liked songs:', error);
      return []; // Retorna un array vacío en caso de error
  }
};

// Obtener las canciones más populares
export const fetchTopTracks = async (token) => {
  try {
    const response = await fetch(`${SPOTIFY_API_URL}/me/top/tracks?limit=10`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.json(); // Captura el mensaje de error del cuerpo de la respuesta
      throw new Error(`Error al obtener canciones populares: ${errorMessage.error.message}`);
    }

    const data = await response.json();
    return data.items; // Devuelve las canciones más populares
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    throw error; // Vuelve a lanzar el error para manejarlo en el componente
  }
};





