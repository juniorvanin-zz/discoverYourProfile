import { useState, useEffect } from "react";
import axios from "axios";

type ResponseData = {
  id: string;
  messages: Array<{
    value: string;
  }>;
  responses: Array<string>;
  inputs: Array<{
    type: "string" | "number";
  }>;
  buttons: Array<{
    label: {
      title: string;
    };
    value: string;
  }>;
};

const emptyData = {
  id: "",
  messages: [],
  responses: [],
  inputs: [],
  buttons: []
};

type UseApiType = [ResponseData, boolean, (value: any) => void];

const useConversationApi = (): UseApiType => {
  const [payload, setPayload] = useState({
    context: "suitability"
  });

  const [state, setState] = useState<UseApiType>([
    emptyData,
    false,
    setPayload
  ]);

  const fetchData = async () => {
    try {
      const result = await axios.post(
        "https://api.dev.oiwarren.com/api/v2/conversation/message",
        payload
      );

      setState([result.data, true, setPayload]);
    } catch (error) {
      console.log("An error occurred calling conversation API");
    }
  };

  const payloadHash = JSON.stringify(payload);

  useEffect(() => {
    setState([emptyData, false, setPayload]);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payloadHash]);

  return state;
};

export { useConversationApi };
