import React from "react";

export const Text = ({ text, fontSize }) => {
  return (
    <div>
      <p className={`text-${fontSize}`}>{text}</p>
    </div>
  );
};
