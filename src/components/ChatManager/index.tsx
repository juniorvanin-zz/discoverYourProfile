/* eslint-disable react/style-prop-object */

import React, { useState, useEffect } from "react";

import { UserIcon, InputTypeChooser } from "components";
import { useConversationApi } from "services";

import "./styles.scss";

type MessageGroupType = {
  type: "robot" | "user";
  messages: Array<string>;
};

type ChatManagerState = {
  question: {
    id: string;
    responseTemplate: string;
  };
  answers: {
    [key: string]: string;
  };
  messages: Array<MessageGroupType>;
};

const isEmpty = (array: Array<any>) =>
  array === undefined || array.length === 0;

const ChatManager = () => {
  const [state, setState] = useState<ChatManagerState>({
    question: {
      id: "",
      responseTemplate: ""
    },
    answers: {},
    messages: []
  });

  const [data, isLoaded, setPayload] = useConversationApi();

  const dateHash = JSON.stringify(data);
  useEffect(() => {
    if (isLoaded) {
      const robotMessages: MessageGroupType = {
        type: "robot",
        // @ts-ignore
        messages: data.messages.map(m => m.value)
      };
      const messages = [...state.messages, robotMessages];
      const responseTemplate = !isEmpty(data.responses)
        ? data.responses[0]
        : "";

      setState({
        ...state,
        messages,
        question: { id: data.id, responseTemplate }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateHash]);

  const buildUserResponse = (
    questionId: string,
    template: string,
    value: string
  ) => {
    if (template === "") return value;

    const regex = new RegExp("{{answers." + questionId + "}}", "g");

    return template.replace(regex, value);
  };

  const saveAnswer = (id: string) => (value: string) => {
    const userMessage: MessageGroupType = {
      type: "user",
      messages: [buildUserResponse(id, state.question.responseTemplate, value)]
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

  console.log(state);

  return (
    <ChatWrapper
      inputType="string"
      saveAnswer={saveAnswer(state.question.id)}
      messages={state.messages}
    />
  );
};

type InputType = "number" | "string" | "buttons";
type ChatProps = {
  saveAnswer: (value: string) => void;
  inputType: InputType;
  messages: Array<MessageGroupType>;
};

const ChatWrapper = ({ saveAnswer, inputType, messages }: ChatProps) => (
  <div className="chat-wrapper">
    {messages.map(messageGroup => (
      <MessageGroup style={messageGroup.type}>
        {messageGroup.messages.map(message => (
          <Message text={message} />
        ))}
      </MessageGroup>
    ))}
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
