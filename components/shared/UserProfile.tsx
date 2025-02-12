"use client";

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { LogOut, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import DropDownMenu from "../DropDownMenu";

export default function UserProfile() {
  const { data } = useSession();

  return (
    <div className="hover:bg-light-gray/30 hover:bg-opacity-90 border-light-gray/50 flex cursor-pointer items-center gap-2 rounded-sm border px-4 py-2 text-left text-xs text-white shadow-none lg:text-sm">
      {data === null ||
        (data === undefined && (
          <Image
            src={"/icons/userholder.png"}
            width={30}
            height={30}
            alt=" user icon"
            className="rounded-full object-cover object-center"
          />
        ))}
      {data?.user?.image ? (
        <Image
          src={data.user.image}
          width={30}
          height={30}
          alt=" user icon"
          className="rounded-full object-cover object-center"
        />
      ) : (
        <div className="bg-dark-green/30 flex h-[50px] w-[50px] items-center justify-center rounded-full font-bold text-white">
          {data?.user?.name?.substring(0, 2).toUpperCase()}
        </div>
      )}
      <h2 className="text-md line-clamp-1 font-normal">{data?.user?.name}</h2>
      <div className="ml-auto">
        <DropDownMenu
          label="Settings"
          trigger={<Settings className="ml-auto" />}
        >
          <DropdownMenuItem
            onClick={async () => {
              await signOut();
            }}
            className="hover:bg-medium-gray/50 flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1 transition-all duration-200 hover:border-none hover:outline-hidden"
          >
            <LogOut />
            <span className="text-sm font-normal"> Logout</span>
          </DropdownMenuItem>
        </DropDownMenu>
      </div>
    </div>
  );
}
