"use client";

import { Fragment } from "react";
import cookieCutter from "cookie-cutter";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import MembershipIcon from "@/components/icons/MembershipIcon";
import PersonalIcon from "@/components/icons/PersonalIcon";
import ReferIcon from "@/components/icons/ReferIcon";
import ContactIcon from "@/components/icons/ContactIcon";
import PolicyManagementIcon from "@/components/icons/PolicyManagementIcon";

const dashboardList = [
  // {
  //   id: 2,
  //   title: "Loyalty Program",
  //   path: "/client-dashboard/loyalty-program",
  //   icon: <MembershipIcon />,
  // },
  {
    id: 1,
    title: "Personal Details",
    path: "/client-dashboard/personal-details",
    icon: <PersonalIcon />,
    active: true,

  },
  {
    id: 3,
    title: "Premium Features",
    path: "/client-dashboard/premium-features",
    icon: <PolicyManagementIcon />,
  },
  {
    id: 6,
    title: "Refer A Friend",
    path: "/client-dashboard/refer-a-friend",
    icon: <ReferIcon />,
  },
  {
    id: 8,
    title: "Contact Support",
    path: "/client-dashboard/support",
    icon: <ContactIcon />,
  },
];

export default function ClientDashboardNav({
  handleMobileDropdown = () => {},
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <div className="hidden md:block p-3 bg-white rounded-2xl shadow">
        {dashboardList.map((item) => (
          <Fragment key={item.id}>
            <Link
              href={item.path}
              className={`flex cursor-pointer  items-center space-x-3 flex-row hover:text-[#1893F8] border-gray-200 border-b-[1px] last:border-b-0 py-4 first:pt-3 last:pb-3 ${
                pathname === item.path ? "text-[#1893F8]" : "text-[#000]"
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </Fragment>
        ))}
      </div>
      {/* Mobile Responsive */}
      <div className="md:hidden fixed bg-white inset-0 z-50 ">
        <div className="items-center px-3 w-full justify-end flex-end flex flex-row gap-3">
          <button
            id="profile-icon"
            onClick={() => {
              handleMobileDropdown();
              router.push("/");
            }}
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="h-[46px] w-[38px]"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9ZM14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z"
                fill="currentColor"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 14.0902 3.71255 16.014 4.90798 17.5417C6.55245 15.3889 9.14627 14 12.0645 14C14.9448 14 17.5092 15.3531 19.1565 17.4583C20.313 15.9443 21 14.0524 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM12 21C9.84977 21 7.87565 20.2459 6.32767 18.9878C7.59352 17.1812 9.69106 16 12.0645 16C14.4084 16 16.4833 17.1521 17.7538 18.9209C16.1939 20.2191 14.1881 21 12 21Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
        {dashboardList.map((item) => (
          <div key={item.id} onClick={() => handleMobileDropdown()}>
            <Link
              href={item.path}
              className={`flex cursor-pointer  items-center space-x-3 flex-row hover:text-[#1893F8] border-gray-200 border-b-[1px] last:border-b-0 py-4 first:pt-3 last:pb-3 ${
                pathname === item.path ? "text-[#1893F8]" : "text-[#000]"
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </div>
        ))}

        <div
          className={`flex cursor-pointer  items-center space-x-3 flex-row hover:text-[#1893F8] border-gray-200 border-b-[1px] last:border-b-0 py-4 first:pt-3 last:pb-3`}
          onClick={() => {
            cookieCutter.set("isAuthenticated", false);
            router.push("/sign-in");
          }}
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[24px] w-[32px]"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span>Log Out</span>
        </div>
      </div>
    </>
  );
}
