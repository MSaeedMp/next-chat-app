"use client";

import React, { useEffect, useState } from "react";
import { IoMdCopy } from "react-icons/io";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import hljs from "highlight.js";
import "highlight.js/styles/panda-syntax-dark.css";

const MarkdownRenderer = React.memo(
  ({ content, isStreaming }: { content: string; isStreaming: boolean }) => {
    const [copyContent, setCopyContent] = useState("");

    const handleCopy = (children: any) => {
      const textToCopy = Array.isArray(children)
        ? children
            .map((child) => (typeof child === "string" ? child : ""))
            .join("")
        : String(children);

      navigator.clipboard.writeText(textToCopy);
      setCopyContent(textToCopy);
    };

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCopyContent("");
      }, 1000);
      return () => clearInterval(intervalId);
    }, [copyContent]);

    useEffect(() => {
      if (!isStreaming) {
        document.querySelectorAll("pre code").forEach((block) => {
          if (!block.hasAttribute("data-highlighted")) {
            hljs.highlightElement(block as HTMLElement);
          }
        });
      }
    }, [isStreaming, copyContent]);

    return (
      <div className="leading-8 overflow-x-auto font-medium">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            strong: ({ children }) => (
              <strong className="font-extrabold text-base">{children}</strong>
            ),
            ul: ({ children }) => (
              <ul className="list-disc pl-5 mb-4">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-5 mb-4">{children}</ol>
            ),
            p: ({ children }) => <p className="mb-4">{children}</p>,
            hr: ({ children }) => (
              <hr className="border-foreground/40 my-4">{children}</hr>
            ),
            table: ({ children }) => (
              <table className="w-full border-collapse border border-gray-400 text-sm">
                {children}
              </table>
            ),
            thead: ({ children }) => (
              <thead className="bg-gray-700 text-white">{children}</thead>
            ),
            tbody: ({ children }) => <tbody>{children}</tbody>,
            tr: ({ children }) => (
              <tr className="border border-gray-400 even:bg-accent">
                {children}
              </tr>
            ),
            th: ({ children }) => (
              <th className="border border-gray-400 px-4 py-2 text-left">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-gray-400 px-4 py-2">{children}</td>
            ),
            code: ({ node, className, children, ...props }) => {
              const isCodeBlock =
                node?.position?.start.column === 1 &&
                node?.position?.end.column > 1;

              if (isCodeBlock) {
                const match = /language-(\w+)/.exec(className || "");
                return (
                  <div className="my-4">
                    <div className="flex justify-between items-center px-4 py-2 bg-accent text-foreground rounded-t-[8px] text-xs font-inter font-semibold">
                      <span>{match ? match[1] : "code"}</span>
                      <button
                        onClick={() => handleCopy(children)}
                        className="opacity-80 hover:opacity-100 flex items-center gap-1"
                      >
                        <IoMdCopy />
                        <span>
                          {copyContent === children ? "Copied" : "Copy"}
                        </span>
                      </button>
                    </div>
                    <pre className="text-sm rounded-b-[8px] overflow-x-auto leading-5 font-semibold font-fira-code">
                      <code className={`hljs ${className} `} {...props}>
                        {children}
                      </code>
                    </pre>
                  </div>
                );
              } else {
                return (
                  <code
                    className="bg-gray-400/50 px-2 py-1 rounded-[2px] text-sm font-semibold"
                    {...props}
                  >
                    {children}
                  </code>
                );
              }
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.content === nextProps.content &&
      prevProps.isStreaming === nextProps.isStreaming
    );
  }
);

export default MarkdownRenderer;
