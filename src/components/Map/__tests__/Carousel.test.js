import React from "react";
import { render } from "testUtil";

import Carousel from "../Carousel";

describe("Render Carousel component properly", () => {
  const images = [
    "https://limehome.imgix.net/properties/99/4f04f238-1cce-4488-9169-00750d469d09.jpg",
    "https://limehome.imgix.net/properties/99/4f04f238-1cce-4488-9169-00750d469d09.jpg",
    "https://limehome.imgix.net/properties/99/4f04f238-1cce-4488-9169-00750d469d09.jpg",
  ];
  const fallbackUrl =
    "https://limehome.imgix.net/properties/99/4f04f238-1cce-4488-9169-00750d469d09.jpg";

  test("Render Carousel component with fallback image and status of loading", () => {
    const { getByTestId, queryByTestId } = render(
      <Carousel status="loading" {...{ images, fallbackUrl }} />
    );
    expect(getByTestId("carousel-fallback-image")).toBeDefined();
    expect(queryByTestId("carousel-image")).toBeNull();
  });

  test("Render Carousel component with main images and status of success", () => {
    const { getAllByTestId, queryByTestId } = render(
      <Carousel status="success" {...{ images, fallbackUrl }} />
    );
    expect(getAllByTestId("carousel-image")).toBeDefined();
    expect(queryByTestId("carousel-fallback-image")).toBeNull();
  });
});
