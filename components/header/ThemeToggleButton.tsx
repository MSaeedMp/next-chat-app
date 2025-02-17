"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ThemeToggleButton = () => {
  const { setTheme, theme } = useTheme();
  const iconStyle = "!w-6 !h-6";
  const buttonStyle = "transition-all duration-200";

  if (theme === "light")
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={buttonStyle}
            onClick={() => setTheme("dark")}
          >
            <IoMoonOutline className={iconStyle} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle to dark mode</p>
        </TooltipContent>
      </Tooltip>
    );

  if (theme === "dark")
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={buttonStyle}
            onClick={() => setTheme("light")}
          >
            <IoSunnyOutline className={iconStyle} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle to light mode</p>
        </TooltipContent>
      </Tooltip>
    );
};
export default ThemeToggleButton;
