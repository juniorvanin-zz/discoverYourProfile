import React from "react";

import "./style.scss";

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => (
  <header className="header">
    <h1 className="header__title"> {title} </h1>
  </header>
);

export { Header };
