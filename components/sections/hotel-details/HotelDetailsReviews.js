"use client";

import { Element } from "react-scroll";

import computeOverallRating from "@/utils/compute-overall-rating";
import StarRating from "@/components/common/StarRating";
import HotelDetailsReviewsStarRatingTotal from "./HotelDetailsReviewsStarRatingTotal";

export default function HotelDetailsReviews({ reviews = [] }) {
  return (
    <Element
      id="reviews"
      className="container grid grid-flow-row mt-3 relative mx-auto bg-gray-100 rounded-2xl p-4"
    >
      {reviews && reviews.length > 0 ? (
        <div className="grid grid-flow-row md:grid-cols-2 gap-4 font-Montserrat">
          <div className="bg-white p-4 rounded-2xl shadow h-fit">
            <h3 className="text-2xl font-bold mb-2">Review</h3>
            <div className="grid grid-flow-row md:grid-cols-3 ">
              <div className="flex flex-row items-center">
                <span className="text-[75px]">
                  {computeOverallRating(reviews)}
                </span>
                <svg
                  aria-hidden="true"
                  className="w-9 h-9 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Total stars</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <HotelDetailsReviewsStarRatingTotal reviews={reviews} />
            </div>
          </div>
          <article>
            <div className="space-y-4">
              {reviews.length > 0 &&
                reviews.map((review, index) => (
                  <div
                    key={index}
                    className="hotel-details-review bg-white p-4 rounded-2xl shadow"
                  >
                    <p className="mb-2 font-bold ">{review?.title}</p>
                    <div className="flex text-[14px] items-center justify-start font-semibold space-x-4 mb-2">
                      <div className="space-y-1 ">
                        <p>
                          {review?.user || "Unknown"} | {review?.date}{" "}
                        </p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <StarRating count={review.rating} />
                    </div>
                    <p className="mb-2 text-[15px] text-[#5C6A7A]">
                      {review?.main_text}
                    </p>
                  </div>
                ))}
            </div>
          </article>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-4 shadow">
          <h3 className="text-lg font-bold mb-2">Reviews</h3>
          <div>No reviews yet</div>
        </div>
      )}
    </Element>
  );
}
