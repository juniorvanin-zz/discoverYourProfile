import React, { useState, useEffect } from "react";

import { ChatWrapper } from "components";
import { useConversationApi } from "services";

type MessageGroupType = {
  type: "robot" | "user";
  messages: Array<string>;
};

type ButtonType = {
  label: string;
  value: string;
};

type InputType = "string" | "number" | "buttons";

type ChatManagerState = {
  question: {
    id: string;
    responseTemplate: string;
    inputType: InputType;
    buttons: Array<ButtonType>;
  };
  answers: {
    [key: string]: string;
  };
  messages: Array<MessageGroupType>;
};

const ChatManager = () => {
  const [state, setState] = useState<ChatManagerState>({
    question: {
      id: "",
      responseTemplate: "",
      inputType: "string",
      buttons: []
    },
    answers: {},
    messages: []
  });

  const [data, isLoaded, setPayload] = useConversationApi();

  const dateHash = JSON.stringify(data);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  useEffect(() => {
    if (isLoaded) {
      const messages: Array<MessageGroupType> = [
        ...state.messages,
        {
          type: "robot",
          messages: data.messages.map(message => message.value)
        }
      ];

      const responseTemplate = !isEmpty(data.responses)
        ? data.responses[0]
        : "";
      let inputType: InputType = isEmpty(data.inputs)
        ? "buttons"
        : data.inputs[0].type;
      let buttons: Array<ButtonType> = data.buttons.map(button => ({
        label: button.label.title,
        value: button.value
      }));

      setState({
        ...state,
        messages,
        question: { id: data.id, responseTemplate, inputType, buttons }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateHash]);

  const saveAnswer = (id: string) => (value: string, displayValue?: string) => {
    const userMessage: MessageGroupType = {
      type: "user",
      messages: [
        buildUserResponse(
          id,
          state.question.responseTemplate,
          value,
          displayValue
        )
      ]
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

  const question = {
    inputType: state.question.inputType,
    additionalData: {
      buttons: state.question.buttons
    }
  };

  return (
    <ChatWrapper
      saveAnswer={saveAnswer(state.question.id)}
      messages={state.messages}
      question={question}
    />
  );
};

const buildUserResponse = (
  questionId: string,
  template: string,
  value: string,
  displayValue?: string
) => {
  if (displayValue) return displayValue;
  if (template === "") return value;

  const regex = new RegExp("{{answers." + questionId + "}}", "g");

  return template.replace(regex, value);
};

const isEmpty = (array: Array<any>) =>
  array === undefined || array.length === 0;

export { ChatManager };
