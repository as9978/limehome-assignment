import React from "react";
import { render } from "testUtil";

import { Box } from "../index";

test("Render Box component properly", () => {
  const { container } = render(<Box />);

  expect(container).toBeDefined();
});
