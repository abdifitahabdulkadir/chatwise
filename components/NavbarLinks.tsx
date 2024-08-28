import Link from "next/link";
const navLinks = [
  {
    href: "/chat",
    label: "Chat",
  },
  {
    href: "/tours",
    label: "Tours",
  },

  {
    href: "/tours/new-tours",
    label: "New Tour",
  },

  {
    href: "/profile",
    label: "Profile",
  },
];

export default function NavbarLinks() {
  return (
    <ul className={`menu gap-y-3 text-base capitalize `}>
      {navLinks.map(({ href, label }) => {
        return (
          <li key={href}>
            <Link href={href}>{label}</Link>
          </li>
        );
      })}
    </ul>
  );
}
