import React from "react";
import { render } from "testUtil";

import Card from "../Card";

test("Render Card component properly", () => {
  const { getByTestId } = render(
    <Card
      image="https://limehome.imgix.net/properties/99/4f04f238-1cce-4488-9169-00750d469d09.jpg"
      id="150"
      description="test decription"
      title="test title"
      price={150}
    />
  );

  expect(getByTestId("card-image")).toBeDefined();
  expect(getByTestId("card-title").props.children).toBe("test title");
  expect(getByTestId("card-description").props.children).toBe(
    "test decription"
  );
  expect(getByTestId("card-price").props.children[0]).toBe(150);
});
