import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AudioUploader from '@/components/AudioUploader';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';
import AudioPlayer from '@/components/AudioPlayer';

interface Audio {
  id: string;
  url: string;
  artist: string;
  songName: string;
}


const Home: React.FC = () => {
  const [audios, setAudios] = useState<Audio[]>([]);
  const [showUploader, setShowUploader] = useState<boolean>(false);

  const toggleUploader = () => {
    setShowUploader((prevValue) => !prevValue);
  };

  const closeUploader = () => {
    setShowUploader(false);
  };

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const response = await axios.get('/api/audios');
        setAudios(response.data.audios);
      } catch (error) {
        console.error('Error fetching audios:', error);
      }
    };

    fetchAudios();
  }, []);

  const handleAudioUpload = (audio: Audio) => {
    setAudios((prevAudios) => [...prevAudios, audio]);
  };  

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-br from-gray-300 to-gray-200 text-white">
      <Navbar toggleUploader={toggleUploader} />
      <div className="mt-8" /> {/* Add a div with margin-top for space */}
      <main className="flex flex-col lg:flex-row items-start justify-between px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 flex-1 w-full max-w-screen-xl mx-auto">
        {/* Most Downloads Component */}
        <div className="w-full lg:w-1/4 p-4 rounded-lg mb-8 lg:mb-0 border border-black mr-4 bg-opacity-0 backdrop-filter backdrop-blur-lg">
          <h1 className="text-4xl font-bold text-black mb-8">Most Downloads</h1>
          <div className="mb-4">
            <hr className="border-black" />
          </div>
          {/* Add most downloads content here */}
        </div>
        {/* Music Component */}
        <div className="w-full lg:w-1/4 p-4 rounded-lg mb-8 lg:mb-0 border border-black mr-4 bg-opacity-0 backdrop-filter backdrop-blur-lg">
          <h1 className="text-4xl font-bold text-black mb-8">Music</h1>
          <div className="mb-4">
            <hr className="border-t border-black w-full" />
          </div>
          {/* Render the list of audios */}
        </div>
        {/* Music Player Component */}
        <div className="w-full lg:w-1/4 p-4 rounded-lg mb-8 lg:mb-0 border border-black mr-4 bg-opacity-0 backdrop-filter backdrop-blur-lg">
          <h1 className="text-4xl font-bold text-black mb-8">Music Player</h1>
          <div className="mb-4">
          <hr className="border-black" />
          <div>
            <h2 className="text-center text-sky-500 font-mono flex gap-2 mx-auto">
              <div>Song By:</div>
              <a className="underline text-blue-600" href="https://jaysudo.com" target="_blank" rel="noopener noreferrer">
                DJ Jay Sudo
              </a>
            </h2>
            <AudioPlayer
              title="Take Me - DJ Jay Sudo"
              src="https://cdn.designly.biz/jaysudo/music/take-me/song.mp3"
            />
            </div>
          </div>

          {/* Add albums content here */}
        </div>

        {/* Upload Card */}
        {showUploader && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10">
            <div className="w-96 p-4 bg-white rounded-lg shadow-lg">
              <h1 className="text-4xl font-bold text-black mb-8">Upload Music</h1>
              <AudioUploader closeUploader={closeUploader} handleAudioUpload={handleAudioUpload} />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-orange-400"
                onClick={toggleUploader}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;


