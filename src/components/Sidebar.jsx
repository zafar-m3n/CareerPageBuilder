import React from "react";
import Icon from "@/components/ui/Icon";
import LogoIcon from "@/assets/logo-sm.png";
import Logo from "@/assets/logo.png";
import { useEditor, Element } from "@craftjs/core";
import { Container } from "./user/Container";
import { Button } from "./user/Button";
import { Text } from "./user/Text";
import { Image } from "./user/Image";

export default function Sidebar({ expanded, onToggle }) {
  const { connectors } = useEditor();

  return (
    <aside className="fixed top-0 left-0 z-50 h-screen">
      <nav className="h-full flex flex-col justify-between bg-white border-r shadow-sm transition-all duration-300">
        <div className="p-4 pb-2 flex justify-between items-center">
          <div
            className={`transition-all duration-300 overflow-hidden ${
              expanded ? "max-w-[128px]" : "max-w-0"
            }`}
          >
            <img src={Logo} alt="Cleveri Logo" className="w-full" />
          </div>
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? (
              <Icon icon="heroicons:chevron-double-left" width={20} />
            ) : (
              <Icon icon="heroicons:chevron-double-right" width={20} />
            )}
          </button>
        </div>

        <div className="flex-1 px-3 space-y-2">
          <SidebarItem
            ref={(ref) => connectors.create(ref, <Button />)}
            icon="formkit:button"
            text="Button"
            expanded={expanded}
          />
          <SidebarItem
            ref={(ref) => connectors.create(ref, <Text />)}
            icon="icon-park-outline:text"
            text="Text"
            expanded={expanded}
          />
          <SidebarItem
            ref={(ref) =>
              connectors.create(
                ref,
                <Element is={Container} padding={20} canvas />
              )
            }
            icon="radix-icons:box"
            text="Container"
            expanded={expanded}
          />
          <SidebarItem
            ref={(ref) => connectors.create(ref, <Image />)}
            icon="mdi:image-outline"
            text="Image"
            expanded={expanded}
          />
        </div>

        <div
          className={`border-t flex items-center p-3 ${
            expanded ? "flex-row" : "flex-col-reverse"
          }`}
        >
          <img src={LogoIcon} alt="" className="w-10 h-10 rounded-md" />
          {expanded && (
            <div className={`overflow-hidden transition-all duration-300 ml-3`}>
              <div className="leading-4">
                <h4 className="font-semibold">Powered by Cleveri</h4>
                <span className="text-xs text-gray-600">
                  &copy; Copyright 2024. All Rights Reserved
                </span>
              </div>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}

const SidebarItem = React.forwardRef(({ icon, text, expanded }, ref) => (
  <li
    ref={ref}
    className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
      expanded
        ? "hover:bg-indigo-50 text-gray-600"
        : "text-gray-400 hover:bg-gray-100"
    }`}
  >
    <Icon icon={icon} width={20} />
    <span
      className={`transition-all duration-300 ${
        expanded ? "max-w-[208px] ml-3 opacity-100" : "hidden"
      }`}
    >
      {text}
    </span>
    {!expanded && (
      <div
        className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-0 -translate-x-3 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
      >
        {text}
      </div>
    )}
  </li>
));
