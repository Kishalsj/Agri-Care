import Modal from "@/components/common/Modal";
import { getCurrencySymbol } from "@/utils/hotel-detail-helper";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HotelContext } from "@/components/contexts/HotelContext";
import moment from "moment";
import { ClipLoader } from "react-spinners";

export default function HotelDetailsRoomsAvailableRoomReserve({
  hotel,
  currency,
  recommendation,
  dailyTotalRate,
  dailyRate,
  checkIn,
  checkOut,
  token,
  totalTripRateWithTax
}) {
  // console.log("hotel", hotel)
  const [_, setHotel] = useContext(HotelContext);
  const router = useRouter();
  

  const roomToken = token;

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [formData, setFormData] = useState({
    occupancies: [
      {
        numOfAdults: 1,
        childAges: [],
      },
    ],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchParams = JSON.parse(localStorage.getItem("searchParams")) || {};
    if (checkIn && checkOut) {
      const formattedCheckOutDate = moment(checkOut).format("ddd, D MMM YYYY");
      const formattedCheckInDate = moment(checkIn).format("ddd, D MMM YYYY");

      setEndDate(formattedCheckOutDate);
      setStartDate(formattedCheckInDate);
      setFormData({
        occupancies: searchParams.occupancies,
      });
    }
  }, []);

  const date1 = moment(startDate || new Date());
  const date2 = moment(endDate || new Date());
  const differenceInDays = date2.diff(date1, "days");

  const singleRoomClicker = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOTEL_API_AXIOS_URL}/api/v1/rates/individualHotel/roomAndRates/availability`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              correlationId: 'correlationId',
              roomtoken: token,
              selectedRecommendation: recommendation.id,
              ipAddress: '192.168.1.1',
              id: hotel.id,
              checkIn: startDate,
              checkOut: endDate,
            }),
          }
        );

        const apiResponse = res.data.hotel.rates;
        console.log(recommendation.rates[0].totalRate)
        const selectedRate = apiResponse.find((rate) => {
        console.log(rate.totalRate)

          return rate.totalRate === recommendation.rates[0].totalRate;
        });
        console.log("selectedRate", selectedRate)
        if (selectedRate) {
          const context = {
            hotelInfo: hotel,
            rateInfo: data.hotel.rates,
            roomInfo: data.hotel.rooms[0],
            recID: recommendation.id,
            dailyTotalRate: data.hotel.rates[0].dailyTotalRate,
            checkIn: checkIn,
            checkOut: checkOut,
          };
          setHotel(context);
            router.push(`/review-booking/${recommendation.id}/${roomToken}`);
            window.scrollTo(0, 0); // Scrolls to the top of the page
        } else {
          // setRoomRatesStatus(false);
          // setPriceCheckLoading(true);
        }

      } catch (err) {
        
      }
  };

  return (
    <div className="border-t-[1px] border-gray-300 mt-5 flex items-center p-4 bg-gray-100 justify-between rounded-b-2xl">
      <div className="flex flex-col">
        <span className="text-2xl text-[#002248] font-bold text-[25px]  font-Montserrat flex flex-row items-center gap-2">
          {getCurrencySymbol(currency)}
          {totalTripRateWithTax} <span className="text-lg text-[#002248] font-bold text-[25px] block font-Montserrat" >Total</span>
        </span>
        <span className="text-[8px] 2xl:text-[10px] text-[#5C6A7A]">Includes taxes & fees</span>
      </div>
      <Modal
        // onOpen={() => singleRoomClickHandler(recommendation, dailyTotalRate, hotel)}
        trigger={
          <button
            className="bg-[#263fcc] rounded-full px-6 font-semibold py-2 text-white font-Montserrat hover:bg-[#202d74]"
            suppressHydrationWarning={true}
          >
            Reserve
          </button>
        }
        headerText="Booking Details"
        bodyText={
          <div className="space-y-4 border-b-2 w-full">
            <div className="space-x-8 flex flex-row">
              <div className="flex flex-col">
                <span className="font-bold">Check-in:</span> {startDate}
              </div>
              <div className="flex flex-col">
                <span className="font-bold">Check-out:</span> {endDate}
              </div>
            </div>
            <p>
              <span className="font-bold">Total Nights:</span> {differenceInDays}
            </p>
          </div>
        }
        confirmationText={
          loading ? (
            <>
              <ClipLoader color="#1D1A4E" size={15} margin={2} /> Loading...
            </>
          ) : (
            "Reserve"
          )
        }
        cancelText="Cancel" // Specify the cancel button text
        onConfirm={async (close) => {
          if (loading) {
            return;
          }
      
          setLoading(true);
          // Handle confirmation logic here
          // redirect to booking confirmation page
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_HOTEL_API_AXIOS_URL}/api/v1/rates/individualHotel/roomAndRates/availability`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  correlationId: 'correlationId',
                  roomtoken: token,
                  selectedRecommendation: recommendation.id,
                  ipAddress: '192.168.1.1',
                  id: hotel.id,
                  checkIn: startDate,
                  checkOut: endDate,
                }),
              }
            );
            const data = await res.json();
            const apiResponse = data.hotel.rates;
    
            // console.log(recommendation.rates[0].totalRate)
            //  const selectedRate = apiResponse.find((rate) => {
            //   console.log(rate.totalRate)

            //     return rate.totalTripRateWithTax === totalTripRateWithTax;
            //   });
            //   if (selectedRate) {
                const context = {
                  hotelInfo: hotel,
                  rateInfo: data.hotel.rates,
                  roomInfo: data.hotel.rooms[0],
                  recID: recommendation.id,
                  dailyTotalRate: data.hotel.rates[0].dailyTotalRate,
                  checkIn: checkIn,
                  checkOut: checkOut,
                };
                setHotel(context);
                router.push(`/review-booking/${recommendation.id}/${roomToken}`);
                window.scrollTo(0, 0); // Scrolls to the top of the page
            // } else {
            //   setLoading(false);
            // }
      
            // The rest of your logic after the asynchronous function completes
            // router.push(`/review-booking/${recommendation.id}/${roomToken}`);
            // set up some loading screen so it can transition to the review-booking screen
            console.log("Confirmed!");
          } catch (error) {
            console.error("Error in singleRoomClicker:", error);
            // Handle errors as needed
          } 
        }}
      >
        <>
          <p className="font-bold">Room Details:</p>
          {recommendation.room.name}
        </>
      </Modal>
    </div>
  );
}
