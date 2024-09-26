"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const destinations = [
  {
    path: "/img/destinations/las-vegas.webp",
    id: "472683",
    name: "Las Vegas",
    fullName: "Las Vegas, Nevada, United States of America",
    type: "MultiCity",
    state: "Clark County",
    country: "US",
    coordinates: {
      lat: 36.114666,
      long: -115.172874,
    },
    referenceScore: 100000,
    isTermMatch: true,
    description: "Known for its vibrant nightlife centered around 24-hour casinos and other entertainment options, Las Vegas is the ultimate destination for those looking to experience luxury, excitement, and endless entertainment in the heart of the Mojave Desert."
  },
  {
    path: "/img/destinations/london.webp",
    id: "118361",
    name: "London",
    fullName: "London And Vicinity, England, United Kingdom",
    type: "MultiCity",
    state: "Greater London",
    country: "GB",
    coordinates: {
      lat: 51.507538,
      long: -0.127804,
    },
    referenceScore: 100000,
    isTermMatch: true,
    description: "London, the capital of England and the United Kingdom, is a 21st-century city with a rich history stretching back to Roman times. It is renowned for its iconic landmarks such as the Houses of Parliament, Big Ben, the London Eye, and its diverse cultural offerings."
  },
  {
    path: "/img/destinations/bangkok.webp",
    id: "6798",
    name: "Bangkok",
    fullName: "Bangkok, Thailand",
    type: "MultiCity",
    state: "Bangkok",
    country: "TH",
    coordinates: {
      lat: 13.7475,
      long: 100.53601,
    },
    referenceScore: 100000,
    isTermMatch: true,
    description: "Bangkok, Thailand's capital, is known for its ornate shrines and vibrant street life. The city is a melting pot of exotic aromas, interesting sights, and visual delights, and is often described as the ultimate Asian tourist destination."
  },
  {
    path: "/img/destinations/los-angeles.webp",
    id: "472793",
    name: "Los Angeles",
    fullName: "Los Angeles, California, United States of America",
    type: "MultiCity",
    state: "Los Angeles County",
    country: "US",
    coordinates: {
      lat: 34.05072,
      long: -118.25477,
    },
    referenceScore: 100000,
    isTermMatch: true,
    description: "Los Angeles, the heart of the nation's film and television industry, is a sprawling Southern California city famed for its Mediterranean climate, ethnic diversity, and the entertainment industry centered on Hollywood."
  },
  {
    path: "/img/destinations/maui.webp",
    id: "472565",
    name: "Maui",
    fullName: "Maui, Hawaii, United States of America",
    type: "Region",
    state: "Hawaii",
    country: "US",
    coordinates: {
      lat: 20.80218,
      long: -156.34627,
    },
    referenceScore: 100000,
    isTermMatch: true,
    description: "Maui is an island in the Central Pacific, part of the Hawaiian archipelago, known for its stunning natural beauty, including the scenic Hana Highway, Haleakalā National Park, and the scenic beaches of Wailea and Kaanapali."
  },
  {
    path: "/img/destinations/dubai.webp",
    id: "1895",
    name: "Dubai",
    fullName: "Dubai, Dubai, United Arab Emirates",
    type: "City",
    state: "Dubai",
    country: "AE",
    coordinates: {
      lat: 25.27063,
      long: 55.30037,
    },
    referenceScore: 100000,
    isTermMatch: true,
    description: "Dubai is a city and emirate in the United Arab Emirates known for its ultramodern architecture, luxury shopping, and vibrant nightlife scene. Iconic landmarks include the Burj Khalifa, the Dubai Fountain, and the man-made islands, like the Palm Jumeirah."
  },
  {
    path: "/img/destinations/paris.webp",
    id: "118470",
    name: "Paris",
    fullName: "Paris, France",
    type: "MultiCity",
    state: "Seine-et-Marne",
    country: "FR",
    coordinates: {
      lat: 48.86272,
      long: 2.34375,
    },
    referenceScore: 100000,
    isTermMatch: true,
    description: "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy, and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. The city is known for landmarks like the Eiffel Tower, Notre-Dame, and the Louvre Museum."
  },
  {
    path: "/img/destinations/new-york.webp",
    id: "472764",
    name: "New York",
    fullName: "New York, New York, United States of America",
    type: "MultiCity",
    state: "Queens County",
    country: "US",
    coordinates: {
      lat: 40.75668,
      long: -73.98647,
    },
    referenceScore: 100000,
    isTermMatch: true,
    description: "New York City is a global hub for commerce, culture, and tourism. Known as 'The Big Apple', it is famous for its iconic skyline, Broadway shows, bustling Times Square, and landmarks such as Central Park, the Statue of Liberty, and the Empire State Building."
  },
  {
    path: "/img/destinations/miami.webp",
    id: "475136",
    name: "Miami",
    fullName: "Miami, Florida, United States of America",
    type: "City",
    state: "Miami-Dade County",
    country: "US",
    coordinates: {
      lat: 25.77178,
      long: -80.19009,
    },
    referenceScore: 100000,
    isTermMatch: true,
    description: "Miami, located in southern Florida, is famous for its cultural diversity, Art Deco architecture, and vibrant nightlife. The city is also known for its beautiful beaches, including Miami Beach and South Beach, and its Cuban influence reflected in the cafes and cigar shops."
  },
  {
    path: "/img/destinations/singapore.webp",
    id: "9906",
    name: "Singapore",
    fullName: "Singapore, Singapore",
    type: "City",
    country: "SG",
    coordinates: {
      lat: 1.29027,
      long: 103.85201,
    },
    referenceScore: 102000,
    isTermMatch: true,
    description: "Singapore, an island city-state off southern Malaysia, is a global financial center with a tropical climate and a multicultural population. It's known for its cleanliness, green spaces, and iconic landmarks like Marina Bay Sands, Gardens by the Bay, and Sentosa Island."
  },
  {
    path: "/img/destinations/san-diego.webp",
    id: "475754",
    name: "San Diego",
    fullName: "San Diego, California, United States of America",
    type: "City",
    state: "San Diego County",
    country: "US",
    coordinates: {
      lat: 32.71444,
      long: -117.16237,
    },
    referenceScore: 100000,
    isTermMatch: true,
    description: "San Diego is a city on the Pacific coast of California known for its beaches, parks, and warm climate. The city is also famous for Balboa Park, the renowned San Diego Zoo, and its deep harbor, which houses a large active naval fleet."
  },
  {
    path: "/img/destinations/sydney.webp",
    id: "619163",
    name: "Sydney",
    fullName: "Sydney, New South Wales, Australia",
    type: "MultiCity",
    state: "Penrith City Council",
    country: "AU",
    coordinates: {
      lat: -33.86757,
      long: 151.20844,
    },
    referenceScore: 100000,
    isTermMatch: true,
    description: "Sydney, the state capital of New South Wales, Australia, is known for its Sydney Opera House, with a distinctive sail-like design, and its Sydney Harbour Bridge. The city is famous for its vibrant arts scene, beautiful beaches, and diverse cuisine."
  },
];


export default function Destinations() {
  return (
    <section id="Destinations" className="lg:w-10/12 mx-auto">
      <div className="mx-auto container flex flex-col space-y-12 md:space-y-0 bg-[#ffffff28]rounded-2xl p-4">
      <div className="relative flex flex-col space-y-12 bg-white rounded-2xl p-4  mb-4">
  {/* Shadow Element */}
  {/* <div className="absolute -top-2 left-0 right-0 h-4 bg-transparent shadow-lg"></div> */}

  {/* Content */}
  <div className="text-center items-center justify-center flex flex-row md:justify-between md:text-left">
    <div>
      <span className="text-finalblue font-bold text-sm">
        Destinations
      </span>
      <h2 className="text-4xl font-bold font-homepage text-center text-bluedark md:text-left">
        Book Hotels At Popular Destinations
      </h2>
    </div>
  </div>
</div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {destinations.slice(0, 3).map((destination, index) => (
            <DestinationItem key={index} destination={destination} />
          ))}

          {destinations.slice(3, 6).map((destination, index) => (
            <DestinationItem key={index} destination={destination} />
          ))}

          {destinations.slice(6, 9).map((destination, index) => (
            <DestinationItem key={index} destination={destination} />
          ))}

          {destinations.slice(9, 12).map((destination, index) => (
            <DestinationItem key={index} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DestinationItem({ destination }) {
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

  function handleClick() {
    const params = new URLSearchParams({
      location: JSON.stringify(destination),
      checkIn: oneMonthLater.toISOString(),
      checkOut: oneWeekAfter.toISOString(),
      occupancies: JSON.stringify(occupancies),
    });

    router.push(`hotel-listing?${params.toString()}`);
  }

  return (
    <div
      className="img-hover-zoom shadow rounded-2xl overflow-hidden flex flex-col items-center justify-center"
      onClick={handleClick}
    >
      <Image
        src={destination.path}
        width="366"
        height="275"
        className="cursor-pointer object-cover w-full h-full rounded-2xl sm:w-auto sm:h-auto"
        alt={destination.name}
      />
       <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
       <div id="hover" className="text-center ">
      <span className="text-white text-[50px] 2xl:text-[70px]  font-bold font-[Fontdiner]">{destination.name}</span>
      </div>
    </div>
    </div>
  );
}

// return (
//   <div
//     className="relative shadow rounded-2xl overflow-hidden flex flex-col items-center justify-center cursor-pointer"
//     onClick={handleClick}
//   >
//     <Image
//       src={destination.path}
//       width="366"
//       height="275"
//       className="object-cover w-full h-full rounded-2xl"
//       alt={destination.name}
//     />
//     <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300">
//       <div className="text-center">
//               <span className="text-white text-[50px] 2xl:text-[70px]  font-bold font-[Fontdiner]">{destination.name}</span>
//         <span className="block text-white text-sm mt-2 font-normal">{destination.description}</span>
//       </div>
//     </div>
//   </div>
// );