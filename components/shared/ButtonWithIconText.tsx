import React from "react";
import ImageIcon from "./ImageIcon";

interface ButtonWithIconTextPros {
  iconUrl: string;
  text: string;
  alt: string;
}
export default function ButtonWithIconText({ iconUrl, text, alt }: ButtonWithIconTextPros) {
  return (
    <button className="bg-transparent border-none shadow-none text-white px-4 flex justify-start gap-2 py-2  w-full rounded-none hover:bg-LightGray/30 hover:bg-opacity-90 text-xs text-left lg:text-sm">
      <ImageIcon iconUrl={iconUrl} alt={alt} />
      {text}
    </button>
  );
}
