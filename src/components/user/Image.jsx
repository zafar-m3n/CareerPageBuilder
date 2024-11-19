import React from "react";
import { useNode } from "@craftjs/core";

export const Image = ({
  src = "https://picsum.photos/200",
  width = 150,
  height = 150,
  radius = 0,
  shadow = 0,
  alignment = "left",
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const dynamicStyle = {
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: `${radius}px`,
    boxShadow: `0px 0px ${shadow * 5}px rgba(0,0,0,0.1)`,
    display: "block",
    marginLeft: alignment === "left" ? "0" : "auto",
    marginRight: alignment === "right" ? "0" : "auto",
  };

  return (
    <div ref={(ref) => connect(drag(ref))} className="w-full">
      <img src={src} alt="Craft Image" style={dynamicStyle} />
    </div>
  );
};

const ImageSettings = () => {
  const {
    actions: { setProp },
    src,
    width,
    height,
    radius,
    shadow,
    alignment,
  } = useNode((node) => ({
    src: node.data.props.src,
    width: node.data.props.width,
    height: node.data.props.height,
    radius: node.data.props.radius,
    shadow: node.data.props.shadow,
    alignment: node.data.props.alignment,
  }));

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Image URL</label>
        <input
          type="text"
          value={src}
          onChange={(e) => setProp((props) => (props.src = e.target.value))}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium">Width</label>
          <input
            type="number"
            value={width}
            onChange={(e) =>
              setProp((props) => (props.width = parseInt(e.target.value, 10)))
            }
            className="w-full px-2 py-1 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Height</label>
          <input
            type="number"
            value={height}
            onChange={(e) =>
              setProp((props) => (props.height = parseInt(e.target.value, 10)))
            }
            className="w-full px-2 py-1 border rounded"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium">Border Radius</label>
          <input
            type="number"
            value={radius}
            onChange={(e) =>
              setProp((props) => (props.radius = parseInt(e.target.value, 10)))
            }
            className="w-full px-2 py-1 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Shadow</label>
          <input
            type="number"
            value={shadow}
            onChange={(e) =>
              setProp((props) => (props.shadow = parseInt(e.target.value, 10)))
            }
            className="w-full px-2 py-1 border rounded"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Alignment</label>
        <div className="flex space-x-2">
          {["left", "center", "right"].map((align) => (
            <label key={align}>
              <input
                type="radio"
                value={align}
                checked={alignment === align}
                onChange={() => setProp((props) => (props.alignment = align))}
                className="mr-1"
              />
              {align.charAt(0).toUpperCase() + align.slice(1)}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};


export const ImageDefaultProps = {
  src: "https://picsum.photos/200",
  width: 150,
  height: 150,
  radius: 0,
  shadow: 0,
  alignment: "left",
};

Image.craft = {
  props: ImageDefaultProps,
  related: {
    settings: ImageSettings,
  },
  name: "Image",
};
