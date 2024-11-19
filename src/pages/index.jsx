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
    <div className="flex h-screen">
      <Editor resolver={{ Card, Button, Text, Container, CardTop, CardBottom }}>
        <Sidebar expanded={expanded} onToggle={() => setExpanded(!expanded)} />
        <div
          className={`flex-1 transition-all duration-300 ${
            expanded ? "ml-64 pl-4" : "ml-16"
          }`}
        >
          <div className="grid grid-cols-10">
            <div className="col-span-10">
              <Topbar />
            </div>
            <div className="col-span-8 p-4">
              <Frame>
                <Element is={Container} canvas></Element>
              </Frame>
            </div>
            <div className="col-span-2 space-y-4">
              <Toolbox />
              <SettingsPanel />
            </div>
          </div>
        </div>
      </Editor>
    </div>
  );
}
