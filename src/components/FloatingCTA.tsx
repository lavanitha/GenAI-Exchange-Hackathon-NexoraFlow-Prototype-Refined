import React from 'react';

const FloatingCTA: React.FC = () => {
  return (
    <div className="fixed right-6 bottom-6 z-40">
      <button className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-teal-500 text-white shadow-lg flex items-center justify-center text-2xl">+</button>
    </div>
  );
};

export default FloatingCTA;
