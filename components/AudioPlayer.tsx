import React from 'react';

interface AudioPlayerProps {
  id: string;
  url: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ id, url }) => {
  return (
    <audio
      src={url}
      controls
      autoPlay
      id={`audio-player-${id}`}
      className="w-full h-auto bg-gray-100 rounded-lg p-4"
    />
  );
};

export default AudioPlayer;

