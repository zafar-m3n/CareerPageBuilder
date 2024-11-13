// components/user/Card.js
import React from "react";
import { Text } from "./Text";
import { Button } from "./Button";
import { Container } from "./Container";

export const Card = ({ background = "bg-gray-200", padding = 4 }) => {
  return (
    <Container background={background} padding={padding}>
      <div className="text-only mb-4">
        <Text text="Title" fontSize="xl" />
        <Text text="Subtitle" fontSize="lg" />
      </div>
      <div className="buttons-only">
        <Button size="small" color="primary">
          Learn more
        </Button>
      </div>
    </Container>
  );
};
