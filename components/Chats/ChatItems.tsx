import { formatContent } from "@/lib/utils";
import Image from "next/image";
import ContentFormatter from "../ContentFormatter";

type RenderActiveProps = {
  content: string;
  role: "system" | "user";
};

export default function RenderContent({ content, role }: RenderActiveProps) {
  if (role == "user") return <UserChatItem content={content} />;

  return <SystemChatItem content={content} />;
}

export function UserChatItem({ content }: { content: string }) {
  return (
    <div className="flex w-full items-center justify-end">
      <div className="mx-4 flex w-full items-center justify-end">
        <div className="bg-dark-gray/50 inline-flex w-fit items-center gap-x-4 rounded-2xl px-4 py-5 lg:max-w-[70%]">
          <p className="text-md leading-7 font-normal text-wrap text-white">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}

type SystemPros = {
  content: string;
};

export function SystemChatItem({ content }: SystemPros) {
  const formattedContent = formatContent(content);
  return (
    <div className="flex w-full items-center gap-3 py-6 pl-5">
      <div className="grid w-full grid-cols-[5%__1fr] items-start gap-6 md:gap-1">
        <div className="bg-dark-green me-1 flex size-[30px] items-center justify-center rounded-xs">
          <Image
            src={"/icons/logo.svg"}
            alt="ai icon"
            width={22}
            height={22}
            quality={100}
            className="size-[22px] object-contain"
          />
        </div>

        <ContentFormatter content={formattedContent} />

        <>
          <div className="border-darker col-span-full my-2 border-t-2" />
          <div className="col-span-4 ml-10 flex w-full items-center gap-2">
            <button className="hover:bg-dark-gray group cursor-pointer rounded-md px-3 py-2 transition-all duration-200">
              <Image
                src={"/icons/like.svg"}
                alt="like button svg icon"
                width={16}
                height={16}
                quality={100}
                className="size-[16px] transform transition-all duration-200 group-hover:scale-[1.2]"
              />
            </button>
            <button className="hover:bg-dark-gray group cursor-pointer rounded-md px-3 py-2 transition-all duration-200">
              <Image
                src={"/icons/dislike.svg"}
                alt="like button svg icon"
                width={16}
                height={16}
                quality={100}
                className="size-[16px] transform transition-all duration-200 group-hover:scale-[1.2]"
              />
            </button>
          </div>
        </>
      </div>
    </div>
  );
}
