import SongItem from './SongItem';

function SongList({ songs, onPlay }) {
  return (
    <div className="grid gap-2">
      {songs.map((song, i) => (
        <SongItem key={i} song={song} onPlay={() => onPlay(song)} />
      ))}
    </div>
  );
}

export default SongList;