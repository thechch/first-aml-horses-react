import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { HorseForm } from "./HorseForm";

import { FormValues } from "../types";

describe("HorseForm component", () => {
  const defaultProps = {
    onSubmit: jest.fn(),
  };

  it("validates horse name field as required", () => {
    const { getByTestId } = render(<HorseForm {...defaultProps} />);

    fireEvent.submit(getByTestId("horse-form"));

    expect(getByTestId("horse-form-name-error")).toHaveTextContent(/name/i);
  });

  it("submits form data without optional fields", () => {
    const horseName = "Meow";
    const { getByTestId } = render(<HorseForm {...defaultProps} />);

    fireEvent.change(getByTestId("horse-form-name"), {
      target: { value: horseName },
    });

    fireEvent.submit(getByTestId("horse-form"));

    expect(defaultProps.onSubmit.mock.calls[1][0]).toMatchObject({
      horseName,
      favouriteFood: "",
      height: "",
      weight: "",
    } as FormValues);
  });
});
