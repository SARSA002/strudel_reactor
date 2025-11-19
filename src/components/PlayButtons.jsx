function PlayButtons({ onPlay, onStop }) {
  return (
    <div className="btn-group-full" role="group" aria-label="Play and Stop buttons">
      <button id="play" className="btn btn-outline-success btn-full" onClick={onPlay}>pl@¥</button>
      <button id="stop" className="btn btn-outline-danger btn-full" onClick={onStop}>$t0p</button>
    </div>
  );
}

export default PlayButtons;
