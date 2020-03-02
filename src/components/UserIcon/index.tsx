import React from "react";

import "./style.scss";

type UserIconProps = {
  name?: string;
};

const UserIcon = ({ name = "" }: UserIconProps) => {
  return name === "" ? (
    <img
      className="icon"
      src="https://warrenbrasil.com.br/assets/imgs/icons/favicon.png?v=1"
      alt="warren icon"
    />
  ) : (
    <span className="icon user-icon">{name.charAt(0)}</span>
  );
};

export { UserIcon };
