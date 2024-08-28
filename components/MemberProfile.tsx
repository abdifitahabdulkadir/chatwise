"use client";
import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function MemberProfile({
  email,
}: {
  email: string | undefined;
}) {
  const [render, setRender] = useState<Boolean>(false);
  useEffect(function () {
    setRender(true);
  }, []);
  return (
    <div className="text-base max-w-full overflow-hidden items-center justify-center flex gap-2 bg-base-100 px-2 py-3 rounded-md">
      {render && (
        <>
          <UserButton afterSwitchSessionUrl="/" />
          <p className="line-clamp-1 text-sm ">{email}</p>
        </>
      )}
    </div>
  );
}
