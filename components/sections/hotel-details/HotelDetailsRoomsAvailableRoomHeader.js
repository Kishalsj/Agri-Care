import GuestsIcon from "@/components/icons/GuestsIcon";

import HotelDetailsRoomsAvailableRoomHeaderBeds from "./HotelDetailsRoomsAvailableRoomHeaderBeds";
import HotelDetailsRoomsAvailableRoomHeaderModal from "./HotelDetailsRoomsAvailableRoomHeaderModal";

export default function HotelDetailsRoomsAvailableRoomHeader({
  name,
  beds,
  room,
  numOfGuests,
  images,
}) {
  return (
    <div className="px-4 py-2 border-b-[1px] border-gray-300 h-36 flex flex-col overflow-auto font-Montserrat">
      <h3 className="text-lg mb-0.5 font-semibold leading-relaxed primary-font-color">
        {name.replace(/\s*\([^()]*\)/g, "")}
      </h3>
      <div className="flex flex-col flex-1">
        <div className="items-center text-[13px] flex font-semibold leading-relaxed primary-font-color">
          <GuestsIcon />
          <span className="ml-2">Sleeps {numOfGuests}</span>
        </div>
        <HotelDetailsRoomsAvailableRoomHeaderBeds name={name} beds={beds} />
        <HotelDetailsRoomsAvailableRoomHeaderModal
          name={name}
          beds={beds}
          room={room}
          images={images}
        />
      </div>
    </div>
  );
}
