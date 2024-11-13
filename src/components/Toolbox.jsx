// components/Toolbox.js
import React from "react";

export const Toolbox = () => {
  return (
    <div className="p-4 border rounded shadow-md bg-gray-50">
      <div className="pb-2 text-center">
        <h3 className="font-semibold text-lg">Drag to add</h3>
      </div>
      <div className="space-y-2">
        <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Button
        </button>
        <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Text
        </button>
        <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Container
        </button>
        <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Card
        </button>
      </div>
    </div>
  );
};
