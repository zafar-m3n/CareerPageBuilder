import React from "react";
import { useEditor, Element } from "@craftjs/core";
import { Container } from "./user/Container";
import { Button } from "./user/Button";
import { Text } from "./user/Text";

export const Toolbox = () => {
  const { connectors } = useEditor();

  return (
    <div className="p-4 border rounded shadow-md bg-gray-50">
      <div className="pb-2 text-center">
        <h3 className="font-semibold text-lg">Drag to add</h3>
      </div>
      <div className="space-y-2">
        <button
          ref={(ref) =>
            connectors.create(ref, <Button size="small" text="Click me" />)
          }
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Button
        </button>
        <button
          ref={(ref) => connectors.create(ref, <Text text="Hi world" />)}
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Text
        </button>
        <button
          ref={(ref) =>
            connectors.create(
              ref,
              <Element is={Container} padding={20} canvas />
            )
          }
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Container
        </button>
      </div>
    </div>
  );
};
