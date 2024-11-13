import React from "react";
import { useEditor } from "@craftjs/core";

export const SettingsPanel = () => {
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

  return selected ? (
    <div className="bg-gray-100 mt-2 p-4 rounded-md shadow">
      <div className="flex flex-col space-y-4">
        <div>
          <p className="text-lg font-semibold">Selected Component</p>
          <p className="mt-1 px-2 py-1 bg-blue-200 rounded-md text-blue-700 font-medium">
            {selected.name}
          </p>
        </div>
        <div>{selected.settings && React.createElement(selected.settings)}</div>
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
    </div>
  ) : null;
};
