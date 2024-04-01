import { type ChatMessage, generateMessage } from "./chat";

const main = async () => {
  const messages: ChatMessage[] = [
    {
      role: "user",
      content: "Hello!",
    },
  ];
  const count = () => messages.length;

  while (true) {
    const newMessage = await generateMessage(messages, count());
    messages.push(newMessage);
  }
};

await main();
