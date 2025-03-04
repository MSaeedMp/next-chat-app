"use client";
import TextAreaInput from "@/components/form/TextAreaInput";
import ChatContainer from "@/components/global/ChatContainer";
import MarkdownRenderer from "@/components/global/MarkdownRenderer";
import Spinner from "@/components/global/Spinner";
import { Button } from "@/components/ui/button";
import { useChatContext } from "@/hook/useChatContext";
import { useModelContext } from "@/hook/useModelContext";
import { cn } from "@/lib/utils";
import { getGroqChatCompletion } from "@/utils/actions";
import { useEffect, useRef, useState } from "react";
import { IoArrowUpOutline } from "react-icons/io5";

const MAX_HISTORY_LENGTH = 7;

const HomePage = () => {
  const { chatHistory, setChatHistory, message, setMessage, clearMessage } =
    useChatContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const messageBoxRef = useRef<HTMLFormElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const messageStartRef = useRef<HTMLDivElement>(null);
  const isChatStarted = chatHistory.length > 0;
  const { model } = useModelContext();
  const [initialViewportHeight, setInitialViewportHeight] = useState(0);

  useEffect(() => {
    setInitialViewportHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    const storedHistory = localStorage.getItem("chatHistory");
    if (storedHistory) {
      setChatHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  useEffect(() => {
    if (!messageBoxRef.current || !chatBoxRef.current) return;

    const updateHeight = () => {
      const chatBoxHeight = messageBoxRef.current?.offsetHeight || 0;
      const availableHeight = initialViewportHeight - chatBoxHeight - 113;

      if (chatBoxRef.current) {
        chatBoxRef.current.style.height = `${availableHeight}px`;
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    if (messageBoxRef.current) {
      resizeObserver.observe(messageBoxRef.current);
    }

    window.addEventListener("resize", updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [isChatStarted, initialViewportHeight]);

  useEffect(() => {
    if (messageStartRef.current) {
      messageStartRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [chatHistory]);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userMessage = message.trim();
    if (!userMessage) return;

    const newChatHistory = [
      ...chatHistory,
      { request: userMessage, response: "" },
    ].slice(-MAX_HISTORY_LENGTH);

    setChatHistory(newChatHistory);
    clearMessage();

    try {
      setIsLoading(true);
      const stream = await getGroqChatCompletion(newChatHistory, model);
      if (!stream) throw new Error("No response from API");
      setIsLoading(false);
      let fullResponse = "";
      setIsStreaming(true);
      for await (const chunk of stream) {
        const chunkText = chunk.choices[0]?.delta?.content || "";
        fullResponse += chunkText;

        setChatHistory((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            request: userMessage,
            response: fullResponse,
          };
          return updated;
        });
      }
      setIsStreaming(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setChatHistory((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].response = "Oops! Something went wrong.";
        return updated;
      });
    }
  };

  return (
    <main className="flex flex-col gap-7">
      {isChatStarted && (
        <div ref={chatBoxRef} className="overflow-y-auto mt-14">
          <ChatContainer className="h-full flex flex-col gap-4">
            {chatHistory.map((chat, index) => (
              <div key={index} className="flex flex-col gap-2 w-full">
                {index === chatHistory.length - 1 && (
                  <div ref={messageStartRef} />
                )}
                {/* User Message */}
                <p className="self-end px-3 py-2 bg-accent rounded-xl break-al">
                  {chat.request}
                </p>
                {/* AI Response */}
                {isLoading && index === chatHistory.length - 1 ? (
                  <Spinner />
                ) : (
                  <div className="px-0 py-3 rounded-x w-full">
                    <MarkdownRenderer
                      content={chat.response}
                      isStreaming={isStreaming}
                    />
                  </div>
                )}
              </div>
            ))}
          </ChatContainer>
        </div>
      )}
      <div
        className={cn(
          "fixed w-full",
          isChatStarted ? "bottom-14" : "top-1/2 -translate-y-1/2"
        )}
      >
        <ChatContainer className="lg:!px-0">
          {!isChatStarted && (
            <h1 className="lg:text-3xl sm:text-2xl text-xl lg:font-extrabold font-bold font-inter text-center md:mb-4 mb-2">
              What can I help you with?
            </h1>
          )}
          <form
            onSubmit={handleSendMessage}
            className="lg:rounded-3xl rounded-2xl w-full bg-accent flex flex-col"
            ref={messageBoxRef}
          >
            <TextAreaInput
              name="message"
              placeholder="Message NextChat..."
              value={message}
              minRows={2}
              maxRows={10}
              disabled={isStreaming || isLoading}
              onChange={(e) => setMessage(e.target.value)}
              isStreaming={isStreaming}
            />
            <Button
              variant="default"
              size="icon"
              type="submit"
              className="text-background self-end mr-4 mb-2"
              disabled={isStreaming || isLoading}
            >
              <IoArrowUpOutline className="!w-5 !h-5" />
            </Button>
          </form>
        </ChatContainer>
      </div>
    </main>
  );
};

export default HomePage;
