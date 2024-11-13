import React from "react";
import { useNode } from "@craftjs/core";

export const Button = ({
  size = "md",
  variant = "contained",
  color = "primary",
  children,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const baseStyle = "px-4 py-2 rounded";
  const sizeStyle =
    size === "small" ? "text-sm" : size === "large" ? "text-lg" : "text-md";
  const colorStyle =
    color === "primary" ? "bg-blue-500 text-white" : "bg-gray-500 text-white";
  const variantStyle =
    variant === "outlined" ? "border border-blue-500 text-blue-500" : "";

  return (
    <button
      ref={(ref) => connect(drag(ref))}
      className={`${baseStyle} ${sizeStyle} ${colorStyle} ${variantStyle}`}
    >
      {children}
    </button>
  );
};

const ButtonSettings = () => {
  const {
    actions: { setProp },
    size,
    variant,
    color,
  } = useNode((node) => ({
    size: node.data.props.size,
    variant: node.data.props.variant,
    color: node.data.props.color,
  }));

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Size</label>
        <div className="flex space-x-2 mt-1">
          <label>
            <input
              type="radio"
              value="small"
              checked={size === "small"}
              onChange={() => setProp((props) => (props.size = "small"))}
              className="mr-1"
            />
            Small
          </label>
          <label>
            <input
              type="radio"
              value="medium"
              checked={size === "medium"}
              onChange={() => setProp((props) => (props.size = "medium"))}
              className="mr-1"
            />
            Medium
          </label>
          <label>
            <input
              type="radio"
              value="large"
              checked={size === "large"}
              onChange={() => setProp((props) => (props.size = "large"))}
              className="mr-1"
            />
            Large
          </label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Variant</label>
        <div className="flex space-x-2 mt-1">
          <label>
            <input
              type="radio"
              value="text"
              checked={variant === "text"}
              onChange={() => setProp((props) => (props.variant = "text"))}
              className="mr-1"
            />
            Text
          </label>
          <label>
            <input
              type="radio"
              value="outlined"
              checked={variant === "outlined"}
              onChange={() => setProp((props) => (props.variant = "outlined"))}
              className="mr-1"
            />
            Outlined
          </label>
          <label>
            <input
              type="radio"
              value="contained"
              checked={variant === "contained"}
              onChange={() => setProp((props) => (props.variant = "contained"))}
              className="mr-1"
            />
            Contained
          </label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Color</label>
        <div className="flex space-x-2 mt-1">
          <label>
            <input
              type="radio"
              value="default"
              checked={color === "default"}
              onChange={() => setProp((props) => (props.color = "default"))}
              className="mr-1"
            />
            Default
          </label>
          <label>
            <input
              type="radio"
              value="primary"
              checked={color === "primary"}
              onChange={() => setProp((props) => (props.color = "primary"))}
              className="mr-1"
            />
            Primary
          </label>
          <label>
            <input
              type="radio"
              value="secondary"
              checked={color === "secondary"}
              onChange={() => setProp((props) => (props.color = "secondary"))}
              className="mr-1"
            />
            Secondary
          </label>
        </div>
      </div>
    </div>
  );
};

Button.craft = {
  props: {
    size: "small",
    variant: "contained",
    color: "primary",
    text: "This is a button component.",
  },
  related: {
    settings: ButtonSettings,
  },
};
