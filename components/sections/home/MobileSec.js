"use client";
import Image from "next/image";

export default function MobileAppSection() {
  return (
    <section id="mobileApp" className="lg:w-10/12 mx-auto">
      <div className="container flex flex-col lg:flex-row items-center justify-between mx-auto space-y-8 lg:space-y-0 relative bg-[#ffffff] rounded-2xl p-8">
        
        {/* Left Content */}
        <div className="flex flex-col space-y-12 w-full lg:w-1/2 text-center lg:text-left">
          {/* Coming Soon and Text */}
          <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-4 lg:space-x-6">
            <img
              src="/img/mobileSec/ComingSoon.webp"
              alt="ComingSoon"
              className="w-40 h-auto"
            />
            <p className="text-[#5C6A7A] text-xl lg:text-xl max-w-sm lg:max-w-md">
              Your ticket to unbeatable wholesale rates on hotel bookings!
              Prepare for mind-blowing savings and jaw-dropping deals as you
              explore top destinations worldwide.
            </p>
          </div>
          

          {/* Additional Text */}
          <p className="text-[#5C6A7A] text-base lg:text-lg max-w-2xl lg:max-w-2xl">
            Coming soon our Mobile App, so get ready to revolutionize your
            travel experience with the power of Checkins at your fingertips!
          </p>

          {/* Store Buttons */}
          <div className="flex justify-center lg:justify-start space-x-4">
            <img
              src="/img/mobileSec/playstore.webp"
              alt="Google Play Store"
              className="w-36 h-auto"
            />
            <img
              src="/img/mobileSec/appstore.png"
              alt="App Store"
              className="w-36 h-auto"
            />
          </div>
        </div>

        {/* Right Content: Mobile Image with Background Circle */}
        <div className="relative flex justify-center w-full lg:w-1/2">
            {/* Background Circle */}
            <svg
                className="absolute inset-0 mx-auto my-auto w-72 h-72 lg:w-[374px] lg:h-[375px]"
                width="374"
                height="375"
                viewBox="0 0 374 375"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
             >
                <circle cx="187" cy="187.034" r="187" fill="#1893F8" />
            </svg>

            {/* Mobile App Image */}
            <img
                src="/img/mobileSec/mobile.png"
                alt="mobile"
                className="relative w-[350px] h-auto transition-transform duration-300 ease-in-out transform hover:scale-110"
  />
            </div>
        </div>
    </section>
  );
}
