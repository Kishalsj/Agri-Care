"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import cookieCutter from "cookie-cutter";

import { groupByStandardizedRoomId, filterRooms } from "@/utils/hotel-detail-helper";
import HotelSearch from "../../common/HotelSearch";
import HotelDetailsRoomsFilter from "./HotelDetailsRoomsFilter";
import HotelDetailsRoomsSkeletonCards from "./HotelDetailsRoomsSkeletonCards";
import HotelDetailsRoomsAvailableRoom from "./HotelDetailsRoomsAvailableRoom";
import { Progress } from "@chakra-ui/progress";

export default function HotelDetailsRooms({ hotel, searchParams }) {
  const [filter, setFilter] = useState("all-rooms");
  const [isFetching, setIsFetching] = useState(true);
  const [token, setToken] = useState("");
  const [availableRooms, setAvailableRooms] = useState({
    hotel: {
      rates: [],
      recommendations: [],
      rooms: [],
      standardizedRooms: [],
    },
  });
  const [showBar, setShowBar] = useState(false);
  const [showAllRooms, setShowAllRooms] = useState(false); // New state to toggle between 6 or all rooms
  
  let occupancies = [{ numOfAdults: 2, childAges: [] }];
  let currentDate = new Date();
  let checkIn = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate()
  );
  let checkOut = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate() + 7
  );
  let direct = null;

  if (JSON.stringify(searchParams) !== "{}") {
    checkIn = new Date(searchParams.checkIn);
    checkOut = new Date(searchParams.checkOut);
    occupancies = JSON.parse(searchParams.occupancies);
    direct = searchParams.direct;
  }

  const groupedHotelData = groupByStandardizedRoomId(availableRooms.hotel);
  const sortedRooms = groupedHotelData.sort(
    (a, b) =>
      a.recommendations[0].rates[0].totalTripRateWithTax - b.recommendations[0].rates[0].totalTripRateWithTax
  );
  const filteredAvailableRooms = filterRooms(sortedRooms, filter);

  useEffect(() => {
    fetchRooms([checkIn, checkOut], occupancies);
  }, []);

  async function fetchRooms([checkIn, checkOut], occupancies) {
    setIsFetching(true);

    const nonRateHawkRoomsData = await fetchNonRateHawkRooms([checkIn, checkOut], occupancies);
    setAvailableRooms(nonRateHawkRoomsData);
    setToken(nonRateHawkRoomsData.token);
    setIsFetching(false);
  }

  let fetchNonRateHawkRoomsCount = 0;

  async function fetchNonRateHawkRooms(dateSelected, occupancies) {
    try {
      const response = await fetch(
        `${direct ? process.env.NEXT_PUBLIC_HOTEL_API_B2B_AXIOS_URL : process.env.NEXT_PUBLIC_HOTEL_API_AXIOS_URL}/api/v1/rates/individualHotel/roomAndRates/availability/init`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            occupancies,
            id: hotel.id,
            currency: "USD",
            correlationId: `chkID${uuidv4()}`,
            ipAddress: cookieCutter.get("ipAddress"),
            checkIn: new Date(dateSelected[0]).toISOString().split("T")[0],
            checkOut: new Date(dateSelected[1]).toISOString().split("T")[0],
          }),
        }
      );

      const data = await response.json();

      if (
        data?.error?.error?.code != "5000" ||
        data?.error?.error?.code != "4003" ||
        data?.error?.error?.code != "4004"
      ) {
        setShowBar(true);
        return data;
      } else {
        throw new Error(data?.error?.error);
      }
    } catch (error) {
      console.log("error", error);
      if (fetchNonRateHawkRoomsCount < 5) {
        fetchNonRateHawkRoomsCount++;
        return fetchNonRateHawkRooms(dateSelected, occupancies);
      } else {
        setShowBar(true);
        return {
          hotel: {
            rates: [],
            recommendations: [],
            rooms: [],
            standardizedRooms: [],
          },
        };
      }
    }
  }

  return (
    <div id="room" className="relative px-0 sm:gap-0 gap-3 mx-auto flex flex-col justify-between">
      <div className="flex justify-center mb-8">
        <HotelSearch
          checkIn={checkIn}
          checkOut={checkOut}
          occupanciesInitialValue={occupancies}
          handleSearch={fetchRooms}
        />
        {showBar === false ? (
          <div className="font-Montserrat  w-full px-1   ">
            <Progress height="11px" isIndeterminate speed={0.5} transition="ease-in-out" />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="bg-gray-100 rounded-2xl p-4">
        <div className="bg-white rounded-2xl p-4 shadow ">
          <div className="flex flex-row gap-4 items-center text-center">
            <h3 className="text-lg md:text-2xl font-semibold mb-2 font-Montserrat">Choose a Room</h3>
          </div>
          <HotelDetailsRoomsFilter filter={filter} setFilter={setFilter} />
        </div>

        {isFetching ? (
          <HotelDetailsRoomsSkeletonCards />
        ) : (
          <>
            {filteredAvailableRooms.length > 0 && (
              <>
                <div className="grid grid-flow-row px-0 sm:px-5 2xl:px-[60px] gap-4 text-[#002248] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                  {filteredAvailableRooms
                    .slice(0, showAllRooms ? filteredAvailableRooms.length : 6)
                    .map((availableRoom, roomId) => (
                      <HotelDetailsRoomsAvailableRoom
                        key={roomId}
                        hotel={hotel}
                        roomInfo={availableRoom.roomInfo}
                        recommendations={availableRoom.recommendations}
                        checkIn={checkIn}
                        checkOut={checkOut}
                        token={token}
                      />
                    ))}
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setShowAllRooms(!showAllRooms)}
                    className="text-blue-500 font-medium font-Montserrat underline italic"
                  >
                    {showAllRooms ? "Less Rooms" : "See More Rooms"}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
