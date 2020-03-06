import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { TextInput, Button } from "./";

describe("TextInput", () => {
  it("call setValue when input value changes", () => {
    const setValueMock = jest.fn();

    const { getByTestId } = render(
      <TextInput value="" setValue={setValueMock} onEnterKey={() => {}} />
    );

    fireEvent.change(getByTestId("text-input"), {
      target: { value: "test" }
    });

    expect(setValueMock).toHaveBeenCalledWith("test");
  });

  it("call onEnterKey when enter key is pressed", () => {
    const onEnterKeyMock = jest.fn();

    const { getByTestId } = render(
      <TextInput value="test" setValue={() => {}} onEnterKey={onEnterKeyMock} />
    );

    fireEvent.keyDown(getByTestId("text-input"), {
      keyCode: 13
    });

    expect(onEnterKeyMock).toHaveBeenCalled();
  });

  it("when user types a valid input, update value", () => {
    const isValidFunction = () => true;
    let value = "old-value";

    const { getByTestId } = render(
      <TextInput
        value={value}
        setValue={newValue => {
          value = newValue;
        }}
        onEnterKey={() => {}}
        isValid={isValidFunction}
      />
    );

    fireEvent.change(getByTestId("text-input"), {
      target: { value: "new-value" }
    });

    expect(value).toEqual("new-value");
  });

  it("when user types a invalid input, do not update value", () => {
    const isValidFunction = () => false;
    let value = "old-value";

    const { getByTestId } = render(
      <TextInput
        value={value}
        setValue={newValue => {
          value = newValue;
        }}
        onEnterKey={() => {}}
        isValid={isValidFunction}
      />
    );

    fireEvent.change(getByTestId("text-input"), {
      target: { value: "new-value" }
    });

    expect(value).toEqual("old-value");
  });
});

describe("Button", () => {
  it("contains title as value", () => {
    const { getByTestId } = render(
      <Button title="click me" handleOnClick={() => {}} />
    );

    expect(getByTestId("button-input")).toHaveTextContent("click me");
  });

  it("when disabled is true, contains disabled attribute", () => {
    const { getByTestId } = render(
      <Button disabled={true} title="" handleOnClick={() => {}} />
    );

    expect(getByTestId("button-input")).toHaveAttribute("disabled");
  });

  it("when disabled is false, do not contain disable attribute", () => {
    const { getByTestId } = render(
      <Button disabled={false} title="" handleOnClick={() => {}} />
    );

    expect(getByTestId("button-input")).not.toHaveAttribute("disabled");
  });

  it("calls handleOnClick when clicked", () => {
    const handleOnClickMock = jest.fn();

    const { getByTestId } = render(
      <Button title="click me" handleOnClick={handleOnClickMock} />
    );

    fireEvent.click(getByTestId("button-input"));

    expect(handleOnClickMock).toHaveBeenCalled();
  });
});
