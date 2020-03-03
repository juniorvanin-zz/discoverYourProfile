import React, { useState } from "react";

import { TextInput, Button } from "../Input";

import "./style.scss";

type ActionBarProps = { children: React.ReactElement };

const ActionBar = ({ children }: ActionBarProps) => (
  <footer className="footer">{children}</footer>
);

const TextInputActionBar = () => {
  const [value, setValue] = useState("");
  const isContinueBtnDisable = value === "";

  return (
    <ActionBar>
      <>
        <TextInput value={value} setValue={setValue} />
        <Button disabled={isContinueBtnDisable} />
      </>
    </ActionBar>
  );
};

const NumberInputActionBar = () => {
  const [value, setValue] = useState("");

  return (
    <ActionBar>
      <>
        <TextInput value={value} setValue={setValue} isValid={isNumber} />
        <Button />
      </>
    </ActionBar>
  );
};

const isNumber = (value: string) => /^[0-9]*$/.test(value);

type ButtonsInputActionBarProps = {
  buttons: Array<{ title: string }>;
};

const ButtonsInputActionBar = ({ buttons }: ButtonsInputActionBarProps) => {
  return (
    <ActionBar>
      <>
        {buttons.map(button => (
          <Button title={button.title} />
        ))}
      </>
    </ActionBar>
  );
};

export { TextInputActionBar, NumberInputActionBar, ButtonsInputActionBar };
