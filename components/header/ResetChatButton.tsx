"use client";

import { useChatContext } from "@/hook/useChatContext";
import { Button } from "../ui/button";
import { HiMiniPencilSquare } from "react-icons/hi2";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ResetChatButton = () => {
  const { clearChatHistory, clearMessage } = useChatContext();

  const handleResetChat = () => {
    localStorage.removeItem("chatHistory");
    clearChatHistory();
    clearMessage();
  };
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" onClick={handleResetChat}>
          <HiMiniPencilSquare className="!w-6 !h-6" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Reset chat</p>
      </TooltipContent>
    </Tooltip>
  );
};
export default ResetChatButton;
