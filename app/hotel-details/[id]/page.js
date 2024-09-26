import { toast } from "react-toastify";

import HotelDetailsImageGallery from "@/components/sections/hotel-details/HotelDetailsImageGallery";
import HotelDetails from "@/components/sections/hotel-details/HotelDetails";

async function fetchHotelContent({ id }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOTEL_API_AXIOS_URL}/api/v1/content/individualHotel/getHotelContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    toast.error("Something went wrong. Please try again later.");
  }
}

async function fetchRatings({ id, city, hotelName }) {
  try {
    const data = {
      hotels: [{ id, city, hotelName }],
    };

    return fetch("https://reviews.checkins.ai/hotel_info_multiple", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    toast.error("Something went wrong. Please try again later.");
  }
}

async function fetchHotelReviews({ city, hotelName }) {
  try {
    return fetch(
      `${process.env.NEXT_PUBLIC_HOTEL_API_AXIOS_URL}/api/v1/reviews/onecall`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city, hotelName }),
      }
    );
  } catch (error) {
    toast.error("Something went wrong. Please try again later.");
  }
}

export default async function HotelDetailsPage({ params, searchParams }) {
  const id = params.id;
  const { hotels } = await fetchHotelContent({ id });
  const hotel = hotels.find((hotel) => hotel.providerName === "RateHawk") || hotels[0];
  const city = hotel?.contact?.address?.city?.name;
  const hotelName = hotel?.name;
  // const [reviewsReponse, ratingsResponse] = await Promise.all([
  //   fetchHotelReviews({ city, hotelName }),
  //   fetchRatings({ id, city, hotelName }),
  // ]);
  const reviews = null;
  const ratings = null;

  return (
    <div className="flex flex-col space-y-2 md:space-y-5 relative p-0 md:p-10 content-center items-center justify-center lg:w-10/12 mx-auto">
      {/* <HotelDetailsImageGallery
        heroImage={hotel.heroImage}
        images={hotel.images}
      /> */}
      <HotelDetails
        hotel={hotel}
        reviews={reviews && reviews.reviews}
        ratings={reviews && reviews}
        searchParams={searchParams}
      />
    </div>
  );
}
