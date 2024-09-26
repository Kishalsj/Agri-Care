"use client";
import { useEffect, useState } from "react";

import computeOverallRating from "@/utils/compute-overall-rating";
import MapMarkerIcon from "@/components/icons/MapMarkerIcon";
import StarRating from "@/components/common/StarRating";
import HotelDetailsImageGallery from "@/components/sections/hotel-details/HotelDetailsImageGallery";
import { toast } from "react-toastify";
import { HeartIcon } from "@heroicons/react/24/outline";

async function fetchHotelContent({ id }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOTEL_API_AXIOS_URL}/api/v1/content/individualHotel/getHotelContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    toast.error("Something went wrong. Please try again later.");
  }
}

export default function HotelDetailsHeader({
  name,
  address,
  numReviews,
  reviews,
  params,
  heroImage,
  images,
}) {
  const overallRating = computeOverallRating(reviews);
  const id = params?.id;
  const [isFavourite, setIsFavourite] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);

  // Fetch hotel content asynchronously
  const [hotelContent, setHotelContent] = useState({});
  
  useEffect(() => {
    async function getHotelContent() {
      const { hotels } = await fetchHotelContent({ id });
      const hotel = hotels.find((hotel) => hotel.providerName === "RateHawk") || hotels[0];
      setHotelContent(hotel);
    }
    
    getHotelContent();
  }, [id]);

  const hotel = hotelContent || {};
  const hotelHeroImage = hotel?.heroImage || heroImage;
  const hotelImages = hotel?.images || images || [];

  // Sync favourite status with localStorage on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setIsFavourite(savedFavorites.includes(hotel?.id));
    }
  }, [hotel?.id]);

  const handleFavouriteClick = () => {
    if (typeof window !== "undefined") {
      const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (isFavourite) {
        // Remove from favorites
        const newFavorites = savedFavorites.filter((favId) => favId !== hotel.id);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
      } else {
        // Add to favorites
        savedFavorites.push(hotel.id);
        localStorage.setItem("favorites", JSON.stringify(savedFavorites));
      }
      setIsFavourite(!isFavourite);
      setMessageVisible(true);
      setTimeout(() => {
        setMessageVisible(false);
      }, 300);
    }
  };
  const handleShareClick = () => {
    // Add your share functionality here
    toast.info("URL Copied to Clipboard");
  };


  return (
    <div id="Header" className="w-full mb-4 bg-white rounded-xl">
      {/* Header section */}
      <div className="flex flex-col space-y-4 p-4">
        <div className="flex w-full justify-between items-center">
          <h2 className="text-lg md:text-2xl lg:text-4xl font-Montserrat font-black text-primary text-[#0729A0]">
            {name}
          </h2>

          <div className="flex items-center space-x-2">
            {/* Favourite Button */}
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-400 bg-opacity-10 backdrop-blur-md border border-[#99989894]">
              <button
                onClick={handleFavouriteClick}
                className="p-2 rounded-full transition-colors duration-300"
              >
                <HeartIcon
                  className={`w-4 h-4 transition-colors duration-300 ${
                    isFavourite ? "text-red-500 fill-red-500" : "text-white fill-gray-400"
                  } hover:fill-red-300`}
                  style={{
                    stroke: "#99989894",
                    strokeWidth: "1px",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                  }}
                />
              </button>
            </div>

            {/* Share Button */}
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-400 bg-opacity-10 backdrop-blur-md border border-[#99989894]">
              <button
                onClick={handleShareClick}
                className="p-2 rounded-full transition-colors duration-300"
              >
                <svg
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#7f7a7a"
                  stroke="#7f7a7a"
                  className="w-4 h-4"
                >
                  <g fill="none" fillRule="evenodd">
                    <g fill="#5a5858" fillRule="nonzero">
                      <path d="M37.75,20.25 C38.6681734,20.25 39.4211923,20.9571103 39.4941988,21.8564728 L39.5,22 L39.5,36.25 C39.5,39.3517853 37.0439828,41.879937 33.9705557,41.9958479 L33.75,42 L14.25,42 C11.1482147,42 8.62006299,39.5439828 8.50415208,36.4705557 L8.5,36.25 L8.5,22 C8.5,21.0335017 9.28350169,20.25 10.25,20.25 C11.1681734,20.25 11.9211923,20.9571103 11.9941988,21.8564728 L12,22 L12,36.25 C12,37.440864 12.9251616,38.4156449 14.0959512,38.4948092 L14.25,38.5 L33.75,38.5 C34.940864,38.5 35.9156449,37.5748384 35.9948092,36.4040488 L36,36.25 L36,22 C36,21.0335017 36.7835017,20.25 37.75,20.25 Z M23.4989075,6.26787884 L23.6477793,6.25297693 L23.8225053,6.25140103 L23.9770074,6.26441014 L24.223898,6.31492315 C24.4192207,6.36884271 24.6069182,6.4577966 24.7773762,6.58126437 L24.8968901,6.67628678 L24.989825,6.76256313 L32.7679996,14.5407377 C33.4514171,15.2241552 33.4514171,16.3321939 32.7679996,17.0156115 C32.1247831,17.6588279 31.1054316,17.6966642 30.4179639,17.1291203 L25.5,12.222 L25.5,31.5 C25.5,32.4181734 24.7928897,33.1711923 23.8935272,33.2441988 L23.75,33.25 C22.8318266,33.25 22.0788077,32.5428897 22.0058012,31.6435272 L22,31.5 L22,12.226 L17.2116504,17.0156115 C16.5684339,17.6588279 15.5490824,17.6966642 14.8616148,17.1291203 L14.7367767,17.0156115 C14.0935602,16.372395 14.055724,15.3530435 14.6232679,14.6655758 L22.488804,6.78678454 C22.5446792,6.72871358 22.6045271,6.67449255 22.6679103,6.62455868 L22.7812362,6.54379243 C22.8189499,6.51724 22.858413,6.49312256 22.8988638,6.47056335 L23.4989075,6.26787884 Z" />
                    </g>
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {messageVisible && (
          <div className="bg-black bg-opacity-40 backdrop-blur-md absolute top-28 right-14  flex items-center text-white text-xs font-bold rounded-lg p-2 w-auto">
            <span>Saved to List</span>
          </div>
        )}
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center text-[#5C6A7A] space-x-1">
            <MapMarkerIcon size={20} />
            <p className="font-Montserrat font-medium text-xs md:text-[17px]">
              {address}
            </p>
          </div>
          <div className="flex items-center text-white space-x-4">
            {isNaN(overallRating) ? (
              <div className="font-Montserrat font-medium text-xs text-[#5C6A7A]">
                No Reviews Yet
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-2">
                  <span className="text-[#1893F8] font-bold text-xl">
                    {overallRating}
                  </span>
                  <span className="text-[#5C6A7A] text-xs">/ 5</span>
                </div>
                <StarRating count={overallRating} />
                <div className="text-xs text-[#5C6A7A]">
                  ({numReviews} Reviews)
                </div>
              </>
            )}
          </div>
        </div>
      </div>
  
      {/* Image gallery section */}
      <div className="w-full">
        <HotelDetailsImageGallery heroImage={hotelHeroImage} images={hotelImages} />
      </div>
    </div>
  );
  
}
