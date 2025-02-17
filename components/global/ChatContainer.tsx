import { cn } from "@/lib/utils";

const ChatContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("w-full mx-auto lg:max-w-3xl sm:px-6 px-4 lg:px-8", className)}>
      {children}
    </div>
  );
};
export default ChatContainer;
