import { useEffect, useState } from 'react';

const MusicList = () => {
  const [songs, setSongs] = useState<string[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch('/api/songs');
      const songFiles = await response.json();
      setSongs(songFiles);
    };

    fetchSongs();
  }, []);

  const getArtistAndSongName = (song: string) => {
    const lastHyphenIndex = song.lastIndexOf('-');

    if (lastHyphenIndex !== -1) {
      const artist = song.slice(0, lastHyphenIndex).trim();
      const songName = song.slice(lastHyphenIndex + 1).trim();

      return { artist, songName };
    }

    return { artist: '', songName: song };
  };

  return (
    <div>
      <ul className="text-black">
        {songs.map((song, index) => {
          const { artist, songName } = getArtistAndSongName(song);

          return (
            <li key={index} className="py-2 border-b border-gray-400">
              <div>
                <span className="font-bold">{artist}</span>
              </div>
              <div>
                <span>{songName}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MusicList;





