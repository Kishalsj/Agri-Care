"use client";
import React, { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";



const reviews = [
  {
    id: 1,
    name: "John Doe",
    review: "The auto rebooking feature on Checkins.ai is a brilliant idea. I\'ve saved a lot of money on my last few trips because of it. I highly recommend becoming a  of money on my last few trips because of it. I highly recommend becoming a member..The auto rebooking feature on Checkins.ai is a brilliant idea.",
    rating: 5,
    imagePath: "/img/reviews/review1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    review: "The auto rebooking feature on Checkins.ai is a brilliant idea. I\'ve saved a lot of money on my last few trips because of it. I highly recommend becoming a  of money on my last few trips because of it. I highly recommend becoming a member..The auto rebooking feature on Checkins.ai is a brilliant idea.",
    rating: 5,
    imagePath: "/img/reviews/review2.jpg",
  },
  {
    id: 3,
    name: "Samuel Green",
    review: "The auto rebooking feature on Checkins.ai is a brilliant idea. I\'ve saved a lot of money on my last few trips because of it. I highly recommend becoming a  of money on my last few trips because of it. I highly recommend becoming a member..The auto rebooking feature on Checkins.ai is a brilliant idea.",
    rating: 4,
    imagePath: "/img/reviews/review3.jpg",
  },
  {
    id: 4,
    name: "Samuel Green",
    review: "The auto rebooking feature on Checkins.ai is a brilliant idea. I\'ve saved a lot of money on my last few trips because of it. I highly recommend becoming a  of money on my last few trips because of it. I highly recommend becoming a member..The auto rebooking feature on Checkins.ai is a brilliant idea.",
    rating: 4,
    imagePath: "/img/reviews/review4.jpg",
  },
  {
    id: 5,
    name: "Samuel Green",
    review: "The auto rebooking feature on Checkins.ai is a brilliant idea. I\'ve saved a lot of money on my last few trips because of it. I highly recommend becoming a  of money on my last few trips because of it. I highly recommend becoming a member..The auto rebooking feature on Checkins.ai is a brilliant idea.",
    rating: 4,
    imagePath: "/img/reviews/review5.jpg",
  },
  {
    id: 6,
    name: "Joe May",
    review: "The auto rebooking feature on Checkins.ai is a brilliant idea. I\'ve saved a lot of money on my last few trips because of it. I highly recommend becoming a  of money on my last few trips because of it. I highly recommend becoming a member..The auto rebooking feature on Checkins.ai is a brilliant idea.",
    rating: 3,
    imagePath: "/img/reviews/review6.jpg",
  },
  {
    id: 7,
    name: "Sam Micheal",
    review: "The auto rebooking feature on Checkins.ai is a brilliant idea. I\'ve saved a lot of money on my last few trips because of it. I highly recommend becoming a  of money on my last few trips because of it. I highly recommend becoming a member..The auto rebooking feature on Checkins.ai is a brilliant idea.",
    rating: 4,
    imagePath: "/img/reviews/review7.jpg",
  },
  // Add more review objects as needed...
];

function ReviewCard({ review }) {
  return (
    <div className="bg-white rounded-xl shadow-xl flex flex-col items-center overflow-hidden w-72 h-100 py-4 hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out">
  {/* Top: Image */}
  <div className="w-24 h-24 rounded-full overflow-hidden mt-2">
    <Image
      src={review.imagePath}
      alt={review.name}
      className="object-cover w-full h-full"
      width={96}  // Circle diameter
      height={96} // Circle diameter
    />
  </div>

  {/* Bottom: Review Content */}
  <div className="p-4 flex flex-col justify-between h-full text-center">
    <div>
      <p className="text-sm text-gray-600 mt-2">{review.review}</p>
    </div>
    <div className="mt-4">
      <p className="text-lg text-yellow-500">
        {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
      </p>
    </div>
    <h3 className="text-lg text-gray-500 font-semibold">{review.name}</h3>
  </div>
</div>

  );
}

export default function Reviews() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true, // Add this line for autoplay
    autoplaySpeed: 1500, // Time in milliseconds between each scroll
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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
    <section id="reviews" className="lg:w-10/12 mx-auto">
      <div className="mx-auto container flex flex-col space-y-8 relative bg-[#ffffff28] rounded-2xl p-4">
        <div className="flex flex-col space-y-7 bg-white rounded-2xl p-4 ">
        {/* <div className="absolute -top-2 left-0 right-0 h-4 bg-transparent shadow-lg"></div> */}
      {/* <div className="absolute -bottom-7 left-0 right-0 h-4 bg-transparent shadow-lg"></div> */}
          <div className="text-center items-center flex flex-row justify-center md:justify-between md:text-left">
            <div>
            <span className="text-finalblue font-bold text-sm">
                Reviews
              </span>
              <h2 className="text-4xl font-bold text-center text-bluedark md:text-left">
                What Our Customers Say
              </h2>
            </div>
          </div>
        </div>
        <Slider {...settings}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Slider>
      </div>
    </section>
    
  );
}
