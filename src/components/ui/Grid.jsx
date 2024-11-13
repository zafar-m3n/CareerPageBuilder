import React from "react";

export const Grid = ({
  children,
  className = "",
  direction = "row",
  spacing = 2,
}) => {
  const gridStyles = `flex flex-${direction} gap-${spacing} ${className}`;
  return <div className={gridStyles}>{children}</div>;
};
