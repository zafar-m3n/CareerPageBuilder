import React from "react";
import Icon from "./ui/Icon";

export const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-lg font-bold">Cleveri Web Page Builder</h1>
      <nav className="flex space-x-4 text-sm">
        <div className="flex space-x-1 items-center text-blue-400 hover:underline">
          <a
            href="https://getcleveri.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to Cleveri Web
          </a>
          <Icon icon="heroicons:arrow-top-right-on-square" />
        </div>
        <div className="flex space-x-1 items-center text-blue-400 hover:underline">
          <a
            href="https://getcleveri.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to Cleveri
          </a>
          <Icon icon="heroicons:arrow-top-right-on-square" />
        </div>
      </nav>
    </header>
  );
};
