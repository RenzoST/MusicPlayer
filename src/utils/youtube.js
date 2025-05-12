export const getVideoIdFromUrl = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export const isValidYoutubeUrl = (url) => {
  return getVideoIdFromUrl(url) !== null;
};

export const normalizeYoutubeUrl = (id) => {
  return `https://www.youtube.com/watch?v=${id}`;
};