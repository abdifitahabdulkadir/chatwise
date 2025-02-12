import Image from "next/image";

export default function UserChatItem({ content }: { content: string }) {
  return (
    <div className="flex w-full items-center justify-end">
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
