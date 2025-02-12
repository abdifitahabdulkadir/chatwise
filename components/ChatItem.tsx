import Image from "next/image";
import SyncLoader from "react-spinners/SyncLoader";
interface PreviousChatPros {
  content: string;
  role: string;
}

interface RenderActiveProps extends PreviousChatPros {
  isLoading: boolean;
}

export function RenderPreviousChat({ content, role }: PreviousChatPros) {
  if (role == "user") return <UserChatItem content={content} />;

  return <SystemChatItem content={content} />;
}

export function RenderActiveChat({
  content,
  isLoading,
  role,
}: RenderActiveProps) {
  if (role == "user") return <UserChatItem content={content} />;

  return <SystemChatItem isLoading={isLoading} content={content} />;
}

export function UserChatItem({ content }: { content: string }) {
  return (
    <div className="flex w-full max-w-5xl items-center justify-end">
      <div className="bg-dark-gray/50 mx-4 grid w-full grid-cols-[5%_1fr] items-center gap-2 rounded-3xl px-5 py-5 pl-5 md:w-[60%]">
        <Image
          src={"/icons/user.svg"}
          alt="user icon"
          width={30}
          height={30}
          quality={100}
          className="object-contain"
        />
        <p className="text-md leading-6 font-normal text-wrap text-white">
          {content}
        </p>
      </div>
    </div>
  );
}
export function SystemChatItem({
  content,
  isLoading,
}: {
  content: string;
  isLoading?: boolean;
}) {
  return (
    <div className="flex w-full max-w-5xl items-center gap-3 py-6 pl-5 md:pl-[100px]">
      <div className="grid w-full grid-cols-[5%__1fr] items-start gap-6 md:gap-1">
        <div className="bg-dark-green flex size-[30px] items-center justify-center rounded-xs">
          <Image
            src={"/icons/logo.svg"}
            alt="ai icon"
            width={22}
            height={22}
            quality={100}
            className="size-[22px] object-contain"
          />
        </div>
        {isLoading && (
          <SyncLoader
            cssOverride={{
              display: "block",
            }}
            color="#0fa47f"
            className="grow"
          />
        )}
        {!isLoading && (
          <p className="text-md ml-2 grow pr-5 leading-9 font-normal text-white">
            {content}
          </p>
        )}

        <div className="border-darker col-span-full my-2 border-t-2" />
        <div className="col-span-4 ml-10 flex w-full items-center gap-2">
          <button className="hover:bg-dark-gray group rounded-md px-3 py-2 transition-all duration-200">
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
      </div>
    </div>
  );
}
