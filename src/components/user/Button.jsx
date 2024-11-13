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
