import React from "react";

export const Box = ({ children, className = "" }) => {
  return <div className={`p-4 rounded-md shadow ${className}`}>{children}</div>;
};
