export const getSongs = () => {
  try {
    const songs = localStorage.getItem('songs');
    return songs ? JSON.parse(songs) : [];
  } catch (error) {
    console.error('Error al leer canciones de localStorage:', error);
    return [];
  }
};

export const saveSongs = (songs) => {
  try {
    localStorage.setItem('songs', JSON.stringify(songs));
  } catch (error) {
    console.error('Error al guardar canciones en localStorage:', error);
  }
};