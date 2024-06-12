import React from 'react';

interface IconButtonProps {
  icon: React.ReactNode;
  text: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, text }) => {
  return (
    <button 
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center p-1 mr-2"
    >
      <div className="mr-2">
        {icon}
      </div>
      {text}
    </button>
  );
};

export default IconButton;
