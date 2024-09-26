"use client";

import getRatingsLabel from "@/utils/get-ratings-label";

export default function HotelListingCardReview({ ratings }) {
  return (
    <>
      {ratings && ratings?.Rating && (
        <div className="flex space-x-3 items-center border-gray-200 border-t-[1px] py-4">
          <div className="rating-badge bg-[#1893F8] text-white px-3 py-1.5 text-base rounded-lg">
            {ratings?.Rating?.toFixed(1)}
          </div>
          <div className="flex flex-col space-y-1">
            <span className="ratings-label font-bold text-xs">
              {getRatingsLabel(ratings.Rating)}
            </span>
            <span className="num-reviews text-[#5C6A7A] text-xs">
              {ratings.NumReviews} reviews
            </span>
          </div>
        </div>
      )}
    </>
  );
}
