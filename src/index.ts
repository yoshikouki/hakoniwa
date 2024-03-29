import { Ollama, type ChatResponse } from "ollama";

const chatResponses: ChatResponse[] = []

const ollama = new Ollama({
  host: "http://localhost:11434",
});

const response = await ollama.chat({
  model: "llama2",
  messages: [{ role: "user", content: "Why is the sky blue?" }],
  format: "json",
  stream: true,
});

for await (const part of response) {
  chatResponses.push(part);
  process.stdout.write(part.message.content);
}

console.log("\n", "-".repeat(50), "\n");
console.log("chatResponses.length:", chatResponses.length);
console.log("\n", "-".repeat(50), "\n");
console.log("first chatResponses:", chatResponses.at(0));
console.log("\n", "-".repeat(50), "\n");
console.log("last chatResponses:", chatResponses.at(-1));
