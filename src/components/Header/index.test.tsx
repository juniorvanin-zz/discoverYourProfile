import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { Header } from "./";

describe("Header", () => {
  it("displays title", () => {
    const title = "some title";
    const { getByText } = render(<Header title={title} />);

    expect(getByText(title)).toBeTruthy();
  });
});
