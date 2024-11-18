import React from "react";
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
import { Header } from "../components/Header";

export default function App() {
  return (
    <div className="mx-auto">
      <Header />
      <Editor resolver={{ Card, Button, Text, Container, CardTop, CardBottom }}>
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
  );
}
