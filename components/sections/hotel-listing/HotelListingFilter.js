"use client";

import { useState } from "react";

import FullStarIcon from "@/components/icons/FullStarIcon";
import GrayStarIcon from "@/components/icons/GrayStarIcon";
import toggleArrayItem from "@/utils/toggle-array-item";
import PriceFilter from "./HotelListingPriceFilter";
import Modal from "@/components/common/Modal";

export default function HotelListingFilter({
  hotels,
  filteredHotels,
  selectedFilters,
  handleSelectedFilters,
}) {
  
  return (
    <div className="rounded-xl shadow p-6 text-[#002248] flex-col flex gap-3 bg-white border-gray-200 font-Montserrat">
      <div className="flex flex-col gap-3">


      {/* <label htmlFor="name-filter" className="font-bold text-[18px]">
          Sort By
        </label>
        <div className=" border-gray-200 border-b-[1px] pb-6">
                <HotelListingSort
                  filteredHotels={filteredHotels}
                  sortBy={sortBy}
                  handleSort={handleSort}
                />
       </div> */}

        <label htmlFor="name-filter" className="font-bold text-[20px]">
          Search
        </label>
        <div className="border-gray-200 border-b-[1px] pb-6">
          <div className="relative text-gray-600">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg
                fill="none"
                stroke="#D1D5DB"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>

            <input
              type="text"
              className="py-3 text-sm text-black border-gray-300 border-[1px] w-full rounded-md pl-10 focus:outline-none"
              id="name-filter"
              name="name-filter"
              value={selectedFilters.searchFilter}
              onChange={(e) =>
                handleSelectedFilters({
                  ...selectedFilters,
                  searchFilter: e.target.value,
                })
              }
            />
            {selectedFilters.searchFilter !== "" && (
              <span
                onClick={() =>
                  handleSelectedFilters({
                    ...selectedFilters,
                    searchFilter: "",
                  })
                }
                className="absolute cursor-pointer inset-y-0 right-1.5 flex items-center pl-2 text-gray-200"
              >
                <svg
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  className="ml-2"
                  fill="#E5E7EB"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3327 1.1665L1.66602 12.8332"
                    stroke="#E5E7EB"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1.66602 1.1665L13.3327 12.8332"
                    stroke="#E5E7EB"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </div>
        </div>

        <PriceFilter
        handleSelectedFilters={handleSelectedFilters}
        selectedFilters={selectedFilters}
      />
        <label className="font-bold text-[20px] mt-1 ">Star Rating</label>
        <div className="flex flex-row w-full items-center border-gray-200 border-b-[1px] pb-6 space-x-2">
          <button
            onClick={() => {
              handleSelectedFilters({
                ...selectedFilters,
                starRatingFilter: [],
              });
            }}
            className={`${
              selectedFilters.starRatingFilter.length === 0
                ? "text-[#0C08AE]"
                : ""
            } flex flex-row items-center flex-1 space-x-1`}
          >
            {selectedFilters.starRatingFilter.length === 0 ? (
              <FullStarIcon />
            ) : (
              <GrayStarIcon />
            )}
            <span>All</span>
          </button>
          <button
            onClick={() => {
              const starRatingFilter = toggleArrayItem(
                selectedFilters.starRatingFilter,
                "1"
              );

              handleSelectedFilters({
                ...selectedFilters,
                starRatingFilter,
              });
            }}
            className={`${
              selectedFilters.starRatingFilter.includes("1")
                ? "text-[#0C08AE]"
                : ""
            } flex flex-row items-center flex-1 space-x-1`}
          >
            {selectedFilters.starRatingFilter.includes("1") ? (
              <FullStarIcon />
            ) : (
              <GrayStarIcon />
            )}
            <span>1</span>
          </button>
          <button
            onClick={() => {
              const starRatingFilter = toggleArrayItem(
                selectedFilters.starRatingFilter,
                "2"
              );

              handleSelectedFilters({
                ...selectedFilters,
                starRatingFilter,
              });
            }}
            className={`${
              selectedFilters.starRatingFilter.includes("2")
                ? "text-[#0C08AE]"
                : ""
            } flex flex-row items-center flex-1 space-x-1`}
          >
            {selectedFilters.starRatingFilter.includes("2") ? (
              <FullStarIcon />
            ) : (
              <GrayStarIcon />
            )}
            <span>2</span>
          </button>
          <button
            onClick={() => {
              const starRatingFilter = toggleArrayItem(
                selectedFilters.starRatingFilter,
                "3"
              );

              handleSelectedFilters({
                ...selectedFilters,
                starRatingFilter,
              });
            }}
            className={`${
              selectedFilters.starRatingFilter.includes("3")
                ? "text-[#0C08AE]"
                : ""
            } flex flex-row items-center flex-1 space-x-1`}
          >
            {selectedFilters.starRatingFilter.includes("3") ? (
              <FullStarIcon />
            ) : (
              <GrayStarIcon />
            )}
            <span>3</span>
          </button>
          <button
            onClick={() => {
              const starRatingFilter = toggleArrayItem(
                selectedFilters.starRatingFilter,
                "4"
              );

              handleSelectedFilters({
                ...selectedFilters,
                starRatingFilter,
              });
            }}
            className={`${
              selectedFilters.starRatingFilter.includes("4")
                ? "text-[#0C08AE]"
                : ""
            } flex flex-row items-center flex-1 space-x-1`}
          >
            {selectedFilters.starRatingFilter.includes("4") ? (
              <FullStarIcon />
            ) : (
              <GrayStarIcon />
            )}
            <span className="ml-1">4</span>
          </button>
          <button
            onClick={() => {
              const starRatingFilter = toggleArrayItem(
                selectedFilters.starRatingFilter,
                "5"
              );

              handleSelectedFilters({
                ...selectedFilters,
                starRatingFilter,
              });
            }}
            className={`${
              selectedFilters.starRatingFilter.includes("5")
                ? "text-[#0C08AE]"
                : ""
            } flex flex-row items-center flex-1 space-x-1`}
          >
            {selectedFilters.starRatingFilter.includes("5") ? (
              <FullStarIcon />
            ) : (
              <GrayStarIcon />
            )}
            <span>5</span>
          </button>
        </div>
        <label className="font-bold text-[20px] mt-1">Popular Filters</label>
        <div className="flex flex-row w-full justify-between items-center border-gray-200 border-b-[1px] pb-6">
          <div className="flex flex-row gap-1 items-center">
            <input
              className="w-[29px] h-[19px] cursor-pointer"
              type="checkbox"
              id="free-refundable-filter"
              name="free-refundable-filter"
              checked={selectedFilters.refundableFilter}
              onChange={(event) => {
                handleSelectedFilters({
                  ...selectedFilters,
                  refundableFilter: event.target.checked,
                });
              }}
            />
            <label htmlFor="free-refundable-filter" className="cursor-pointer">
              Refundable
            </label>
          </div>
          <span className="text-[#5C6A7A] text-[15px] ">
            {hotels.length > 0 && (
              <>
                [{" "}
                {
                  hotels.filter(
                    (hotel) =>
                      hotel.options && hotel.options.refundable === true
                  ).length
                }{" "}
                ]
              </>
            )}
          </span>
        </div>
        <label className="font-bold text-[20px] mt-1">Popular Amenities</label>
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-row gap-1 items-center">
            <input
              id="swimming-pool-filter"
              name="swimming-pool-filter"
              value="Swimming Pool"
              type="checkbox"
              className="w-[29px] h-[19px] cursor-pointer"
              checked={selectedFilters.swimmingPoolFilter}
              onChange={(event) => {
                handleSelectedFilters({
                  ...selectedFilters,
                  swimmingPoolFilter: event.target.checked,
                });
              }}
            />
            <label htmlFor="swimming-pool-filter" className="cursor-pointer">
              Swimming Pool
            </label>
          </div>
          <span className="text-[#5C6A7A] text-[15px]">
            {hotels.length > 0 && (
              <>
                [{" "}
                {
                  hotels.filter(
                    (hotel) =>
                      hotel.facilityGroups &&
                      hotel.facilityGroups.some(
                        (facilityGroup) =>
                          facilityGroup.name === "Swimming Pool"
                      )
                  ).length
                }{" "}
                ]
              </>
            )}
          </span>
        </div>
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-row gap-1 items-center">
            <input
              id="wifi-filter"
              name="wifi-filter"
              value="Internet"
              type="checkbox"
              className="w-[29px] h-[19px] cursor-pointer"
              checked={selectedFilters.internetFilter}
              onChange={(event) => {
                handleSelectedFilters({
                  ...selectedFilters,
                  internetFilter: event.target.checked,
                });
              }}
            />
            <label htmlFor="wifi-filter" className="cursor-pointer">
              Wifi
            </label>
          </div>
          <span className="text-[#5C6A7A] text-[15px]">
            {hotels.length > 0 && (
              <>
                [{" "}
                {
                  hotels.filter(
                    (hotel) =>
                      hotel.facilityGroups &&
                      hotel.facilityGroups.some(
                        (facilityGroup) => facilityGroup.name === "Internet"
                      )
                  ).length
                }{" "}
                ]
              </>
            )}
          </span>
        </div>
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-row gap-1 items-center">
            <input
              id="parking-filter"
              name="parking-filter"
              value="Parking"
              className="w-[29px] h-[19px] cursor-pointer"
              type="checkbox"
              checked={selectedFilters.parkingFilter}
              onChange={(event) => {
                handleSelectedFilters({
                  ...selectedFilters,
                  parkingFilter: event.target.checked,
                });
              }}
            />
            <label htmlFor="parking-filter" className="cursor-pointer">
              Parking
            </label>
          </div>
          <span className="text-[#5C6A7A] text-[15px]">
            {hotels.length > 0 && (
              <>
                [{" "}
                {
                  hotels.filter(
                    (hotel) =>
                      hotel.facilityGroups &&
                      hotel.facilityGroups.some(
                        (facilityGroup) => facilityGroup.name === "Parking"
                      )
                  ).length
                }{" "}
                ]
              </>
            )}
          </span>
        </div>
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-row gap-1 items-center">
            <input
              id="breakfast-filter"
              name="breakfast-filter"
              value="Breakfast"
              type="checkbox"
              className="w-[29px] h-[19px] cursor-pointer"
              checked={selectedFilters.breakfastFilter}
              onChange={(event) => {
                handleSelectedFilters({
                  ...selectedFilters,
                  breakfastFilter: event.target.checked,
                });
              }}
            />
            <label htmlFor="breakfast-filter" className="cursor-pointer">
              Breakfast
            </label>
          </div>
          <span className="text-[#5C6A7A] text-[15px]">
            {hotels.length > 0 && (
              <>
                [{" "}
                {
                  hotels.filter(
                    (hotel) =>
                      hotel.facilityGroups &&
                      hotel.facilityGroups.some(
                        (facilityGroup) => facilityGroup.name === "Breakfast"
                      )
                  ).length
                }{" "}
                ]
              </>
            )}
          </span>
        </div>
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-row gap-1 items-center">
            <input
              id="business-center-filter"
              name="business-center-filter"
              value="Business Center"
              type="checkbox"
              className="w-[29px] h-[19px] cursor-pointer"
              checked={selectedFilters.businessCenterFilter}
              onChange={(event) => {
                handleSelectedFilters({
                  ...selectedFilters,
                  businessCenterFilter: event.target.checked,
                });
              }}
            />
            <label htmlFor="business-center-filter" className="cursor-pointer">
              Business Center
            </label>
          </div>
          <span className="text-[#5C6A7A] text-[15px]">
            {hotels.length > 0 && (
              <>
                [{" "}
                {
                  hotels.filter(
                    (hotel) =>
                      hotel.facilityGroups &&
                      hotel.facilityGroups.some(
                        (facilityGroup) =>
                          facilityGroup.name === "Business Center"
                      )
                  ).length
                }{" "}
                ]
              </>
            )}
          </span>
        </div>
        <div className="flex flex-row w-full justify-between items-center border-gray-200 border-b-[1px] pb-6">
          <div className="flex flex-row gap-1 items-center">
            <input
              id="bar-filter"
              name="bar-filter"
              value="Bar"
              className="w-[29px] h-[19px] cursor-pointer"
              type="checkbox"
              checked={selectedFilters.barFilter}
              onChange={(event) => {
                handleSelectedFilters({
                  ...selectedFilters,
                  barFilter: event.target.checked,
                });
              }}
            />
            <label htmlFor="bar-filter" className="cursor-pointer">
              Bar
            </label>
          </div>
          <span className="text-[#5C6A7A] text-[15px]">
            {hotels.length > 0 && (
              <>
                [{" "}
                {
                  hotels.filter(
                    (hotel) =>
                      hotel.facilityGroups &&
                      hotel.facilityGroups.some(
                        (facilityGroup) => facilityGroup.name === "Bar"
                      )
                  ).length
                }{" "}
                ]
              </>
            )}
          </span>
        </div>
        <label className="font-bold text-[20px] mt-1">Property Type</label>
        {Array.isArray(filteredHotels) &&
          hotels.filter((hotel) => hotel.type === "Hotel" || hotel.type === "")
            .length > 0 && (
            <div className="flex flex-row w-full justify-between items-center">
              <div className="flex flex-row gap-1 items-center">
                <input
                  id="type-hotel"
                  name="type-hotel"
                  className="w-[29px] h-[19px] cursor-pointer"
                  checked={selectedFilters.hotelFilter}
                  onChange={(event) => {
                    handleSelectedFilters({
                      ...selectedFilters,
                      hotelFilter: event.target.checked,
                    });
                  }}
                  type="checkbox"
                />
                <label htmlFor="type-hotel" className="cursor-pointer">
                  Hotels
                </label>
              </div>
              <span className="text-[#5C6A7A] text-[15px]">
                {hotels.length > 0 && (
                  <>
                    [{" "}
                    {
                      hotels.filter(
                        (hotel) => hotel.type === "Hotel" || hotel.type === ""
                      ).length
                    }{" "}
                    ]
                  </>
                )}
              </span>
            </div>
          )}
        {Array.isArray(filteredHotels) &&
          hotels.filter((hotel) => hotel.type && hotel.type === "Villa")
            .length > 0 && (
            <div className="flex flex-row w-full justify-between items-center">
              <div className="flex flex-row gap-1 items-center">
                <input
                  id="type-villa"
                  name="type-villa"
                  className="w-[29px] h-[19px] cursor-pointer"
                  checked={selectedFilters.villaFilter}
                  onChange={(event) => {
                    handleSelectedFilters({
                      ...selectedFilters,
                      villaFilter: event.target.checked,
                    });
                  }}
                  type="checkbox"
                />
                <label htmlFor="type-villa" className="cursor-pointer">
                  Villas
                </label>
              </div>
              <span className="text-[#5C6A7A] text-[15px]">
                {hotels.length > 0 && (
                  <>
                    [{" "}
                    {
                      hotels.filter(
                        (hotel) => hotel.type && hotel.type === "Villa"
                      ).length
                    }{" "}
                    ]
                  </>
                )}
              </span>
            </div>
          )}
        {Array.isArray(filteredHotels) &&
          hotels.filter((hotel) => hotel.type && hotel.type === "Resort")
            .length > 0 && (
            <div className="flex flex-row w-full justify-between items-center">
              <div className="flex flex-row gap-1 items-center">
                <input
                  id="type-resort"
                  name="type-resort"
                  className="w-[29px] h-[19px] cursor-pointer"
                  checked={selectedFilters.resortFilter}
                  onChange={(event) => {
                    handleSelectedFilters({
                      ...selectedFilters,
                      resortFilter: event.target.checked,
                    });
                  }}
                  type="checkbox"
                />
                <label htmlFor="type-resort" className="cursor-pointer">
                  Resorts
                </label>
              </div>
              <span className="text-[#5C6A7A] text-[15px]">
                {hotels.length > 0 && (
                  <>
                    [{" "}
                    {
                      hotels.filter(
                        (hotel) => hotel.type && hotel.type === "Resort"
                      ).length
                    }{" "}
                    ]
                  </>
                )}
              </span>
            </div>
          )}
        {Array.isArray(filteredHotels) &&
          hotels.filter((hotel) => hotel.type && hotel.type === "House")
            .length > 0 && (
            <div className="flex flex-row w-full justify-between items-center">
              <div className="flex flex-row gap-1 items-center">
                <input
                  id="type-house"
                  name="type-house"
                  className="w-[29px] h-[19px] cursor-pointer"
                  checked={selectedFilters.houseFilter}
                  onChange={(event) => {
                    handleSelectedFilters({
                      ...selectedFilters,
                      houseFilter: event.target.checked,
                    });
                  }}
                  type="checkbox"
                />
                <label htmlFor="type-house" className="cursor-pointer">
                  Houses
                </label>
              </div>
              <span className="text-[#5C6A7A] text-[15px]">
                {hotels.length > 0 && (
                  <>
                    [{" "}
                    {
                      hotels.filter(
                        (hotel) => hotel.type && hotel.type === "House"
                      ).length
                    }{" "}
                    ]
                  </>
                )}
              </span>
            </div>
          )}
        {Array.isArray(filteredHotels) &&
          hotels.filter((hotel) => hotel.type && hotel.type === "Palace")
            .length > 0 && (
            <div className="flex flex-row w-full justify-between items-center">
              <div className="flex flex-row gap-1 items-center">
                <input
                  id="type-palace"
                  name="type-palace"
                  className="w-[29px] h-[19px] cursor-pointer"
                  checked={selectedFilters.palaceFilter}
                  onChange={(event) => {
                    handleSelectedFilters({
                      ...selectedFilters,
                      palaceFilter: event.target.checked,
                    });
                  }}
                  type="checkbox"
                />
                <label htmlFor="type-palace" className="cursor-pointer">
                  Palace
                </label>
              </div>
              <span className="text-[#5C6A7A] text-[15px]">
                {hotels.length > 0 && (
                  <>
                    [{" "}
                    {
                      hotels.filter(
                        (hotel) => hotel.type && hotel.type === "Palace"
                      ).length
                    }{" "}
                    ]
                  </>
                )}
              </span>
            </div>
          )}
        {Array.isArray(filteredHotels) &&
          hotels.filter((hotel) => hotel.type && hotel.type === "Apartment")
            .length > 0 && (
            <div className="flex flex-row w-full justify-between items-center">
              <div className="flex flex-row gap-1 items-center">
                <input
                  id="type-apartment"
                  name="type-apartment"
                  className="w-[29px] h-[19px] cursor-pointer"
                  checked={selectedFilters.apartmentFilter}
                  onChange={(event) => {
                    handleSelectedFilters({
                      ...selectedFilters,
                      apartmentFilter: event.target.checked,
                    });
                  }}
                  type="checkbox"
                />
                <label htmlFor="type-apartment" className="cursor-pointer">
                  Apartment
                </label>
              </div>
              <span className="text-[#5C6A7A] text-[15px]">
                {hotels.length > 0 && (
                  <>
                    [{" "}
                    {
                      hotels.filter(
                        (hotel) => hotel.type && hotel.type === "Apartment"
                      ).length
                    }{" "}
                    ]
                  </>
                )}
              </span>
            </div>
          )}

        {Array.isArray(filteredHotels) &&
          hotels.filter((hotel) => hotel.type && hotel.type === "Condo")
            .length > 0 && (
            <div className="flex flex-row w-full justify-between items-center">
              <div className="flex flex-row gap-1 items-center">
                <input
                  id="type-condo"
                  name="type-condo"
                  className="w-[29px] h-[19px] cursor-pointer"
                  checked={selectedFilters.condoFilter}
                  onChange={(event) => {
                    handleSelectedFilters({
                      ...selectedFilters,
                      condoFilter: event.target.checked,
                    });
                  }}
                  type="checkbox"
                />
                <label htmlFor="type-condo" className="cursor-pointer">
                  Condo
                </label>
              </div>
              <span className="text-[#5C6A7A] text-[15px]">
                {hotels.length > 0 && (
                  <>
                    [{" "}
                    {
                      hotels.filter(
                        (hotel) => hotel.type && hotel.type === "Condo"
                      ).length
                    }{" "}
                    ]
                  </>
                )}
              </span>
            </div>
          )}
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-row gap-1 items-center">
            <input
              id="type-inn"
              name="type-inn"
              className="w-[29px] h-[19px] cursor-pointer"
              checked={selectedFilters.innFilter}
              onChange={(event) => {
                handleSelectedFilters({
                  ...selectedFilters,
                  innFilter: event.target.checked,
                });
              }}
              type="checkbox"
            />
            <label htmlFor="type-inn" className="cursor-pointer">
              Inn
            </label>
          </div>
          <span className="text-[#5C6A7A] text-[15px]">
            {hotels.length > 0 && (
              <>
                [{" "}
                {
                  hotels.filter((hotel) => hotel.type && hotel.type === "Inn")
                    .length
                }{" "}
                ]
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
