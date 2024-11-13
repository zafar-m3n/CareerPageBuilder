// pages/index.js

import React from "react";
import { Toolbox } from "../components/Toolbox";
import { SettingsPanel } from "../components/SettingsPanel";
import { Topbar } from "../components/Topbar";

import { Container } from "../components/user/Container";
import { Button } from "../components/user/Button";
import { Card } from "../components/user/Card";
import { Text } from "../components/user/Text";

export default function App() {
  return (
    <div className="mx-auto">
      <h1 className="text-xl font-semibold text-center mt-4">
        Cleveri Web Page Builder
      </h1>
      <div className="grid grid-cols-4 gap-4 pt-4">
        {/* Topbar */}
        <div className="col-span-4">
          <Topbar />
        </div>

        {/* Main content area */}
        <div className="col-span-3">
          <Container padding={5} background="bg-gray-200">
            <Card />
          </Container>
        </div>

        {/* Sidebar */}
        <div className="col-span-1 bg-white p-2 rounded shadow">
          <Toolbox />
          <SettingsPanel />
        </div>
      </div>
    </div>
  );
}
