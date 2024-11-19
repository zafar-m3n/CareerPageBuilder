import React, { useState } from "react";
import { Toolbox } from "../components/Toolbox";
import { SettingsPanel } from "../components/SettingsPanel";
import { Topbar } from "../components/Topbar";

import { Container } from "../components/user/Container";
import { Button } from "../components/user/Button";
import { Text } from "../components/user/Text";

import { Editor, Frame, Element } from "@craftjs/core";
import Sidebar from "../components/Sidebar";

export default function App() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex h-screen">
      <Editor resolver={{ Button, Text, Container }}>
        <Sidebar expanded={expanded} onToggle={() => setExpanded(!expanded)} />
        <div
          className={`flex-1 transition-all duration-300 ${
            expanded ? "ml-64 pl-4" : "ml-16"
          }`}
        >
          <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
            <Topbar />
          </div>
          <div className="grid grid-cols-10">
            <div className="col-span-8 p-4">
              <Frame>
                <Element is={Container} width="full" canvas></Element>
              </Frame>
            </div>
            <div className="col-span-2 space-y-4 sticky top-[3rem] h-[calc(100vh-3rem)] overflow-y-auto bg-white border-l shadow-sm">
              {/* <Toolbox /> */}
              <SettingsPanel />
            </div>
          </div>
        </div>
      </Editor>
    </div>
  );
}
