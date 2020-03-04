import React, { useState } from "react";

import { TextInput, Button } from "components";

import "./style.scss";

type ActionBarProps = { children: React.ReactElement };

const ActionBar = ({ children }: ActionBarProps) => (
  <footer className="footer">{children}</footer>
);

type InputActionBarProps = {
  finishCallback: (value: string) => void;
};

const TextInputActionBar = ({ finishCallback }: InputActionBarProps) => {
  const [value, setValue] = useState("");
  const isContinueBtnDisable = value === "";

  return (
    <ActionBar>
      <>
        <TextInput value={value} setValue={setValue} />
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
        <TextInput value={value} setValue={setValue} isValid={isNumber} />
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
  finishCallback: (value: string) => void;
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
              finishCallback(button.value);
            }}
            title={button.title}
          />
        ))}
      </>
    </ActionBar>
  );
};

type InputType = "number" | "string" | "buttons";

type InputTypeChooserProps = {
  type: InputType;
  finishCallback: (value: string) => void;
};

const InputTypeChooser = ({ type, finishCallback }: InputTypeChooserProps) => {
  switch (type) {
    case "number":
      return <NumberInputActionBar finishCallback={finishCallback} />;
    case "buttons":
      return (
        <ButtonsInputActionBar
          finishCallback={finishCallback}
          buttons={[
            { title: "sim", value: "s" },
            { title: "não", value: "n" }
          ]}
        />
      );
    default:
      return <TextInputActionBar finishCallback={finishCallback} />;
  }
};
export { InputTypeChooser };
