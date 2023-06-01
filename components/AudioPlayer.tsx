import React from 'react';

interface AudioPlayerProps {
  id: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ id }) => {
  return (
    <audio
      src={`/api/audios?audioId=${id}`}
      controls
      autoPlay
      id="audio-player"
    />
  );
};

export default AudioPlayer;