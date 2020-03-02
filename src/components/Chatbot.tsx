/* eslint-disable react/style-prop-object */

import React from "react";

import "./styles.scss";

const Chatbot = () => (
  <div className="chatbot">
    <MessageGroup style="robot">
      <Message text="Oi, eu sou o Warren! Vou ajudar você a investir o seu dinheiro da melhor forma! Para isso, quero conhecer você melhor." />
      <Message text="Como eu posso te chamar?" />
    </MessageGroup>
    <MessageGroup style="user">
      <Message text="Meu nome é Junior Vanin" />
    </MessageGroup>
    <MessageGroup style="robot">
      <Message text="Prazer, Junior Vanin. ^1000 Para ajudar você a ter os melhores rendimentos, ^500 preciso descobrir o seu perfil de investidor, ^500 então farei algumas perguntas rápidas." />
      <Message text="Qual é a sua idade?" />
    </MessageGroup>
    <MessageGroup style="user">
      <Message text="Eu tenho 26 anos." />
    </MessageGroup>
    <MessageGroup style="robot">
      <Message text="Os 30 estão chegando!" />
    </MessageGroup>
  </div>
);

type MessageProps = {
  text: string;
};

type MessageGroupProps = {
  children: React.ReactNode;
  style: "user" | "robot";
};

const MessageGroup = ({ children, style }: MessageGroupProps) => {
  const classes =
    "message-group message-group_theme_" +
    (style === "robot" ? "robot" : "user");

  return <div className={classes}>{children}</div>;
};
const Message = ({ text }: MessageProps) => <p className="message">{text}</p>;

export { Chatbot };
