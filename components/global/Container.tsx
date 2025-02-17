import { cn } from "@/lib/utils";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("w-full mx-auto max-w-6xl xl:max-w-7xl sm:px-6 px-4 lg:px-8", className)}>
      {children}
    </div>
  );
};
export default Container;
