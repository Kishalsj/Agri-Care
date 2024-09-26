"use client";

import Image from "next/image";
import Popup from "reactjs-popup";

import ImageSlider from "@/components/common/ImageSlider";
import ImageIcon from "@/components/icons/ImageIcon";

export default function HotelDetailsImageGallery({ heroImage = "", images = [] }) {
  return (
    <div
      id="hotel-details-image-gallery"
      className="grid grid-cols-1 lg:grid-cols-2 gap-3 relative bg-white rounded-2xl p-4 w-full"
    >
       {/* Popup Trigger Button */}
      <Popup
          trigger={
            <button
              id="hotel-details-image-gallery-more-button"
              className="absolute bottom-4 right-4 flex items-center justify-center gap-1.5 bg-[#1893F8] text-white rounded-md p-2"
              aria-describedby="Image Gallery"
              suppressHydrationWarning={true}
            >
              <ImageIcon />+ {images.length}
            </button>
          }
          overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
          contentStyle={{ height: "80%" }}
          modal
        >
          {(close) => <ImageSlider close={close} images={images} />}
        </Popup>
      {/* Hero Image (Left Side) */}
      <div className="relative h-[300px] md:h-[460px]">
        <Image
          src={heroImage}
          alt="Hero Image"
          width={1920}
          height={1080}
          className="w-full rounded-xl object-cover h-full shadow-lg"
          suppressHydrationWarning={true}
          loading="eager"
        />
        
       
        
      </div>

      {/* Other Images (Right Side) */}
      <div className="hidden lg:grid grid-cols-2 gap-3 h-[460px]">
        {images.slice(1, 5).map((photo, index) => (
          <Image
            key={index}
            src={photo.links[0].url}
            alt={`Image ${index + 1}`}
            width={340}
            height={200}
            className="w-full h-[225px] object-cover shadow-lg rounded-xl"
            loading="eager"
          />
        ))}
      </div>
    </div>
  );
}
