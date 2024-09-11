import Link from "next/link";
export const metadata = {
  title: "ChatWise",
  description:
    "ChatWise: Your AI language companion. Powered by Gemini API, it enhances your conversations, content creation, and more!",
};
export default function Home() {
  return (
    <main className="hero min-h-screen bg-base-100">
      <div className="text-center hero-content">
        <div className="max-w-md">
          <h1 className="text-6xl font-bold text-primary">ChatWise</h1>

          <p className="py-6 text-lg leading-loose">
            ChatWise: Your AI language companion. Powered by Gemmini AI, it
            enhances your conversations, content creation, and more!
          </p>
          <Link href={"/chat"} className="btn btn-secondary ">
            Get Started
          </Link>
        </div>
      </div>
    </main>
  );
}
