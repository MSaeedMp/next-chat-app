import { ChatType } from "@/utils/types";
import { createContext, useState } from "react";

type ChatContextType = {
  chatHistory: ChatType[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatType[]>>;
  clearChatHistory: () => void;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  clearMessage: () => void;
};

export const ChatContext = createContext<ChatContextType | null>(null);
export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chatHistory, setChatHistory] = useState<ChatType[]>([]);
  const [message, setMessage] = useState<string>("");

  const clearChatHistory = () => setChatHistory([]);
  const clearMessage = () => setMessage("");
  const value = {
    chatHistory,
    setChatHistory,
    clearChatHistory,
    message,
    setMessage,
    clearMessage,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
