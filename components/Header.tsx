
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        SM Downloader
      </h1>
      <p className="text-gray-400 mt-2 text-lg">
        Download videos from your favorite social platforms with a single click.
      </p>
    </header>
  );
};

export default Header;
