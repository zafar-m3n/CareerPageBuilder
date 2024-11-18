import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { useNode } from "@craftjs/core";
import { HexColorPicker } from "react-colorful";

export const Button = ({
  size = "md",
  variant = "contained",
  color = "primary",
  text = "Click me",
  backgroundColor = "#007bff",
  textColor = "#ffffff",
  marginTop = 5,
  marginLeft = 0,
  marginRight = 0,
  marginBottom = 5,
}) => {
  const {
    connectors: { connect, drag },
    actions: { setProp },
    isActive,
  } = useNode((node) => ({
    isActive: node.events.selected,
  }));

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (!isActive) setEditable(false);
  }, [isActive]);

  const baseStyle = "px-4 py-2 rounded focus:outline-none";
  const sizeStyle =
    size === "small" ? "text-sm" : size === "large" ? "text-lg" : "text-md";
  const variantStyle =
    variant === "outlined"
      ? `border text-${color} border-current`
      : variant === "text"
      ? `bg-transparent text-${color}`
      : "";
  const style = {
    backgroundColor: variant === "contained" ? backgroundColor : "transparent",
    color: textColor,
    marginTop: `${marginTop}px`,
    marginLeft: `${marginLeft}px`,
    marginRight: `${marginRight}px`,
    marginBottom: `${marginBottom}px`,
  };

  return (
    <button
      ref={(ref) => connect(drag(ref))}
      className={`${baseStyle} ${sizeStyle} ${variantStyle}`}
      style={style}
      onClick={() => setEditable(true)}
    >
      <ContentEditable
        html={text}
        disabled={!editable}
        onChange={(e) =>
          setProp(
            (props) =>
              (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, ""))
          )
        }
        tagName="span"
        onBlur={() => setEditable(false)}
        className="focus:outline-none"
      />
    </button>
  );
};

const Accordion = ({ title, children, isOpen, onToggle }) => (
  <div className="border rounded mb-2">
    <div
      className="p-2 bg-gray-100 cursor-pointer flex justify-between items-center"
      onClick={onToggle}
    >
      <span className="font-medium">{title}</span>
      <span>{isOpen ? "−" : "+"}</span>
    </div>
    <div
      className={`transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? "max-h-screen" : "max-h-0"
      }`}
    >
      {isOpen && <div className="p-2">{children}</div>}
    </div>
  </div>
);

const ButtonSettings = () => {
  const {
    actions: { setProp },
    backgroundColor,
    textColor,
    size,
    variant,
    marginTop,
    marginLeft,
    marginRight,
    marginBottom,
  } = useNode((node) => ({
    size: node.data.props.size,
    variant: node.data.props.variant,
    backgroundColor: node.data.props.backgroundColor,
    textColor: node.data.props.textColor,
    marginTop: node.data.props.marginTop,
    marginLeft: node.data.props.marginLeft,
    marginRight: node.data.props.marginRight,
    marginBottom: node.data.props.marginBottom,
  }));

  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) =>
    setOpenSection(openSection === section ? null : section);

  return (
    <div>
      <Accordion
        title="Size & Variant"
        isOpen={openSection === "sizeVariant"}
        onToggle={() => toggleSection("sizeVariant")}
      >
        <div className="mb-2">
          <label className="block text-sm font-medium">Button Size</label>
          <div className="flex space-x-2 mt-1">
            {["small", "medium", "large"].map((s) => (
              <label key={s}>
                <input
                  type="radio"
                  value={s}
                  checked={size === s}
                  onChange={() => setProp((props) => (props.size = s))}
                  className="mr-1"
                />
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Button Variant</label>
          <div className="flex space-x-2 mt-1">
            {["text", "outlined", "contained"].map((v) => (
              <label key={v}>
                <input
                  type="radio"
                  value={v}
                  checked={variant === v}
                  onChange={() => setProp((props) => (props.variant = v))}
                  className="mr-1"
                />
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </label>
            ))}
          </div>
        </div>
      </Accordion>

      <Accordion
        title="Colors"
        isOpen={openSection === "colors"}
        onToggle={() => toggleSection("colors")}
      >
        <div className="mb-2">
          <label className="block text-sm font-medium">
            Button Background Color
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={backgroundColor}
              onChange={(e) =>
                setProp((props) => (props.backgroundColor = e.target.value))
              }
              className="border rounded px-2 py-1 w-full"
            />
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) =>
                setProp((props) => (props.backgroundColor = e.target.value))
              }
              className="w-8 h-8 border rounded cursor-pointer"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Button Text Color</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={textColor}
              onChange={(e) =>
                setProp((props) => (props.textColor = e.target.value))
              }
              className="border rounded px-2 py-1 w-full"
            />
            <input
              type="color"
              value={textColor}
              onChange={(e) =>
                setProp((props) => (props.textColor = e.target.value))
              }
              className="w-8 h-8 border rounded cursor-pointer"
            />
          </div>
        </div>
      </Accordion>

      <Accordion
        title="Margins"
        isOpen={openSection === "margins"}
        onToggle={() => toggleSection("margins")}
      >
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Top", value: marginTop, prop: "marginTop" },
            { label: "Left", value: marginLeft, prop: "marginLeft" },
            { label: "Right", value: marginRight, prop: "marginRight" },
            { label: "Bottom", value: marginBottom, prop: "marginBottom" },
          ].map((m) => (
            <div key={m.prop}>
              <label className="block text-sm font-medium">{m.label}</label>
              <input
                type="number"
                value={m.value}
                onChange={(e) =>
                  setProp(
                    (props) =>
                      (props[m.prop] = parseInt(e.target.value, 10) || 0)
                  )
                }
                className="w-full px-2 py-1 border rounded"
              />
            </div>
          ))}
        </div>
      </Accordion>
    </div>
  );
};

Button.craft = {
  props: {
    size: "small",
    variant: "contained",
    text: "Click me",
    backgroundColor: "#007bff",
    textColor: "#ffffff",
    marginTop: 5,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 5,
    name: "Button",
  },
  related: {
    settings: ButtonSettings,
  },
};
