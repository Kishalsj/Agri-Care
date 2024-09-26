export default function HotelDetailsReviewsStarRatingTotal({ reviews }) {
  // Calculate the percentage based on the rating (assuming max rating is 5)
  // Initialize counts for each star rating category
  const starCounts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  // Calculate the counts for each star rating category
  reviews.forEach((review) => {
    starCounts[review.rating]++;
  });

  return (
    <div id="hotel-details-review-star-rating-total" className="col-span-2">
      <div className="px-8 pb-3">
        {Object.keys(starCounts)
          .reverse()
          .map((rating, index) => (
            <div key={index} className="flex items-center mt-1">
              <div className="w-1/5 flex flex-row justify-between px-3 tracking-tighter text-gray-500">
                <span>{rating}</span>
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Third star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <div className="w-3/5">
                <div className="w-full h-2 bg-gray-300 rounded-lg">
                  <div
                    className="w-[percentage%] h-2 bg-yellow-600 rounded-lg"
                    style={{
                      width: `${(starCounts[rating] / reviews.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="w-1/5 pl-3 text-gray-700">
                <span
                  id={`hotel-details-review-star-rating-${rating}`}
                  className="text-sm"
                >
                  {((starCounts[rating] / reviews.length) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
