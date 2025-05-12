import { useState } from 'react';

function SongItem({ song, onPlay, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    setIsDeleting(true);
    setTimeout(() => onDelete(), 300); // Pequeño delay para animación
  };

  return (
    <div className={`song-item ${isDeleting ? 'deleting' : ''}`}>
      <div className="song-info">
        <h3>{song.name}</h3>
        <p>{song.plays} reproducciones</p>
      </div>
      <div className="song-actions">
        <button 
          className="play-button" 
          onClick={(e) => {
            e.stopPropagation();
            onPlay();
          }}
          aria-label={`Reproducir ${song.name}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          Reproducir
        </button>
        <button 
          className="delete-button" 
          onClick={handleDelete}
          aria-label={`Eliminar ${song.name}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SongItem;