"use client"; // This makes the component a Client Component

import { useState } from 'react';

export default function HotelDetailsNewReviews() {
  // Fake review data
  const fakeReviews = [
    {
      rating: 5,
      text: "The location of the property is its USP. On the highway, making it accessible from the airport. It is also walkable to a mall.",
      userName: "John Doe",
      date: "13 Nov 2023",
    },
    {
      rating: 4,
      text: "Great staff and service. The amenities could be improved, but overall a good experience.",
      userName: "Jane Smith",
      date: "12 Nov 2023",
    },
    {
      rating: 3,
      text: "Decent hotel, but the rooms were smaller than expected. It was clean though.",
      userName: "Michael Johnson",
      date: "11 Nov 2023",
    },
    {
      rating: 2,
      text: "The property wasn’t clean, and I encountered several issues with the facilities.",
      userName: "Sarah Williams",
      date: "10 Nov 2023",
    },
    {
      rating: 1,
      text: "The worst experience ever. The staff was rude, and the rooms were dirty. I wouldn’t recommend staying here.",
      userName: "Emily Brown",
      date: "09 Nov 2023",
    },
    {
        rating: 5,
        text: "The location of the property is its USP. On the highway, making it accessible from the airport. It is also walkable to a mall.",
        userName: "John Doe",
        date: "13 Nov 2023",
      },
      {
        rating: 5,
        text: "The location of the property is its USP. On the highway, making it accessible from the airport. It is also walkable to a mall.",
        userName: "John Doe",
        date: "13 Nov 2023",
      },
      {
        rating: 5,
        text: "The location of the property is its USP. On the highway, making it accessible from the airport. It is also walkable to a mall.",
        userName: "John Doe",
        date: "13 Nov 2023",
      },
      {
        rating: 5,
        text: "The location of the property is its USP. On the highway, making it accessible from the airport. It is also walkable to a mall.",
        userName: "John Doe",
        date: "13 Nov 2023",
      },
      {
        rating: 5,
        text: "The location of the property is its USP. On the highway, making it accessible from the airport. It is also walkable to a mall.",
        userName: "John Doe",
        date: "13 Nov 2023",
      },
      {
        rating: 5,
        text: "The location of the property is its USP. On the highway, making it accessible from the airport. It is also walkable to a mall.",
        userName: "John Doe",
        date: "13 Nov 2023",
      },
      {
        rating: 5,
        text: "The location of the property is its USP. On the highway, making it accessible from the airport. It is also walkable to a mall.",
        userName: "John Doe",
        date: "13 Nov 2023",
      },
      {
        rating: 5,
        text: "The location of the property is its USP. On the highway, making it accessible from the airport. It is also walkable to a mall.",
        userName: "John Doe",
        date: "13 Nov 2023",
      },
      {
        rating: 4,
        text: "Great staff and service. The amenities could be improved, but overall a good experience.",
        userName: "Jane Smith",
        date: "12 Nov 2023",
      },
      {
        rating: 4,
        text: "Great staff and service. The amenities could be improved, but overall a good experience.",
        userName: "Jane Smith",
        date: "12 Nov 2023",
      },
      {
        rating: 4,
        text: "Great staff and service. The amenities could be improved, but overall a good experience.",
        userName: "Jane Smith",
        date: "12 Nov 2023",
      },
      {
        rating: 3,
        text: "Decent hotel, but the rooms were smaller than expected. It was clean though.",
        userName: "Michael Johnson",
        date: "11 Nov 2023",
      },
      {
        rating: 3,
        text: "Decent hotel, but the rooms were smaller than expected. It was clean though.",
        userName: "Michael Johnson",
        date: "11 Nov 2023",
      },
      {
        rating: 4,
        text: "Great staff and service. The amenities could be improved, but overall a good experience.",
        userName: "Jane Smith",
        date: "12 Nov 2023",
      },{
        rating: 4,
        text: "Great staff and service. The amenities could be improved, but overall a good experience.",
        userName: "Jane Smith",
        date: "12 Nov 2023",
      },
      {
        rating: 4,
        text: "Great staff and service. The amenities could be improved, but overall a good experience.",
        userName: "Jane Smith",
        date: "12 Nov 2023",
      },
      {
        rating: 4,
        text: "Great staff and service. The amenities could be improved, but overall a good experience.",
        userName: "Jane Smith",
        date: "12 Nov 2023",
      },
      {
        rating: 4,
        text: "Great staff and service. The amenities could be improved, but overall a good experience.",
        userName: "Jane Smith",
        date: "12 Nov 2023",
      },{
        rating: 4,
        text: "Great staff and service. The amenities could be improved, but overall a good experience.",
        userName: "Jane Smith",
        date: "12 Nov 2023",
      },
  ];

  const [visibleReviews, setVisibleReviews] = useState(5); // Number of reviews initially visible

  // Calculate review counts for each star level
  const reviewCounts = fakeReviews.reduce(
    (acc, review) => {
      acc[review.rating] += 1;
      return acc;
    },
    { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  );

  // Calculate the overall average rating
  const averageRating =
    fakeReviews.reduce((sum, review) => sum + review.rating, 0) / fakeReviews.length;

  // Total number of reviews
  const totalReviews = fakeReviews.length;

  // Function to determine the bar color based on the count percentage
  const getBarColor = (count) => {
    const percentage = (count / totalReviews) * 100;
    if (percentage === Math.max(...Object.values(reviewCounts).map(c => (c / totalReviews) * 100))) {
      return 'bg-green-500'; // Highest count: Green
    } else if (percentage > 60) {
      return 'bg-yellow-500'; // High count: Yellow
    } else if (percentage > 40) {
      return 'bg-orange-400'; // Medium count: Orange
    } else {
      return 'bg-red-500'; // Low count: Red
    }
  };

  return (
    <div className="bg-gray-100 rounded-2xl p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow p-6 font-Montserrat">
        {/* Left Section - Average Rating and Progress Bars */}
        <div className="flex flex-col justify-between">
        <div className="flex items-center mt-24">
            <div className="flex items-center mr-8">
            <h3 className="text-6xl font-bold text-blue-800">{averageRating.toFixed(1)}</h3>
            <span className="text-yellow-500 text-5xl ml-4">★</span>
            </div>
            <div className="flex flex-col">
            {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="text-gray-600 text-sm mb-2 flex items-center">
                <strong>{rating} ★</strong>
                <div className="flex items-center ml-4 w-full">
                    <div className="w-48 bg-gray-200 rounded-full h-2">
                    <div
                        className={`${getBarColor(reviewCounts[rating])} h-2 rounded-full`}
                        style={{
                        width: `${(reviewCounts[rating] / totalReviews) * 100}%`,
                        }}
                    />
                    </div>
                    <div className="ml-4">{reviewCounts[rating]}</div>
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>


        {/* Right Section - Individual Reviews */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Customer Reviews ({fakeReviews.length})</h3>
          <ul className="space-y-6 max-h-[400px] overflow-y-auto">
            {fakeReviews.slice(0, visibleReviews).map((review, index) => (
              <li key={index} className="border-b pb-4">
                {/* Star Rating */}
                <div className="flex items-center space-x-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={i < review.rating ? "text-yellow-500" : "text-gray-300"}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-600">{review.text}</p>

                {/* Reviewer Info */}
                <div className="text-gray-400 text-sm mt-2">
                  <span>{review.userName}</span> | <span>{review.date}</span>
                </div>
              </li>
            ))}
            {visibleReviews < totalReviews && (
              <button
                onClick={() => setVisibleReviews(visibleReviews + 5)}
                className="text-blue-600 mt-4"
              >
                Show More Reviews
              </button>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
