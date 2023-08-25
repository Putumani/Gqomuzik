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

  const removeFileExtension = (fileName: string) => {
    return fileName.replace('.mp3', '');
  };

  const songImages: { [key: string]: string } = {
    'Artist1 - Song1.mp3': '/path/to/artist1_song1_image.jpg',
    'Artist2 - Song2.mp3': '/path/to/artist2_song2_image.jpg',
    // ... and so on
  };

  return (
    <div>
      <ul className="text-black w-full">
        {songs.map((song, index) => {
          const { artist, songName } = getArtistAndSongName(song);
          const songImage = songImages[song] || './Aligqumze.png'; 

          return (
            <li key={index} className="py-2 border-b border-gray-400 flex items-center">
              <div className="mr-4">
                <img src={songImage} alt={`${artist} - ${songName}`} className="w-16 h-16 rounded-full" />
              </div>
              <div>
                <span className="font-bold">{artist}</span>
                <br />
                <span>{removeFileExtension(songName)}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MusicList;






