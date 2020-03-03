import React from "react";

import "./style.scss";

type TextInputProps = {
  value: string;
  setValue: (newValue: string) => void;
  isValid?: (value: string) => boolean;
};

const TextInput = ({
  value,
  setValue,
  isValid = () => true
}: TextInputProps) => (
  <input
    className="text-input"
    type="text"
    placeholder="Digite seu nome"
    value={value}
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
};

const Button = ({ disabled = false, title = "OK" }: ButtonProps) => (
  <button className="button" disabled={disabled}>
    {title}
  </button>
);

export { TextInput, Button };
