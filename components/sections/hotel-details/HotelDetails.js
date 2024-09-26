import HotelDetailsHeader from "@/components/sections/hotel-details/HotelDetailsHeader";
import HotelDetailsNav from "@/components/sections/hotel-details/HotelDetailsNav";
import HotelDetailsOverview from "@/components/sections/hotel-details/HotelDetailsOverview";
import HotelDetailsRooms from "@/components/sections/hotel-details/HotelDetailsRooms";
import HotelDetailsLocation from "@/components/sections/hotel-details/HotelDetailsLocation";
import HotelDetailsCheckinInfo from "@/components/sections/hotel-details/HotelDetailsCheckinInfo";
import HotelDetailsAmenities from "@/components/sections/hotel-details/HotelDetailsAmenities";
import HotelDetailsPolicies from "@/components/sections/hotel-details/HotelDetailsPolicies";
import HotelDetailsReviews from "@/components/sections/hotel-details/HotelDetailsReviews";
import HotelDetailsNewReviews from "@/components/sections/hotel-details/HotelDetailsNewReviews";

export default function HotelDetails({
  hotel,
  // reviews,
  ratings,
  searchParams,
}) {
  return (
    <div className="hotel-details w-full space-y-8 bg-gray-100 rounded-2xl p-4">
       <div className="hotel-details w-full space-y-8 bg-white rounded-2xl p-2">
      <div className="w-screen overflow-x-auto md:w-full top-2  z-20">
        <HotelDetailsHeader
          name={hotel?.name}
          address={hotel?.contact?.address?.line1}
          rating={ratings && ratings[0].ratings?.Rating}
          numReviews={ratings && ratings[0].ratings?.NumReviews}
          heroImage={hotel?.heroImage || ""}   // Provide a fallback for heroImage
          images={hotel?.images || []}         // Provide a fallback for images
          params={searchParams}
        />
      </div>
      <div className="w-screen overflow-x-auto md:w-full sticky top-2 shadow z-20 bg-gray-100 rounded-2xl p-4"
      style={{
        boxShadow: "4px 0px 6px -1px rgba(0, 0, 0, 0.1), -4px 0px 6px -1px rgba(0, 0, 0, 0.1)",
      }}>
        <HotelDetailsNav />
      </div>
      <HotelDetailsOverview hotel={hotel} />
      <HotelDetailsRooms hotel={hotel} searchParams={searchParams} />
      <HotelDetailsLocation descriptions={hotel.descriptions} hotel={hotel}/>
      <HotelDetailsCheckinInfo
        checkinInfo={hotel.checkinInfo}
        checkoutInfo={hotel.checkoutInfo}
      />
      <HotelDetailsAmenities facilities={hotel.facilities} />
      <HotelDetailsPolicies policies={hotel.policies} />
      <HotelDetailsNewReviews />
      {/* <HotelDetailsReviews reviews={reviews} /> */}
    </div>
    </div>
  );
}
