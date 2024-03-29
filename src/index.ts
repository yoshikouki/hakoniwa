import { Ollama, type ChatResponse } from "ollama";

const chatResponses: ChatResponse[] = []

const ollama = new Ollama({
  host: "http://localhost:11434",
});

const nanoToSeconds = (nano: number) => (nano / 1e9).toFixed(2);

console.log(
  "| No. | format | content_length | eval_count | prompt_eval_count | total_duration | load_duration | prompt_eval_duration | eval_duration |"
);
console.log(
  "| --- | ------ | -------------- | ---------- | ----------------- | -------------- | ------------- | -------------------- | ------------- |"
);
const outputResult = (i: number, format: string, response: ChatResponse) =>
  console.log(
    `| ${i} | ${format} | ${response.message.content.length} | ${
      response.eval_count
    } | ${response.prompt_eval_count} | ${nanoToSeconds(
      response.total_duration
    )} | ${nanoToSeconds(response.load_duration)} | ${nanoToSeconds(
      response.prompt_eval_duration
    )} | ${nanoToSeconds(response.eval_duration)} |`
  );

const iteration = 20;

for (let i = 1; i < iteration / 2 + 1; i++) {
  const response = await ollama.chat({
    model: "llama2",
    messages: [{ role: "user", content: "Why is the sky blue?" }],
  });
  outputResult(i, "chat", response);
}

for (let i = iteration / 2 + 1; i < iteration + 1; i++) {
  const response = await ollama.chat({
    model: "llama2",
    messages: [{ role: "user", content: "Why is the sky blue?" }],
    format: "json",
  });
  outputResult(i, "json", response);
}
