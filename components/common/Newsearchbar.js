"use client";

import { useState } from "react";
import MapMarkerIcon from "@/components/icons/MapMarkerIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";
import PersonIcon from "@/components/icons/PersonIcon";
import DateSelector from "./DateSelector";
import Travelers from "./Travelers";
import SearchBar from "./SearchBar";

export default function HotelSearch({
  checkIn,
  checkOut,
  locationInitialValue,
  occupanciesInitialValue,
  isHomePage = false,
  isHotelListPage = false,
  handleSearch = () => {},
}) {
  const [location, setLocation] = useState(locationInitialValue || "");
  const [dateSelected, setDateSelected] = useState([checkIn, checkOut]);
  const [occupancies, setOccupancies] = useState(occupanciesInitialValue);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className={`transition-all duration-500 ease-in-out ${
        expanded
          ? "bg-white rounded-full flex flex-1 flex-col sm:flex-row px-3 py-3 md:px-6 md:py-5 shadow-lg md:space-x-4 mx-4 md:mx-0"
          : "bg-white rounded-full flex justify-center items-center p-4 mx-4 md:mx-0 cursor-pointer"
      }`}
    >
      {!expanded && (
        <div className="flex items-center">
          <MapMarkerIcon />
          <div className=" text-ash px-4 py-2 rounded-md">
            Enter Your Destination
            </div>
          <button
              className={`flex items-center justify-center px-5 py-5 ${
                isHomePage ? "bg-[#1893F8] rounded-full" : "bg-[#1893F8] rounded-full"
               }`}
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-6 h-6 text-white"
                  >
                  <path
                   d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                    fill="white"
                  />
                </svg>
              </button>
        </div>
      )}

      {expanded && (
        <>
          
        </>
      )}
    </div>
  );
}
