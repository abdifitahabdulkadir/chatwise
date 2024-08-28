import { currentUser } from "@clerk/nextjs/server";
import MemberProfile from "./MemberProfile";
import NavbarLinks from "./NavbarLinks";
import SidebarHeader from "./SidebarHeader";

export default async function SideBar() {
  const user = await currentUser();
  return (
    <div className="bg-base-200 py-10 relative px-4 text-base-content min-h-full w-60 md:w-80 grid grid-rows-[auto,1fr,auto] ">
      <SidebarHeader />
      <NavbarLinks />
      <MemberProfile email={user?.emailAddresses[0].emailAddress} />
    </div>
  );
}
