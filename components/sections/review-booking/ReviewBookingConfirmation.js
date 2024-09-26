import React from 'react';
import Image from 'next/image';
import StarRating from "@/components/common/StarRating";

export default function ReviewBookingConfirmation({
  setCurrentStep,
  startDate,
  endDate,
  hotelInfo,
  selectedPaymentMethod,
  DateConversion,
  total,
  email,
  title,
  firstName,
  lastName,
  line1,
  city,
  state,
  country,
  postalCode,
  value
  
}) {
  const handlePaymentClick = () => {
    setCurrentStep(2);
  };

  return (
    <div className=" container mb-20 flex flex-col px-4 w-full lg:w-10/12 mx-auto -mt-10 space-y-4 md:space-y-6 font-Montserrat">
    <div className="p-3 bg-white shadow-lg rounded-lg">
    <div className="flex justify-between items-center mb-4 bg-green-200 pt-5 pb-5 pl-2 rounded-lg">
  <div className="flex items-center space-x-2">
    {/* SVG Icon */}
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          opacity="0.4"
          d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z"
          fill="#1AB272"
        ></path>
        <path
          d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z"
          fill="#1AB272"
        ></path>
      </g>
    </svg>
    
    {/* Text Content */}
    <div>
      <h2 className="text-lg font-bold">Your booking is confirmed</h2>
      <p className='text-gray-500'>Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco...</p>
    </div>
  </div>
</div>


      {/* Booking Details */}
      <div className="border-t pt-4 ml-3">
        <h3 className="text-3xl font-semibold mb-2">Booking Details</h3>

        <div className="flex items-center mt-4 mb-4 space-x-5">
          <Image
            src={hotelInfo.heroImage}
            width={270}
            height={200}
            alt="Hotel"
            className="w-1/8 rounded-md"
          />
           <div className="space-y-5 ">
        <h3 className="font-bold text-lg">{hotelInfo.name}</h3>
        <StarRating count={hotelInfo.starRating} />
        <span className="md:flex hidden w-full lg:w-2/3">
         {hotelInfo.contact.address.line1}
          </span>
        </div>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
  {/* Row 1 */}
  <div className="flex flex-col">
    <span className="text-sm text-gray-500">Name:</span>
    <div className="flex space-x-2 font-semibold">
      <span>{title}</span>
      <span>{firstName}</span>
      <span>{lastName}</span>
    </div>
  </div>

  <div className="flex flex-col">
    <span className="text-sm text-gray-500">Email:</span>
    <span className='font-semibold'>{email}</span>
  </div>

  <div className="flex flex-col">
    <span className="text-sm text-gray-500">Phone Number:</span>
    <span className='font-semibold'>{value}</span>
  </div>

  {/* Row 2 */}
  <div className="flex flex-col">
    <span className="text-sm text-gray-500">Check-In:</span>
    <span className='font-semibold'>{DateConversion({ date: startDate })}</span>
  </div>

  <div className="flex flex-col">
    <span className="text-sm text-gray-500">Check-Out:</span>
    <span className='font-semibold'>{DateConversion({ date: endDate })}</span>
  </div>

  <div className="flex flex-col">
    <span className="text-sm text-gray-500">Booking Number:</span>
    <span className='font-semibold'>{Math.floor(Math.random() * 1000000)}</span>
  </div>

  {/* Row 3 */}
  <div className="col-span-3 flex flex-col">
    <span className="text-sm text-gray-500">Address:</span>
    <span className='font-semibold'>{line1}</span>
  </div>
</div>


        
      </div>

      {/* Price Summary */}
      <div className="border-t pt-4 ml-3">
        <h3 className="text-2xl font-semibold mb-2">Your Price Summary</h3>
        <div className="flex justify-between">
          <span>Rooms and Offer:</span>
          <span>${total - total * 0.08 - 16.44}</span> {/* Calculate the room offer */}
        </div>
        <div className="flex justify-between">
          <span>8% VAT:</span>
          <span>${(total * 0.08).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>City Tax:</span>
          <span>$16.44</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total (Pay at property):</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePaymentClick}
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded"
        >
          Download Invoice
        </button>
      </div>
    </div>
    </div>
  );
}
