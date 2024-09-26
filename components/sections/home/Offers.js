"use client";
import { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";

const locations = [
  {
    id: 39714475,
    description: "Enjoy the final days of summer at sea with up to $1,000 to spend on board plus more deals only found here!",
    otherDesc: "Super Sale: Up to 70% off!",
    promoCode: "SUMMER2024",
    path: "/img/popular-locations/offer1.jpg",
  },
  {
    id: 39286351,
    description: "Experience the luxury of Fontainebleau Miami Beach with exclusive offers and discounts.",
    otherDesc: "Limited Time: Up to 50% off!",
    promoCode: "MIAMI2024",
    path: "/img/popular-locations/offer2.jpg",
  },
  {
    id: 39286351,
    description: "Experience the luxury of Fontainebleau Miami Beach with exclusive offers and discounts.",
    otherDesc: "Limited Time: Up to 50% off!",
    promoCode: "MEGA12",
    path: "/img/popular-locations/offer3.png",
  },
  {
    id: 39714475,
    description: "Enjoy the final days of summer at sea with up to $1,000 to spend on board plus more deals only found here!",
    otherDesc: "Super Sale: Up to 70% off!",
    promoCode: "SUMMER2024",
    path: "/img/popular-locations/offer1.jpg",
  },
  {
    id: 39286351,
    description: "Experience the luxury of Fontainebleau Miami Beach with exclusive offers and discounts.",
    otherDesc: "Limited Time: Up to 50% off!",
    promoCode: "MEGA12",
    path: "/img/popular-locations/offer3.png",
  },
  // Add more location objects as needed...
];

function OfferCard({ location }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(location.promoCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Hide the message after 2 seconds
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg flex overflow-hidden max-w-md">
      {/* Left Side: Image */}
      <div className="w-1/2">
        <Image
          src={location.path}
          alt={location.otherDesc}
          className="w-full h-full object-cover"
          width={200} // Adjust dimensions if needed
          height={200} // Adjust dimensions if needed
        />
      </div>

      {/* Right Side: Description and Promo Code */}
      <div className="w-1/2 p-4 flex flex-col justify-between">
        <div>
          <p className="text-sm text-gray-700">{location.description}</p>
        </div>
        <div className="flex flex-col justify-between mt-4">
          <p className="text-xs text-gray-500">Promo Code:</p>
          <div className="flex items-center">
            <div className="w-60 h-8 flex items-center justify-center border border-dashed border-gray-400 rounded-md">
            <span className={copied ? "text-green-500" : "text-gray-400"}>
                {copied ? "Copied to clipboard!" : location.promoCode}
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="ml-2 text-xs text-blue-500 hover:text-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-4 h-4"
              >
                <path d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Offers() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2500, // Set a reasonable speed for autoplay (3000ms = 3s)
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  

  return (
    <section id="locations" className="lg:w-10/12 mx-auto">
      <div className="mx-auto container flex flex-col space-y-8 relative  rounded-2xl p-4">
        <div className="flex flex-col space-y-7 bg-[#ffffff28] rounded-2xl p-4 ">
        {/* <div className="absolute -top-2 left-0 right-0 h-4 bg-transparent shadow-lg"></div> */}
          <div className="text-center items-center flex flex-row justify-center md:justify-between md:text-left">
            <div>
            <span className="text-finalblue font-bold text-sm">
                Best Offers
                
              </span>
              <h2 className="text-4xl font-bold text-center font-homepage text-bluedark md:text-left">
                Special Offers
              </h2>
            </div>
          </div>
        </div>
        <Slider {...settings}>
          {locations.map((location) => (
            <OfferCard key={location.id} location={location} />
          ))}
        </Slider>
      </div>
    </section>
  );
}
