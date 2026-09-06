import { RAG_BASE_URL } from "./client";
import { withAuth } from "./interceptors";

/** POST a JSON body and consume an SSE response (`delta`* then `done`, or `error`). Resolves with the `done` event's data. */
export async function postSSE<T>(
  endpoint: string,
  body: unknown,
  onDelta?: (text: string) => void,
  signal?: AbortSignal,
): Promise<T> {
  const response = await fetch(
    `${RAG_BASE_URL}${endpoint}`,
    withAuth({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal,
    }),
  );
  if (!response.ok || !response.body) throw new Error(`API Error: ${response.status}`);

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let event = "message";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (line.startsWith("event:")) {
        event = line.slice(6).trim();
      } else if (line.startsWith("data:")) {
        const data = JSON.parse(line.slice(5).trim());
        if (event === "delta") onDelta?.(data.text);
        else if (event === "done") return data as T;
        else if (event === "error") throw new Error(data.message ?? "generation failed");
        event = "message";
      }
    }
  }
  throw new Error("stream ended without done event");
}
