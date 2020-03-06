import React from "react";
import { render } from "@testing-library/react";

import { UserIcon } from "./";

describe("UserIcon", () => {
  it("when name is not provided renders waren image icon", () => {
    const { getByAltText } = render(<UserIcon />);

    expect(getByAltText("warren icon")).toHaveAttribute(
      "src",
      "https://warrenbrasil.com.br/assets/imgs/icons/favicon.png?v=1"
    );
  });
  it("uses first letter of user name to create user icon", () => {
    const { getByText } = render(<UserIcon name="Roberto" />);

    expect(getByText("R")).toBeTruthy();
  });
});
