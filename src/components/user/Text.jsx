import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { useNode } from "@craftjs/core";

export const Text = ({ text, fontSize }) => {
  const {
    connectors: { connect, drag },
    isActive,
    actions: { setProp },
  } = useNode((node) => ({
    isActive: node.events.selected,
  }));

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (!isActive) setEditable(false);
  }, [isActive]);

  return (
    <div ref={(ref) => connect(drag(ref))} onClick={() => setEditable(true)}>
      <ContentEditable
        html={text}
        disabled={!editable}
        onChange={(e) =>
          setProp(
            (props) =>
              (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, ""))
          )
        }
        tagName="p"
        style={{ fontSize: `${fontSize}px` }}
      />
    </div>
  );
};

const TextSettings = () => {
  const {
    actions: { setProp },
    fontSize,
  } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
  }));

  return (
    <div className="text-additional-settings mt-2">
      <label className="text-sm font-medium mb-1">Font size</label>
      <input
        type="range"
        min="7"
        max="50"
        step="1"
        value={fontSize}
        onChange={(e) =>
          setProp((props) => (props.fontSize = parseInt(e.target.value, 10)))
        }
        className="w-full"
      />
    </div>
  );
};

Text.craft = {
  props: {
    text: "This is a Text component",
    fontSize: 20,
  },
  related: {
    settings: TextSettings,
  },
};
