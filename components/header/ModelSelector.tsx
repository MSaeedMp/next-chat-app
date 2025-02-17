"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModelContext } from "@/hook/useModelContext";
import { ModelType } from "@/utils/types";
import { RiArrowDropDownLine } from "react-icons/ri";

const ModelSelector = () => {
  const { model, setModel } = useModelContext();

  return (
    <div className="h-full flex items-center font-inter">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="text-xl font-extrabold flex items-center gap-0 pl-0 sm:px-4"
            variant="ghost"
          >
            <span>NextChat</span>
            <RiArrowDropDownLine className="!w-7 !h-7" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-64 font-inter"
          side="bottom"
          align="start"
        >
          <DropdownMenuLabel>Select your LLM</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={model}
            onValueChange={(value) => setModel(value as ModelType)}
          >
            <DropdownMenuRadioItem value="gemma2-9b-it">
              gemma2-9b-it
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="qwen-2.5-32b">
              qwen-2.5-32b
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="deepseek-r1-distill-qwen-32b">
              deepseek-r1-distill-qwen-32b
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="llama-3.3-70b-versatile">
              llama-3.3-70b-versatile
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="llama-3.1-8b-instant">
              llama-3.1-8b-instant
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="llama3-70b-8192">
              llama3-70b-8192
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="llama3-8b-8192">
              llama3-8b-8192
            </DropdownMenuRadioItem>

            <DropdownMenuRadioItem value="llama-3.3-70b-specdec">
              llama-3.3-70b-specdec
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="llama-3.2-1b-preview">
              llama-3.2-1b-preview
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="llama-3.2-3b-preview">
              llama-3.2-3b-preview
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default ModelSelector;
