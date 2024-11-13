import React from "react";
import { Element, useNode } from "@craftjs/core";
import { Text } from "./Text";
import { Button } from "./Button";
import { Container } from "./Container";

export const CardTop = ({ children }) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div ref={connect} className="text-only">
      {children}
    </div>
  );
};

CardTop.craft = {
  rules: {
    canMoveIn: (incomingNodes) =>
      incomingNodes.every((node) => node.data.type === Text),
  },
};

export const CardBottom = ({ children }) => {
  const {
    connectors: { connect },
  } = useNode();
  return <div ref={connect}>{children}</div>;
};

CardBottom.craft = {
  rules: {
    canMoveIn: (incomingNodes) =>
      incomingNodes.every((node) => node.data.type === Button),
  },
};

export const Card = ({ background = "bg-gray-50", padding = 20 }) => {
  return (
    <Container background={background} padding={padding}>
      <Element id="text" is={CardTop} canvas>
        <Text text="Title" fontSize="xl" />
        <Text text="Subtitle" fontSize="lg" />
      </Element>
      <Element id="buttons" is={CardBottom} canvas>
        <Button size="small" color="primary">
          Learn more
        </Button>
      </Element>
    </Container>
  );
};
