import React from "react";

export const Button = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 rounded text-white bg-blue-500 hover:bg-blue-600 ${className}`}
    >
      {children}
    </button>
  );
};
