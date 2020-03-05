import React from "react";

import { InputTypeChooser, UserIcon } from "components";

import "./styles.scss";

type MessageGroupType = {
  type: "robot" | "user";
  messages: Array<string>;
};
type InputType = "number" | "string" | "buttons";
type ChatWrapperProps = {
  saveAnswer: (value: string) => void;
  inputType: InputType;
  messages: Array<MessageGroupType>;
};

const ChatWrapper = ({ saveAnswer, inputType, messages }: ChatWrapperProps) => (
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

const MessageGroup = ({ children, style }: MessageGroupProps) => (
  <div className={`message-group message-group_theme_${style}`}>
    {style === "robot" && <UserIcon />}
    <div className="message-group__messages">{children}</div>
    {style === "user" && <UserIcon name="User" />}
  </div>
);
const Message = ({ text }: MessageProps) => <p className="message">{text}</p>;

export { ChatWrapper };
