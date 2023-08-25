import React from 'react';

interface HeroComponentProps {
  toggleUploader: () => void;
}

const HeroComponent: React.FC<HeroComponentProps> = ({ toggleUploader }) => {
  return (
    <div className="w-full h-screen relative">
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: 'url(/gqomuzik_hero.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="absolute max-w-3xl mx-auto px-6 py-16 text-black" style={{ width: '40%', top: 50, left: 50 }}>
        <div className="bg-black bg-opacity-40 p-4 rounded-lg">
          <p className="text-3xl font-bold mb-4">
          Discover the Ultimate Hub for Gqom Music Enthusiasts: 
          Your Gateway to Download and Share Muzik!
          </p>
         </div> 
      </div>
    </div>
  );
};

export default HeroComponent;






