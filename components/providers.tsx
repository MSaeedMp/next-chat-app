"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { ChatProvider } from "@/context/ChatContext";
import { ModelProvider } from "@/context/ModelContext";
import { TooltipProvider } from "@/components/ui/tooltip";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModelProvider>
      <ChatProvider>
        <TooltipProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </TooltipProvider>
      </ChatProvider>
    </ModelProvider>
  );
};
export default Providers;
