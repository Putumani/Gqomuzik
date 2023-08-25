import React from 'react';
import Navbar from './NavBar';

interface HeroComponentProps {
  toggleUploader: () => void;
}

const HeroComponent: React.FC<HeroComponentProps> = ({ toggleUploader }) => {
  return (
    <div className="w-full h-screen relative">
      {/* Hero background */}
      <div
        className="absolute inset-0 bg-cover"
        style={{ backgroundImage: 'url(/gqomuzik_hero.jpeg)' }}
      />

      {/* Navbar content */}
      <div className="absolute top-0 left-0 right-0 px-4 py-2">
        <Navbar toggleUploader={toggleUploader} />
      </div>

      {/* Hero content */}
      <div className="relative h-1/4">
        <div className="max-w-3xl mx-auto px-6 py-16 text-white">
          <h1 className="text-4xl font-bold mb-8">Welcome to Gqomuzik!</h1>
          <p className="text-xl mb-4">
            To upload your own music, click on the "Upload" button in the navigation bar above.
          </p>
          <p className="text-xl mb-4">
            Once you've uploaded your music, it will be available for others to listen and download.
          </p>
          <p className="text-xl mb-8">
            To listen and download a song, simply click on the song of your choice below, and you'll be directed to the download page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;




