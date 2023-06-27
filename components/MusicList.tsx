import { useEffect, useState } from 'react';

const MusicList = () => {
  const [songs, setSongs] = useState<string[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch('/api/songs'); // Update the URL
      const songFiles = await response.json();
      setSongs(songFiles);
    };
      
    fetchSongs();
  }, []);

  return (
    <div>
      <ul className="text-black">
        {songs.map((song, index) => (
          <li
            key={index}
            className="py-2 border-b border-gray-400" // Add border classes
          >
            {song}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusicList;

