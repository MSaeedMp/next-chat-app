export type ChatType = {
  request: string;
  response: string;
};
export type ModelType =
  | "gemma2-9b-it"
  | "llama-3.3-70b-versatile"
  | "llama-3.1-8b-instant"
  | "llama3-70b-8192"
  | "llama3-8b-8192"
  | "qwen-2.5-32b"
  | "deepseek-r1-distill-qwen-32b"
  | "llama-3.3-70b-specdec"
  | "llama-3.2-1b-preview"
  | "llama-3.2-3b-preview";
