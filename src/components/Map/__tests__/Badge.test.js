import React from "react";
import { render } from "testUtil";

import Badge from "../Badge";

test("Render Badge component properly", () => {
  const { getByText } = render(<Badge title="Test title" />);

  expect(getByText("Test title")).toBeDefined();
});
