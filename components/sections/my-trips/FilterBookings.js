"use client";

import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/components/contexts/AuthContext";

import MyTable from "./MyTable";
import SidePanel from "./SidePanel";

export default function FilterBookings({ id, email, accessToken, isAuthenticated }) {
  const [bookingDetails, setbookingDetails] = useState([]);
  const [filter, setFilter] = useState("all"); // State for selected filter option

  const [filteredBookings, setFilteredBookings] = useState([]); // State to store filtered bookings
  const [cancelledBookings, setCancelledBookings] = useState(0); // State to store no of cancelled bookings
  const [upcomingBookings, setUpcomingBookings] = useState(0); // State to store no of upcoming bookings
  const [pastBookings, setPastBookings] = useState(0); // State to store no of past bookings
  const [activeBookings, setActiveBookings] = useState(0); // State to store no of active bookings
  const [allBookings, setAllBookings] = useState(0); // State to store no of all bookings

  const [selectedOption, setSelectedOption] = useState("date");
  const [sortedData, setSortedData] = useState([]);

  // useStates for side panel
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelData, setPanelData] = useState(null);

  // const [userEmail, setUserEmail] = useState(email);
  // const [userId, setUserId] = useState(id);
  // const [isUserAuthenticated, setIsUserAuthenticated] = useState(isAuthenticated);

  const userDetails = useContext(AuthContext);

  React.useEffect(() => {
    document.title = "Checkins.ai - My Trip";
  }, []);

  useEffect(() => {
    bookingDetails &&
      Array.isArray(bookingDetails) &&
      bookingDetails.length > 0 &&
      // filterBookings();
      filterAndSortBookings();
  }, [filter, bookingDetails, selectedOption]);

  const filterBookings = () => {
    switch (filter) {
      case "upcoming":
        setFilteredBookings(
          bookingDetails.filter((booking) => {
            return new Date(booking.checkin) > new Date() && booking.status !== "2";
          })
        );
        break;
      case "cancelled":
        setFilteredBookings(
          bookingDetails.filter((booking) => {
            return booking.status === "2";
          })
        );
        break;
      case "past":
        setFilteredBookings(
          bookingDetails.filter((booking) => {
            return new Date(booking.chekout) < new Date() && booking.status !== "2";
          })
        );
        break;
      case "active":
        const currentDate = new Date(); // Get today's date
        setFilteredBookings(
          bookingDetails.filter((booking) => {
            const checkinDate = new Date(booking.checkin);
            const checkoutDate = new Date(booking.chekout);

            return (
              checkinDate <= currentDate && currentDate <= checkoutDate && booking.status !== "2"
            );
          })
        );
        break;
      default:
        setFilteredBookings(bookingDetails);
    }
  };

  const filterAndSortBookings = () => {
    // Apply filter logic based on the selected filter
    const filteredData = bookingDetails.filter((booking) => {
      switch (filter) {
        case "upcoming":
          return new Date(booking.checkin) > new Date() && booking.status !== "2";
        case "cancelled":
          return booking.status === "2";
        case "past":
          return new Date(booking.chekout) < new Date() && booking.status !== "2";
        case "active":
          const currentDate = new Date(); // Get today's date
          const checkinDate = new Date(booking.checkin);
          const checkoutDate = new Date(booking.chekout);
          return (
            checkinDate <= currentDate && currentDate <= checkoutDate && booking.status !== "2"
          );
        default:
          return true;
      }
    });

    // Apply sort logic based on the selected sort option
    let sortedAndFiltered = [];
    if (selectedOption) {
      switch (selectedOption) {
        case "date":
          sortedAndFiltered = filteredData.sort(
            (a, b) => new Date(a.checkin) - new Date(b.checkin)
          );
          // console.log("filtered by date: ", sortedAndFiltered);
          break;
        case "price":
          sortedAndFiltered = filteredData.sort(
            (a, b) => Math.ceil(a.amount) - Math.ceil(b.amount)
          );
          // console.log("filtered by price: ", sortedAndFiltered);
          break;
        case "name":
          sortedAndFiltered = filteredData.sort((a, b) => a.hotel_name.localeCompare(b.hotel_name));
          // console.log("filtered by name: ", sortedAndFiltered);
          break;
        default:
          sortedAndFiltered = filteredData;
      }
    }

    setFilteredBookings(sortedAndFiltered);
  };

  let getBookingDataCount = 0;

  const getBookingData = async () => {
    try {
      // console.log("ID: ", id, "accesstoken: ", accessToken, "email: ", email);

      if (id === undefined) {
        console.error("Missing id, check if cookies are enabled");
        return;
      } else if (accessToken === undefined) {
        console.error("Missing accessToken, check if cookies are enabled");
        return;
      } else if (email === undefined) {
        console.error("Missing email, check if cookies are enabled");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/bookingDetails/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        const userDetails = await response.json();

        // console.log(userDetails);

        setbookingDetails(userDetails);
        const bookingData = userDetails;

        setUpcomingBookings(
          bookingData.filter((booking) => {
            return new Date(booking.checkin) > new Date() && booking.status !== "2";
          }).length
        );
        setCancelledBookings(
          bookingData.filter((booking) => {
            return booking.status === "2";
          }).length
        );
        setPastBookings(
          bookingData.filter((booking) => {
            return new Date(booking.chekout) < new Date() && booking.status !== "2";
          }).length
        );
        const currentDate = new Date(); // Get today's date
        setActiveBookings(
          bookingData.filter((booking) => {
            const checkinDate = new Date(booking.checkin);
            const checkoutDate = new Date(booking.chekout);

            return (
              checkinDate <= currentDate && currentDate <= checkoutDate && booking.status !== "2"
            );
          }).length
        );
        setAllBookings(bookingData.length || 0);
      } else {
        const error = await response.text();

        console.error(error);
      }
    } catch (e) {
      if (getBookingDataCount < 3) {
        getBookingDataCount++;
        console.log("Booking data fetch attempt: ", getBookingDataCount);
        getBookingData();
      }
      console.error("Fetch booking data error", e);
    }
  };

  useEffect(() => {
    if (userDetails) {
      getBookingData();
    }
  }, [userDetails]);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col flex-grow">
        <h1 className="text-[26px] font-bold my-2 w-[100px]">Trips</h1>
        {/* Filters */}
        <span className="flex flex-row justify-between">
          <div className="flex flex-col-reverse container items-center space-y-0 md:w-auto md:flex-row md:space-y-0 my-1">
            <div className="flex gap-3 text-sm">
              <button
                onClick={() => setFilter("upcoming")}
                className={`flex-grow items-center ${filter === "upcoming" ? "underline" : ""}`}
              >
                Upcoming ({upcomingBookings})
              </button>
              {/* <div className="border-l mx-1 border-gray-300"></div> */}
              <button
                onClick={() => setFilter("active")}
                className={`flex-grow items-center ${filter === "active" ? "underline" : ""}`}
              >
                Active ({activeBookings})
              </button>
              {/* <div className="border-l mx-1 border-gray-300"></div> */}
              <button
                onClick={() => setFilter("cancelled")}
                className={`flex-grow items-center ${filter === "cancelled" ? " underline" : ""}`}
              >
                Cancelled ({cancelledBookings})
              </button>
              {/* <div className="border-l mx-1 border-gray-300"></div> */}
              <button
                onClick={() => setFilter("past")}
                className={`flex-grow items-center ${filter === "past" ? " underline" : ""}`}
              >
                Past ({pastBookings})
              </button>
              {/* <div className="border-l mx-1 border-gray-300"></div> */}
              <button
                onClick={() => setFilter("all")}
                className={`flex-grow items-center ${
                  filter === "all" ? " underline underline-offset-8 decoration-2" : ""
                }`}
              >
                All ({allBookings})
              </button>
            </div>
          </div>

          <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            <option value="date">Date</option>
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
        </span>

        {/* Table Container */}
        <div className="h-screen w-full">
          <div className=" my-3">
            <div
              role="status"
              className="max-w-full border border-gray-200 divide-y divide-gray-200 rounded  "
            >
              {filteredBookings.length > 0 ? (
                <MyTable
                  data={filteredBookings}
                  setPanelData={setPanelData}
                  setPanelOpen={setPanelOpen}
                />
              ) : (
                <div className="animate-pulse">
                  {/* Table Loading bars */}
                  <div className="flex items-center justify-between pt-4 animate-pulse ml-2 mb-2">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12 mr-2"></div>
                  </div>
                  <div className="flex items-center justify-between pt-4 animate-pulse ml-2 mb-2">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12 mr-2"></div>
                  </div>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      {panelOpen && <SidePanel booking={panelData} onClose={() => setPanelOpen(false)} />}
    </div>
  );
}
