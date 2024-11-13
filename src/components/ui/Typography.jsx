import React from "react";

export const Typography = ({ children, className = "" }) => {
  return <p className={`text-base font-medium ${className}`}>{children}</p>;
};
