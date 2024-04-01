import chalk from "chalk";
import { type ChatResponse, Ollama } from "ollama";

const chatResponses: ChatResponse[] = [];

const ollama = new Ollama({
  host: "http://localhost:11434",
});

export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export const generateMessage = async (
  messages: ChatMessage[],
  count: number,
) => {
  const response = await ollama.chat({
    model: "llama2",
    messages: ensureUserMessageLast(messages),
    stream: true,
  });

  const role: ChatMessage["role"] = count % 2 === 0 ? "user" : "assistant";
  if (count > 1) console.log("\n", chalk.gray("-".repeat(80)), "\n");
  const colorant = count % 2 === 0 ? chalk.red : chalk.blue;
  console.log(colorant(count), colorant(count % 2 === 0 ? "Alice" : "Bob"));
  let content = "";
  for await (const part of response) {
    content += part.message.content;
    process.stdout.write(colorant(part.message.content));
  }
  console.log("");

  return {
    role,
    content,
  };
};

export const ensureUserMessageLast = (
  messages: ChatMessage[],
): ChatMessage[] => {
  if (messages.length === 0) {
    return messages;
  }

  const lastMessage = messages[messages.length - 1];
  if (lastMessage.role === "user") {
    return messages;
  }

  const reorderedMessages: ChatMessage[] = messages.reduce(
    (acc, message, index) => {
      const role =
        message.role === "user"
          ? "assistant"
          : message.role === "assistant"
            ? "user"
            : message.role;
      acc.push({
        ...message,
        role,
      });
      return acc;
    },
    [] as ChatMessage[],
  );

  return reorderedMessages;
};
