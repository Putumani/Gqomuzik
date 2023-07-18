import React from 'react';

interface NavbarProps {
  toggleUploader: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleUploader }) => {
  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white w-full">
      
      {/*Logo*/}
      <div className="flex items-center">
        <img className="h-8 w-8 mr-2" src="/gqomuzik.png" alt="Logo" />
        <span className="text-lg font-bold">Gqomuzik</span>
      </div>
      <div className="flex items-center">
        <input
          className="px-4 py-2 border border-gray-500 rounded-md w-64"
          type="text"
          placeholder="Search..."
        />
      </div>
      <div className="flex items-center">
        {/*Upload button*/}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4 hover:bg-orange-400"
          onClick={toggleUploader}
        >
          Upload
        </button>
      </div>
    </nav>
  );
};

export default Navbar;


