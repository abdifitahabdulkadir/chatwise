import Image from "next/image";

import { cn } from "@/lib/utils";
interface ImageIconProps {
  iconUrl: string;
  imageStyle?: string;
  alt: string;
}
export default function ImageIcon({
  iconUrl,
  alt,
  imageStyle,
}: ImageIconProps) {
  return (
    <Image
      src={iconUrl}
      alt={alt}
      height={15}
      width={15}
      className={cn("object-contain", imageStyle)}
      loading="eager"
    />
  );
}
