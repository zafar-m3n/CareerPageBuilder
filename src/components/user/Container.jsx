import React, { useState } from "react";
import { useNode } from "@craftjs/core";

export const Container = ({
  editable = true,
  background = "#ffffff",
  textColor = "#000000",
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  paddingTop = 12,
  paddingBottom = 12,
  paddingLeft = 12,
  paddingRight = 12,
  radius = 8,
  shadow = 2,
  width = "300px",
  height = "300px",
  flexDirection = "flex-col",
  justifyContent = "justify-start",
  alignItems = "items-start",
  children,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const dynamicStyle = {
    backgroundColor: background,
    color: textColor,
    marginTop: `${marginTop}px`,
    marginBottom: `${marginBottom}px`,
    marginLeft: `${marginLeft}px`,
    marginRight: `${marginRight}px`,
    paddingTop: `${paddingTop}px`,
    paddingBottom: `${paddingBottom}px`,
    paddingLeft: `${paddingLeft}px`,
    paddingRight: `${paddingRight}px`,
    borderRadius: `${radius}px`,
    boxShadow: `0px 0px ${shadow * 5}px rgba(0,0,0,0.1)`,
    width: width === "full" ? "100%" : width,
    height,
  };

  return (
    <div
      ref={(ref) => editable && connect(drag(ref))}
      className={`flex ${flexDirection} ${justifyContent} ${alignItems}`}
      style={dynamicStyle}
    >
      {children}
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

export const ContainerSettings = () => {
  const {
    actions: { setProp },
    background,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    radius,
    shadow,
    width,
    height,
    flexDirection,
    justifyContent,
    alignItems,
  } = useNode((node) => ({
    background: node.data.props.background,
    marginTop: node.data.props.marginTop,
    marginBottom: node.data.props.marginBottom,
    marginLeft: node.data.props.marginLeft,
    marginRight: node.data.props.marginRight,
    paddingTop: node.data.props.paddingTop,
    paddingBottom: node.data.props.paddingBottom,
    paddingLeft: node.data.props.paddingLeft,
    paddingRight: node.data.props.paddingRight,
    radius: node.data.props.radius,
    shadow: node.data.props.shadow,
    width: node.data.props.width,
    height: node.data.props.height,
    flexDirection: node.data.props.flexDirection,
    justifyContent: node.data.props.justifyContent,
    alignItems: node.data.props.alignItems,
  }));

  const [openSections, setOpenSections] = useState(["dimensions"]);

  const toggleSection = (section) =>
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );

  return (
    <div>
      <Accordion
        title="Dimensions"
        isOpen={openSections.includes("dimensions")}
        onToggle={() => toggleSection("dimensions")}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Width (px)
            </label>
            <input
              type="number"
              value={parseInt(width, 10)}
              onChange={(e) =>
                setProp((props) => (props.width = `${e.target.value}px`))
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Height (px)
            </label>
            <input
              type="number"
              value={parseInt(height, 10)}
              onChange={(e) =>
                setProp((props) => (props.height = `${e.target.value}px`))
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </Accordion>
      <Accordion
        title="Colors"
        isOpen={openSections.includes("colors")}
        onToggle={() => toggleSection("colors")}
      >
        <div className="mb-2">
          <label className="block text-sm font-medium">Background Color</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={background}
              onChange={(e) =>
                setProp((props) => (props.background = e.target.value))
              }
              className="border rounded px-2 py-1 w-full"
            />
            <input
              type="color"
              value={background}
              onChange={(e) =>
                setProp((props) => (props.background = e.target.value))
              }
              className="w-8 h-8 border rounded cursor-pointer"
            />
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
        title="Padding"
        isOpen={openSections.includes("padding")}
        onToggle={() => toggleSection("padding")}
      >
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Top", value: paddingTop, prop: "paddingTop" },
            { label: "Left", value: paddingLeft, prop: "paddingLeft" },
            { label: "Right", value: paddingRight, prop: "paddingRight" },
            { label: "Bottom", value: paddingBottom, prop: "paddingBottom" },
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
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium">Radius</label>
            <input
              type="number"
              value={radius}
              onChange={(e) =>
                setProp(
                  (props) => (props.radius = parseInt(e.target.value, 10) || 0)
                )
              }
              className="w-full px-2 py-1 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Shadow</label>
            <input
              type="number"
              value={shadow}
              onChange={(e) =>
                setProp(
                  (props) => (props.shadow = parseInt(e.target.value, 10) || 0)
                )
              }
              className="w-full px-2 py-1 border rounded"
            />
          </div>
        </div>
      </Accordion>
      <Accordion
        title="Alignment"
        isOpen={openSections.includes("alignment")}
        onToggle={() => toggleSection("alignment")}
      >
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium">Flex Direction</label>
            <select
              value={flexDirection}
              onChange={(e) =>
                setProp((props) => (props.flexDirection = e.target.value))
              }
              className="w-full px-2 py-1 border rounded"
            >
              <option value="flex-row">Row</option>
              <option value="flex-col">Column</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Justify Content</label>
            <select
              value={justifyContent}
              onChange={(e) =>
                setProp((props) => (props.justifyContent = e.target.value))
              }
              className="w-full px-2 py-1 border rounded"
            >
              <option value="justify-start">Start</option>
              <option value="justify-center">Center</option>
              <option value="justify-end">End</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Align Items</label>
            <select
              value={alignItems}
              onChange={(e) =>
                setProp((props) => (props.alignItems = e.target.value))
              }
              className="w-full px-2 py-1 border rounded"
            >
              <option value="items-start">Start</option>
              <option value="items-center">Center</option>
              <option value="items-end">End</option>
            </select>
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export const ContainerDefaultProps = {
  editable: true,
  background: "#ffffff",
  textColor: "#000000",
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 12,
  paddingRight: 12,
  radius: 8,
  shadow: 2,
  width: "300px",
  height: "300px",
  flexDirection: "flex-col",
  justifyContent: "justify-start",
  alignItems: "items-start",
};

Container.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
  name: "Container",
};
