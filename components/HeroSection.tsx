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

      <div className="absolute max-w-3xl mx-auto px-6 py-16 text-black" style={{ width: '40%', top: 50, left: 30 }}>
      
      <div className="bg-black bg-opacity-40 p-4 rounded-lg">
          <p className="text-1xl font-bold mb-4">
          Discover and Experience the ultimate Gqom music hub - your gateway to the groove! 
          Dive into heart-pounding beats and electrifying Gqom vibes, perfect for enthusiasts, 
          DJs, producers, dancers, and anyone captivated by infectious Gqom energy. 
          
          </p>
          <p className="text-2xl font-bold mb-4">
          This unrivaled hub is where your Gqom journey begins. Share, download, dance, 
          or simply immerse yourself in the beats, becoming part of the global Gqom movement.
          
          </p>
          <p className="text-1xl font-bold mb-4">
          Unleash your inner rhythm and discover new sounds as you launch into the Universe of Gqom.
          </p>
        </div> 
      </div>
    </div>
  );
};

export default HeroComponent;






