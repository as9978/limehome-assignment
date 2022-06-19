import React from "react";
import { render } from "testUtil";

import { Text } from "../index";

test("Render Text component properly", () => {
  const { container } = render(<Text variant="body" />);

  expect(container).toBeDefined();
});
