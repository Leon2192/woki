import { IButton } from '@/interfaces';
import React from 'react';


const Button: React.FC<IButton> = ({ icon, className }) => {
  return (
    <button
      className={`flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${className}`}
    >
      {icon}
    </button>
  );
};

export default Button;
