import React from "react";
import { render } from "testUtil";

import PropertiesList from "../PropertiesList";

const mockData = [
  {
    city: "test",
    city_id: 10,
    distance: 10,
    external_id: "test",
    id: 10,
    images: [
      {
        is_portrait: false,
        position: 10,
        tags: ["test1", "test2"],
        unit_group_ids: [1, 2],
        url: "https://limehome.imgix.net/properties/99/4f04f238-1cce-4488-9169-00750d469d09.jpg",
      },
      {
        is_portrait: false,
        position: 10,
        tags: ["test1", "test2"],
        unit_group_ids: [1, 2],
        url: "https://limehome.imgix.net/properties/99/4f04f238-1cce-4488-9169-00750d469d09.jpg",
      },
    ],
    location: {
      lat: 52.52259309999999,
      lng: 13.3589213,
      city: "Berlin",
      postalCode: "10557",
      countryCode: "DE",
      addressLine1: "3 Werftstraße ",
      countryName: "Germany",
    },
    lowest_price_per_month: 10,
    lowest_price_per_night: 10,
    name: "test",
    review_widget_id: 10,
    street: "test",
  },
  {
    city: "test",
    city_id: 10,
    distance: 10,
    external_id: "test",
    id: 10,
    images: [
      {
        is_portrait: false,
        position: 10,
        tags: ["test1", "test2"],
        unit_group_ids: [1, 2],
        url: "https://limehome.imgix.net/properties/99/4f04f238-1cce-4488-9169-00750d469d09.jpg",
      },
      {
        is_portrait: false,
        position: 10,
        tags: ["test1", "test2"],
        unit_group_ids: [1, 2],
        url: "https://limehome.imgix.net/properties/99/4f04f238-1cce-4488-9169-00750d469d09.jpg",
      },
    ],
    location: {
      lat: 52.52259309999999,
      lng: 13.3589213,
      city: "Berlin",
      postalCode: "10557",
      countryCode: "DE",
      addressLine1: "3 Werftstraße ",
      countryName: "Germany",
    },
    lowest_price_per_month: 10,
    lowest_price_per_night: 10,
    name: "test",
    review_widget_id: 10,
    street: "test",
  },
];

test("Render PropertiesList component properly", () => {
  const currentMarkerIndex = 0;
  const setCurrentMarkerIndex = jest.fn();

  const { container, getAllByTestId } = render(
    <PropertiesList
      data={mockData}
      {...{ setCurrentMarkerIndex, currentMarkerIndex }}
    />
  );

  expect(container).toBeDefined();
  expect(getAllByTestId("propertiesList-item")).toBeDefined();
});
