import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import atomOneDark from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
export default function ContentFormatter({ content }: { content: string }) {
  return (
    <Markdown
      className={cn(
        "prose prose-sm prose-strong:text-white prose-ul:text-white/80 prose-ul:leading-8 prose-p:text-white prose-ol:font-normal prose-p:my-0 prose-p:py-0 prose-ul:font-normal prose-ol:text-white/80 prose-ol:my-0 prose-ol:py-0 prose-ul:py-0 prose-ul:my-0 prose-headings:text-white prose-a:text-blue-500 prose-table:mb-1.5 prose-tr:not-last:border-light-gray prose-tr:not-last:border-b-[.4px] prose-th:border-white/50 prose-th:border-b-[.6px] prose-table:text-white/70 mt-6 grid max-w-none text-[1rem] leading-10 break-words",
      )}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        code({ inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={atomOneDark}
              wrapLines
              PreTag="div"
              useInlineStyles={true}
              showLineNumbers
              customStyle={{
                backgroundColor: "#202123",
                fontSize: "1.1rem",
                borderRadius: "0.5rem",
                width: "100%",
              }}
              language={match[1]}
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code
              className={cn(
                className,
                "bg-dark-gray/60 rounded-md p-1 font-bold text-white",
              )}
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </Markdown>
  );
}
