import { ChatType } from "@/utils/types";
import { createContext, useState } from "react";

type ChatContextType = {
  chatHistory: ChatType[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatType[]>>;
  clearChatHistory: () => void;
};

export const ChatContext = createContext<ChatContextType | null>(null);
export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chatHistory, setChatHistory] = useState<ChatType[]>([]);
  const clearChatHistory = () => setChatHistory([]);
  const value = {
    chatHistory,
    setChatHistory,
    clearChatHistory,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
