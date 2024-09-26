import React from "react";

const BookingSteps = ({ currentStep }) => {
  return (
    <div className="flex justify-between items-center my-8 ml-60 mr-60 ">
      {/* Step 1: Date & Room (Completed if currentStep > 1) */}
      <div className="flex items-center space-x-2">
        <div className={`w-11 h-11 ${currentStep >= 1 ? 'bg-green-500' : 'bg-white border-2 border-gray-300'} text-white flex items-center justify-center rounded-xl shadow-2xl`}>
          {currentStep > 1 ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <span className="text-gray-700">1</span>
          )}
        </div>
        <span className="font-semibold text-green-500">Dates & Rooms</span>
      </div>

      <div className="flex-auto border-t-2 mr-4 ml-4  border-green-300"></div>

      {/* Step 2: Info (Completed if currentStep > 2, current step if currentStep === 2) */}
      <div className="flex items-center space-x-2">
        <div className={`w-11 h-11 ${currentStep >= 2 ? (currentStep === 2 ? 'bg-[#4B2BF4]' : 'bg-green-500') : 'bg-white border-2 border-gray-300'} text-white flex items-center justify-center  rounded-xl shadow-2xl`}>
          {currentStep > 2 ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <span className="text-white font-Montserrat font-semibold">2</span>
          )}
        </div>
        <span className={`font-semibold ${currentStep === 4 ? 'text-green-500' : 'text-[#4B2BF4]'}`}>Info</span>
      </div>

      <div className={`flex-auto border-t-2 ${currentStep === 2 ? 'border-[#4B2BF4]' : currentStep === 4 ? 'border-green-500' : 'border-transparent'} mr-4 ml-4 border-dashed`}></div>


      {/* Step 3: Extras */}
      <div className="flex items-center space-x-2">
        <div className={`w-11 h-11 ${currentStep >= 3 ? (currentStep === 3 ? 'bg-blue-500' : 'bg-green-500') : 'bg-white border-2 border-gray-300'} text-white flex items-center justify-center  rounded-xl shadow-2xl`}>
          {currentStep > 3 ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <span className="text-gray-500 font-Montserrat font-semibold">3</span>
          )}
        </div>
        <span className={`font-semibold ${currentStep === 4 ? 'text-green-500' : 'text-gray-500'}`}>Payments</span>
      </div>

      <div className={`flex-auto border-t-2 ${currentStep === 4 ? 'border-green-500' : 'border-gray-300'} mr-4 ml-4 border-dashed`}></div>

      

      {/* Step 4: Confirmation */}
      <div className="flex items-center space-x-2">
        <div className={`w-11 h-11 ${currentStep >= 4 ? (currentStep === 4 ? 'bg-blue-500' : 'bg-green-500') : 'bg-white border-2 border-gray-300'} text-white flex items-center justify-center  rounded-xl shadow-2xl`}>
          {currentStep === 4 ? (
            <span>4</span>
          ) : (
            <span className="text-gray-500 font-Montserrat font-semibold">4</span>
          )}
        </div>
        <span className={`font-semibold ${currentStep === 4 ? 'text-blue-500' : 'text-gray-500'}`}>Confirmation</span>

      </div>
    </div>
  );
};

export default BookingSteps;
