import React, { useState } from "react";
import { useEditor } from "@craftjs/core";
import Icon from "@/components/ui/Icon";

export const SettingsPanel = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { actions, selected } = useEditor((state, query) => {
    const [currentNodeId] = state.events.selected || [];
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
    };
  });

  return (
    <div className="borderbg-white">
      <div
        className="flex justify-between items-center border-y px-4 py-2 cursor-pointer text-gray-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex space-x-2">
          <Icon icon="lucide:edit" width={20} />
          <p className="text-sm uppercase">Customize</p>
        </div>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-5 h-5 transition-transform ${
              isOpen ? "rotate-0" : "rotate-180"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="border-b p-4">
          {selected ? (
            <div className="flex flex-col space-y-4">
              <div>
                <p className="text-lg font-semibold">Selected Component</p>
                <p className="mt-1 px-2 py-1 bg-blue-200 rounded-md text-blue-700 font-medium">
                  {selected.name}
                </p>
              </div>
              <div>
                {selected.settings && React.createElement(selected.settings)}
              </div>
              <div>
                {selected.isDeletable && (
                  <button
                    onClick={() => actions.delete(selected.id)}
                    className="w-full mt-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="h-60 flex flex-col justify-center items-center text-center">
              <p className="text-sm font-semibold text-gray-500">
                Click on a component to start editing.
              </p>
              <p className="mt-2 text-xs text-gray-400">
                Select a component to view and edit its settings here.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
