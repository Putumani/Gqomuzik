import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Footer from '@/components/Footer';
import AudioUploader from '@/components/AudioUploader';
import MusicList from '@/components/MusicList';
import HeroComponent from '@/components/HeroSection';
import Navbar from '@/components/NavBar';

interface Audio {
  id: string; 
  url: string;
  artist: string;
  songName: string;
}

const Home: React.FC = () => {
  const [audios, setAudios] = useState<Audio[]>([]);
  const [showUploader, setShowUploader] = useState<boolean>(false);
  const musicListRef = useRef<HTMLDivElement>(null); // Create a ref for the MusicList component

  const scrollToMusicList = () => {
    if (musicListRef.current) {
      musicListRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to the MusicList component
    }
  };

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
      <HeroComponent toggleUploader={toggleUploader} />
      <Navbar toggleUploader={toggleUploader} scrollToMusicList={scrollToMusicList} /> 
      <div className="my-8" />
      <div className="w-full lg:w-1/2 p-4 rounded-lg mb-8 lg:mb-0 border border-black bg-opacity-0 backdrop-filter backdrop-blur-lg">
        <h1 className="text-4xl font-bold text-center text-black mb-8">Muzik</h1>
        <div className="mb-4">
          <hr className="border-t border-black w-full" />
        </div>
        <div className="w-full">
          <div ref={musicListRef}> 
          <MusicList />
          </div>
        </div>
      </div>
      <div className="my-8" />
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
      <Footer />
    </div>
  );
};

export default Home;


