import { useState, useEffect } from 'react';
import { isValidYoutubeUrl, getVideoIdFromUrl } from '../utils/youtube';

function AddSongForm({ songs, onAdd }) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  // Limpia los errores cuando cambia el valor del input
  useEffect(() => {
    if (error === 'URL de YouTube inválida' || 
        error === 'Esta canción ya existe en tu lista') {
      setError('');
    }
  }, [url]); // Solo se ejecuta cuando cambia la URL

  useEffect(() => {
    if (error === 'Todos los campos son obligatorios' && name && url) {
      setError('');
    }
  }, [name, url]); 
  // Limpia el error cuando ambos campos tienen algun valor


  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar campos vacíos
    if (!name || !url) {
      setError('Todos los campos son obligatorios');
      return;
    }

    // Validar formato de URL
    if (!isValidYoutubeUrl(url)) {
      setError('URL de YouTube inválida');
      return;
    }

    // Validar duplicados
    const videoId = getVideoIdFromUrl(url);
    const isDuplicate = songs.some(song => {
      const existingId = getVideoIdFromUrl(song.url);
      return existingId === videoId;
    });

    if (isDuplicate) {
      setError('Esta canción ya existe en tu lista');
      return;
    }

    // Si pasa todas las validaciones
    onAdd({ 
      name, 
      url,
      plays: 0,
      id: videoId
    });
    
    // Resetear formulario
    setName('');
    setUrl('');
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre de la canción"
        className="form-input"
      />
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL de YouTube (ej: https://www.youtube.com/watch?v=...)"
        className="form-input"
      />
      <button type="submit" className="submit-button">
        Agregar
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default AddSongForm;