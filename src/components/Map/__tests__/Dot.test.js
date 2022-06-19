import React from "react";
import { Animated } from "react-native";
import { render } from "testUtil";

import Dot from "../Dot";

test("Render Dot component properly", () => {
  const mockAnimatedValue = new Animated.Value(0);

  const { container } = render(
    <Dot currentIndex={mockAnimatedValue} index={0} />
  );

  expect(container).toBeDefined();
});
