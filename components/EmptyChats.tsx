import Image from "next/image";

export default function EmptyChats() {
  return (
    <div className="flex h-screen max-h-[50vh] flex-grow flex-col items-center justify-center gap-y-3">
      <Image
        src="/icons/logo.svg"
        alt="logo image"
        width={10}
        height={10}
        className="h-24 w-24 place-self-center md:h-32 md:w-32"
      />
      <h4 className="text-2xl font-semibold text-white">Welcome to ChatWise</h4>
    </div>
  );
}
