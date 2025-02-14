"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface SideBarToggleContextType {
  isSidebarOpen: boolean;
  toggle: () => void;
}

const SideBarToggleContext = createContext<SideBarToggleContextType>({
  isSidebarOpen: true,
  toggle: () => {},
});

export default function SideBarToggleProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const toggle = () => setIsSidebarOpen((prev) => !prev);
  return (
    <SideBarToggleContext.Provider
      value={{
        isSidebarOpen,
        toggle,
      }}
    >
      {children}
    </SideBarToggleContext.Provider>
  );
}

export function useSideBarToogle() {
  return useContext(SideBarToggleContext);
}
