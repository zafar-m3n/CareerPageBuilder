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
      <div className="flex items-center">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={enabled}
            onChange={handleToggle}
            className="toggle-checkbox"
          />
          <span className="text-sm font-medium">Enable</span>
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
