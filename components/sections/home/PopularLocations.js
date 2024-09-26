"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const locations = [
  {
    id: 39714475,
    name: "The Beverly Hills Hotel",
    city: "Los Angeles, CA",
    path: "/img/popular-locations/the-beverly-hills-hotel.webp",
    starRating: 5,
    discountedRate: 592,
    totalRate: 701,
  },
  {
    id: 39286351,
    name: "Fontainebleau Beach",
    city: "Miami, FL",
    path: "/img/popular-locations/fontaineblue-miami-beach.webp",
    starRating: 5,
    discountedRate: 237,
    totalRate: 312,
  },
  {
    id: 15474724,
    name: "The Venetian Resort",
    city: "Las Vegas, NV",
    path: "/img/popular-locations/the-venetian-resort.webp",
    starRating: 4,
    discountedRate: 185,
    totalRate: 287,
  },
  {
    id: 15436177,
    name: "Four Seasons Resort",
    city: "Hawaii",
    path: "/img/popular-locations/four-seasons-resort-maui.webp",
    starRating: 4,
    discountedRate: 631,
    totalRate: 287,
  },
  {
    id: 15255412,
    name: "Waldorf Astoria",
    city: "Amsterdam",
    path: "/img/popular-locations/waldorf-astoria.webp",
    starRating: 5,
    discountedRate: 367,
    totalRate: 456,
  },
  {
    id: 37346691,
    name: "The Savoy",
    city: "London",
    path: "/img/popular-locations/the-savoy.webp",
    starRating: 5,
    discountedRate: 380,
    totalRate: 524,
  },
  {
    id: 39712962,
    name: "The Ritz",
    city: "Paris",
    path: "/img/popular-locations/the-ritz.webp",
    starRating: 5,
    discountedRate: 487,
    totalRate: 982,
  },
];

export default function PopularLocations() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3.7,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '20px',
    autoplay: true, // Enable auto-scrolling
    autoplaySpeed: 3500, // Speed of auto-scrolling (3000ms = 3s)
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerPadding: '15px',
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerPadding: '10px',
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: '5px',
        },
      },
    ],
  };

  return (
    <section id="locations" className="lg:w-10/12 mx-auto">
      <div className="mx-auto container flex flex-col space-y-8 relative  rounded-2xl p-4">
        <div className="flex flex-col space-y-7  rounded-2xl p-4">
          {/* <div className="absolute -top-2 left-0 right-0 h-4 bg-transparent shadow-lg"></div> */}
          <div className="text-center items-center flex flex-row justify-center md:justify-between md:text-left">
            <div>
              <span className="text-finalblue font-bold text-sm">Popular Locations</span>
              <h2 className="text-4xl font-bold text-center font-homepage text-bluedark md:text-left">Top Hotels</h2>
            </div>
          </div>
        </div>
        <Slider {...settings}>
          {locations.map((location) => (
            <PopularLocationItem key={location.id} location={location} />
          ))}
        </Slider>
      </div>
    </section>
  );
}

function PopularLocationItem({ location }) {
  const router = useRouter();
  const occupancies = [{ numOfAdults: 2, childAges: [] }];
  const currentDate = new Date();
  const oneMonthLater = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate()
  );
  const oneWeekAfter = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate() + 7
  );
  const params = new URLSearchParams({
    checkIn: oneMonthLater,
    checkOut: oneWeekAfter,
    occupancies: JSON.stringify(occupancies),
    direct: true,
  });

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg mx-3 my-6 transition-transform duration-300 transform hover:scale-110 hover:z-10 hover:shadow-2xl">
      {/* Background Image */}
      <div className="relative">
        <Image
          src={location.path}
          alt={location.name}
          className="w-full h-full object-cover"
          width={450} // Adjusted dimensions
          height={350} // Adjusted dimensions
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-full px-3 py-1 flex items-center">
          <span className="text-yellow-400 text-sm">{location.starRating} ★</span>
        </div>
        
        {/* Overlay with Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg">
          <div className="text-white flex justify-between items-center">
            <div>
              <div className="flex items-center mb-2">
                <span className="text-sm">{location.name}</span>
              </div>
              <p className="text-sm">{location.city}</p>
              <div className="flex items-center mt-2">
                <span className="text-lg font-bold">${location.discountedRate}</span>
                <span className="text-sm line-through text-gray-300 ml-2">${location.totalRate}</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-2 right-2 px-3 py-1 flex items-center">
            <button className="ml-12 text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
