import React, { useEffect, useState } from 'react';
import AudioUploader from '@/components/AudioUploader';
import AudioPlayer from '@/components/AudioPlayer';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';

interface Audio {
  id: string;
  url: string;
}

const Home: React.FC = () => {
  const [audios, setAudios] = useState<Audio[]>([]);

  useEffect(() => {
    fetchExclusives();
  }, []);

  const fetchExclusives = async (): Promise<void> => {
    try {
      const response = await fetch('/api/exclusives');
      const data = await response.json();
      console.log('Fetched exclusives:', data);

      const audiosWithUrls: Audio[] = data.map((id: string) => ({
        id,
        url: `/audios/${id}.mp3`,
      }));

      setAudios(audiosWithUrls);
    } catch (error) {
      console.error('Error fetching exclusives:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-200 text-white">
  <Navbar />
  <div className="mt-8" /> {/* Add a div with margin-top for space */}
  <main className="flex flex-col lg:flex-row items-start justify-between px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 flex-1 w-full max-w-screen-xl mx-auto">
  <div className="w-full lg:w-1/4 p-4 rounded-lg mb-8 lg:mb-0 border border-black mr-4 bg-opacity-0 backdrop-filter backdrop-blur-lg">
    <h1 className="text-4xl font-bold text-black mb-8">Most Downloads</h1>
    {/* Add most downloads content here */}
  </div>
  <div className="w-full lg:w-1/3 p-4 rounded-lg mx-auto flex justify-center items-center items-stretch border border-black mb-4 bg-opacity-0 backdrop-filter backdrop-blur-lg">
    <div className="bg-dark-gray-900 text-white p-4 rounded-lg flex-1">
      <div>
        <h1 className="text-4xl font-bold text-black mb-8">Music</h1>
        {/* Add albums content here */}
      </div>
    </div>
  </div>
  <div className="w-full lg:w-1/3 p-4 rounded-lg border border-black mb-4 bg-opacity-0 backdrop-filter backdrop-blur-lg">
    <h1 className="text-4xl font-bold text-black mb-8">Albums</h1>
    {/* Add albums content here */}
  </div>
</main>


      <Footer />
    </div>
  );
};

export default Home;



      