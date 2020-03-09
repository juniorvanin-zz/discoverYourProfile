import React, { useState } from "react";

import { TextInput, Button } from "components";

import "./style.scss";

type ActionBarProps = { children: React.ReactElement };

const ActionBar = ({ children }: ActionBarProps) => (
  <div className="action-bar">{children}</div>
);

type InputActionBarProps = {
  finishCallback: (value: string, displayValue?: string) => void;
};

const TextInputActionBar = ({ finishCallback }: InputActionBarProps) => {
  const [value, setValue] = useState("");
  const isContinueBtnDisable = value === "";

  return (
    <ActionBar>
      <>
        <TextInput
          value={value}
          setValue={setValue}
          onEnterKey={() => finishCallback(value)}
        />
        <Button
          disabled={isContinueBtnDisable}
          handleOnClick={() => finishCallback(value)}
        />
      </>
    </ActionBar>
  );
};

const NumberInputActionBar = ({ finishCallback }: InputActionBarProps) => {
  const [value, setValue] = useState("");
  const isContinueBtnDisable = value === "";

  return (
    <ActionBar>
      <>
        <TextInput
          value={value}
          setValue={setValue}
          isValid={isNumber}
          onEnterKey={() => finishCallback(value)}
        />
        <Button
          disabled={isContinueBtnDisable}
          handleOnClick={() => finishCallback(value)}
        />
      </>
    </ActionBar>
  );
};

const isNumber = (value: string) => /^[0-9]*$/.test(value);

type ButtonsInputActionBarProps = {
  buttons: Array<{ title: string; value: string }>;
  finishCallback: (value: string, displayValue: string) => void;
};

const ButtonsInputActionBar = ({
  buttons,
  finishCallback
}: ButtonsInputActionBarProps) => {
  return (
    <ActionBar>
      <>
        {buttons.map(button => (
          <Button
            handleOnClick={() => {
              finishCallback(button.value, button.title);
            }}
            title={button.title}
          />
        ))}
      </>
    </ActionBar>
  );
};

type InputType = "number" | "string" | "buttons";

type ButtonType = {
  label: string;
  value: string;
};

type InputTypeChooserProps = {
  type: InputType;
  additionalData?: {
    buttons: Array<ButtonType>;
  };
  finishCallback: (value: string, displayValue?: string) => void;
};

const InputTypeChooser = ({
  type,
  additionalData,
  finishCallback
}: InputTypeChooserProps) => {
  switch (type) {
    case "number":
      return <NumberInputActionBar finishCallback={finishCallback} />;
    case "buttons":
      return (
        <ButtonsInputActionBar
          finishCallback={finishCallback}
          buttons={additionalData!.buttons.map(button => ({
            title: button.label,
            value: button.value
          }))}
        />
      );
    default:
      return <TextInputActionBar finishCallback={finishCallback} />;
  }
};
export { InputTypeChooser };
