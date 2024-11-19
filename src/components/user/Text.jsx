import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { useNode } from "@craftjs/core";

export const Text = ({
  text,
  fontSize,
  textAlign,
  fontWeight,
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
  textColor,
  textShadow,
  isItalic,
}) => {
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

  const fontWeightClass = {
    light: "font-light",
    regular: "font-normal",
    medium: "font-medium",
    bold: "font-bold",
  }[fontWeight];

  const dynamicStyle = {
    fontSize: `${fontSize}px`,
    textAlign,
    marginTop: `${marginTop}px`,
    marginLeft: `${marginLeft}px`,
    marginRight: `${marginRight}px`,
    marginBottom: `${marginBottom}px`,
    color: textColor,
    textShadow: `0px 0px ${textShadow}px ${textColor}`,
    fontStyle: isItalic ? "italic" : "normal",
  };

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      onClick={() => setEditable(true)}
      style={dynamicStyle}
      className={`w-full ${fontWeightClass}`}
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
        tagName="p"
        className="focus:outline-none"
      />
    </div>
  );
};

const Accordion = ({ title, children, isOpen, onToggle }) => (
  <div className="border rounded-t">
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

const TextSettings = () => {
  const {
    actions: { setProp },
    fontSize,
    textAlign,
    fontWeight,
    marginTop,
    marginLeft,
    marginRight,
    marginBottom,
    textColor,
    textShadow,
    isItalic,
  } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
    textAlign: node.data.props.textAlign,
    fontWeight: node.data.props.fontWeight,
    marginTop: node.data.props.marginTop,
    marginLeft: node.data.props.marginLeft,
    marginRight: node.data.props.marginRight,
    marginBottom: node.data.props.marginBottom,
    textColor: node.data.props.textColor,
    textShadow: node.data.props.textShadow,
    isItalic: node.data.props.isItalic,
  }));

  const [openSections, setOpenSections] = useState(["typography"]);

  const toggleSection = (section) =>
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );

  return (
    <div>
      <Accordion
        title="Typography"
        isOpen={openSections.includes("typography")}
        onToggle={() => toggleSection("typography")}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Font Size</label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="7"
              max="50"
              step="1"
              value={fontSize}
              onChange={(e) =>
                setProp(
                  (props) => (props.fontSize = parseInt(e.target.value, 10))
                )
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                accentColor: "#2563eb",
              }}
            />
            <span className="text-sm font-medium w-10 text-center">
              {fontSize}px
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Alignment</label>
            <div className="grid grid-cols-1 gap-2 mt-1">
              {["left", "center", "right", "justify"].map((align) => (
                <label key={align}>
                  <input
                    type="radio"
                    value={align}
                    checked={textAlign === align}
                    onChange={() =>
                      setProp((props) => (props.textAlign = align))
                    }
                    className="mr-1"
                  />
                  {align.charAt(0).toUpperCase() + align.slice(1)}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Font Weight</label>
            <div className="grid grid-cols-1 gap-2 mt-1">
              {["light", "regular", "medium", "bold"].map((weight) => (
                <label key={weight}>
                  <input
                    type="radio"
                    value={weight}
                    checked={fontWeight === weight}
                    onChange={() =>
                      setProp((props) => (props.fontWeight = weight))
                    }
                    className="mr-1"
                  />
                  {weight.charAt(0).toUpperCase() + weight.slice(1)}
                </label>
              ))}
            </div>
          </div>
        </div>
      </Accordion>

      <Accordion
        title="Margins"
        isOpen={openSections.includes("margins")}
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

      <Accordion
        title="Decoration"
        isOpen={openSections.includes("decoration")}
        onToggle={() => toggleSection("decoration")}
      >
        <div className="mb-2">
          <label className="block text-sm font-medium">Text Color</label>
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
        <div className="mb-2">
          <label className="block text-sm font-medium">Text Shadow</label>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={textShadow}
            onChange={(e) =>
              setProp(
                (props) => (props.textShadow = parseInt(e.target.value, 10))
              )
            }
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Font Style</label>
          <div className="flex items-center space-x-2 mt-1">
            <label>
              <input
                type="radio"
                value={false}
                checked={!isItalic}
                onChange={() => setProp((props) => (props.isItalic = false))}
                className="mr-1"
              />
              Regular
            </label>
            <label>
              <input
                type="radio"
                value={true}
                checked={isItalic}
                onChange={() => setProp((props) => (props.isItalic = true))}
                className="mr-1"
              />
              Italic
            </label>
          </div>
        </div>
      </Accordion>
    </div>
  );
};

Text.craft = {
  props: {
    text: "Hello World!",
    fontSize: 12,
    textAlign: "left",
    fontWeight: "regular",
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    textColor: "#000000",
    textShadow: 0,
    isItalic: false,
    name: "Text",
  },
  related: {
    settings: TextSettings,
  },
};
