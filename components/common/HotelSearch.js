"use client";

import { useState } from "react";

import MapMarkerIcon from "@/components/icons/MapMarkerIcon";
import MapMarkerIcon2 from "@/components/icons/MapMarkerIcon2";
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
      onClick={() => setExpanded(true)}
      className={`transition-all duration-500 ease-in-out ${
        expanded
          ? "bg-white rounded-full flex flex-1 flex-col sm:flex-row  md:space-x-4 mx-4 md:mx-0 w-full"
          :`bg-white rounded-full flex justify-between items-center p-1 mx-4 md:mx-0 cursor-pointer ${
              isHomePage ? "w-[70%]" : "w-[50%]"
            }`
      }`}
      style={{
        boxShadow: expanded
          ? ""
          : "4px 0px 6px -1px rgba(0, 0, 0, 0.1), -4px 0px 6px -1px rgba(0, 0, 0, 0.1)",
      }}
    >
      {!expanded && (
        <div
        id="beforeExpand"
        className="flex items-center justify-between w-full max-w-4xl mx-auto "
        >

        <div className="flex items-center space-x-1">
          <div
            className={`${
              isHomePage ? "rounded-full text-[#99989894]" : "bg-white"
            } flex items-center rounded-full px-2.5 py-2.5`}
          >
            <MapMarkerIcon2 />
          </div>
          <div 
            className={`text-[#99989894] rounded-md text-xl italic`}
          >
            {isHomePage ? "Enter Your Destination..." : "Change Location"}
          </div>
        </div>

          <div className="flex items-center space-x-2">
          <div
            className={`${
              isHomePage ? "rounded-full text-[#99989800]" : "bg-white"
            } flex items-center rounded-full px-2.5 py-2.5`}
          >
            <CalendarIcon />
          </div>
          <div 
            className={`text-[#99989894] rounded-md text-xl italic`}
          >
            {isHomePage ? "" : <DateSelector/>}
          </div>
        </div>

        <button
          className={`flex items-center justify-center px-5 py-5 ${
            isHomePage ? "bg-[#0729A0]  rounded-full" : "bg-[#0729A0]  rounded-full"
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
        <div
          id="hotel-search"
          className={`${
            isHomePage ? "bg-white" : "bg-[#1D1A4E]"
          } rounded-full flex flex-1 flex-col sm:flex-row px-3 py-3 md:px-6 md:py-5 shadow-xl md:space-x-4 mx-4 md:mx-0 `}
        >
          {(isHomePage || isHotelListPage) && (
            <div
              className={`${
                isHomePage ? "space-x-4" : "space-x-2"
              } flex flex-1 items-center mb-2 md:mb-0`}
            >
              <div
                className={`${
                  isHomePage ? "bg-[#211b91] rounded-full text-white" : "bg-white"
                } flex items-center rounded-full p-2 w-9 h-9`}
              >
                <MapMarkerIcon />
              </div>
              <div className="flex flex-1 relative">
                <SearchBar
                  location={location}
                  setLocation={setLocation}
                  isHomePage={isHomePage}
                />
              </div>
            </div>
          )}
          <div
            className={`${
              isHomePage ? "space-x-4" : "space-x-2"
            } mb-2 md:mb-0 flex flex-1 items-center`}
          >
            <div
              className={`${
                isHomePage ? "bg-[#211b91] rounded-full text-white" : "bg-white"
              } flex items-center rounded-full p-2 w-9 h-9`}
            >
              <CalendarIcon />
            </div>
            <DateSelector
              dateSelected={dateSelected}
              setDateSelected={setDateSelected}
              isHomePage={isHomePage}
            />
          </div>
          <div
            className={`${
              isHomePage ? "space-x-4" : "space-x-2"
            } mb-2 md:mb-0 flex flex-1 items-center`}
          >
            <div
              className={`${
                isHomePage ? "bg-[#211b91] rounded-full text-white" : "bg-white"
              } flex items-center rounded-full p-2 w-9 h-9`}
            >
              <PersonIcon />
            </div>
            <Travelers
              occupancies={occupancies}
              setOccupancies={setOccupancies}
              isHomePage={isHomePage}
            />
          </div>

          <button
            className={`${
              isHomePage ? "bg-[#211b91] rounded-full" : "bg-[#1893F8] rounded-full"
            } flex items-center justify-center text-white px-6 py-2`}
            onClick={() => {
              handleSearch(dateSelected, occupancies, location);
            }}
          >
            {isHomePage ? "Search" : "Change Search"}
          </button>
        </div>
      )}
    </div>
  );
}
