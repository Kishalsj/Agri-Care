"use client";

import React, { useState, useEffect, useRef } from "react";
import { BsPrinter } from "react-icons/bs";
import { useReactToPrint } from "react-to-print";
import { PiShareFat } from "react-icons/pi";

import Image from "next/image";
import moment from "moment";
import { useRouter } from "next/navigation";

import Modal from "@/components/common/Modal";
import RefreshIcon from "@/components/icons/RefreshIcon";
import RightArrowIcon from "@/components/icons/RightArrowIcon";
import BedIcon from "@/components/icons/BedIcon";
import InfoIcon from "@/components/icons/InfoIcon";

export default function SidePanel({ booking, onClose }) {
  const router = useRouter();

  const imageSrc =
    booking.hotelImage != null
      ? booking.hotelImage
      : "https://placehold.co/150?text=Image+not+found";

  const guests = booking.members.map(
    (guest) =>
      `${guest.firstname != null ? guest.firstname : ""} ${
        guest.lastname != null ? guest.lastname : ""
      }`
  );
  const setGuests = [...new Set(guests)];

  const roomPrice = (string) => {
    return Math.ceil(parseFloat(string) * 100) / 100;
  };

  const uniqueObjects = new Set();
  const uniquePolicies = [];

  for (const obj of booking.cancellation_policies) {
    const stringified = JSON.stringify({ end: obj.end, start: obj.start, amount: obj.amount });
    if (!uniqueObjects.has(stringified)) {
      uniqueObjects.add(stringified);
      uniquePolicies.push(obj);
    }
  }

  function Cancellation({ cancellationPolicy, currency }) {
    return (
      <Modal
        headerText="Cancellation/Refund Policy"
        cancelText="Close"
        trigger={
          <button className="ml-3 text-[12px] text-gray-500 hover:underline ">
            View Refund Policy
          </button>
        }
      >
        <div className="w-full gap-3 mt-3">
          <table className="flex flex-col rounded-lg overflow-hidden border border-solid border-[#5C6A7A] mb-[30px] w-full text-[#5C6A7A]">
            <thead>
              <tr className="flex flex-row bg-[#5C6A7A] px-3 py-2 bg-opacity-10 justify-between text-[#002248] font-bold ">
                <th className="w-1/3 text-center border-none">From</th>
                <th className="w-1/3 text-center border-none">To</th>
                <th className="w-1/3 text-center border-none">Amount</th>
              </tr>
            </thead>
            <tbody className="flex flex-col max-h-[200px] overflow-y-scroll">
              {cancellationPolicy &&
                cancellationPolicy.map((policy, index) => {
                  const startDate = moment(policy?.start).format("MMM DD YYYY");
                  const endDate = moment(policy?.end).format("MMM DD YYYY");
                  const rate = policy && policy.amount && roomPrice(policy.amount);

                  return (
                    <tr
                      key={index}
                      className="flex flex-row text-left justify-between items-center border-b-0 last-of-type:border-b-0 p-3"
                    >
                      <td className="w-1/3 text-center border-none">{startDate}</td>
                      <td className="w-1/3 text-center border-none">{endDate}</td>
                      <td className="w-1/3 text-center border-none">
                        {rate === 0 ? (
                          "Free"
                        ) : (
                          <>
                            {currency === "USD"
                              ? "$"
                              : currency === "EUR"
                              ? "€"
                              : currency === "GBP"
                              ? "£"
                              : ""}
                            {policy && rate}
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Modal>
    );
  }

  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className={"h-screen overflow-y-auto ml-2"}>
      <div className="overflow-y-auto px-2 w-[400px] ">
        <div className="rounded overflow-y-auto border border-gray-200  font-sans">
          {/* Top gray bar */}
          <div className="flex flex-row justify-between px-3 py-3 w-full bg-[#F8F8F8] rounded-md">
            <button onClick={onClose} className="text-gray-700 font-light text-sm">
              Close Itinerary
            </button>
            <div className="flex flex-row justify-center gap-2">
              <button onClick={() => handlePrint()}>
                <BsPrinter />
              </button>
              <button>
                <PiShareFat />
              </button>
            </div>
          </div>

          {/* Image, name and address */}
          <div className="flex flex-row px-3 py-2 space-x-2">
            <Image
              src={imageSrc}
              width={100}
              height={100}
              alt="Hotel Image"
              className="w-[100px] h-[100px] rounded"
            />
            <div className="flex flex-col">
              <span className="text-lg font-[600]">{booking.hotel_name}</span>
              {/* Need full address */}
              <span className="text-[13px]">{booking.hotel_address}</span>
            </div>
          </div>

          {/* Book Again Button */}
          {/* <div className="py-6 w-full">
            <button className="mx-3 w-[calc(100%-24px)] flex flex-row  border border-gray-200 rounded-lg justify-between">
              <span className="flex flex-row px-3 py-4">
                <RefreshIcon />
                <div className="ml-3 text-[12px] font-light">Book Again</div>
              </span>
              <span className="px-2 py-3">
                <RightArrowIcon />
              </span>
            </button>
          </div> */}

          {/* Refund Policy */}
          <div className="px-3 py-3 border border-gray-200">
            <span className="font-[600] text-sm">Refund Policy</span>
            {/* Check if refundable */}
            <div className="bg-gray-100 rounded">
              <div className="flex flex-row py-1">
                {booking.cancellation_policies.length > 0 ? (
                  <>
                    <Cancellation cancellationPolicy={uniquePolicies} currency={booking.currency} />
                  </>
                ) : (
                  <>
                    <div className="flex self-center mx-2">
                      <InfoIcon width={20} height={20} color="black" />
                    </div>
                    <div>No refund available for this reservation.</div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Trip Details and Room Information */}
          <div className="px-3 py-3 mb-12" ref={componentRef}>
            <div className="font-bold text-sm">Trip Details</div>
            {/* Details container */}
            <div className="mt-2 text-xs">
              <div className="flex flex-row justify-between">
                <span>Hotel Confirmation #:</span>
                <span>{booking.hotelConfirmationNumber}</span>
              </div>
              <div className="flex flex-row justify-between">
                <span>Check In:</span>
                <span>{moment(booking.checkin).format("ddd, MMM DD YYYY")}</span>
              </div>
              <div className="flex flex-row justify-between">
                <span>Check Out:</span>
                <span>{moment(booking.chekout).format("ddd, MMM DD YYYY")}</span>
              </div>
              <div className="flex flex-row justify-between">
                <span>Nights:</span>
                <span>{booking.nights}</span>
              </div>
              <div className="flex flex-row justify-between">
                <span>Guests:</span>
                <span>{booking.guests}</span>
              </div>
              <div className="flex flex-row justify-between">
                <span>Rooms:</span>
                <span>1</span>
              </div>
              <div className="flex flex-row justify-between">
                <span>Booked by:</span>
                <span className="capitalize">
                  {booking.firstname} {booking.lastname}
                </span>
              </div>
            </div>
            <div className="font-bold py-3 text-sm">Room Information</div>
            {/* Room Info container */}
            <div className="text-xs">
              <div className="flex flex-row justify-between">
                <span>Confirmation #:</span>
                <span>{booking.hotelConfirmationNumber}</span>
              </div>
              <div className="flex flex-row justify-between">
                <span>Primary Guest:</span>
                <span className="capitalize">{setGuests.length > 0 ? setGuests[0] : ""}</span>
              </div>
              <div className="flex flex-row justify-between">
                <span>Phone:</span>
                <span>{booking.mobile_number}</span>
              </div>
              <div className="flex flex-row justify-between">
                <span>Email:</span>
                <span>{booking.email}</span>
              </div>
              <div className="flex flex-row justify-between">
                {/* conditional */}
                <span>Additional Guests:</span>
                <span className="capitalize">
                  {setGuests.length > 1
                    ? setGuests.slice(1).map((guest, index) => <p key={index}>{guest}</p>)
                    : "N/A"}
                </span>
              </div>
              <div className="flex flex-row justify-between">
                <span>Room Type:</span>
                <span>{booking.room_type}</span>
              </div>
              <div className="flex flex-row justify-between">
                <span>Price:</span>
                <span>${roomPrice(booking.amount)}</span>
              </div>
            </div>
          </div>

          {/* View Folio and Full Itinerary */}

          <div className="relative">
            <div className="absolute bottom-0 w-full flex flex-row justify-between py-2 px-2 border-t-[1px] border-gray-200 bg-white">
              {/* <button className="w-[175px] text-white bg-black py-[6px] rounded-md text-xs">
                View Folio
              </button> */}
              <button
                className="w-full text-white bg-black py-[6px] rounded-md text-xs"
                onClick={() => {
                  router.push(
                    `itinerary?contract_number=${booking.id}&chk_number=${booking.chk_booking_id}`
                  );
                }}
              >
                View Full Itinerary
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
