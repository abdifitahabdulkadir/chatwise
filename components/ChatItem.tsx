import Image from "next/image";
import React from "react";

export default function ChatItem({ icon, message, role }: ChatItemI) {
  if (role == "user") {
    return (
      <div className="grid grid-cols-[5%__90%] py-5 bg-DarkGray items-center  w-fit   px-4 gap-2">
        <Image src={icon} alt="user icon" width={30} height={30} quality={100} className="object-contain" />
        <p className="text-white font-normal text-[15px]">{message}</p>
      </div>
    );
  }
  return (
    <div className="w-full flex items-center gap-3 py-6 pl-[100px]  ">
      <div className="w-full grid grid-cols-[5%__1fr] sm:gap-6 md:gap-1 items-start">
        <div className="rounded-sm bg-DarkGreen size-[30px] flex items-center justify-center  ">
          <Image src={icon} alt="ai icon" width={22} height={22} quality={100} className=" size-[22px]" />
        </div>
        <p className="text-white mt-4 flex-grow leading-9 pr-5  font-normal text-[15px]">{message}</p>
        <div className="col-span-full border-Daker border-t-2 my-2" />
        <div className="flex items-center w-full  gap-2 ml-10 col-span-4 ">
          <button className="hover:bg-DarkGray rounded-md px-3 py-2 transition-all duration-200 group ">
            <Image src={"/icons/like.svg"} alt="like button svg icon" width={16} height={16} quality={100} className=" size-[16px] group-hover:scale-[1.2]" />
          </button>
          <button className="hover:bg-DarkGray rounded-md px-3 py-2 transition-all duration-200 group ">
            <Image src={"/icons/dislike.svg"} alt="like button svg icon" width={16} height={16} quality={100} className=" size-[16px] group-hover:scale-[1.2]" />
          </button>
        </div>
      </div>
    </div>
  );
}
