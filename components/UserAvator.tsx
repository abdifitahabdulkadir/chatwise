import { useSession } from "next-auth/react";
import Image from "next/image";

export default function UserAvator() {
  const { data } = useSession();

  if (data === null || data === undefined) return null;
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
