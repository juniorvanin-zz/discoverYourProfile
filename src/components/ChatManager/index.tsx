import React, { useState, useEffect } from "react";

import { ChatWrapper } from "components";
import { useConversationApi } from "services";

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
        messages: data.messages.map(message => message.value)
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

  return (
    <ChatWrapper
      inputType="string"
      saveAnswer={saveAnswer(state.question.id)}
      messages={state.messages}
    />
  );
};

const buildUserResponse = (
  questionId: string,
  template: string,
  value: string
) => {
  if (template === "") return value;

  const regex = new RegExp("{{answers." + questionId + "}}", "g");

  return template.replace(regex, value);
};

const isEmpty = (array: Array<any>) =>
  array === undefined || array.length === 0;

export { ChatManager };
