// components/Topbar.js
import React, { useState } from "react";

export const Topbar = () => {
  const [enabled, setEnabled] = useState(true);

  const handleToggle = () => {
    setEnabled(!enabled);
  };

  const handleSerialize = () => {
    console.log("Serialized JSON to console"); // Placeholder for serialization logic
  };

  return (
    <div className="px-4 py-2 mt-3 mb-1 bg-teal-100 flex items-center justify-between rounded">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Enable</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={enabled}
            onChange={handleToggle}
            className="sr-only peer"
          />
          <div className="w-10 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-500 peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
        </label>
      </div>
      <button
        onClick={handleSerialize}
        className="px-3 py-1 text-sm border border-gray-500 rounded hover:bg-gray-200"
      >
        Serialize JSON to console
      </button>
    </div>
  );
};
