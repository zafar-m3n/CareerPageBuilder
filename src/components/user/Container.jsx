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
