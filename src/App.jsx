import { useEffect, useState } from "react";
import AddSongForm from "./components/AddSongForm";
import VideoModal from "./components/VideoModal";
import SongItem from "./components/SongItem";
import { getSongs, saveSongs } from "./utils/localStorage";
import { getVideoIdFromUrl } from "./utils/youtube";
import "./App.css";

function App() {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSong, setSelectedSong] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedSongs = getSongs();
    setSongs(loadedSongs);
    setIsLoading(false);
  }, []);

  /*
    Efecto para guardar canciones cuando cambian
    Se ejecuta cuando cambia 'songs' o 'isLoading'
    Evita guardar durante la carga inicial (isLoading)
   */
  useEffect(() => {
    if (!isLoading) {
      saveSongs(songs);
    }
  }, [songs, isLoading]);

  const addSong = (song) => {
    const videoId = getVideoIdFromUrl(song.url); // Extrae ID de YouTube
    setSongs([...songs, { ...song, id: videoId }]);
  };

  // Incrementa el contador de reproducciones de una canción
  const incrementPlay = (id) => {
    // Actualiza todas las canciones
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === id ? { ...song, plays: (song.plays || 0) + 1 } : song
      )
    );

    // Actualiza también la canción seleccionada
    setSelectedSong((prev) =>
      prev && prev.id === id ? { ...prev, plays: (prev.plays || 0) + 1 } : prev
    );
  };

  // Filtra las canciones según el texto de búsqueda
  // Se actualiza cada vez que cambia 'search'
  const filtered = songs.filter((song) =>
    song.name.toLowerCase().includes(search.toLowerCase())
  );

  // Ordena las canciones por número de reproducciones (descendente)
  const sortByPlays = () => {
    const sorted = [...songs].sort((a, b) => (b.plays || 0) - (a.plays || 0));
    setSongs(sorted);
  };

  // Maneja la reproducción de una canción
  const handlePlaySong = (song) => {
    incrementPlay(song.id); // Incrementa contador
    setSelectedSong({ ...song, plays: (song.plays || 0) + 1 }); // Establece como seleccionada
  };

  // Cierra el modal de reproducción
  const handleCloseModal = () => {
    setSelectedSong(null);
  };

  // Elimina una canción de la lista
  const handleDeleteSong = (songId) => {
    setSongs(songs.filter((song) => song.id !== songId)); // Filtra la canción eliminada

    // Si la canción eliminada estaba siendo reproducida, cierra el modal
    if (selectedSong && selectedSong.id === songId) {
      setSelectedSong(null);
    }
  };

  // Muestra texto de carga mientras se obtienen las canciones
  if (isLoading) {
    return <div className="container mx-auto p-4">Cargando...</div>;
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 3a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1a7 7 0 0 1 14 0v1h-4v8h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z" />
          </svg>
        </div>
        <h1 className="header-title">Music Player</h1>
      </header>

      <div className="main-content">
        <div className="video-player-container">
          {selectedSong && (
            <VideoModal
              song={selectedSong}
              onClose={handleCloseModal}
              isOpen={!!selectedSong}
              onDelete={() => handleDeleteSong(selectedSong.id)}
            />
          )}
        </div>

        <div className="playlist-container">
          <AddSongForm songs={songs} onAdd={addSong} />

          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar canciones..."
              value={search}
            />
            <button
              className="sort-button"
              onClick={sortByPlays}
              aria-label="Ordenar por reproducciones"
            >
              Ordenar por reproducciones
            </button>
          </div>

          <div className="song-list">
            {filtered.map((song) => (
              <SongItem
                key={song.id}
                song={song}
                onPlay={() => handlePlaySong(song)}
                onDelete={() => handleDeleteSong(song.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
