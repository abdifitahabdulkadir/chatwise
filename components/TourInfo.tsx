import { formatMessageContent } from "@/lib/responseformatters";
import { SiOpenaigym } from "react-icons/si";

export default function TourInfo({ message }: { message: string }) {
  return (
    <div className="mt-10 w-full">
      <div className=" bg-base-200 relative flex gap-x-3 text-xl px-2 py-3 w-full rounded-lg">
        <SiOpenaigym className="w-[2rem] absolute top-3 left-3 h-[2rem] text-primary" />
        <div
          className="mt-10 py-3 px-4 text-sm text-left leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: formatMessageContent(message),
          }}
        />
      </div>
    </div>
  );
}
