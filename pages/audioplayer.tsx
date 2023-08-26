import React, { useState, useRef } from 'react';

interface AudioPlayerProps {
  song: string;
  audioSource: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ song, audioSource }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      <audio ref={audioRef} src={audioSource} />
      <button onClick={handlePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default AudioPlayer;



