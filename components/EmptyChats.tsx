import Image from "next/image";
import React from "react";

export default function EmptyChats() {
  return (
    <div className="flex h-screen max-h-[50vh] flex-grow items-center justify-center">
      <Image
        src="/icons/logo.svg"
        alt="logo image"
        width={10}
        height={10}
        className="h-24 w-24 place-self-center md:h-32 md:w-32"
      />
    </div>
  );
}
