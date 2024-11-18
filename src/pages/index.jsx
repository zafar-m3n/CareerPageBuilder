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
import Sidebar from "../components/Sidebar";

export default function App() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mx-auto">
      <Editor resolver={{ Card, Button, Text, Container, CardTop, CardBottom }}>
        <div className="flex">
          {/* Sidebar */}
          <Sidebar
            expanded={expanded}
            onToggle={() => setExpanded(!expanded)}
          />

          {/* Main Editor Area */}
          <div
            className={`transition-all duration-300 ${
              expanded ? "w-[calc(100%-256px)]" : "w-[calc(100%-64px)]"
            }`}
          >
            <div className="grid grid-cols-10">
              <div className="col-span-10">
                <Topbar />
              </div>
              <div className="col-span-8 m-4">
                <Frame>
                  <Element is={Container} canvas></Element>
                </Frame>
              </div>
              <div className="col-span-2 bg-white">
                <Toolbox />
                <SettingsPanel />
              </div>
            </div>
          </div>
        </div>
      </Editor>
    </div>
  );
}
