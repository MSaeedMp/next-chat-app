"use client";

import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef } from "react";

type TextAreaInputProps = {
  name: string;
  labelText?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  minRows?: number;
  maxRows?: number;
  disabled?: boolean
};

const TextAreaInput = ({
  name,
  placeholder,
  defaultValue,
  value,
  onChange,
  minRows = 4,
  maxRows = 10,
  disabled
}: TextAreaInputProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustHeight = () => {
    if (textAreaRef.current) {
      const textarea = textAreaRef.current;
      textarea.style.height = "auto";
      const computedHeight = textarea.scrollHeight;

      const maxHeight = maxRows * 24;

      if (computedHeight <= maxHeight) {
        textarea.style.height = `${computedHeight}px`;
        textarea.style.overflowY = "hidden";
      } else {
        textarea.style.height = `${maxHeight}px`;
        textarea.style.overflowY = "auto";
      }
    }
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
    adjustHeight();
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.closest("form");
      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <Textarea
      id={name}
      name={name}
      ref={textAreaRef}
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
      rows={minRows}
      className="!text-base font-medium w-full resize-none rounded-3xl px-4 py-3 leading-loose border-none shadow-none focus:outline-none focus:ring-0 focus-visible:ring-0"
      placeholder={placeholder || "Write your message"}
      onKeyDown={handleKeyDown}
      onInput={adjustHeight}
      disabled={disabled}
    />
  );
};

export default TextAreaInput;
