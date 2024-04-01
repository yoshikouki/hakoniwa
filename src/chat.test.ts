import { describe, expect, it } from "bun:test";
import { type ChatMessage, ensureUserMessageLast } from "./chat";

describe("ensureUserMessageLast", () => {
  it("should return the same array if it is empty", () => {
    const messages: ChatMessage[] = [];
    const result = ensureUserMessageLast(messages);
    expect(result).toEqual([]);
  });

  it("should return the same array if the last message is from the user", () => {
    const messages: ChatMessage[] = [
      { role: "assistant", content: "Hello" },
      { role: "system", content: "Welcome" },
      { role: "user", content: "Hi" },
    ];
    const result = ensureUserMessageLast(messages);
    expect(result).toEqual(messages);
  });

  it("should change the role of messages with user messages last", () => {
    const messages: ChatMessage[] = [
      { role: "user", content: "Hello" },
      { role: "system", content: "Welcome" },
      { role: "assistant", content: "Hi" },
    ];
    const expected: ChatMessage[] = [
      { role: "assistant", content: "Hello" },
      { role: "system", content: "Welcome" },
      { role: "user", content: "Hi" },
    ];
    const result = ensureUserMessageLast(messages);
    expect(result).toEqual(expected);
  });
});
