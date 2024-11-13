import React from "react";
import { useNode } from "@craftjs/core";

export const Text = ({ text, fontSize }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <p className={`text-${fontSize}`}>{text}</p>
    </div>
  );
};

Text.craft = {
  rules: {
    canDrag: (node) => node.data.props.text !== "Drag",
  },
};
