"use client";

import { useState } from "react";

export default function HotelListingSort({
  filteredHotels,
  sortBy,
  handleSort,
}) {
  const [sortValue, setSortValue] = useState(sortBy);

  return (
    <>
      <div className="flex flex-col xl:hidden space-y-2 items-center rounded-xl shadow bg-white md:px-4 px-2 font-Montserrat">
        <span className="font-bold text-md mb-2">Sort By</span>

        <div className="flex flex-col space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="sortOption"
              value="relevanceAsc"
              checked={sortValue === "relevanceAsc"}
              onChange={(event) => {
                const value = event.target.value;
                setSortValue(value);
                handleSort(value, filteredHotels);
              }}
            />
            <span
              className={`ml-2 radio-button ${
                sortValue === "relevanceAsc" ? "radio-button-checked" : ""
              }`}
            ></span>
            <span className="ml-2">Recommended</span>
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="sortOption"
              value="priceAsc"
              checked={sortValue === "priceAsc"}
              onChange={(event) => {
                const value = event.target.value;
                setSortValue(value);
                handleSort(value, filteredHotels);
              }}
            />
            <span
              className={`ml-2 radio-button ${
                sortValue === "priceAsc" ? "radio-button-checked" : ""
              }`}
            ></span>
            <span className="ml-2">Lowest Price</span>
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="sortOption"
              value="saveAsc"
              checked={sortValue === "saveAsc"}
              onChange={(event) =>
                handleSort(event.target.value, filteredHotels)
              }
            />
            <span
              className={`ml-2 radio-button ${
                sortValue === "saveAsc" ? "radio-button-checked" : ""
              }`}
            ></span>
            <span className="ml-2">Highest Saving</span>
          </label>
        </div>
      </div>
      <div className=" hidden xl:flex space-x-2 items-center rounded-xl shadow bg-white px-4">
        <label htmlFor="sort-select" className="font-bold text-md">
          Sort By
        </label>
        <select
          className="w-full md:w-auto h-10 px-4 py-2 outline-none cursor-pointer"
          id="sort-select"
          name="sort-select"
          value={sortBy}
          onChange={(event) => handleSort(event.target.value, filteredHotels)}
        >
          <option value="relevanceAsc">Recommended</option>
          <option value="priceAsc">Lowest Price</option>
          <option value="saveAsc">Highest Saving</option>
        </select>
      </div>
    </>
  );
}
