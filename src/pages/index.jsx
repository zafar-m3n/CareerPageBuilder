import React, { useState } from "react";
import { Toolbox } from "../components/Toolbox";
import { SettingsPanel } from "../components/SettingsPanel";
import { Topbar } from "../components/Topbar";

import { Container } from "../components/user/Container";
import { Button } from "../components/user/Button";
import { Card } from "../components/user/Card";
import { Text } from "../components/user/Text";
import { CardTop } from "../components/user/Card";
import { CardBottom } from "../components/user/Card";

import { Editor, Frame, Element } from "@craftjs/core";
import Sidebar, { SidebarItem } from "../components/Sidebar";

export default function App() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mx-auto">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar expanded={expanded} onToggle={() => setExpanded(!expanded)}>
          <SidebarItem
            icon="heroicons:rectangle-group"
            text="Container"
            expanded={expanded}
          />
          <SidebarItem
            icon="heroicons:credit-card"
            text="Card"
            expanded={expanded}
          />
          <SidebarItem
            icon="heroicons:rectangle-stack"
            text="Button"
            expanded={expanded}
          />
          <SidebarItem
            icon="heroicons:document-text"
            text="Text"
            expanded={expanded}
          />
        </Sidebar>

        {/* Main Editor Area */}
        <div
          className={`transition-all duration-300 ${
            expanded ? "w-[calc(100%-256px)]" : "w-[calc(100%-64px)]"
          }`}
        >
          <Editor
            resolver={{ Card, Button, Text, Container, CardTop, CardBottom }}
          >
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-4">
                <Topbar />
              </div>
              <div className="col-span-3">
                <Frame>
                  <Element
                    is={Container}
                    padding={5}
                    background="bg-[#f0f5f9] border"
                    canvas
                  >
                    <Card />
                    <Button size="small" text="Click"></Button>
                    <Text fontSize="small" text="Hi world!" />
                    <Element
                      is={Container}
                      padding={6}
                      background="bg-gray-400"
                      canvas
                    >
                      <Text fontSize="small" text="It's me again!" />
                    </Element>
                  </Element>
                </Frame>
              </div>
              <div className="col-span-1 bg-white p-2 rounded shadow">
                <Toolbox />
                <SettingsPanel />
              </div>
            </div>
          </Editor>
        </div>
      </div>
    </div>
  );
}
