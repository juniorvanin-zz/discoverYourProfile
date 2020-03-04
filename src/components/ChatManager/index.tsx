/* eslint-disable react/style-prop-object */

import React, { useState, useEffect } from "react";

import { Typing, UserIcon, InputTypeChooser } from "components";
import { useConversationApi } from "services";

import "./styles.scss";

type MessageGroupType = {
  type: "robot" | "user";
  messages: Array<string>;
};

type ChatManagerState = {
  currentQuestionId: string;
  answers: {
    [key: string]: string;
  };
  messages: Array<MessageGroupType>;
};

const ChatManager = () => {
  const [state, setState] = useState<ChatManagerState>({
    currentQuestionId: "",
    answers: {},
    messages: []
  });

  const [data, isLoaded, setPayload] = useConversationApi();

  const dateHash = JSON.stringify(data);
  useEffect(() => {
    if (isLoaded) {
      const robotMessages = {
        type: "robot",
        // @ts-ignore
        messages: data.messages.map(m => m.value)
      };
      const messages = [...state.messages, robotMessages];

      // @ts-ignore
      setState({ ...state, messages, currentQuestionId: data.id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateHash]);

  const saveAnswer = (id: string) => (value: string) => {
    const userMessage: MessageGroupType = {
      type: "user",
      messages: [value]
    };

    const answers = { ...state.answers, [id]: value };
    const messages = [...state.messages, userMessage];

    setState({ ...state, answers, messages });
    setPayload({
      id,
      context: "suitability",
      answers
    });
  };

  return (
    <ChatWrapper
      inputType="string"
      saveAnswer={saveAnswer(state.currentQuestionId)}
    />
  );
};

type InputType = "number" | "string" | "buttons";
type ChatProps = {
  saveAnswer: (value: string) => void;
  inputType: InputType;
};

const ChatWrapper = ({ saveAnswer, inputType }: ChatProps) => (
  <div className="chat-wrapper">
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
      <Typing />
    </MessageGroup>
    <InputTypeChooser type={inputType} finishCallback={saveAnswer} />
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

  return (
    <div className={classes}>
      {style === "robot" && <UserIcon />}
      <div className="message-group__messages">{children}</div>
      {style === "user" && <UserIcon name="Wanderlei da Silva" />}
    </div>
  );
};
const Message = ({ text }: MessageProps) => <p className="message">{text}</p>;

export { ChatManager };
