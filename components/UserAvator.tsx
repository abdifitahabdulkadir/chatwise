import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function UserAvator() {
  const { data } = useSession();

  if (data?.user?.image)
    return (
      <Image
        src={data.user?.image}
        width={30}
        height={30}
        alt=" user icon"
        className="rounded-full object-cover object-center"
      />
    );

  const userName = data?.user?.name?.substring(0, 2).toUpperCase();
  return (
    <div className="bg-dark-green/30 flex h-[50px] w-[50px] items-center justify-center rounded-full font-bold text-white">
      {userName}
    </div>
  );
}
