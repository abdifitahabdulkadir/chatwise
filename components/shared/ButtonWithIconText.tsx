import React from "react";
import ImageIcon from "./ImageIcon";
import { signOut } from "next-auth/react";

interface ButtonWithIconTextPros {
  iconUrl: string;
  text: string;
  alt: string;
  buttonType: "logout" | "clear" | "lightMode";
}
export default function ButtonWithIconText({
  iconUrl,
  text,
  alt,

  buttonType,
}: ButtonWithIconTextPros) {
  async function handleSubmit() {
    if (buttonType === "logout") {
      await signOut();
    }
  }
  return (
    <button
      onClick={handleSubmit}
      className="hover:bg-light-gray/30 hover:bg-opacity-90 flex w-full cursor-pointer justify-start gap-2 rounded-none border-none bg-transparent px-4 py-2 text-left text-xs text-white shadow-none lg:text-sm"
    >
      <ImageIcon iconUrl={iconUrl} alt={alt} />
      {text}
    </button>
  );
}
