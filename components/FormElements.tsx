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
  return <p className="body-regular text-light-500 mt-2.5">{children}</p>;
}

export function FromErrorElement({
  children,
}: {
  children?: ReactNode | string;
}) {
  return <p className="body-regular text-primary-400 mt-1">{children}</p>;
}

export function FormFieldItem({ children }: { children?: ReactNode }) {
  return (
    <div className="flex flex-col items-start justify-center gap-2">
      {children}
    </div>
  );
}
