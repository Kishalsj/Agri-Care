"use client";

import { useEffect, useState, useContext, useRef } from "react";
import { useRouter } from "next/navigation";
import cookieCutter from "cookie-cutter";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { FixedSizeList as List } from "react-window";
import { Progress } from "@chakra-ui/progress";

import { AuthContext } from "@/components/contexts/AuthContext";
import Modal from "@/components/common/Modal";
import ProgressBar from "@/components/common/ProgressBar";
import HotelSearch from "@/components/common/HotelSearch";
import HotelListingSort from "@/components/sections/hotel-listing/HotelListingSort";
import HotelListingFilter from "@/components/sections/hotel-listing/HotelListingFilter";
import HotelListingCard from "@/components/sections/hotel-listing/HotelListingCard";
import HotelListingCardSkeleton from "@/components/sections/hotel-listing/HotelListingCardSkeleton";
import AllHotelsMaps from "@/components/common/AllHotelsMap";
import HotelListingStaleModal from "@/components/sections/hotel-listing/HotelListingStaleModal";
import HotelListingPills from "@/components/sections/hotel-listing/HotelListingFilterPills";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export default function HotelListingPage({ searchParams }) {
  const { replace } = useRouter();
	//if user not login then keep policies and user star rating policy to 6 and max price policy to null
  const authContext = useContext(AuthContext);
  const user = authContext ? authContext[0] : null;
  const maxStarRatingPolicy = user ? user.star_rating_policy : 6;
  const maxPricePolicy = user ? user.max_price_policy : null;
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [hotelContentData, setHotelContent] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [isButtonFilterVisible, setIsButtonFilterVisible] = useState(true);
  const [noOfDays, setNoOfDays] = useState(0);
  const [noOfRooms, setNoOfRooms] = useState(0);
  const [isFetchingInitialData, setIsFetchingInitialData] = useState(false);
  const [isFetchingRateHawkData, setIsFetchingRateHawkData] = useState(false);
  const [fetchingProgress, setFetchingProgress] = useState(40);
  const [fetchingProgressText, setFetchingProgressText] = useState("");
  const [areRatesExpired, setAreRatesExpired] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    searchFilter: "",
    priceMinFilter: "",
    priceMaxFilter: "",
    starRatingFilter: [],
    refundableFilter: false,
    swimmingPoolFilter: false,
    internetFilter: false,
    parkingFilter: false,
    breakfastFilter: false,
    businessCenterFilter: false,
    barFilter: false,
    hotelFilter: false,
    villaFilter: false,
    resortFilter: false,
    houseFilter: false,
    palaceFilter: false,
    apartmentFilter: false,
    condoFilter: false,
    innFilter: false,
  });
  const [seenHotels, setSeenHotels] = useState(0);
  const [buttonVisible, setButtonVisible] = useState(false);
  const listRef = useRef(null);
  const [showBar, setShowBar] = useState(false);
  const [rates , setRates] = useState([]);

  const expirationTime = 15 * 60 * 1000; // 15 minutes
  const currency = "USD";
  const correlationId = `chkID${uuidv4()}`;
  const location = JSON.parse(searchParams.location);
  const checkIn = new Date(searchParams.checkIn);
  const checkOut = new Date(searchParams.checkOut);
  const dateSelected = [checkIn, checkOut];
  const occupancies = JSON.parse(searchParams.occupancies);
  let itemSize = 268;

  useEffect(() => {
    fetchHotelData({ location, dateSelected, occupancies });
    // Check if the code is running on the client
    setIsClient(true);
    // Event listener to update on window resize
    const handleResize = () => {
      setIsButtonFilterVisible(window.innerWidth < 1280); // Adjust the breakpoint as needed
    };

    // Initial update on mount
    handleResize();

    // Event listener to update on window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (typeof window !== "undefined") {
    itemSize = window.innerWidth <= 600 ? 580 : 268;
  }

  async function fetchHotelData({ location, dateSelected, occupancies }) {
    setShowBar(false);
    const [
      { hotelContent = [], availableHotels = [] },
      { availableNonRateHawkHotels = [] },
    ] = await Promise.all([
      fetchInitialData({ location, dateSelected, occupancies }),
      fetchNonRateHawkData({ location, dateSelected, occupancies }),
    ]);

    const mergedAvailableHotels = [
      ...availableHotels,
      ...availableNonRateHawkHotels,
    ];

    let hotels = [];

    for (const hotelContentItem of hotelContent) {
      const filteredAvailableHotels = mergedAvailableHotels.filter(
        (availableHotel) => {
          return parseInt(availableHotel.id) === parseInt(hotelContentItem.id);
        }
      );

      if (filteredAvailableHotels.length > 0) {
        const lowestRateHotel = filteredAvailableHotels.reduce(
          (lowestRate, hotel) => {
            if (hotel.rate.totalRate < lowestRate.rate.totalRate) {
              return hotel;
            }
            return lowestRate;
          },
          filteredAvailableHotels[0]
        );

        if (
          location.name.toLowerCase() != hotelContentItem.name.toLowerCase()
        ) {
          hotels.push({ ...lowestRateHotel, ...hotelContentItem });
        } else {
          hotels.unshift({ ...lowestRateHotel, ...hotelContentItem });
        }
      }
    }
    setHotels(hotels);
    setFilteredHotels(hotels);
    setFetchingProgress(60);
    setIsFetchingRateHawkData(false);
    setShowBar(true);

    // const reviews = await fetchReviews({ hotels });

    // hotels = hotels.map((hotel) => {
    //   const review = reviews?.find((review) => review.id === hotel.id);

    //   return { ...hotel, ...review };
    // });

    setHotels(hotels);
    setFilteredHotels(hotels);

    setTimeout(() => {
      setAreRatesExpired(true);
    }, expirationTime);
  }

  async function fetchInitialData({ location, dateSelected, occupancies }) {
    try {
      setIsFetchingInitialData(true);

      const checkinDate = new Date(dateSelected[0]);
      const checkoutDate = new Date(dateSelected[1]);

      // Formatting to YYYY-MM-DD
      const formattedCheckinDate = checkinDate.toISOString().substring(0, 10);
      const formattedCheckoutDate = checkoutDate.toISOString().substring(0, 10);


      const payload = {
        currency,
        correlationId,
        ipAddress: cookieCutter.get("ipAddress") ? cookieCutter.get("ipAddress") : "192.168.1.1",
        searchParams: {
          location,
          occupancies,
          startDate: formattedCheckinDate,
          endDate: formattedCheckoutDate,
        },
        max_starRating: maxStarRatingPolicy,
				max_Price: maxPricePolicy,
      };

      const [fetchHotelContentResponse, fetchAvailableHotelsResponse] =
        await Promise.all([
          fetchHotelContent(payload),
          fetchAvailableHotels(payload),
        ]);

      console.log("fetchHotelContentResponse",fetchHotelContentResponse)
      console.log("fetchAvailableHotelsResponse",fetchAvailableHotelsResponse)
      const { hotels: hotelContent } = fetchHotelContentResponse;
      const {
        hotels: availableHotels,
        noofdays,
        noofrooms,
      } = fetchAvailableHotelsResponse;
      
      const hotels = [];
      hotelContent.forEach((hotelContentInfo) => {
        const hotel = availableHotels.find(
          (availableHotel) => parseInt(availableHotel.id) === parseInt(hotelContentInfo.id)
        );

        if (hotel) {
          if (
            location.name.toLowerCase() != hotelContentInfo.name.toLowerCase()
          ) {
            hotels.push({ ...hotel, ...hotelContentInfo });
          } else {
            hotels.unshift({ ...hotel, ...hotelContentInfo });
          }
        }
      });
      console.log()
      setHotels(hotels);
      setFilteredHotels(hotels);
      setNoOfDays(noofdays);
      setNoOfRooms(noofrooms);

      return { hotelContent, availableHotels };
    } catch (error) {
      setHotels([]);
    } finally {
      setIsFetchingInitialData(false);
    }
  }

  async function fetchNonRateHawkData({ location, dateSelected, occupancies }) {
    let data = null;
    let startTime = Date.now();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOTEL_API_AXIOS_URL}/api/v1/hotels/availability`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currency,
            correlationId,
            ipAddress: cookieCutter.get("ipAddress") ? cookieCutter.get("ipAddress") : "192.168.1.1",
            searchParams: {
              location,
              occupancies,
              startDate: dateSelected[0],
              endDate: dateSelected[1],
            },
					  max_Price: maxPricePolicy,

          }),
        }
      );

      data = await response.json();

      while (data.status === "InProgress" && data.nextResultsKey) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        if (Date.now() - startTime > 5 * 60 * 1000) {
          // If it's been more than 5 minutes, exit the loop
          break;
        }

        let result = await fetchSucceedingAvailableHotels(data, {
          correlationId,
          ipAddress: cookieCutter.get("ipAddress") ? cookieCutter.get("ipAddress") : "192.168.1.1",
          noofdays: data.noofdays,
          noofrooms: data.noofrooms,
          totalRoomNights: data.totalRoomNights,
					max_Price: maxPricePolicy,
          
        });

        if (!result?.error) {
            data = {
              ...data,
              ...result,
              hotels: [...data.hotels, ...result.hotels],
            };

           setRates([...rates , ...data.hotels]);
        //   if(hotelContentData && hotelContentData.length > 0){

        //     const hotels = [];
        //     console.log("hotelContentData",hotelContentData);

        //     hotelContentData && hotelContentData.length > 0 && hotelContentData.forEach((hotelContentInfo) => {
        //       const hotel = data.find(
        //         (availableHotel) => availableHotel.id === hotelContentInfo.id
        //       );

        //       if (hotel) {
        //         if (
        //           location.name.toLowerCase() != hotelContentInfo.name.toLowerCase()
        //         ) {
        //           hotels.push({ ...hotel, ...hotelContentInfo });
        //         } else {
        //           hotels.unshift({ ...hotel, ...hotelContentInfo });
        //         }
        //       }
        //   });
        //   console.log("hotels",hotels);
        //   setHotels(hotels);
        //   setFilteredHotels(hotels);
        // }

        }

        setFetchingProgress((prev) => {
          const newValue = prev + 10;

          if (newValue < 90) {
            setFetchingProgressText(
              "Looking for better rates; negotiating with other suppliers and direct hoteliers..."
            );
          } else {
            setFetchingProgressText("Finalizing rates...");
          }

          if (newValue < 100) {
            return newValue;
          }

          return prev;
        });
      }

      return { availableNonRateHawkHotels: data.hotels };
    } catch (error) {
      console.log(`fetchNonRateHawkData: ${error}`);
      return { availableNonRateHawkHotels: data?.hotels || [] };
    }
  }

  async function fetchRateHawkData({ location, dateSelected, occupancies }) {
    let data = null;

    try {
      setIsFetchingRateHawkData(true);
      setFetchingProgressText("Getting the lowest prices...");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOTEL_API_AXIOS_URL}/api/v1/hotels/availability/rh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currency,
            correlationId,
            ipAddress: cookieCutter.get("ipAddress") ? cookieCutter.get("ipAddress") : "192.168.1.1",
            searchParams: {
              location,
              occupancies,
              startDate: dateSelected[0],
              endDate: dateSelected[1],
            },
					  max_Price: maxPricePolicy,

          }),
        }
      );

      data = await response.json();

      while (data.status === "InProgress" && data.nextResultsKey) {
        let result = await fetchSucceedingAvailableHotels(data, {
          correlationId,
          ipAddress: cookieCutter.get("ipAddress") ? cookieCutter.get("ipAddress") : "192.168.1.1",
          noofdays: data.noofdays,
          noofrooms: data.noofrooms,
          totalRoomNights: data.totalRoomNights,
					max_Price: maxPricePolicy,

        });

        if (!result?.error) {
          data = {
            ...data,
            ...result,
            hotels: [...data.hotels, ...result.hotels],
          };
        }

        setFetchingProgress((prev) => {
          const newValue = prev + 10;

          if (newValue < 90) {
            setFetchingProgressText(
              "Looking for better rates; negotiating with other suppliers and direct hoteliers..."
            );
          } else {
            setFetchingProgressText("Finalizing rates...");
          }

          if (newValue < 100) {
            return newValue;
          }

          return prev;
        });
      }

      return { availableRateHawkHotels: data.hotels };
    } catch (error) {
      console.log(`fetchRateHawkData: ${error}`);
      return { availableRateHawkHotels: data?.hotels || [] };
    }
  }

  async function fetchReviews({ hotels }) {
    try {
      const payload = {
        hotels: hotels.map((hotel, index) => ({
          id: hotel.id,
          hotelName: hotel.name,
          city: hotel.contact.address.city.name,
        })),
      };

      const response = await fetch(
        "https://reviews.checkins.ai/hotel_info_multiple",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   if(!showBar){
  //     const newHotels = hotelContentData.filter((hotelContentInfo) => {
  //       const hotel = rates.find(
  //         (availableHotel) => availableHotel.id === hotelContentInfo.id
  //       );

  //       if (hotel) {
  //         if (
  //           location.name.toLowerCase() != hotelContentInfo.name.toLowerCase()
  //         ) {
  //           return { ...hotel, ...hotelContentInfo };
  //         }
  //       }
  //     }
  //   );
  //     console.log("newHotels",newHotels);
  //     setHotels(newHotels);
  //     setFilteredHotels(newHotels);
  //   }
  // }, [rates,showBar]);

  async function fetchHotelContent(payload) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOTEL_API_AXIOS_URL}/api/v1/hotels/content/hotelcontent/getHotelContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      setHotelContent(data.hotels);
      return data;
    } catch (error) {
      console.error(`fetchHotelContent: ${error}`);
    }
  }

  async function fetchAvailableHotels(payload) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOTEL_API_AXIOS_URL}/api/v1/hotels/availability`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      setRates([...rates , ...data.hotels]);
      return data;
      // return response.json();
    } catch (error) {
      console.error(`fetchAvailableHotels: ${error}`);
    }
  }

  async function fetchSucceedingAvailableHotels(data, payload) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOTEL_API_AXIOS_URL}/api/v1/hotels/availability/async/${data.token}/${data.nextResultsKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      return response.json();
    } catch (error) {
      console.log(`fetchSucceedingAvailableHotels: ${error}`);
      return { error };
    }
  }

  function handleSearch(dateSelected, occupancies, location) {
    if (location === "") {
      toast.error("Please input your search criteria");

      return;
    }

    const params = new URLSearchParams({
      location: JSON.stringify(location),
      checkIn: dateSelected[0],
      checkOut: dateSelected[1],
      occupancies: JSON.stringify(occupancies),
    });

    replace(`hotel-listing?${params.toString()}`);

    fetchHotelData({ location, dateSelected, occupancies });

  }

  function handleSort(sortBy, filteredHotels) {
    setSortBy(sortBy);

    const sortedFilteredHotels = filteredHotels.sort((a, b) => {
      switch (sortBy) {
        case "priceAsc":
          return a?.rate?.dailyTotalRate - b?.rate?.dailyTotalRate;
        case "priceDesc":
          return b?.rate?.dailyTotalRate - a?.rate?.dailyTotalRate;
        case "saveAsc":
          return (
            b?.rate?.dailyPublishedRate -
            b?.rate?.dailyTotalRate -
            (a?.rate?.dailyPublishedRate - a?.rate?.dailyTotalRate)
          );
        case "relevanceAsc":
          return b?.relevanceScore - a?.relevanceScore;
        case "relevanceDesc":
          return a?.relevanceScore - b?.relevanceScore;
        default:
          return 0;
      }
    });

    setFilteredHotels(sortedFilteredHotels);
  }

  function handleSelectedFilters(selectedFilters) {
    const {
      searchFilter,
      priceMinFilter,
      priceMaxFilter,
      starRatingFilter,
      refundableFilter,
      swimmingPoolFilter,
      internetFilter,
      parkingFilter,
      breakfastFilter,
      businessCenterFilter,
      barFilter,
      hotelFilter,
      villaFilter,
      resortFilter,
      houseFilter,
      palaceFilter,
      apartmentFilter,
      condoFilter,
      innFilter,
    } = selectedFilters;

    setSelectedFilters(selectedFilters);

    let filteredHotels = hotels.filter((hotel) => {
      // apply name filter
      if (
        searchFilter !== "" &&
        !hotel?.name?.toLowerCase().includes(searchFilter?.toLowerCase())
      ) {
        return false;
      }

      // apply price range filter
      if (
        priceMinFilter !== "" &&
        hotel?.rate?.dailyTotalRate <= parseInt(priceMinFilter)
      ) {
        return false;
      }

      if (
        priceMaxFilter !== "" &&
        hotel?.rate?.dailyTotalRate >= parseInt(priceMaxFilter)
      ) {
        return false;
      }

      // apply star rating filter
      if (
        starRatingFilter?.length > 0 &&
        !starRatingFilter?.includes(hotel?.starRating)
      ) {
        return false;
      }

      // apply refundable filter
      if (refundableFilter && !hotel?.options?.refundable) {
        return false;
      }

      // apply amenities filter
      if (
        swimmingPoolFilter &&
        !hotel.facilityGroups.some(
          (facilityGroup) => facilityGroup.name === "Swimming Pool"
        )
      ) {
        return false;
      }

      if (
        internetFilter &&
        !hotel.facilityGroups.some(
          (facilityGroup) => facilityGroup.name === "Internet"
        )
      ) {
        return false;
      }

      if (
        parkingFilter &&
        !hotel.facilityGroups.some(
          (facilityGroup) => facilityGroup.name === "Parking"
        )
      ) {
        return false;
      }

      if (
        breakfastFilter &&
        !hotel.facilityGroups.some(
          (facilityGroup) => facilityGroup.name === "Breakfast"
        )
      ) {
        return false;
      }

      if (
        businessCenterFilter &&
        !hotel.facilityGroups.some(
          (facilityGroup) => facilityGroup.name === "Business Center"
        )
      ) {
        return false;
      }

      if (
        barFilter &&
        !hotel.facilityGroups.some(
          (facilityGroup) => facilityGroup.name === "Bar"
        )
      ) {
        return false;
      }

      // apply type filter
      if (hotelFilter && hotel?.type !== "Hotel" && hotel?.type !== "") {
        return false;
      }

      if (houseFilter && hotel?.type !== "House") {
        return false;
      }

      if (villaFilter && hotel?.type !== "Villa") {
        return false;
      }

      if (resortFilter && hotel?.type !== "Resort") {
        return false;
      }

      if (palaceFilter && hotel?.type !== "Palace") {
        return false;
      }

      if (apartmentFilter && hotel?.type !== "Apartment") {
        return false;
      }

      if (condoFilter && hotel?.type !== "Condo") {
        return false;
      }

      if (innFilter && hotel?.type !== "Inn") {
        return false;
      }

      return true;
    });

    if (sortBy !== "") {
      handleSort(sortBy, filteredHotels);
    }

    setFilteredHotels(filteredHotels);
  }

  const HotelListItem = ({ index, style }) => {
    return (
      <div style={{ ...style, marginBottom: "16px" }}>
        <HotelListingCard
          key={index}
          hotel={filteredHotels[index]}
          noOfDays={noOfDays}
          noOfRooms={noOfRooms}
          isFetchingRateHawkData={isFetchingRateHawkData}
          dateSelected={dateSelected}
          occupancies={occupancies}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-1 flex-col mx-auto  w-full xl:w-10/12">
      <HotelListingStaleModal isOpen={areRatesExpired} />
      <div className="flex justify-center mt-3">
        <HotelSearch
          checkIn={new Date(checkIn)}
          checkOut={new Date(checkOut)}
          locationInitialValue={location}
          occupanciesInitialValue={occupancies}
          isHotelListPage={true}
          handleSearch={handleSearch}
        />
      </div>
      {showBar === false ? (
          <div className="font-Montserrat container w-full px-1 mx-auto  ">
            <Progress
              height="11px"
              isIndeterminate
              speed={0.5}
              transition="ease-in-out"
            />
          </div>
        ) : (
          ""
        )}
      <div className="flex flex-col pt-4 xl:flex-row xl:flex-1 xl:space-x-4 space-y-4 xl:space-y-0 ">
        <div className="flex-row w-full xl:w-1/4 xl:bg-gray-100 rounded-2xl p-4 xl:space-y-4 self-center xl:self-auto">
          {isClient && isButtonFilterVisible ? (
            <div className="flex flex-row justify-between">
              <Modal
                cancelText="Close"
                trigger={
                  <button className="bg-[#F6F8F9] shadow-lg px-4 py-2 rounded-md text-[#002248] flex flex-row gap-2 items-center">
                    View Map
                  </button>
                }
              >
                <AllHotelsMaps
                  currency={currency}
                  hotels={filteredHotels}
                  lat={location.coordinates.lat}
                  lng={location.coordinates.long}
                  noOfDays={noOfDays}
                  noOfRooms={noOfRooms}
                  origin="all-hotels-maps"
                />
              </Modal>
              <Modal
                cancelText="Close"
                trigger={
                  <button
                    className="bg-[#F6F8F9] shadow-lg px-4 py-2 rounded-md text-[#002248] flex flex-row gap-2 items-center"
                    aria-describedby="Hotel Listing Filter"
                  >
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 16.1001L5 14.0001M5 4.9001L5 11.2001"
                        stroke="#1C274C"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M15 4.8999L15 6.9999M15 16.0999L15 9.7999"
                        stroke="#1C274C"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M10 16.1001L10 14.0001L10 4.9001"
                        stroke="#1C274C"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                    Filters
                  </button>
                }
              >
                <div className="p-12 max-h-screen overflow-y-auto">
                  <HotelListingFilter
                    hotels={hotels}
                    filteredHotels={filteredHotels}
                    selectedFilters={selectedFilters}
                    handleSelectedFilters={handleSelectedFilters}
                  />
                </div>
              </Modal>

              <Modal
                cancelText="Close"
                trigger={
                  <button
                    className="bg-[#F6F8F9] shadow-lg px-4 py-2 rounded-md text-[#002248] flex flex-row gap-2 items-center"
                    aria-describedby="Hotel Listing Sort"
                  >
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 16.1001L5 14.0001M5 4.9001L5 11.2001"
                        stroke="#1C274C"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M15 4.8999L15 6.9999M15 16.0999L15 9.7999"
                        stroke="#1C274C"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M10 16.1001L10 14.0001L10 4.9001"
                        stroke="#1C274C"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                    Sort By
                  </button>
                }
              >
                <HotelListingSort
                  filteredHotels={filteredHotels}
                  sortBy={sortBy}
                  handleSort={handleSort}
                />
              </Modal>
            </div>
          ) : (
            /* displays in bigger screen size */
            <>
              <AllHotelsMaps
                currency={currency}
                hotels={filteredHotels}
                lat={location.coordinates.lat}
                lng={location.coordinates.long}
                noOfDays={noOfDays}
                noOfRooms={noOfRooms}
                origin="all-hotels-maps"
              />
              <HotelListingFilter
                hotels={hotels}
                filteredHotels={filteredHotels}
                selectedFilters={selectedFilters}
                handleSelectedFilters={handleSelectedFilters}
              />
            </>
          )}
        </div>

        {isFetchingInitialData ? (
          <HotelListingCardSkeleton />
        ) : (
          <div className="bg-gray-100 rounded-2xl p-4 xl:mx-0 xl:w-3/4 w-full space-y-4 xl:self-auto">
            <div className="flex flex-col space-y-1 h-[52px] justify-center">
              {/* {isFetchingRateHawkData && (
                <>
                  <ProgressBar completed={fetchingProgress.toFixed(1)} />
                  <div className="font-bold flex justify-center">
                    {fetchingProgressText}
                  </div>
                </>
              )} */}
              {!isFetchingRateHawkData &&
                !isFetchingInitialData &&
                filteredHotels.length > 0 && (
                  <div className="flex flex-1 justify-between xl:space-x-4 h-[35px] xl:h-[52px]">
                    <div className="font-bold flex justify-start items-center md:text-md flex-2 xl:p-4 p-2 bg-white rounded-xl shadow xl:min-w-28">
                      {filteredHotels.length} Hotels
                    </div>

                    {Array.isArray(hotels) &&
                        hotels.length > 0 && (
                          <span className="xl:p-4 p-2 text-[15px]">
                          </span>
                        )}
                    <HotelListingPills
                      selectedFilters={selectedFilters}
                      handleSelectedFilters={handleSelectedFilters}
                    />

                    <div className="hidden xl:flex h-full m-0">
                      <div className="hidden xl:flex flex-1">
                        <HotelListingSort
                          filteredHotels={filteredHotels}
                          sortBy={sortBy}
                          handleSort={handleSort}
                        />
                      </div>
                    </div>
                  </div>
                )}
            </div>
            <div className="space-y-4 relative">
              <List
                  height={1500}
                  itemCount={filteredHotels.length}
                  itemSize={itemSize}
                  onItemsRendered={({ visibleStartIndex, visibleStopIndex}) => {
                    if (visibleStartIndex === 0) {
                      setButtonVisible(false);
                    } else {
                      setButtonVisible(true);
                    }
                    setSeenHotels(visibleStartIndex + 1);
                  }}
                  ref={listRef}
                >
                  {HotelListItem}
              </List>
            </div>
            <div class="w-30 h-10 bottom-10 left-[50%] text-center sticky">
                {buttonVisible && 
                  <button className="bg-[#1893F8] rounded-full hover:bg-[#1893F8] text-white opacity-75 px-4 py-2 block mx-auto" 
                  onClick={() => {
                    listRef.current.scrollToItem(0);
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth'
                    })
                  }}>
                  Back To Top
                </button>
                }
            </div>
            <div class="w-20 h-20 right-10 top-[30%] fixed">
              <CircularProgressbarWithChildren
                styles={buildStyles({ pathColor: '#1D1A4E', textSize:'16px', textColor: 'black'})} 
                value={seenHotels} 
                maxValue={filteredHotels.length} 
                strokeWidth="15"
              >
                <strong style={{fontSize: 20}}>{seenHotels}</strong>
                <div style={{ fontSize: 12, marginTop: -2 }}>
                  <p>{filteredHotels.length}</p>
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
