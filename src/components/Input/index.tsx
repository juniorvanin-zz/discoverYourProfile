import React from "react";

import "./style.scss";

type TextInputProps = {
  value: string;
  setValue: (newValue: string) => void;
  isValid?: (value: string) => boolean;
  onEnterKey: () => void;
};

const TextInput = ({
  value,
  setValue,
  onEnterKey,
  isValid = () => true
}: TextInputProps) => (
  <input
    className="text-input"
    type="text"
    value={value}
    onKeyDown={e => {
      if (value !== "" && e.which === 13) {
        onEnterKey();
      }
    }}
    onChange={e => {
      const newValue = e.target.value;

      if (isValid(newValue)) {
        setValue(newValue);
      }
    }}
  />
);

type ButtonProps = {
  disabled?: boolean;
  title?: string;
  handleOnClick: () => void;
};

const Button = ({
  disabled = false,
  title = "OK",
  handleOnClick
}: ButtonProps) => (
  <button className="button" disabled={disabled} onClick={handleOnClick}>
    {title}
  </button>
);

export { TextInput, Button };
