"use client";

import { useState } from "react";
import HotelSearch from "./HotelSearch";
import MapMarkerIcon from "@/components/icons/MapMarkerIcon";

export default function NewHotelSearch({
  checkIn,
  checkOut,
  occupanciesInitialValue,
  isHomePage = false,
  handleSearch = () => {},
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative">
      {/* NewHotelSearch Bar */}
      <div
        onClick={() => setExpanded(!expanded)}
        className={`transition-all duration-500 ease-in-out ${
          expanded ? 'absolute left-0 right-0 w-full h-auto rounded-none' : 'absolute left-1/2 transform -translate-x-1/2 w-64 h-12 rounded-full'
        } bg-white flex items-center px-3 py-3 md:px-6 md:py-5 shadow-lg mx-4 md:mx-0 cursor-pointer`}
      >
        <MapMarkerIcon />
        {!expanded && <span className="text-gray-500 ml-2">Enter Your Destination</span>}
      </div>

      {/* Expanded HotelSearch */}
      {expanded && (
        <div className="mt-4">
          <HotelSearch
            checkIn={checkIn}
            checkOut={checkOut}
            occupanciesInitialValue={occupanciesInitialValue}
            isHomePage={isHomePage}
            handleSearch={handleSearch}
          />
        </div>
      )}
    </div>
  );
}
