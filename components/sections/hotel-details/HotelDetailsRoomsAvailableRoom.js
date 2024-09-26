import Image from "next/image";
import "swiper/css";

import HotelDetailsRoomsAvailableRoomHeader from "./HotelDetailsRoomsAvailableRoomHeader";
import HotelDetailsRoomsAvailableRoomRecommendations from "./HotelDetailsRoomsAvailableRoomRecommendations";
import { filterRecommendations } from "@/utils/hotel-detail-helper";
import getRandomImage from "@/utils/get-random-image";

export default function HotelDetailsRoomsAvailableRoom({
  hotel,
  roomInfo,
  recommendations,
  checkIn,
  checkOut,
  token,
}) {
  const filteredRecommendations = filterRecommendations(recommendations);
  const { numOfAdults, numOfChildren } = filteredRecommendations[0]?.rates[0]?.occupancies[0];
  const numOfGuests = Number(numOfAdults) + Number(numOfChildren);

  // Check that roomInfo.images exists and is not empty before grabbing first index
  // const mainImage =
  //   roomInfo.images && roomInfo.images?.[0] !== undefined ? roomInfo.images[0] : getRandomImage();
    
  const mainImage = hotel.heroImage
  ? hotel.heroImage
  : getRandomImage().links[0].url;

const images = hotel.images || [];


  return (
    <div className="available-room mt-8 rounded-2xl shadow-lg flex flex-col justify-between bg-white">
      <div className="flex justify-center w-full items-center">
        {/* <Image
          src={mainImage.links[0].url}
          className="rounded-t-2xl w-full md:w-full h-[280px] object-cover"
          alt="room"
          height={280}
          width={360}
          suppressHydrationWarning={true}
        /> */}
        <Image
        src={mainImage}
        id={`main-image-${hotel.id}`}
        className="rounded-t-2xl w-full md:w-full h-[280px] object-cover"
          alt="room"
          height={280}
          width={360}
        suppressHydrationWarning={true}
        loading="eager"
      />
      </div>
      <HotelDetailsRoomsAvailableRoomHeader
        name={roomInfo.name}
        beds={roomInfo.beds}
        room={filteredRecommendations[0].room}
        images={roomInfo.images ? roomInfo.images : [mainImage]}
        numOfGuests={numOfGuests}
      />
      <HotelDetailsRoomsAvailableRoomRecommendations
        hotel={hotel}
        roomInfo={roomInfo}
        recommendations={filteredRecommendations}
        checkIn={checkIn}
        checkOut={checkOut}
        token={token}
      />
    </div>
  );
}
