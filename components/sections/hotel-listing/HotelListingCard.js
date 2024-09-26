"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";

import ImageSlider from "@/components/common/ImageSlider";

import StarRating from "@/components/common/StarRating";
import getRandomImage from "@/utils/get-random-image";
import WiFiIcon from "@/components/icons/WiFiIcon";
import InternetIcon from "@/components/icons/InternetIcon";
import ParkingIcon from "@/components/icons/ParkingIcon";
import TelevisionIcon from "@/components/icons/TelevisionIcon";
import HotelListingCardReview from "./HotelListingCardReview";
import Modal from "@/components/common/Modal";
import HotelMap from "@/components/common/HotelMap";
import { getCurrencySymbol } from "@/utils/hotel-detail-helper";
import MapMarkerIcon3 from "@/components/icons/MapMarkerIcon3";
import { HeartIcon } from "@heroicons/react/24/outline";
import HotelDetailsImageGallery from "@/components/sections/hotel-details/HotelDetailsImageGallery";

export default function HotelListingCard({
  hotel,
  noOfDays,
  noOfRooms,
  origin,
  dateSelected,
  occupancies,
}) {
  const params = new URLSearchParams({
    checkIn: dateSelected[0],
    checkOut: dateSelected[1],
    occupancies: JSON.stringify(occupancies),
  });

  const mainImage = hotel.heroImage
    ? hotel.heroImage
    : getRandomImage().links[0].url;

  const images = hotel.images || [];

    const [showProviderInfo, setShowProviderInfo] = useState(false);
    const [isFavourite, setIsFavourite] = useState(() => {
      // Check if the hotel is already marked as favorite in local storage
      if (typeof window !== "undefined") {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        return savedFavorites.includes(hotel.id);
      }
      return false;
    });
    const [messageVisible, setMessageVisible] = useState(false);
    

    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.ctrlKey && event.shiftKey && event.key === "H") {
          setShowProviderInfo((prevShowProviderInfo) => !prevShowProviderInfo);
        }
      };
  
      window.addEventListener("keydown", handleKeyDown);
  
      // Clean up the event listener when component unmounts
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, []);

    const handleFavouriteClick = () => {
      const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (isFavourite) {
        // Remove from favorites
        const newFavorites = savedFavorites.filter((id) => id !== hotel.id);
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
    };


  const Saving = ({ baseRate , totalRate}) => {
    const rateDifference = baseRate - totalRate;
    return Math.ceil(rateDifference);
  }

  return (
    <div className="p-2 md:p-4 bg-white rounded-xl shadow flex flex-col sm:flex-row md:space-x-4 ">
       <div className="relative group">
      <Image
        src={mainImage}
        id={`main-image-${hotel.id}`}
        alt={`${hotel?.name} Image`}
        className="object-cover rounded-md min-h-[220px] max-h-[220px] w-full md:w-[280px] group-hover:opacity-50"
        height={220}
        width={280}
        suppressHydrationWarning={true}
        loading="eager"
      />
        <Popup
                trigger={
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-60 rounded-md transition-all duration-300 cursor-pointer">
                    <span className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      See all Images
                    </span>
                  </div>
                }
                overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
                contentStyle={{ height: "80%" }}
                modal
              >
                {(close) => <ImageSlider close={close} images={images} />}
              </Popup>
        
        <div className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-white bg-opacity-10 backdrop-blur-md border border-[#99989894]">
          <button
            onClick={handleFavouriteClick}
            className="p-2 rounded-full transition-colors duration-300"
          >
      <HeartIcon
        className={`w-6 h-6 transition-colors duration-300 ${
          isFavourite ? 'text-red-500 fill-red-500' : 'text-white fill-gray-300'
        } hover:fill-red-300`}
        style={{
          stroke: '#99989894',
          strokeWidth: '1px',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }}
      />
    </button>
  </div>

  {messageVisible && (
    <div className="font-Montserrat bg-black bg-opacity-40 backdrop-blur-md absolute top-1 right-14 flex items-center text-white text-xs font-bold rounded-lg p-2 w-auto">
      <span>Saved to List</span>
    </div>
  )}
</div>

      <div className="flex flex-col flex-1 ">
        <div className="font-extrabold text-homeBlue text-xl mb-2 font-Montserrat">{hotel?.name}</div>
        <StarRating count={hotel.starRating} />
        <div className="flex-1 mt-[-4px] my-4 text-[#5C6A7A] flex space-x-2 items-center">
          <MapMarkerIcon3 />
          <div className="space-x-2 text-md w-1/2 md:w-auto font-Montserrat">
            {hotel?.contact?.address?.line1}
          </div>
          <div className="text-sm flex flex-col">
            {/* <div>{hotel.distance && hotel.distance} km from center</div> */}
            {origin !== "all-hotels-maps" && (
              <div>
                <Modal
                  headerText={hotel?.name}
                  cancelText="Close"
                  trigger={
                    <div
                      className="text-blue-500 flex leading-relaxed primary-font-color flex-1"
                      suppressHydrationWarning={true}
                    >
                      <span className="cursor-pointer">
                        Show on map &rsaquo;
                      </span>
                    </div>
                  }
                >
                  <HotelMap
                    id={hotel.id}
                    lat={hotel.geoCode.lat}
                    lng={hotel.geoCode.long}
                    zoom={14}
                  />
                </Modal>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center mb-2">
          <svg className="w-5 h-5 mr-2" fill="#002B52" viewBox="0 0 32.68 32.68" xmlns="http://www.w3.org/2000/svg"><path d="M7.679,16.34l-3.84,5.226L0,16.34h2.339c0-7.72,6.281-14.001,14.001-14.001v3c-6.066,0-11.001,4.935-11.001,11.001H7.679z M28.841,11.116l-3.84,5.225h2.34c0,6.064-4.935,11-11.001,11v3c7.721,0,14.001-6.279,14.001-14h2.339L28.841,11.116z M16.428,8.978c0-3.038,2.462-5.5,5.5-5.5c3.037,0,5.5,2.462,5.5,5.5c0,3.037-2.463,5.5-5.5,5.5 C18.89,14.478,16.428,12.015,16.428,8.978z M19.238,5.926l0.975,1.73h-0.766V8.51h1.227l0.43,0.742h-1.654v0.854h1.852v1.922h1.158 v-1.922h1.943V9.252H22.67l0.445-0.742h1.287V7.656h-0.805l1.02-1.73h-1.354L21.91,8.515h-0.035l-1.318-2.589H19.238z M17.324,22.655c0,3.037-2.463,5.5-5.5,5.5c-3.038,0-5.5-2.463-5.5-5.5c0-3.039,2.462-5.5,5.5-5.5 C14.861,17.155,17.324,19.616,17.324,22.655z M14.334,23.446h-1.052l0.008,0.246c0.011,0.358-0.066,0.597-0.23,0.711 c-0.154,0.108-0.492,0.162-1.015,0.162c-0.588,0-0.94-0.097-1.056-0.291c-0.06-0.1-0.104-0.3-0.134-0.599h1.586l0.101-0.679h-1.723 c-0.006-0.197-0.008-0.396-0.008-0.6v-0.08h1.832l0.101-0.681h-1.905c0.03-0.337,0.087-0.556,0.17-0.655 c0.133-0.158,0.495-0.238,1.088-0.238c0.442,0,0.727,0.035,0.854,0.104c0.188,0.104,0.284,0.353,0.284,0.74v0.144h1.051 l-0.004-0.125c-0.024-0.725-0.156-1.192-0.396-1.408c-0.262-0.234-0.787-0.353-1.577-0.353c-1.03,0-1.714,0.144-2.051,0.431 c-0.281,0.235-0.445,0.689-0.493,1.361H9.416l-0.101,0.68h0.433c0.003,0.252,0.008,0.478,0.017,0.681H9.416l-0.101,0.679h0.497 c0.063,0.629,0.166,1.046,0.312,1.254c0.251,0.356,0.895,0.534,1.93,0.534c0.887,0,1.465-0.088,1.735-0.263 c0.363-0.234,0.546-0.756,0.546-1.565L14.334,23.446L14.334,23.446z"></path></svg>
          <span className="text-sm">Free Cancellation</span>
        </div>

        <div className="flex items-center mb-4">
        <svg  className="w-5 h-5 mr-2"viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.5924 3.20027C9.34888 3.4078 9.22711 3.51158 9.09706 3.59874C8.79896 3.79854 8.46417 3.93721 8.1121 4.00672C7.95851 4.03705 7.79903 4.04977 7.48008 4.07522C6.6787 4.13918 6.278 4.17115 5.94371 4.28923C5.17051 4.56233 4.56233 5.17051 4.28923 5.94371C4.17115 6.278 4.13918 6.6787 4.07522 7.48008C4.04977 7.79903 4.03705 7.95851 4.00672 8.1121C3.93721 8.46417 3.79854 8.79896 3.59874 9.09706C3.51158 9.22711 3.40781 9.34887 3.20027 9.5924C2.67883 10.2043 2.4181 10.5102 2.26522 10.8301C1.91159 11.57 1.91159 12.43 2.26522 13.1699C2.41811 13.4898 2.67883 13.7957 3.20027 14.4076C3.40778 14.6511 3.51158 14.7729 3.59874 14.9029C3.79854 15.201 3.93721 15.5358 4.00672 15.8879C4.03705 16.0415 4.04977 16.201 4.07522 16.5199C4.13918 17.3213 4.17115 17.722 4.28923 18.0563C4.56233 18.8295 5.17051 19.4377 5.94371 19.7108C6.278 19.8288 6.6787 19.8608 7.48008 19.9248C7.79903 19.9502 7.95851 19.963 8.1121 19.9933C8.46417 20.0628 8.79896 20.2015 9.09706 20.4013C9.22711 20.4884 9.34887 20.5922 9.5924 20.7997C10.2043 21.3212 10.5102 21.5819 10.8301 21.7348C11.57 22.0884 12.43 22.0884 13.1699 21.7348C13.4898 21.5819 13.7957 21.3212 14.4076 20.7997C14.6511 20.5922 14.7729 20.4884 14.9029 20.4013C15.201 20.2015 15.5358 20.0628 15.8879 19.9933C16.0415 19.963 16.201 19.9502 16.5199 19.9248C17.3213 19.8608 17.722 19.8288 18.0563 19.7108C18.8295 19.4377 19.4377 18.8295 19.7108 18.0563C19.8288 17.722 19.8608 17.3213 19.9248 16.5199C19.9502 16.201 19.963 16.0415 19.9933 15.8879C20.0628 15.5358 20.2015 15.201 20.4013 14.9029C20.4884 14.7729 20.5922 14.6511 20.7997 14.4076C21.3212 13.7957 21.5819 13.4898 21.7348 13.1699C22.0884 12.43 22.0884 11.57 21.7348 10.8301C21.5819 10.5102 21.3212 10.2043 20.7997 9.5924C20.5922 9.34887 20.4884 9.22711 20.4013 9.09706C20.2015 8.79896 20.0628 8.46417 19.9933 8.1121C19.963 7.95851 19.9502 7.79903 19.9248 7.48008C19.8608 6.6787 19.8288 6.278 19.7108 5.94371C19.4377 5.17051 18.8295 4.56233 18.0563 4.28923C17.722 4.17115 17.3213 4.13918 16.5199 4.07522C16.201 4.04977 16.0415 4.03705 15.8879 4.00672C15.5358 3.93721 15.201 3.79854 14.9029 3.59874C14.7729 3.51158 14.6511 3.40781 14.4076 3.20027C13.7957 2.67883 13.4898 2.41811 13.1699 2.26522C12.43 1.91159 11.57 1.91159 10.8301 2.26522C10.5102 2.4181 10.2043 2.67883 9.5924 3.20027ZM16.3735 9.86314C16.6913 9.5453 16.6913 9.03 16.3735 8.71216C16.0557 8.39433 15.5403 8.39433 15.2225 8.71216L10.3723 13.5624L8.77746 11.9676C8.45963 11.6498 7.94432 11.6498 7.62649 11.9676C7.30866 12.2854 7.30866 12.8007 7.62649 13.1186L9.79678 15.2889C10.1146 15.6067 10.6299 15.6067 10.9478 15.2889L16.3735 9.86314Z" fill="#1893F8"></path>
        </svg>
          <span className="text-sm">Give back 2%</span>
        </div>
        

        
        <div className="hidden md:block h-69px">
          <HotelListingCardReview ratings={hotel.ratings} />
        </div>
        {showProviderInfo && (
          <button className="px-1.5 py-1 text-white text-[12px] bg-blue-600 text-center rounded-md">
            {hotel.rate.providerName && hotel.rate.providerName}
          </button>
        )}
        <div className="md:hidden block h-[2px] w-full bg-gray-200"></div>
        <div className="text-[15px]">
          {hotel.facilityGroups !== null ||
          hotel.facilityGroups !== undefined ||
          !hotel.facilityGroups ||
          hotel.facilityGroups.length === 0 ? (
            <ul className="flex flex-row items-center justify-between md:justify-normal w-full h-8 font-Montserrat font-semibold">
              <li
                id="wi-fi"
                className="flex flex-row justify-between border-gray-200 border-r-[1px] pr-2 md:pr-4  gap-1"
              >
                <div className="flex items-center">
                  <WiFiIcon />
                </div>
                <div className="text-[12px] 2xl:text-[16px] flex items-center">
                  Wi Fi
                </div>
              </li>
              <li
                id="television"
                className="flex flex-row justify-between border-gray-200 border-r-[1px] px-2 md:px-4 gap-1"
              >
                <div className="flex items-center">
                  <TelevisionIcon />
                </div>
                <div className="text-[12px] 2xl:text-[16px] flex items-center">
                  Television
                </div>
              </li>
              <li
                id="parking"
                className="flex flex-row justify-between border-gray-200 border-r-[1px] px-2 md:px-4 gap-1"
              >
                <div className="flex items-center">
                  <ParkingIcon />
                </div>
                <div className="text-[12px] 2xl:text-[16px] flex items-center">
                  Parking
                </div>
              </li>
              <li
                id="internet"
                className="flex flex-row justify-between px-2 md:px-4  gap-1"
              >
                <div className="flex items-center">
                  <InternetIcon />
                </div>
                <div className="text-[12px] 2xl:text-[16px] flex items-center">
                  Internet
                </div>
              </li>
            </ul>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="md:w-1/6 md:min-w-[225px] md:border-gray-200 md:border-l-[1px] md:pl-3 flex flex-col">
        {hotel.rate ? (
          <div className="flex flex-col flex-1">
            <div className="flex md:flex-col">
              {hotel.rate.dailyPublishedRate > 1 ? (
                <div className="lg:flex flex-col flex-1 text-center items-center">
                  {/* <span className="flex items-center font-bold text-[11px] gap-2 text-start text-[#5C6A7A]">
                    <span className="line-through">
                      {getCurrencySymbol(hotel.currency)}
                      {hotel.rate && hotel.rate.dailyPublishedRate}
                    </span>{" "}
                    <span className="text-[9px] no-underline  text-center font-normal text-[#5C6A7A]">
                      /night
                    </span>
                  </span>
                  <span className="text-[#1893F8] flex items-center gap-2 text-end font-bold text-[17px]">
                    {getCurrencySymbol(hotel.currency)}
                    {hotel.rate && hotel.rate.dailyTotalRate}{" "}
                    <span className="text-[9px] text-center font-normal text-[#1893F8]">
                      /night
                    </span>
                  </span> */}
            <div className="absolute right-0 top-0 text-right p-2 font-Montserrat">
                <span className="text-[#1893F8] font-bold text-[15px]">Excellent</span>
            </div>
            <div className="absolute right-0 top-3 text-right p-2 font-Montserrat">
                <span className="text-[#6f7479] text-[8px]">(4.2 ratings)</span>
            </div>
                </div>
              ) : (
                <></>
              )}
              <div className="flex flex-col flex-1 relative mt-8">
              <div className="text-[#f57a7a] flex flex-col flex-1 font-medium text-right md:text-center text-[9px] my-2">
                <span >
                  Save {" "}
                  <span className=" text-[11px] font-bold text-[#ee4f4f]">
                  {getCurrencySymbol(hotel.currency)}
                  {hotel.rate.totalRate && <Saving baseRate={hotel.rate.dailyPublishedRate} totalRate={hotel.rate.dailyTotalRate} />}
                  </span>
                </span>
              </div>
              </div>
              <div className="flex flex-col text-center pl-1 items-center">
              <span className="text-[9px] font-normal text-center text-[#5C6A7A]">
              for {noOfDays} {noOfDays > 1 ? "Nights" : "1 Night"} , {noOfRooms} {noOfRooms > 1 ? "Rooms" : "1 Room"}
              </span>
              
              <span className="text-[35px] font-black text-[#221c77] flex items-center gap-3 font-Montserrat">
              <span className="line-through font-light text-[15px] text-[#5C6A7A]">
              {getCurrencySymbol(hotel.currency)}
              {hotel.rate && hotel.rate.dailyPublishedRate}
              </span>{" "}
              {getCurrencySymbol(hotel.currency)}
              {hotel.rate && hotel.rate.dailyTotalRate}{" "}
              </span>

              <span className="text-[9px] font-normal text-center text-[#5C6A7A]"> 
              Total with taxes and fees :
              <span className="text-[11px] font-medium text-[#5C6A7A]">
              {getCurrencySymbol(hotel.currency)}
              {Math.ceil(hotel.rate.totalTripRateWithTax)}
               {/* <span className="text-[9px] text-[#5C6A7A]">
                  {" "}
                  total for {noOfRooms} {noOfRooms > 1 ? "rooms" : "room"}
                </span> */}
              </span>
              </span>
            </div>
            </div>
           
          </div>
        ) : (
          <></>
        )}
        <Link
          href={`/hotel-details/${hotel.id}?${params.toString()}`}
          target="_blank"
          className="w-1/2 md:w-auto  self-center md:self-auto bg-[#1893F8] rounded-full flex items-center justify-center text-base text-white px-3 py-2 mt-4 font-Montserrat font-semibold hover:bg-[#292b97] transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
