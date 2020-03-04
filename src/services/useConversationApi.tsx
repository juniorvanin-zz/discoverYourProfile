import { useState, useEffect } from "react";
import axios from "axios";

type UseApiType = [any, boolean, (value: any) => void];

const useConversationApi = (): UseApiType => {
  const [payload, setPayload] = useState({
    context: "suitability"
  });

  const [state, setState] = useState<UseApiType>([{}, false, setPayload]);

  const fetchData = async () => {
    try {
      const result = await axios.post(
        "https://api.dev.oiwarren.com/api/v2/conversation/message",
        payload
      );

      setState([result.data, true, setPayload]);
    } catch (error) {
      console.log(error);
    }
  };

  const payloadHash = JSON.stringify(payload);

  useEffect(() => {
    setState([{}, false, setPayload]);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payloadHash]);

  return state;
};

export { useConversationApi };
