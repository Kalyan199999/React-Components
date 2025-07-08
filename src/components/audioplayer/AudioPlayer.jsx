import  { useRef, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type.startsWith("audio/")) {
      setFile(URL.createObjectURL(selected));
      setCurrentTime(0);
      toast.success('Audio file selected successfully')
    }
    else{
        toast.error('Please select a valid audio file')
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const time = Number(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  // Reset play state when audio ends
useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return; // ⛔ Prevent running if audioRef is not ready

  const onEnded = () => setIsPlaying(false);

  audio.addEventListener("ended", onEnded);

  return () => {
    audio.removeEventListener("ended", onEnded);
  };

}, [file]); // 🔁 Run only when file changes (i.e., audio is mounted)


  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4 text-center">🎧 Audio Player</h2>

      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      {file && (
        <div className="flex flex-col items-center">
            
          <audio
            ref={audioRef}
            src={file}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />

          <button
            onClick={togglePlay}
            className="bg-blue-600 text-white px-4 py-2 rounded mb-3 hover:bg-blue-700 transition"
          >
            {isPlaying ? "Pause ⏸️" : "Play ▶️"}

          </button>

          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full"
          />

          <div className="text-sm text-gray-600 mt-1">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

        </div>
      )}
    </div>
  );
};

// Format time as mm:ss
const formatTime = (sec) => {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default AudioPlayer;