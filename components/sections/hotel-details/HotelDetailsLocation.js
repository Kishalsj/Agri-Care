"use client"; // This makes the component a Client Component

import { useState } from "react";
import NewHotelMap from "@/components/common/NewHotelMap";

export default function HotelDetailsLocation({ descriptions = [], hotel }) {
  const [expanded, setExpanded] = useState({});

  // Toggles the expanded state for each description
  const toggleExpand = (type) => {
    setExpanded((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  // Shortens the text to 100 words
  const truncateText = (text) => {
    const words = text.split(" ");
    return words.length > 100 ? words.slice(0, 100).join(" ") + "..." : text;
  };

  return (
    <div
      id="location"
      className="flex flex-col md:flex-row bg-gray-100 rounded-2xl p-4"
    >
      <div className="flex flex-row rounded-2xl shadow-xl bg-white p-4 w-full my-5">

      {/* Left side: Descriptions */}
      <div className="flex flex-col space-y-2  p-4 w-full my-5 xl:my-0 xl:w-1/2">
        <h3 className="text-2xl font-bold mb-2 font-Montserrat">About This Area</h3>
        <div className="space-y-4 font-Montserrat">
          {descriptions.map((item) => (
            <div key={item.type} className="grid grid-flow-row gap-2">
              <div className="flex flex-col gap-2">
                <span className="font-bold">{item.type}</span>
                <span className="text-[#5C6A7A]">
                  {/* If expanded, show full text, otherwise truncate */}
                  {expanded[item.type] ? item.text : truncateText(item.text)}
                  {item.text.split(" ").length > 100 && (
                    <button
                      className="text-blue-500 ml-2 text-sm font-semibold font-Montserrat"
                      onClick={() => toggleExpand(item.type)}
                    >
                      {expanded[item.type] ? "See Less" : "See More"}
                    </button>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
  
      {/* Right side: Map */}
      <div className="flex flex-col space-y-2  p-4  w-full md:w-1/2 h-[525px]">
        <h3 className="text-2xl font-bold mb-2">Where You Will Be</h3>
        <div className="flex-grow">
          <NewHotelMap
            id={hotel.id}
            lat={hotel.geoCode.lat}
            lng={hotel.geoCode.long}
          />
        </div>
      </div>
      </div>
    </div>
  );
  
}
