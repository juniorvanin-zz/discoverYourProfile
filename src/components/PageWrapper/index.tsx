import React from "react";

import { Header } from "components";

import "./style.scss";

type PageWrapperProps = {
  children: React.ReactElement;
  title: string;
};

const PageWrapper = ({ children, title }: PageWrapperProps) => (
  <main>
    <Header title={title} />
    <section className="main-content">{children}</section>
  </main>
);

export { PageWrapper };
