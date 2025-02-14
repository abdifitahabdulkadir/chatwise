export const chatsListsDemo: ChatItemI[] = [
  {
    role: "user",
    content:
      "How do I start using React in a Next.js project, and are there any special considerations I need to keep in mind?",
  },
  {
    role: "system",
    content: `
# Sample Markdown with Inline Code

This is a paragraph with some **bold text** and *italic text*. You can include \`inline code\` like this: \`console.log("Hello, world!");\`.

## Lists with Inline Code

### Unordered List
- Use \`print("Hello")\` in Python.
- Use \`console.log("Hello")\` in JavaScript.
- Use \`echo "Hello"\` in Bash.

### Ordered List
1. First, install the package: \`npm install package-name\`.
2. Then, run the script: \`node script.js\`.
3. Finally, check the output: \`cat output.txt\`.

## Mixed Content

You can mix inline code with other Markdown elements:

- This is a list item with \`inline code\`.
- Here is a link: [Google](https://www.google.com).
- Use \`git commit -m "Your message"\` for committing changes.

## Conclusion

This is how you can use \`single backticks\` for inline code in Markdown. Use it for short code snippets or commands!

\`import SystemChatClient from "./SystemChatClient";
import UserChatItem from "./UserChatItem";

type RenderActiveProps = {
  content: string;
  isLoading: boolean;
  role: "system" | "user";
};
export default function RenderActiveChat({
  content,
  isLoading,
  role,
}: RenderActiveProps) {
  if (role == "user") return <UserChatItem content={content} />;

  return <SystemChatClient isLoading={isLoading} content={content} />;
}
\`
`,
  },
];
