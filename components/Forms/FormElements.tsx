import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function FormLabel({
  children,
  className,
}: {
  children: ReactNode | string;
  className?: string;
}) {
  return (
    <label
      className={cn("paragraph-semibold text-dark400_light800", className)}
    >
      {children}
    </label>
  );
}

export function FromDescription({ children }: { children?: ReactNode }) {
  return <p className="mt-2.5 font-normal italic">{children}</p>;
}

export function FromErrorElement({
  children,
}: {
  children?: ReactNode | string;
}) {
  return (
    <p className="mt-1 line-clamp-2 font-normal text-red-300 italic">
      {children}
    </p>
  );
}

export function FormFieldItem({ children }: { children?: ReactNode }) {
  return (
    <div className="flex flex-col items-start justify-center gap-2">
      {children}
    </div>
  );
}
