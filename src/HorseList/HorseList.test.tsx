import React, { ComponentProps } from "react";
import { render, fireEvent } from "@testing-library/react";

import { HorseList } from "./HorseList";
import { Horse } from "../types";

const horsesMock: Horse[] = [
  {
    id: "c3fae1ff-fc79-4531-90de-e7a9f4997643",
    name: "Thunderdash",
    profile: {
      favouriteFood: "Hot Chips",
      physical: { height: 200, weight: 450 },
    },
  },
  {
    id: "54e21048-90ae-46e4-a9ba-ff1cde8f1d3e",
    name: "Artax",
    profile: {
      favouriteFood: "Carrots",
      physical: { height: 198.99, weight: 400 },
    },
  },
];

const generatedHorses: Horse[] = Array.from({ length: 33 }, () => ({
  ...horsesMock[0],
  id: window.btoa(Math.random().toString()),
}));

describe("HorseList component", () => {
  const defaultProps: ComponentProps<typeof HorseList> = {
    status: "idling",
    horses: horsesMock,
    fetchHorses: jest.fn(),
    routing: {
      goToCreatePage: jest.fn(),
    },
  };

  it("renders header", () => {
    const { getByTestId } = render(<HorseList {...defaultProps} />);

    expect(getByTestId("page-header")).toHaveTextContent("My Horses");
  });

  it("renders list of horse names", () => {
    const { getByText } = render(<HorseList {...defaultProps} />);

    horsesMock.forEach(({ name }) => {
      expect(getByText(name)).toHaveTextContent(name);
    });
  });

  it("displays 10 horses per page", () => {
    const { getAllByTestId } = render(
      <HorseList {...defaultProps} horses={generatedHorses} />
    );

    expect(getAllByTestId("horse-list-item")).toHaveLength(10);
  });

  it("displays a button and calls routing function on click", () => {
    const { getByTestId } = render(
      <HorseList {...defaultProps} horses={generatedHorses} />
    );

    fireEvent.click(getByTestId("create-horse-button"));

    expect(defaultProps.routing.goToCreatePage).toBeCalled();
  });
});
