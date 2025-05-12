import { useEffect, useState } from "react";
import Modal from "react-modal";
import "lite-youtube-embed/src/lite-yt-embed.css";
import "./VideoModal.css";

Modal.setAppElement("#root");

const VideoModal = ({ song, onClose, isOpen, onDelete }) => {
  const [ready, setReady] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  /**
   * Extrae el ID de video de una URL de YouTube.
   *  URL del video (ej: "https://youtu.be/dQw4w9WgXcQ")
   *  ID del video (ej: "dQw4w9WgXcQ") o string vacío si no coincide
   */

  const getVideoIdFromUrl = (url) => {
    const youtubeRegex =
      /(?:youtube\.com\/(?:watch\?v=|embed\/)||youtu\.be\/)([\w-]{11})/;
    const match = url.match(youtubeRegex);
    return match ? match[1] : "";
  };

  useEffect(() => {
    import("lite-youtube-embed").then(() => setReady(true));
  }, []);

  /*
    Effect que actualiza el videoId cuando cambia la URL de la canción.
    Dependencia: song.url
   */
  useEffect(() => {
    setVideoId(getVideoIdFromUrl(song.url));
  }, [song.url]);

  /*
    Maneja la eliminación de la canción:
    Ejecuta la función onDelete recibida por props
    Cierra el modal
   */
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="video-modal-container"
      overlayClassName="ReactModal__Overlay"
    >
      <div className="modal-header">
        <h3 className="modal-title">Reproductor</h3>
        <div className="modal-actions">
          <button className="modal-close" onClick={onClose}></button>
        </div>
      </div>
      <div className="video-wrapper">
        {ready && videoId && <lite-youtube videoid={videoId}></lite-youtube>}
      </div>
      <div className="video-info">
        <h2 className="video-title">{song.name}</h2>
        <div className="video-meta">
          <span className="video-plays">{song.plays} Reproducciones</span>
        </div>
        <div className="video-actions">
          <button
            className="delete-modal-button"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Eliminar
          </button>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="delete-confirm-overlay">
          <div className="delete-confirm-box">
            <p>¿Eliminar esta canción?</p>
            <div className="confirm-buttons">
              <button className="confirm-button" onClick={handleDelete}>
                Sí, eliminar
              </button>
              <button
                className="cancel-button"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default VideoModal;
