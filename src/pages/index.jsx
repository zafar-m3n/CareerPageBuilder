// pages/index.js

import React from "react";
import { Toolbox } from "../components/Toolbox";
import { SettingsPanel } from "../components/SettingsPanel";
import { Topbar } from "../components/Topbar";

import { Container } from "../components/user/Container";
import { Button } from "../components/user/Button";
import { Card } from "../components/user/Card";
import { Text } from "../components/user/Text";

import { Editor, Frame, Element } from "@craftjs/core";

export default function App() {
  return (
    <div className="mx-auto">
      <h1 className="text-xl font-semibold text-center mt-4">
        Cleveri Web Page Builder
      </h1>
      <Editor resolver={{ Card, Button, Text, Container }}>
        <div className="grid grid-cols-4 gap-4 pt-4">
          <div className="col-span-4">
            <Topbar />
          </div>
          <div className="col-span-3">
            <Frame>
              <Element
                is={Container}
                padding={5}
                background="bg-gray-50"
                canvas
              >
                <Card />
                <Button size="small">Click</Button>
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
