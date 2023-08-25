import React from 'react';

interface NavbarProps {
  toggleUploader: () => void;
  scrollToMusicList: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleUploader, scrollToMusicList }) => {
  return (
    <div className="absolute top-0 left-0 right-0 bg-transparent">
      <nav className="flex items-center justify-between px-4 py-2 w-full">
        <div className="flex items-center">
          <img className="h-8 w-8 mr-2" src="/gqomuzik.png" alt="Logo" />
          <span className="text-lg font-bold text-black">Gqomuzik</span>
        </div>
        <div className="flex items-center">
          <input
            className="px-4 py-2 border border-gray-500 rounded-md w-64"
            type="text"
            placeholder="Search..."
          />
        </div>
        <div className="flex items-center">
          <a
            className="relative text-black cursor-pointer"
            onClick={scrollToMusicList} 
          >
            Muzik
            <span className="absolute w-full h-px bg-orange-500 left-0 bottom-0 transform scale-x-0 transition-transform origin-left group-hover:scale-x-100"></span>
          </a>
          <button
            className="px-4 py-2 bg-orange-500 text-white rounded-md ml-4 hover:bg-orange-300"
            onClick={toggleUploader}
          >
            Upload
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

