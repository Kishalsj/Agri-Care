"use client";

import Image from "next/image";
import { useContext, useState } from "react";

import { AuthContext } from "@/components/contexts/AuthContext";
import UserDropdown from "@/components/layouts/UserDropdown";
import ClientDashboardNav from "../sections/client-dashboard/ClientDashboardNav";

export default function User() {
  const [user] = useContext(AuthContext);
  const { firstName, lastName } = user;
  const [mobileDropdown, setMobileDropdown] = useState(false);

  const handleMobileDropdown = () => {
    setMobileDropdown((prev) => !prev);
  };

  return (
    <div className="flex flex-row items-center space-x-4">
      <div className="lg:flex flex-row items-center gap-2 hidden">
        <span className="capitalize">
          {firstName} {lastName}
        </span>
        <UserDropdown />
      </div>
      <div className={`flex flex-row items-center gap-2 lg:hidden`}>
        <span className="capitalize">{firstName}</span>
        <button
          id="menu-btn"
          name="menu-btn"
          className="block lg:hidden focus:outline-none"
          onClick={() => setMobileDropdown((prev) => !prev)}
        >
          <Image
            src="/img/user-icon.png"
            alt="User Icon"
            className="h-[44px] w-[44px]"
            width={44}
            height={44}
          />
        </button>
        {mobileDropdown && (
          <ClientDashboardNav handleMobileDropdown={handleMobileDropdown} />
        )}
      </div>
    </div>
  );
}
