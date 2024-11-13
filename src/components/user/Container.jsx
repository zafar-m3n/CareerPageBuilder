import React from "react";

export const Container = ({
  background = "bg-white",
  padding = 0,
  children,
}) => {
  return (
    <div className={`m-2 p-${padding} ${background} rounded shadow`}>
      {children}
    </div>
  );
};
