"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import cookieCutter from "cookie-cutter";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function UserDropdown() {
  const router = useRouter();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Image
          src="/img/user-icon.png"
          alt="User Icon"
          className="h-[44px] w-[44px] cursor-pointer"
          width={44}
          height={44}
          priority
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="w-48 mr-4 py-2 rounded-lg md:w-56 bg-white z-50 overflow-hidden shadow-[0px_1px_5px_3px_rgba(22,23,24,0.2)]">
          <DropdownMenu.Item
            id="my-account"
            className="flex cursor-pointer select-none items-center px-2 py-2 text-sm outline-none hover:bg-[#1893F8] hover:text-white"
            onSelect={() => {
              router.push("/client-dashboard/personal-details");
            }}
          >
            My Account
          </DropdownMenu.Item>
          <DropdownMenu.Item
            id="logout"
            className="flex cursor-pointer select-none items-center px-2 py-2 text-sm outline-none hover:bg-[#1893F8] hover:text-white"
            onSelect={() => {
              cookieCutter.set("isAuthenticated", false);
              localStorage.removeItem("isAuthenticated");
              document.cookie.split(";").forEach(function (c) {
                document.cookie = c
                  .replace(/^ +/, "")
                  .replace(
                    /=.*/,
                    "=;expires=" + new Date().toUTCString() + ";path=/"
                  );
              });
              router.push("/sign-in");
            }}
          >
            Log Out
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
