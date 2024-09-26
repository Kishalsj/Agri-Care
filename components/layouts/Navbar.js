"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="hidden space-x-2 gap-0 2xl:gap-6 xl:space-x-4 text-[#002248] font-[600] lg:flex  font-Montserrat ">
      <a
        href="/"
        className={`text-[#1893F8] hover:text-[#1893F8] nav-link cursor-pointer p-1 ${
          pathname === "/" && "active"
        }`}
      >
        Hotel
      </a>
      <Link
        href="/my-trips"
        className={`text-ash hover:text-[#1893F8] nav-link cursor-pointer p-1  ${
          pathname === "/my-trips" && "active"
        }`}
      >
        My Trips
      </Link>
      <Link
        href="/client-dashboard/support"
        className={`text-ash hover:text-[#1893F8] nav-link cursor-pointer p-1  ${
          pathname.includes("/client-dashboard") && "active"
        }`}
      >
        Help
      </Link>
      <Link
        href="/my-trips"
        className={`text-ash hover:text-[#1893F8] nav-link cursor-pointer p-1  ${
          pathname === "/my-trips" && "active"
        }`}
      >
        Contact us
      </Link>
    </div>
  );
}
