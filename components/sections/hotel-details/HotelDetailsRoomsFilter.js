"use client";

import { useState } from "react";

const filters = [
  {
    id: "all-rooms",
    label: "All Rooms",
  },
  {
    id: "refundable",
    label: "Refundable",
  },
  {
    id: "bed-and-breakfast",
    label: "Bed And Breakfast",
  },
  {
    id: "accessible-rooms",
    label: "Accessible Rooms",
  },
  {
    id: "hotel-loyalty",
    label: "Hotel Loyalty",
  },
];

export default function HotelDetailsRoomsFilter({
  filter = "all-rooms",
  setFilter = () => {},
}) {
  return (
    <div className="flex flex-col items-start w-full sm:w-auto">
      <div className="flex justify-end items-end">
        <div className="lg:flex items-center hidden space-x-20 font-Montserrat">
          {filters.map(({ id, label }) => (
            <div key={id} className="flex items-center">
              <input
                id={id}
                name={id}
                type="radio"
                value={id}
                checked={filter === id}
                onChange={() => setFilter(id)}
                className="mr-1"
              />
              <label
                htmlFor={id}
                className="radio-label mr-4 flex cursor-pointer"
              >
                {label}
              </label>
            </div>
          ))}
        </div>
        <label
          htmlFor="hotel-details-rooms-filter"
          className="opacity-0"
        ></label>
        <select
          id="hotel-details-rooms-filter"
          name="hotel-details-rooms-filter"
          className="w-full block lg:hidden border-[#5C6A7A] border-[1px] rounded-md px-3 py-3 text-[#5C6A7A]"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {filters.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
