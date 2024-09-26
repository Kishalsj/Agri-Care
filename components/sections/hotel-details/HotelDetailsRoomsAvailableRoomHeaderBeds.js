import BedIcon from "@/components/icons/BedIcon";
import { extractNumberFromHotelName } from "@/utils/hotel-detail-helper";

export default function HotelDetailsRoomsAvailableRoomHeaderBeds({
  name,
  beds,
}) {
  const extractedNumber = extractNumberFromHotelName(name);

  return (
    <div className="text-[13px] font-semibold leading-relaxed primary-font-color">
      {beds && beds.length !== 0 ? (
        name &&
        (name.includes("Quadruple") || name.includes("Quadruple Room")) ? (
          <div className="flex flex-row items-center">
            <BedIcon />
            <span className="ml-2">2 Queen Bed</span>
          </div>
        ) : extractedNumber !== null && beds.length === 1 ? (
          beds.map((bed, index) => (
            <div key={index} className="flex flex-row items-center">
              <BedIcon />
              <span className="ml-2">
                {extractedNumber !== 0 ? extractedNumber : bed.count} {bed.type}{" "}
                Bed
              </span>
            </div>
          ))
        ) : beds.length === 1 ? (
          beds.map((bed, index) => (
            <div key={index} className="flex flex-row items-center">
              <BedIcon />
              <span className="ml-2">
                {bed.count !== "0" ? bed.count : 1} {bed.type} Bed
              </span>
            </div>
          ))
        ) : (
          beds.length > 1 &&
          beds.map((bed, index) => (
            <div key={index} className="flex flex-row items-center">
              <BedIcon />
              <span className="ml-2">
                {bed.count !== "0" ? bed.count : 1} {bed.type} Bed
                <span className="ml-3">{index === 0 ? "OR" : ""}</span>
              </span>
            </div>
          ))
        )
      ) : name &&
        (name.includes("Quadruple") || name.includes("Quadruple Room")) ? (
        <div className="flex flex-row items-center">
          <BedIcon />
          <span className="ml-2">2 Queen Bed</span>
        </div>
      ) : (
        <div className="flex flex-row items-center">
          <BedIcon />
          <span className="text-[#002248] text-[13px] font-semibold">
            1 Queen Bed and 1 Sofa Bed (or Twin Bed)
          </span>
        </div>
      )}
    </div>
  );
}
