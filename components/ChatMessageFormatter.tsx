import { cn } from "@/lib/utils";
import { Code } from "bright";
import { MDXRemote } from "next-mdx-remote/rsc";
Code.theme = {
  light: "github-light",
  dark: "dracula",
  lightSelector: "html.light",
};

export default function ChatMessageFormatter({ content }: { content: string }) {
  const formattedContent = content
    .replace(/\\/g, "")
    .replace(/&#x20;/g, "")
    .replace(/^\s*\n/gm, "");
  return (
    <section
      className={cn(
        "prose prose-sm prose-code:bg-dark-gray/60 prose-code:rounded-md prose-code:text-white prose-code:px-2 prose-code:py-2 prose-strong:text-white prose-ul:text-white/80 prose-ul:leading-8 prose-p:text-white prose-ol:font-normal prose-ul:font-normal prose-ol:text-white/80 mt-6 grid max-w-none text-[1rem] leading-10 break-words",
      )}
    >
      <MDXRemote
        source={formattedContent}
        components={{
          pre: (props) => (
            <Code
              {...props}
              lineNumbers
              title="{Sample Code}"
              className="prose !ml-5 w-full !rounded-md"
            />
          ),
        }}
      />
    </section>
  );
}
