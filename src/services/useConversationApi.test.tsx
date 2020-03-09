import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { useConversationApi } from "./useConversationApi";

// @ts-ignore
global.console = { log: jest.fn() };

describe("useConversationApi", () => {
  const mock = new MockAdapter(axios);

  it("returns isLoaded as false and empty data when data is not available yet", async () => {
    mock
      .onPost("https://api.dev.oiwarren.com/api/v2/conversation/message", {
        context: "suitability"
      })
      .reply(200, {});

    const { result } = renderHook(() => useConversationApi());

    expect(result.current[0]).toEqual({
      buttons: [],
      id: "",
      inputs: [],
      messages: [],
      responses: []
    });
    expect(result.current[1]).toBeFalsy();
  });

  it("returns isLoaded as true and data when data is available", async () => {
    mock
      .onPost("https://api.dev.oiwarren.com/api/v2/conversation/message", {
        context: "suitability"
      })
      .reply(200, { id: "some id" });

    const { result, waitForNextUpdate } = renderHook(() =>
      useConversationApi()
    );

    await waitForNextUpdate();

    expect(result.current[0]).toEqual({ id: "some id" });
    expect(result.current[1]).toBeTruthy();
  });

  it("logs if an error occurred calling conversation API", async () => {
    mock
      .onPost("https://api.dev.oiwarren.com/api/v2/conversation/message", {
        context: "suitability"
      })
      .reply(500);

    renderHook(() => useConversationApi());

    expect(console.log).toHaveBeenCalledWith(
      "An error occurred calling conversation API"
    );
  });
});
