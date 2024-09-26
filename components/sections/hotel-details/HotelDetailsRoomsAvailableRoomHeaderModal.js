"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import HotelDetailsRoomsAvailableRoomHeaderBeds from "./HotelDetailsRoomsAvailableRoomHeaderBeds";
import Modal from "@/components/common/Modal";

export default function HotelDetailsRoomsAvailableRoomHeaderModal({
  name,
  beds,
  room,
  images,
}) {

  console.log(images); // Check if images are logged correctly

  return (
    <Modal
      headerText="Room Details"
      cancelText="Cancel"
      trigger={
        <div
          className="room-header-modal items-end text-[13px] text-blue-500 flex leading-relaxed primary-font-color mt-4 flex-1"
          suppressHydrationWarning={true}
        >
          <span className="cursor-pointer">More Details &rsaquo;</span>
        </div>
      }
    >
      <div className="hotel-details-header-modal w-full flex flex-col px-4">
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          navigation
          className="mySwiper w-full h-[280px]" // Ensure width and height are set
        >
          {images && images.length > 0 ? (
            images.map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={image.links[0].url}
                  className="rounded-lg w-full h-full object-cover"
                  alt={`room-image-${index}`}
                  layout="responsive" // Use layout to fit container
                  height={280}
                  width={360}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">No images available</p>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
        <div className="max-h-[300px] overflow-auto">
          <div className="sticky top-0 bg-white border-b-2 py-3">
            <h3 className="text-lg mb-0.5 font-semibold leading-relaxed text-[#002248]">
              Room , {name.replace(/\s*\([^()]*\)/g, "")}
            </h3>
            <div className="text-[#002248]">
              <HotelDetailsRoomsAvailableRoomHeaderBeds
                name={name}
                beds={beds}
              />
            </div>
          </div>
          <div className="mt-3 mb-0.5 text-[13px] font-semibold leading-relaxed text-[#002248]">
            {room && room.smokingAllowed ? "Smoking Allowed" : "Non Smoking"}
          </div>
          <div
            className="mb-0.5 text-[13px] leading-relaxed text-[#002248] font-normal"
            dangerouslySetInnerHTML={{ __html: room?.description }}
          ></div>
          {room?.facilities && room.facilities.length > 0 && (
            <>
              <div className="text-[15px] mb-0.5 font-bold leading-relaxed text-[#002248] pt-3">
                Room Amenities
              </div>
              <div className="text-[15px] w-full grid grid-cols-2 text-[#002248] leading-relaxed">
                {room.facilities.map((item, index) => (
                  <div
                    className="flex flex-row gap-1 text-[13px] items-center"
                    key={index}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
