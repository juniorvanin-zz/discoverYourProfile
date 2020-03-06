import React from "react";
import { render } from "@testing-library/react";

import { PageWrapper } from "./";

jest.mock("components", () => {
  return {
    Header: ({ title }: { title: string }) => <h1> title</h1>
  };
});

describe("PageWrapper", () => {
  it("creates page wrapper using title and children", () => {
    const { container } = render(
      <PageWrapper title="some title" children={<p>some children</p>} />
    );

    expect(container).toMatchSnapshot();
  });
});
