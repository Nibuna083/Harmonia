import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Music2 } from "lucide-react";
import "./App.css";

const Button = ({ children, onClick }) => (
  <button className="music-btn" onClick={onClick}>
    {children}
  </button>
);

const songs = [
  "/songs/song 1.mp3",
  "/songs/song 2.mp3",
  "/songs/song 3.mp3",
  "/songs/song 4.mp3",
  "/songs/song 5.mp3",
];

const formatSongName = (songPath) => {
  return songPath.split("/").pop().replace(".mp3", "");
};

export default function MusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(songs[currentIndex]));

  useEffect(() => {
    audioRef.current.src = songs[currentIndex];
    if (isPlaying) audioRef.current.play();
  }, [currentIndex]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  const prevTrack = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const selectSong = (index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
    audioRef.current.play();
  };

  return (
    <div className="app-container">
      <header className="heading">
        <h1>
          <Music2 style={{ verticalAlign: "middle", marginRight: "10px" }} />
          Harmonia
        </h1>
        <p>Listen to the trend</p>
      </header>
      
      <div className="music-player-container">
        <div className="song-list">
          <h2>Your Playlist</h2>
          <ul>
            {songs.map((song, index) => (
              <li
                key={index}
                className={index === currentIndex ? "active" : ""}
                onClick={() => selectSong(index)}
              >
                {formatSongName(song)}
              </li>
            ))}
          </ul>
        </div>

        <div className="player">
          <h1>{formatSongName(songs[currentIndex])}</h1>
          <div className="controls">
            <Button onClick={prevTrack}><SkipBack /></Button>
            <Button onClick={togglePlayPause}>
              {isPlaying ? <Pause /> : <Play />}
            </Button>
            <Button onClick={nextTrack}><SkipForward /></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
