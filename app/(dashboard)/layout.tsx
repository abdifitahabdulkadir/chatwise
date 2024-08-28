import SideBar from "@/components/Sidebar";
import { FaBarsStaggered } from "react-icons/fa6";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content overflow-y-hidden px-5 py-5 flex flex-col items-center justify-center">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary text-4xl text-primary self-end bg-transparent border-none hover:bg-transparent drawer-button lg:hidden"
        >
          <FaBarsStaggered className="bg-transparent" />
        </label>
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <SideBar />
      </div>
    </div>
  );
}
