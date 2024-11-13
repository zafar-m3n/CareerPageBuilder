import React from "react";
import { useNode } from "@craftjs/core";

export const Container = ({
  background = "bg-white",
  padding = 0,
  children,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className={`m-2 p-${padding} ${background} rounded shadow`}
    >
      {children}
    </div>
  );
};

export const ContainerSettings = () => {
  const {
    background,
    padding,
    actions: { setProp },
  } = useNode((node) => ({
    background: node.data.props.background,
    padding: node.data.props.padding,
  }));

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Background Color</label>
        <input
          type="color"
          value={background || "#ffffff"}
          onChange={(e) =>
            setProp((props) => (props.background = e.target.value))
          }
          className="w-full mt-1 h-8 cursor-pointer"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Padding</label>
        <input
          type="range"
          min="0"
          max="50"
          step="1"
          value={padding}
          onChange={(e) =>
            setProp((props) => (props.padding = parseInt(e.target.value, 10)))
          }
          className="w-full mt-1"
        />
      </div>
    </div>
  );
};

export const ContainerDefaultProps = {
  background: "#ffffff",
  padding: 3,
};

Container.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
  name: "Container",
};
