import React from "react";

export const SettingsPanel = () => {
  return (
    <div className="bg-gray-100 p-4 mt-4 rounded shadow-md">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold">Selected</h3>
          <span className="bg-blue-500 text-white text-xs rounded px-2 py-1">
            Selected
          </span>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Prop</label>
        <input
          type="range"
          min="7"
          max="50"
          defaultValue="0"
          className="w-full"
        />
      </div>

      <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">
        Delete
      </button>
    </div>
  );
};
