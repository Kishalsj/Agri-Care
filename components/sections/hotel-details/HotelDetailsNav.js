"use client";

import { Link } from "react-scroll";

const navItems = [
  {
    id: 1,
    title: "Overview",
  },
  {
    id: 2,
    title: "Room",
  },
  {
    id: 3,
    title: "Location",
  },
  {
    id: 4,
    title: "Amenities",
  },
  {
    id: 5,
    title: "Policies",
  },
  {
    id: 6,
    title: "Reviews",
  },
  // {
  //   id: 7,
  //   title: "Images",
  // },
];

export default function HotelDetailsNav() {
  return (
    <div
    className="w-full md:flex md:items-center md:justify-between md:space-x-8 bg-white rounded-xl p-0 md:p-2 shadow"
    >
      <div className="flex items-center space-x-4 overflow-y-auto md:max-w-lg xl:max-w-5xl 2xl:max-w-7xl lg:max-w-3xl whitespace-nowrap">
        {navItems.map((navItem) => (
          <Link
            key={navItem.id}
            activeClass="border-b-blue-500 text-blue-800"
            className="text-sm  md:text-base border-b-4 border-transparent px-3 py-2.5 text-base cursor-pointer text-black dark:text-black"
            smooth={true}
            spy={true}
            offset={-200}
            href={`#${navItem.title.toLowerCase()}`}
            to={navItem.title.toLowerCase()}
          >
            {navItem.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
