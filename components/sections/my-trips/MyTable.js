"use client";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/components/contexts/AuthContext";
import Image from "next/image";

import SidePanel from "./SidePanel";

export default function MyTable({ data, setPanelData, setPanelOpen }) {
  const onClickHandler = async (item) => {
    setPanelData(item);
    setPanelOpen(true);
    // window.location.href = `/itinerary?contract_number=${item.id}&chk_number=${item.chk_booking_id}`;
  };

  const DateConversion = ({ date }) => {
    // const startDate = new Date(date);

    const formattedEndDate = date.toLocaleString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });

    return formattedEndDate;
  };

  const roomPrice = (string) => {
    return Math.ceil(parseFloat(string) * 100) / 100;
  };

  return (
    <>
      <div className="overflow-scroll max-h-[520px] ">
        <div className="flex items-center justify-center font-sans">
          <div className="w-full ">
            <div className=" shadow-md rounded ">
              <table className=" w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 text-sm leading-normal">
                    <th className="py-2 px-2 text-left ">Guests</th>
                    <th className="py-2 px-2 text-center ">In</th>
                    <th className="py-2 px-2 text-center ">Out</th>
                    <th className="py-2 px-2 text-left ">Hotel</th>
                    <th className="py-2 px-2 text-left ">Location</th>
                    <th className="py-2 px-2 text-center w-[60px]">Rooms</th>
                    <th className="py-2 px-2 text-left">Price</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light max-h-[300px]">
                  {data &&
                    data.map((item, index) => {
                      const checkin = new Date(item.checkin);
                      const checkout = new Date(item.chekout);

                      const imgSource =
                        item.hotelImage !== null
                          ? item.hotelImage
                          : "https://cdn-icons-png.flaticon.com/512/2336/2336731.png";

                      const guests = item.members.map(
                        (guest) =>
                          `${guest.firstname != null ? guest.firstname : ""} ${
                            guest.lastname != null ? guest.lastname : ""
                          }`
                      );
                      const setGuests = [...new Set(guests)];

                      return (
                        <tr
                          key={index}
                          onClick={() => onClickHandler(item)}
                          className="border-b cursor-pointer border-gray-200 hover:bg-blue-100 h-[50px]"
                        >
                          {/* Guests */}
                          <td className="max-w-[200px] py-2 px-2 text-left">
                            <div className="w-full items-center">
                              <span className="gap-1 text-xs">
                                {setGuests.map((guest, index) => (
                                  <div key={index} className="capitalize">
                                    {guest}
                                    {index < setGuests.length - 1 ? ", " : ""}
                                  </div>
                                ))}
                              </span>
                            </div>
                          </td>

                          {/* Check In */}
                          <td className="w-[65px] py-2 px-2">
                            <div className="flex justify-center text-sm">
                              <div>
                                <DateConversion date={checkin} />
                              </div>
                            </div>
                          </td>

                          {/* Check Out */}
                          <td className="w-[65px] py-2 px-2 ">
                            <div className="flex justify-center text-sm">
                              <div>
                                <DateConversion date={checkout} />
                              </div>
                            </div>
                          </td>

                          {/* Hotel */}
                          <td className="max-w-[300px] py-2 px-2 text-left">
                            <div className="flex flex-row items-center">
                              <div className="mr-2">
                                <Image
                                  src={imgSource}
                                  width={30}
                                  height={30}
                                  alt="Image of hotel"
                                  className=" min-h-[30px] min-w-[30px] h-[30px] w-[30px] rounded"
                                />
                              </div>
                              <div className="flex flex-col">
                                <span className="flex font-light text-ellipsis whitespace-nowrap">
                                  {item.hotel_name}
                                </span>
                                <span className="text-[12px] capitalize text-gray-500">
                                  Booked by {item.firstname} {item.lastname}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Location */}
                          <td className="max-w-[200px] text-ellipsis py-2 px-2 text-left">
                            <div className="">
                              <span className="capitalize">{item.location}</span>
                            </div>
                          </td>

                          {/* Rooms */}
                          <td className="py-2 px-2 text-left">
                            <div className="flex justify-center">
                              <span className="font-medium">1</span>
                            </div>
                          </td>

                          {/* Price */}
                          <td className="max-w-[120px] py-2 px-2 text-left flex-col">
                            <div className="flex items-center">
                              <span className="font-normal">${roomPrice(item.amount)}</span>
                            </div>
                            <div className="font-[300] text-[12px]">{`${
                              item.cancellation_policies.length > 0
                                ? "Refundable"
                                : "Non-Refundable"
                            }`}</div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
