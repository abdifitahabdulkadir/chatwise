import React from "react";
import { Button } from "../ui/button";
import ImageIcon from "./ImageIcon";

interface ButtonWithIconTextPros {
  iconUrl: string;
  text: string;
  alt: string;
}
export default function ButtonWithIconText({ iconUrl, text, alt }: ButtonWithIconTextPros) {
  return (
    <Button className="bg-transparent border-none shadow-none text-white text-xs px-4 flex justify-start gap-2 w-full rounded-none hover:bg-LightGray/30 hover:bg-opacity-90">
      <ImageIcon iconUrl={iconUrl} alt={alt} />
      {text}
    </Button>
  );
}
