import HotelMap from "@/components/common/HotelMap";
import WiFiIcon from "@/components/icons/WiFiIcon";
import ReviewTab from "@/components/sections/hotel-details/HotelDetailsStarRatings"

const BedIcon = () => (
  <svg
    version="1.1"
    id="real_x5F_estate_1_"
    xmlns="http://www.w3.org/2000/svg"
    x="0"
    y="0"
    viewBox="0 0 128 128"
    style={{ enableBackground: 'new 0 0 128 128' }}
    xmlSpace="preserve"
    width="24"
    height="24"
    fill="#66839E"
    className="w-6 h-6"
  >
    <style>
      {`.st0{display:none}.st1{display:inline}.st2{fill:#66839E}`}
    </style>
    <g id="bed_1_">
      <path
        className="st2"
        d="M0 108.8h12.8l3.2-16h96l3.2 16H128V83.2H0v25.6zm19.2-57.6c0-3.5 2.9-6.4 6.4-6.4h25.6c3.5 0 6.4 2.9 6.4 6.4v6.4h12.8v-6.4c0-3.5 2.9-6.4 6.4-6.4h25.6c3.5 0 6.4 2.9 6.4 6.4v6.4h9.6V32S91.9 19.2 65 19.2C37.5 19.2 9.6 32 9.6 32v25.6h9.6v-6.4zm102.4 9.6H6.4c-3.5 0-6.4 2.9-6.4 6.4V80h128V67.2c0-3.5-2.9-6.4-6.4-6.4z"
        id="icon_10_"
      />
    </g>
  </svg>
);

const WashroomIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width="24"
    height="24"
    fill="#66839E"
    className="w-6 h-6"
  >
    <path d="M29 38H2a2.006 2.006 0 0 0-2 2v2a2.006 2.006 0 0 0 2 2h27zM62 38h-6v6h6a2.006 2.006 0 0 0 2-2v-2a2.006 2.006 0 0 0-2-2zM56 47.316A3.619 3.619 0 0 1 52.725 51 3.47 3.47 0 0 1 50 49.94a3.478 3.478 0 0 1-5 0 3.478 3.478 0 0 1-5 0 3.478 3.478 0 0 1-5 0A3.47 3.47 0 0 1 32.275 51 3.619 3.619 0 0 1 29 47.316V46H4v6a7 7 0 0 0 7 7h42a7 7 0 0 0 7-7v-6h-4zM10 63a1.003 1.003 0 0 0 1 1h4a.988.988 0 0 0 .89-.55L17.12 61H10zM48.11 63.45A.988.988 0 0 0 49 64h4a1.003 1.003 0 0 0 1-1v-2h-7.11z" />
    <path d="M63 2a1.003 1.003 0 0 0-1 1v1h-4v-.5a3.5 3.5 0 0 0-7 0V4H39v-.5a3.5 3.5 0 0 0-7 0V4H2V3a1 1 0 0 0-2 0v4a1 1 0 0 0 2 0V6h30v3h-5a1 1 0 0 0 0 2h4v36.5a1.5 1.5 0 0 0 3 0V11h2v36.5a1.5 1.5 0 0 0 3 0V11h2v36.5a1.5 1.5 0 0 0 3 0V11h2v36.5a1.5 1.5 0 0 0 3 0V11h4a1 1 0 0 0 0-2h-5V6h9v1a1 1 0 0 0 2 0V3a1.003 1.003 0 0 0-1-1zM34 3.5a1.5 1.5 0 0 1 3 0V4h-3zM51 9H34V6h17zm5-5h-3v-.5a1.5 1.5 0 0 1 3 0z" />
    <path d="M8.5 8A5.51 5.51 0 0 0 3 13.5V36h2V13.5a3.5 3.5 0 0 1 7 0v1.601A5.008 5.008 0 0 0 8 20v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a5.008 5.008 0 0 0-4-4.899V13.5A5.51 5.51 0 0 0 8.5 8zM8.01 36h17.17a6.079 6.079 0 0 0-5.28-3 5 5 0 0 0-9.9 1c0 .14.01.27.02.41A4.92 4.92 0 0 0 8.01 36z" />
  </svg>
);
const SizeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="24"
    height="24"
    fill="#66839E"
    className="w-6 h-6"
  >
    <path d="M21.434 11.975l8.602-8.549-0.028 4.846c-0.009 0.404 0.311 0.755 0.716 0.746l0.513-0.001c0.404-0.009 0.739-0.25 0.748-0.654l0.021-7.219c0-0.007-0.027-0.012-0.027-0.019l0.040-0.366c0.004-0.203-0.044-0.384-0.174-0.513-0.13-0.131-0.311-0.21-0.512-0.204l-0.366 0.009c-0.007 0-0.012 0.003-0.020 0.004l-7.172-0.032c-0.404 0.009-0.738 0.343-0.747 0.748l-0.001 0.513c0.061 0.476 0.436 0.755 0.84 0.746l4.726 0.013-8.572 8.52c-0.39 0.39-0.39 1.024 0 1.415s1.023 0.39 1.414 0zM10.597 20.025l-8.602 8.523 0.027-4.82c0.010-0.404-0.312-0.756-0.716-0.747l-0.544 0.001c-0.405 0.010-0.739 0.25-0.748 0.654l-0.021 7.219c0 0.007 0.028 0.011 0.028 0.019l-0.040 0.365c-0.005 0.203 0.043 0.385 0.174 0.514 0.129 0.131 0.311 0.21 0.512 0.205l0.366-0.009c0.007 0 0.012-0.003 0.020-0.003l7.203 0.032c0.404-0.010 0.738-0.344 0.748-0.748l0.001-0.514c-0.062-0.476-0.436-0.755-0.84-0.746l-4.726-0.012 8.571-8.518c0.39-0.39 0.39-1.023 0-1.414s-1.023-0.391-1.413-0zM32.007 30.855l-0.021-7.219c-0.009-0.404-0.343-0.645-0.747-0.654l-0.513-0.001c-0.404-0.009-0.725 0.343-0.716 0.747l0.028 4.846-8.602-8.549c-0.39-0.39-1.023-0.39-1.414 0s-0.39 1.023 0 1.414l8.571 8.518-4.726 0.012c-0.404-0.009-0.779 0.27-0.84 0.746l0.001 0.514c0.009 0.404 0.344 0.739 0.747 0.748l7.172-0.032c0.008 0 0.013 0.003 0.020 0.003l0.366 0.009c0.201 0.005 0.384-0.074 0.512-0.205 0.131-0.129 0.178-0.311 0.174-0.514l-0.040-0.365c0-0.008 0.027-0.012 0.027-0.019zM3.439 2.041l4.727-0.012c0.404 0.009 0.778-0.27 0.84-0.746l-0.001-0.513c-0.010-0.405-0.344-0.739-0.748-0.748l-7.204 0.031c-0.008-0.001-0.013-0.004-0.020-0.004l-0.366-0.009c-0.201-0.005-0.383 0.074-0.512 0.204-0.132 0.13-0.179 0.31-0.174 0.514l0.040 0.366c0 0.007-0.028 0.012-0.028 0.020l0.021 7.219c0.009 0.404 0.343 0.645 0.748 0.654l0.545 0.001c0.404 0.009 0.724-0.342 0.715-0.746l-0.028-4.819 8.602 8.523c0.39 0.39 1.024 0.39 1.414 0s0.39-1.024 0-1.415z" />
  </svg>
);



export default function HotelDetailsOverview({ hotel }) {
  return (
    <div
      id="overview"
      className="relative mx-auto z-10  rounded-2xl p-4 m-0"
    >
      <div className="flex justify-between flex-col lg:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full my-5 xl:my-0 xl:w-1/2 flex-col xl:pr-5 bg-white rounded-2xl  p-4">
          <h3 className="text-lg md:text-2xl font-semibold mb-2 font-Montserrat">About</h3>
          <div className="flex items-center mb-2 gap-4">
            <div className="bg-gray-300 p-1 rounded-md">
          <BedIcon />
          </div>
          <div className="bg-gray-300 p-1 rounded-md">
          <WashroomIcon />
          </div>
          <div className="bg-gray-300 p-1 rounded-md">
          <SizeIcon />
          </div>

        </div >
        <div className="font-Montserrat font-semibold mt-4">
          {hotel.descriptions[0].text}
          </div>
        </div>
        
       {/* Add the ReviewTab component */}
       <div className="w-full my-5 xl:my-0 xl:w-1/3 flex-col bg-white rounded-2xl p-4">
          <h3 className="text-lg md:text-2xl font-semibold mb-2 font-Montserrat">Ratings</h3>
          <ReviewTab
            reviews={{
              total: 256,  // Example number of total reviews
              categories: [
                { name: "Cleanliness", score: 80 },
                { name: "Communication", score: 90 },
                { name: "Check-In", score: 75 },
                { name: "Accuracy", score: 85 },
                { name: "Location", score: 78 },
                { name: "Value", score: 95 },
              ],
            }}
            starRating={4.7}
          />
        </div>
        
      </div>
      <div className="flex justify-between flex-col lg:flex-row space-y-4 md:space-y-0 md:space-x-4 ">
      {Array.isArray(hotel.facilities) && (
          <div className="w-full my-5 xl:my-0 xl:w-1/2 flex-col  bg-white rounded-2xl shadow-md p-4">
            <h3 className="text-lg md:text-2xl font-semibold mb-2 font-Montserrat">
              Popular amenities
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              {Array.isArray(hotel.facilities) &&
                hotel.facilities.slice(0, 11).map((item, index) => (
                  <li className="flex flex-row justify-between" key={item.id}>
                    {item.name}
                  </li>
                ))}
            </ul>
          </div>
        )}
      <div className="w-full my-5 xl:my-0 xl:w-1/3 flex-col bg-white rounded-2xl shadow-md  p-3">
        <h3 className="text-lg md:text-2xl font-semibold mb-2 font-Montserrat">
              Where You Will Be
            </h3>
          <HotelMap
            id={hotel.id}
            lat={hotel.geoCode.lat}
            lng={hotel.geoCode.long}
          />
        </div>
        </div>
    </div>
  );
}
