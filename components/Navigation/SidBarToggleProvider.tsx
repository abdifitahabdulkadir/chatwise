"use client";
import { createContext, ReactNode, use, useState } from "react";

interface SideBarToggleContextType {
  isSidebarOpen: boolean;
  toggle: () => void;
  sideBarLists: ChatTitleI[];
  addToSidebar: (chat: ChatTitleI[]) => void;
}

const SideBarToggleContext = createContext<SideBarToggleContextType>({
  isSidebarOpen: true,
  toggle: () => {},
  sideBarLists: [],
  addToSidebar: () => {},
});

export default function SideBarProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const toggle = () => setIsSidebarOpen((prev) => !prev);
  const [sidebar, setSidebarData] = useState<ChatTitleI[]>([]);
  const addToSidebar = (chat: ChatTitleI[]) => {
    setSidebarData(() => [...chat]);
  };
  return (
    <SideBarToggleContext.Provider
      value={{
        isSidebarOpen,
        toggle,
        sideBarLists: sidebar,
        addToSidebar: addToSidebar,
      }}
    >
      {children}
    </SideBarToggleContext.Provider>
  );
}

export function useSidebarProvider() {
  return use(SideBarToggleContext);
}
