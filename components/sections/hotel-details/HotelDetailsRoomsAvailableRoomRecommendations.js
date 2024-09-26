"use client";

import { useState } from "react";

import HotelDetailsRoomsAvailableRoomCancellationPolicy from "./HotelDetailsRoomsAvailableRoomCancellationPolicy";
import HotelDetailsRoomsAvailableRoomReserve from "./HotelDetailsRoomsAvailableRoomReserve";

export default function HotelDetailsRoomsAvailableRoomRecommendations({
	hotel,
	recommendations,
	roomInfo,
	checkIn,
	checkOut,
	token,
}) {
	const [selectedRecommendation, setSelectedRecommendation] = useState(recommendations[0]);
	const [dailyRate, setDailyRate] = useState(0);
	return (
		<>
			<HotelDetailsRoomsAvailableRoomCancellationPolicy
				recommendations={recommendations}
				selectedRecommendation={selectedRecommendation}
				setSelectedRecommendation={setSelectedRecommendation}
				setDailyRate={setDailyRate}
			/>
			<HotelDetailsRoomsAvailableRoomReserve
				hotel={hotel}
				recommendation={selectedRecommendation}
				roomInfo={roomInfo}
				currency={recommendations[0].rates[0].currency}
				dailyTotalRate={recommendations[0].rates[0].dailyTotalRate}
				totalTripRateWithTax={recommendations[0].rates[0].totalTripRateWithTax}
				dailyRate={dailyRate}
				checkIn={checkIn}
				checkOut={checkOut}
				token={token}
			/>
		</>
	);
}
