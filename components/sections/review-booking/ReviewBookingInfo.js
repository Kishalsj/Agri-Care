"use client";
import React, { useEffect, useState, useRef, useContext } from "react";
import { FaTripadvisor } from "react-icons/fa";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import moment from "moment";
import cookie from "cookie-cutter";
import { useRouter } from "next/navigation"; // useHistory -> useRouter
import Image from "next/image";
import Modal from "@/components/common/Modal";
import StarRating from "@/components/common/StarRating";
import HotelPayment from "@/components/sections/review-booking/ReviewBookingHotelPayment";
import AmenityList from "@/components/sections/review-booking/ReviewBookingAmenityList";
import { HotelContext } from "@/components/contexts/HotelContext";
import { AuthContext } from "@/components/contexts/AuthContext";
import BackArrow from "@/public/svg/backarrow";

import { toast } from "react-toastify";
import ParkingCard from "@/app/review-booking/BookingExtrasCardsParking";
import LiquorCard from "@/app/review-booking/BookingExtrasCardsLiquor";
import PetsCard from "@/app/review-booking/BookingExtrasCardsPets";


export default function ReviewBookingInfo({
    hotelDetails,
    hotelInfo,
    ratings,
    BookingConfirmed,
    paymentIs,
    handleSubmit,
    renderRoomInputs,
    setTitle,
    setIsTitleValid,
    title,
    firstName,
    setFirstName,
    setIsFirstNameValid,
    isFirstNameValid,
    lastName,
    setLastName,
    setIsLastNameValid,
    isLastNameValid,
    email,
    setEmail,
    setIsEmailValid,
    isEmailValid,
    setLine1,
    setIsLine1Valid,
    isLine1Valid,
    line1,
    city,
    setIsCityValid,
    setCity,
    isCityValid,
    state,
    setState,
    setIsStateValid,
    isStateValid,
    country,
    setIsCountryValid,
    setCountry,
    isCountryValid,
    postalCode,
    isPostalCodeValid,
    setIsPostalCodeValid,
    setPostalCode,
    startDate,
    endDate,
    differenceInDays,
    numofoccupanice,
    numofchild,
    rateInfo,
    roomInfo,
    setIsPopupOpen,
    isPopupOpen,
    setSelectedPaymentMethod,
    selectedPaymentMethod,
    handlePayNow,
    value,
    setValue,
    autoCompleteRef,
    DateConversion,
    formatCurrency,
    ceil,
    totalSaving,
    TotalSavings,
    total,
    totalWithoutServiceCharge,
    totalRate,
    totalWthMember,
    

    





}) {

    const [isEditing, setIsEditing] = useState(false);

    const handleSaveDetails = () => {
    if (!isEditing) {
        // Logic to save user details
    }
    setIsEditing(!isEditing);
    };

    const [paymentMethod, setPaymentMethod] = useState('');
    const [billingDetails, setBillingDetails] = useState({
      name: '',
      email: '',
      phoneNumber: '',
    });
    



  return (
    <div>
       <section id="hero" className="bg-gray-50 font-homepage  ">
      
      <div className="container mb-40 flex flex-col px-4 w-full lg:w-10/12 mx-auto -mt-10 space-y-4 md:space-y-6 ">
       

        {/* check that details exist first, {details && ()} */}
        {hotelDetails && (
          <div className="container flex flex-col lg:space-y-0 space-y-4 bg-slate-100 w-full md:w-[70%] rounded-2xl">
            <div className="flex flex-col md:flex-row px-3 md:justify-between lg:space-x-4 md:space-x-4 space-y-4 md:space-y-0">
              <div className="flex-none w-full md:w-[100%] space-y-2 ">
                {/* hotel details */}
                <div className=" mt-5 border w-full font-Montserrat border-[#E0E0E0] rounded-lg flex flex-col md:flex-row md:px-3 px-0 py-0 md:py-3 shadow-xl">
                  <div className="">
                    <Image
                      src={hotelInfo.heroImage}
                      width={270}
                      height={200}
                      alt="mainImage"
                      className="w-full 2xl:w-[270px] rounded-md h-[190px] 2xl:h-[200px] "
                    />
                  </div>
                  <div className="px-2 w-full flex flex-col justify-between">
                    <div className="space-y-2 flex flex-col justify-around">
                      <span className="font-bold text-[18px] 2xl:text-[21px]">
                        {hotelInfo.name}
                      </span>
                      <div className="flex flex-row space-x-2">
                        <StarRating count={hotelInfo.starRating} />
                        {/* need to check if ratings exist first */}
                        {ratings && (
                          <>
                            <div
                              className="mt-1.5 bg-[#5C6A7A] w-[1px]"
                              style={{ height: "initial" }}
                            ></div>
                            <span className="text-[#5C6A7A] text-[13px] 2xl:text-[15px] font-semibold">
                              {ratings?.NumReviews} Reviews
                            </span>
                            <div
                              className="mt-1.5 bg-[#5C6A7A] w-[1px]"
                              style={{ height: "initial" }}
                            ></div>
                            <div className="flex gap-2 items-center">
                              <FaTripadvisor />
                              <StarRating count={ratings?.Rating} />
                            </div>
                          </>
                        )}
                      </div>
                      <div className="text-[13px] 2xl:text-[15px] w-full flex flex-row justify-around">
                        <span className="md:flex hidden w-full lg:w-2/3">
                          {hotelInfo.contact.address.line1}
                        </span>
                        <span className=" text-[#5C6A7A] w-full text-center lg:w-1/3">
                          {hotelInfo.distance} km from center
                        </span>
                      </div>

                      <span className="md:block hidden text-[12px] 2xl:text-[15px] font-semibold">
                        {roomInfo.description}
                      </span>
                      <span className=" text-center text-[15px] font-semibold">
                        {/* {roomInfo.name} */}
                      </span>
                    </div>

                    <div className="text-[15px] mt-2 md:mt-0 2xl:text-[16px]">
                      {/* first check if facilities is an array */}
                      {Array.isArray(hotelInfo.facilities) &&
                      hotelInfo.facilities.length !== 0 ? (
                        <AmenityList
                          amenitiesList={hotelInfo.facilities}
                          key={hotelInfo.facilities.id}
                        />
                      ) : (
                        <>
                          <p></p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* /hotel details */}
                
              </div>
                
            </div>
           {/* =========================== User Payment Details =========================== */}
            <div className="flex flex-col w-full px-3 lg:mt-0 mt-3 lg:space-x-4 md:space-x-4 space-y-4 md:space-y-0">
            {BookingConfirmed === false && paymentIs === false ? (
                <form onSubmit={handleSubmit}>
                {renderRoomInputs()}
                <span className="text-[#002248] text-[18px] font-bold">Billing Details</span>

                <div className="flex justify-around w-full gap-3.5 flex-col md:flex-row">
                    <div className="flex w-full flex-row gap-2">
                    <div className="flex flex-col w-full md:w-[15%]">
                        <label className="text-[#697687] text-[12px]">Title</label>
                        <select
                        onChange={(e) => {
                            setTitle(e.target.value);
                            setIsTitleValid(e.target.value !== "" ? true : false);
                        }}
                        value={title}
                        disabled={isEditing} // Disable if in editing mode
                        className={`border w-full md:w-auto h-10 rounded-md px-2 py-2 focus:border-gray-300`}
                        >
                        <option value="Mr">Mr</option>
                        <option value="Ms">Ms</option>
                        <option value="Mrs">Mrs</option>
                        </select>
                    </div>
                    <div className="flex flex-col w-full md:w-[42.5%]">
                        <label className="text-[#697687] text-[12px]">First Name</label>
                        <input
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                            setIsFirstNameValid(e.target.value !== "" ? true : false);
                        }}
                        type="text"
                        disabled={isEditing} // Disable if in editing mode
                        className={`border w-full capitalize rounded-md px-2 py-2 focus:border-gray-300 ${
                            isFirstNameValid ? "border-gray-300" : "border-red-500"
                        }`}
                        />
                    </div>
                    <div className="flex flex-col w-full md:w-[42.5%]">
                        <label className="text-[#697687] text-[12px]">Last Name</label>
                        <input
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value);
                            setIsLastNameValid(e.target.value !== "" ? true : false);
                        }}
                        type="text"
                        disabled={isEditing} // Disable if in editing mode
                        className={`border w-full capitalize rounded-md px-2 py-2 focus:border-gray-300 ${
                            isLastNameValid ? "border-gray-300" : "border-red-500"
                        }`}
                        />
                    </div>
                    </div>
                </div>

                <div className="flex w-full pt-2 gap-3 flex-col md:flex-row">
                    <div className="flex w-full lg:w-[65%] md:w-1/2 flex-col">
                    <label className="text-[#697687] text-[12px]">Email</label>
                    <input
                        value={email}
                        onChange={(e) => {
                        setEmail(e.target.value);
                        setIsEmailValid(e.target.value !== "" ? true : false);
                        }}
                        type="text"
                        disabled={isEditing} // Disable if in editing mode
                        className={`border w-full rounded-md px-2 py-2 focus:border-gray-300 ${
                        isEmailValid ? "border-gray-300" : "border-red-500"
                        }`}
                    />
                    </div>
                    <div className="flex w-full md:w-1/2 lg:w-[35%] flex-col">
                    <label className="text-[#697687] text-[12px]">Mobile Number</label>
                    <PhoneInput
                        error={
                        value
                            ? isValidPhoneNumber(value)
                            ? undefined
                            : "Invalid phone number"
                            : "Phone number required"
                        }
                        value={value}
                        onChange={setValue}
                        defaultCountry="US"
                        international
                        withCountryCallingCode
                        placeholder={"Enter mobile"}
                        disabled={isEditing} // Disable if in editing mode
                        className={`placeholder-text-sm h-10 pl-3 rounded-lg z-0 border w-full focus:border-gray-300 focus:outline-none`}
                    />
                    </div>
                </div>

                <div className="flex w-full pt-2 gap-2.5 flex-col md:flex-row">
                    <div className="flex w-full flex-col lg:w-[100%]">
                    <label className="text-[#697687] text-[12px]">Address</label>
                    <input
                        ref={autoCompleteRef}
                        onChange={(event) => {
                        setLine1(event.target.value);
                        setIsLine1Valid(!!event.target.value);
                        }}
                        value={line1}
                        disabled={isEditing} // Disable if in editing mode
                        className={`border w-full capitalize rounded-md px-2 py-2 ${
                        isLine1Valid ? "border-gray-300" : "border-red-500"
                        }`}
                    />
                    </div>
                </div>

                <div className="flex w-full pt-2 gap-2.5 flex-col md:flex-row">
                    <div className="flex flex-col w-full md:w-1/2 lg:w-[50%]">
                    <label className="text-[#697687] text-[12px]">City</label>
                    <input
                        value={city}
                        onChange={(e) => {
                        setIsCityValid(e.target.value !== "" ? true : false);
                        setCity(e.target.value);
                        }}
                        type="text"
                        disabled={isEditing} // Disable if in editing mode
                        className={`border w-full capitalize rounded-md px-2 py-2 focus:border-gray-300 ${
                        isCityValid ? "border-gray-300" : "border-red-500"
                        }`}
                    />
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 lg:w-[50%]">
                    <label className="text-[#697687] text-[12px]">State</label>
                    <input
                        value={state}
                        onChange={(e) => {
                        setState(e.target.value);
                        setIsStateValid(e.target.value !== "" ? true : false);
                        }}
                        type="text"
                        disabled={isEditing} // Disable if in editing mode
                        className={`border w-full capitalize rounded-md px-2 py-2 focus:border-gray-300 ${
                        isStateValid ? "border-gray-300" : "border-red-500"
                        }`}
                    />
                    </div>
                </div>

                <div className="flex w-full pt-2 gap-2.5 flex-col md:flex-row">
                    <div className="flex flex-col w-full md:w-1/2 lg:w-[50%]">
                    <label className="text-[#697687] text-[12px]">Country</label>
                    <input
                        value={country}
                        onChange={(e) => {
                        setIsCountryValid(e.target.value !== "" ? true : false);
                        setCountry(e.target.value);
                        }}
                        type="text"
                        disabled={isEditing} // Disable if in editing mode
                        className={`border w-full capitalize rounded-md px-2 py-2 focus:border-gray-300 ${
                        isCountryValid ? "border-gray-300" : "border-red-500"
                        }`}
                    />
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 lg:w-[50%]">
                    <label className="text-[#697687] text-[12px]">Postal Code</label>
                    <input
                        value={postalCode}
                        onChange={(e) => {
                        setIsPostalCodeValid(e.target.value !== "" ? true : false);
                        setPostalCode(e.target.value);
                        }}
                        type="text"
                        disabled={isEditing} // Disable if in editing mode
                        className={`border w-full capitalize rounded-md px-2 py-2 focus:border-gray-300 ${
                        isPostalCodeValid ? "border-gray-300" : "border-red-500"
                        }`}
                    />
                    </div>
                </div>

                <div className="mt-5 mb-3">
                    <span className="text-[#002248] text-[18px] font-bold">Add To Your Stay</span>
                </div>
                <ParkingCard />
                <LiquorCard />
                <PetsCard />

                <div className="flex justify-center mt-6 items-center mr-0 ml-auto mb-10">
                    <span className="text-[12px]">
                    By clicking on the continue button below to proceed with the booking, I
                    confirm that I have read and accept the
                    <a href="/TermsAndConditions" target="_blank" className="text-[#1893F8]">
                        {" "}
                        Terms & Conditions
                    </a>{" "}
                    & the Privacy policy.
                    </span>
                </div>

                <div className="flex justify-center mt-4 items-center mr-0 ml-auto mb-10">
                    <button
                    type="button" // Change to button to handle custom logic
                    onClick={handleSaveDetails} // Function to handle save logic
                    className={`bg-[#1893F8] px-4 rounded-md mt-3 font-bold py-2 text-white`}
                    >
                    {isEditing ? "Edit" : "Save Details"}
                    </button>
                </div>

                </form>
            ) : (
                <div className="w-full flex flex-col gap-2 ">
                {BookingConfirmed === false && (
                    <button
                    onClick={() => setPaymentIs(false)}
                    className="text-[#1893F8] text-[14px] hover:underline py-2"
                    >
                    Edit Traveler information
                    </button>
                )}
                <HotelPayment
                    requestFormat={requestFormat}
                    setBookingConfirmedOnParent={setBookingConfirmedOnParent}
                    setBookingFailedOnParent={setBookingFailedOnParent}
                    setBookingLoaded={setBookingLoaded}
                />
                </div>
            )}
            </div>


            
          </div>
          
        )}
      </div>
     {/* Bill Section (Price Summary) */}
      <div className="absolute top-[250px] right-40 space-y-3 w-full md:w-[25%] shadow-xl ">
        <div className="border border-gray-300 rounded-lg space-y-3 px-2 py-2 bg-white">
          <span className="font-bold 2xl:text-[25px] text-[18px]">Reservation Summary</span>

          {/* Insert New Section Here */}
          <div className="border gap-3 text-[#697687] text-[13px] 2xl:text-[15px] font-Montserrat border-[#E0E0E0] rounded-lg flex flex-col ">
            <div className="text-[#697687] text-[13px] 2xl:text-[15px] gap-6 font-Montserrat justify-between rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:py-5 px-3 py-3">
              <div className="flex flex-col gap-2">
                <span>Check In</span>
                <div className="flex md:flex-col flex-row justify-between md:justify-start">
                  {startDate && (
                    <span className="text-[#002248] 2xl:text-[18px] text-[16px] font-bold">
                      {DateConversion({
                        date: startDate,
                      })}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-none md:hidden h-[1px] bg-[#5C6A7A]"></div>
              <div className="flex flex-col gap-2">
                <span>Check Out</span>
                <div className="flex md:flex-col flex-row justify-between md:justify-start">
                  {endDate && (
                    <span className="text-[#002248] 2xl:text-[18px] text-[16px] font-bold">
                      {DateConversion({
                        date: endDate,
                      })}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-none md:hidden h-[1px] bg-[#5C6A7A]"></div>
              <div className="flex flex-col gap-2">
                <span>Booking for</span>
                <div className="flex md:flex-col flex-row justify-between md:justify-start">
                  <span className="text-[#002248] 2xl:text-[18px] text-[16px] font-bold">
                    {`${differenceInDays} ${
                      differenceInDays > 1 ? "nights" : "night"
                    }, ${numofoccupanice} ${
                      numofoccupanice > 1 ? "adults" : "adult"
                    }`}
                    {`${
                      numofchild > 0
                        ? `, ${numofchild} Child${numofchild > 1 ? "ren" : ""}`
                        : ""
                    }`}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Price Summary Header */}
          <span className="font-bold 2xl:text-[25px] text-[18px]">Price Summary</span>

          <div className="bg-[#1893F8] px-2 py-2 flex w-full justify-between text-white rounded-lg">
            <span className="text-[16px]">Description</span>
            <span className="text-[16px]">Total</span>
          </div>

          {/* Loop through rates */}
          {rateInfo.map((rate, index) => {
            const roomnumber = index + 1;
            return (
              <div key={index} className="text-[#697687] text-[13px] flex-col flex">
                <div className="w-full flex gap-3 flex-col">
                  <span className="w-full text-[15px]">
                    Room {roomnumber} ( {roomInfo.name} )
                  </span>
                  <div className="w-full line-through px-2 flex flex-row">
                    <span className="w-full lg:w-2/3 ">Regular Price</span>
                    <span className="w-full flex lg:w-1/3 text-end justify-end">
                      {formatCurrency(rateInfo[0].currency)}
                      {Math.ceil(rate.baseRate)}
                    </span>
                  </div>
                  <div className="w-full px-2 flex flex-row">
                    <span className="w-full lg:w-2/3 ">Discounted Price</span>
                    <span className="w-full flex lg:w-1/3 text-end justify-end">
                      {formatCurrency(rateInfo[0].currency)}
                      {Math.ceil(rate.totalRate)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          

          {/* Rest of Price Summary */}
          <div className="text-blue-600 text-[13px] px-2 flex-col flex">
            <div className="justify-between flex ">
              <span>Savings</span>
              <span>
                {formatCurrency(rateInfo[0].currency)}
                {totalSaving !== null ? (
                  totalSaving
                ) : (
                  <TotalSavings totalRate={total} PublishedRate={totalRate} />
                )}
              </span>
            </div>
          </div>
          <div className="h-[1px] bg-gray-200"></div>
          <div className="text-[#697687] px-2 text-[13px] flex-col flex">
            <div className="justify-between flex">
              <span className="">Booking Cost</span>
              <span>
                {formatCurrency(rateInfo[0].currency)}
                {Math.ceil(totalWithoutServiceCharge)}
              </span>
            </div>
          </div>

          {/* Other components */}
          {rateInfo[0]?.otherRateComponents &&
            rateInfo[0]?.otherRateComponents.length > 0 &&
            rateInfo[0]?.otherRateComponents.map((rate, index) => (
              <div
                key={index}
                className="text-[#697687] px-2 text-[13px] flex-col flex"
              >
                <div className="justify-between  flex">
                  <span className="">{rate.name}</span>
                  <span>
                    {formatCurrency(rateInfo[0].currency)}
                    {Math.ceil(rate.amount)}
                  </span>
                </div>
              </div>
            ))}

          <div className="h-[1px] bg-gray-500"></div>
          <div className="text-[#002248] px-2 font-bold text-[20px] 2xl:text-[28px] flex-col flex">
            {totalWthMember !== 0 ? (
              <div className="justify-between flex text-green-500">
                <span>{BookingConfirmed ? "Amount Paid" : "Total"}</span>
                <span>
                  {formatCurrency(rateInfo[0].currency)}
                  {Math.ceil(totalWthMember)}
                </span>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="h-[1px] bg-gray-100"></div>
          {/* <div className="flex justify-center mt-4 items-center mr-0 ml-auto ">
                    <button
                      type="submit"
                      className={`bg-[#3441ec] px-4 rounded-md mt-3 mb-5 font-bold py-2  text-white
                          `}
                    >
                      Book Now for {formatCurrency(rateInfo[0].currency)}
                      {Math.ceil(totalWthMember)}
                    </button>
                  </div> */}
                  <div className="flex justify-center mt-4 items-center mr-0 ml-auto ">
                  <button
                    type="button"
                    className={`bg-[#3441ec] px-4 rounded-md mt-3 mb-5 font-bold py-2 text-white`}
                    onClick={() => setIsPopupOpen(true)} // Open popup
                  >
                    Book Now for {formatCurrency(rateInfo[0].currency)}{Math.ceil(totalWthMember)}
                  </button>
                  </div>

                  {/* Popup Section */}
                  {isPopupOpen && (
                  <div  className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full md:w-[25%] p-5">

                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[18px]">Reservation Summary</span>
                        <button className="text-red-500" onClick={() => setIsPopupOpen(false)}>
                          &times; {/* Cross icon */}
                        </button>
                      </div>

                      {/* Reservation Details */}
                      <div className="border gap-3 text-[#697687] text-[13px] 2xl:text-[15px] font-Montserrat border-[#E0E0E0] rounded-lg flex flex-col mt-4">
                        <div className="flex flex-col gap-2">
                          <span>Check In</span>
                          {startDate && (
                            <span className="text-[#002248] text-[16px] font-bold">
                              {DateConversion({ date: startDate })}
                            </span>
                          )}
                        </div>
                        {/* Repeat for Check Out and Booking For... */}
                      </div>

                      {/* Bill Section (Price Summary) */}
                      <div className="border border-gray-300 rounded-lg space-y-3 px-2 py-2 bg-white mt-4">
                        <span className="font-bold 2xl:text-[25px] text-[18px]">Price Summary</span>

                        {/* Loop through rates */}
                        {rateInfo.map((rate, index) => {
                          const roomnumber = index + 1;
                          return (
                            <div key={index} className="text-[#697687] text-[13px] flex-col flex">
                              <div className="w-full flex gap-3 flex-col">
                                <span className="w-full text-[15px]">Room {roomnumber} ( {roomInfo.name} )</span>
                                <div className="w-full line-through px-2 flex flex-row">
                                  <span className="w-full lg:w-2/3">Regular Price</span>
                                  <span className="w-full flex lg:w-1/3 text-end justify-end">
                                    {formatCurrency(rateInfo[0].currency)}{Math.ceil(rate.baseRate)}
                                  </span>
                                </div>
                                <div className="w-full px-2 flex flex-row">
                                  <span className="w-full lg:w-2/3">Discounted Price</span>
                                  <span className="w-full flex lg:w-1/3 text-end justify-end">
                                    {formatCurrency(rateInfo[0].currency)}{Math.ceil(rate.totalRate)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        {/* Additional price summary details */}
                        <div className="h-[1px] bg-gray-500"></div>
                        <div className="text-[#002248] px-2 font-bold text-[20px] 2xl:text-[28px] flex-col flex">
                          {totalWthMember !== 0 ? (
                            <div className="justify-between flex text-green-500">
                              <span>{BookingConfirmed ? "Amount Paid" : "Total"}</span>
                              <span>{formatCurrency(rateInfo[0].currency)}{Math.ceil(totalWthMember)}</span>
                            </div>
                          ) : null}
                        </div>

                        {/* Promo Code Section */}
                        <div className="mt-4">
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="Enter Promo Code"
                              className="border border-gray-300 rounded-md p-2 w-full pr-16"
                            />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#3441ec] text-white px-4 py-1 rounded-md text-base font-semibold">
                              Apply
                            </button>
                          </div>
                        </div>

                        {/* Payment Method Section */}
                            <div className="mt-4 font-Montserrat">
                                <span className="font-bold text-lg">Payment Method</span>
                                <div className="grid grid-cols-3 gap-2 mt-2 ">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="applePay"
                                            className="mr-2"
                                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                        />
                                        Apple Pay
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="ml-2 w-4 h-4"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="googlePay"
                                            className="mr-2"
                                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                        />
                                        Google Pay
                                        <svg viewBox="0 -19 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" fill="#000000" className="ml-2 w-4 h-4"><g><path d="M232.503966,42.1689673 C207.253909,27.593266 174.966113,36.2544206 160.374443,61.5045895 L123.592187,125.222113 C112.948983,143.621675 126.650534,150.051007 141.928772,159.211427 L177.322148,179.639204 C189.30756,186.552676 204.616725,182.448452 211.530197,170.478784 L249.342585,104.997327 C262.045492,82.993425 254.507868,54.8722676 232.503966,42.1689673 Z" fill="#EA4335"></path><path d="M190.884248,68.541767 L155.490872,48.1141593 C135.952653,37.2682465 124.888287,36.5503588 116.866523,49.3002175 L64.6660169,139.704135 C50.0900907,164.938447 58.7669334,197.211061 84.0012455,211.755499 C106.005147,224.458406 134.126867,216.920782 146.829774,194.91688 L200.029486,102.764998 C206.973884,90.7801476 202.869661,75.4552386 190.884248,68.541767 Z" fill="#FBBC04"></path><path d="M197.696506,22.068674 L172.836685,7.71148235 C145.33968,-8.15950938 110.180221,1.25070674 94.3093189,28.7478917 L46.9771448,110.724347 C39.9857947,122.818845 44.1369141,138.299511 56.2315252,145.275398 L84.0720952,161.34929 C97.8203166,169.292894 115.392174,164.5797 123.335778,150.830917 L177.409304,57.1816314 C188.614245,37.7835939 213.411651,31.1355838 232.809294,42.3404686 L197.696506,22.068674 Z" fill="#34A853"></path><path d="M101.033296,52.202526 L74.1604429,36.7216914 C62.1750303,29.8240204 46.8660906,33.9126683 39.9527877,45.8666484 L7.71149357,101.579108 C-8.15952065,128.997954 1.25071234,164.079816 28.7479029,179.904047 L49.2069432,191.685907 L74.0198681,205.980684 L84.7879024,212.176099 C65.670846,199.37985 59.6002612,173.739558 71.2887797,153.545698 L79.6378018,139.126091 L110.20946,86.3008703 C117.107187,74.3784352 113.002964,59.1001971 101.033296,52.202526 Z" fill="#4285F4"></path></g></svg>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="paypal"
                                            className="mr-2"
                                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                        />
                                        PayPal
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-label="PayPal" role="img" viewBox="0 0 512 512" fill="#000000" className="ml-2 w-4 h-4"><rect width="512" height="512" rx="15%" fill="#ffffff"></rect><path fill="#002c8a" d="M377 184.8L180.7 399h-72c-5 0-9-5-8-10l48-304c1-7 7-12 14-12h122c84 3 107 46 92 112z"></path><path fill="#009be1" d="M380.2 165c30 16 37 46 27 86-13 59-52 84-109 85l-16 1c-6 0-10 4-11 10l-13 79c-1 7-7 12-14 12h-60c-5 0-9-5-8-10l22-143c1-5 182-120 182-120z"></path><path fill="#001f6b" d="M197 292l20-127a14 14 0 0 1 13-11h96c23 0 40 4 54 11-5 44-26 115-128 117h-44c-5 0-10 4-11 10z"></path></svg>
                                    </label>
                                    <label className="flex items-center col-span-3">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="creditCard"
                                            className="mr-2"
                                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                        />
                                        Credit Card
                                    </label>
                                </div>

                              {/* Conditional Input Fields for Credit Card */}
                              {selectedPaymentMethod === 'creditCard' && (
                                <div className="mt-4 ">
                                  <div className="grid grid-cols-1 gap-4">
                                    <div>
                                      <span className="block mb-1">Card Number</span>
                                      <input type="text" placeholder="1234 5678 9012 3456" className="border border-gray-300 rounded-md p-2 w-full italic" />
                                    </div>
                                    <div className="flex justify-between">
                                      <div className="w-1/2">
                                        <span className="block mb-1">Name on Card</span>
                                        <input type="text" placeholder="John Doe" className="border border-gray-300 rounded-md p-2 w-full italic" />
                                      </div>
                                      <div className="w-1/2">
                                        <span className="block mb-1">Expiry Date</span>
                                        <input type="text" placeholder="MM/YY" className="border border-gray-300 rounded-md p-2 w-full italic" />
                                      </div>
                                    </div>
                                    <div>
                                      <span className="block mb-1">CVV</span>
                                      <input type="text" placeholder="1111" className="border border-gray-300 rounded-md p-2 w-full italic" />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                      {/* Pay Now Button */}
                      <div className="flex justify-center mt-4">
                         <button
                          type="button"
                          className="bg-[#3441ec] px-4 rounded-md w-full py-2 font-bold text-white"
                          onClick={handlePayNow}
                        >
                          Pay Now
                        </button>
                      </div>
                    </div>

                  </div>
                  
                  )}
                  
        </div>
      </div>
    </section>
    </div>
  )
}
