import React from "react";
import { useInView } from "react-intersection-observer";
interface Props {
  children: React.ReactNode;
  onBottotomReached: () => void;
  postionOfInVisibleElement?: "top" | "bottom";
}
export default function InfiniteScrollWrapper({
  children,
  onBottotomReached = () => {},
  postionOfInVisibleElement = "bottom",
}: Props) {
  const { ref } = useInView({
    rootMargin: "50px",
    threshold: 0.3,
    onChange: (inView) => {
      if (inView) {
        onBottotomReached();
      }
    },
  });
  return (
    <div className="flex w-full flex-col items-center justify-center gap-1.5">
      {postionOfInVisibleElement == "top" && <div ref={ref} />}
      {children}
      {postionOfInVisibleElement == "bottom" && <div ref={ref} />}
    </div>
  );
}
