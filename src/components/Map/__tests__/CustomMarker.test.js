import React from "react";
import { render } from "testUtil";

import CustomMarker from "../CustomMarker";

describe("Render CustomMarker component properly", () => {
  test("Render CustomMarker component with isSelected={true} prop", () => {
    const { getByTestId } = render(<CustomMarker price={220} isSelected />);

    expect(getByTestId("custom-marker-container")).toHaveStyle({
      backgroundColor: "#b26422",
    });
    expect(getByTestId("custom-marker-price").props.children[0]).toBe(220);
  });

  test("Render CustomMarker component with isSelected={false} prop", () => {
    const { getByTestId } = render(
      <CustomMarker price={220} isSelected={false} />
    );

    expect(getByTestId("custom-marker-container")).toHaveStyle({
      backgroundColor: "#4B4B4D",
    });
    expect(getByTestId("custom-marker-price").props.children[0]).toBe(220);
  });
});
