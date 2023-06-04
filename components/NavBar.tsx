import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white w-full">
      <div className="flex items-center">
        <img
          className="h-8 w-8 mr-2"
          src="/PUTUMANI.png"
          alt="Logo"
        />
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
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Upload</button>
        <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
      </div>
    </nav>
  );
};

export default Navbar;



