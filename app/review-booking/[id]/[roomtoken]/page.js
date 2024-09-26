"use client";
import React, { useEffect, useState, useRef, useContext } from "react";
import { FaTripadvisor } from "react-icons/fa";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import moment from "moment";
import cookie from "cookie-cutter";
import { useRouter } from "next/navigation"; // useHistory -> useRouter
import Image from "next/image";
import Modal from "@/components/common/Modal";
import StarRating from "@/components/common/StarRating";
import HotelPayment from "@/components/sections/review-booking/ReviewBookingHotelPayment";
import AmenityList from "@/components/sections/review-booking/ReviewBookingAmenityList";
import { HotelContext } from "@/components/contexts/HotelContext";
import { AuthContext } from "@/components/contexts/AuthContext";
import BackArrow from "@/public/svg/backarrow";

import BookingSteps from "./BookingSteps";
import ParkingCard from "../../BookingExtrasCardsParking";
import LiquorCard from "../../BookingExtrasCardsLiquor";
import PetsCard from "../../BookingExtrasCardsPets";
import { toast } from "react-toastify";
import ReviewBookingInfo from "@/components/sections/review-booking/ReviewBookingInfo";
import ReviewBookingConfirmation from "@/components/sections/review-booking/ReviewBookingConfirmation";

const DateConversion = ({ date }) => {
  // Convert the date to a Moment.js object
  const momentDate = moment(date);

  // Format the date as desired without affecting time zones
  const formattedDate = momentDate.format("ddd, D MMM YYYY");

  return formattedDate;
};

function Cancellation({ cancellationPolicy, currency }) {
  return (
    <Modal
      headerText="Cancellation Policy"
      cancelText="Close"
      trigger={
        <button className="text-[12px] text-blue-600 hover:underline ">
          View Booking & Cancellation Policy
        </button>
      }
    >
      <div className="w-full gap-3 mt-3">
        <table className="flex flex-col rounded-lg overflow-hidden border border-solid border-[#5C6A7A] mb-[30px] w-full text-[#5C6A7A]">
          <thead>
            <tr className="flex flex-row bg-[#5C6A7A] px-3 py-2 bg-opacity-10 justify-between text-[#002248] font-bold ">
              <th className="w-1/3 text-center border-none">From</th>
              <th className="w-1/3 text-center border-none">To</th>
              <th className="w-1/3 text-center border-none">Amount</th>
            </tr>
          </thead>
          <tbody className="flex flex-col max-h-[200px] overflow-y-scroll">
            {cancellationPolicy[0]?.rules &&
              cancellationPolicy[0]?.rules.map((policy, index) => {
                const startDate = moment(policy?.start).format("MMM DD YYYY");
                const endDate = moment(policy?.end).format("MMM DD YYYY");
                const rate = policy && policy.value && Math.ceil(policy.value);
                const estimatedValue =
                  policy && policy.estimatedValue && Math.ceil(policy.estimatedValue);

                return (
                  <tr
                    key={index}
                    className="flex flex-row text-left justify-between items-center border-b-0 last-of-type:border-b-0 p-3"
                  >
                    <td className="w-1/3 text-center border-none">{startDate}</td>
                    <td className="w-1/3 text-center border-none">{endDate}</td>
                    <td className="w-1/3 text-center border-none">
                      {rate === 0 ? (
                        "Free"
                      ) : (
                        <>
                          {currency === "USD"
                            ? "$"
                            : currency === "EUR"
                            ? "€"
                            : currency === "GBP"
                            ? "£"
                            : ""}
                          {policy && policy.valueType === "Amount"
                            ? rate
                            : policy.valueType === "Percentage"
                            ? `${estimatedValue} (${rate}%)`
                            : ""}
                        </>
                      )}

                      {/* <span>(approx. Value {policy?.estimatedValue})</span> */}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}

const TotalSavings = ({ totalRate, PublishedRate }) => {
  const saving = PublishedRate - totalRate;

  const savingnumber = Math.ceil(saving);

  let savingamountcheck;
  if (savingnumber > 0) {
    savingamountcheck = savingnumber;
  } else {
    savingamountcheck = 0;
  }

  return savingamountcheck;
};

function generateBookingID() {
  const timestamp = Date.now().toString();
  const uniqueId = `chk-${timestamp}`;
  return uniqueId;
}


export default function ReviewBookingPage({ params }) {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(''); // To track selected payment method
  const [currentBill, setCurrentBill] = useState('payment'); // Track which bill is visible

  const handlePayNow = () => {
    if (selectedPaymentMethod) {
      // Show success toast notification
      toast.success("Payment successful!");

      // Close popup after a delay
      setTimeout(() => {
        setIsPopupOpen(false);
        setCurrentStep(4);
      }, 3000); // 3 seconds
    } else {
      // Show error toast notification
      toast.error("Please select a payment method.");
    }
  };



  const router = useRouter();
  function handleGoBack() {
    router.back();
  }

  useEffect(() => {
    document.title = "Checkins.ai Payment";
  }, []);

  const [totalSaving, setTotalSaving] = useState(null);

  const [hotelDetails] = useContext(HotelContext);

  const {
    hotelInfo = {},
    rateInfo = {},
    roomInfo = {},
    recID = {},
    dailyTotalRate,
    checkIn,
    checkOut,
  } = hotelDetails;

  const [userDetails] = useContext(AuthContext) || [{}]

  if (!hotelDetails || Object.keys(hotelDetails).length === 0) {
    history.back();
  }

  useEffect(() => {
    if (!hotelDetails || Object.keys(hotelDetails).length === 0) {
      history.back();
    }

    fetch(`${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/reviewPageCount`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response;
      })
      .then((data) => {
        console.log("updated");
      })
      .catch((error) => {
        console.error("Error fetching reviewPageCount:", error);
      });

  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const isAuthenticated = cookie.get("isAuthenticated");
    setIsAuthenticated(isAuthenticated === "true" ? true : false);
  }, []);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [line1, setLine1] = useState("");
  const [value, setValue] = React.useState();
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("United States");
  const [postalCode, setPostalCode] = useState("");
  const [email, setEmail] = useState("");
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isFirstNameValid, setIsFirstNameValid] = useState(false);
  const [isLastNameValid, setIsLastNameValid] = useState(false);
  const [isLine1Valid, setIsLine1Valid] = useState(false);
  const [isCityValid, setIsCityValid] = useState(false);
  const [isStateValid, setIsStateValid] = useState(false);
  const [isCountryValid, setIsCountryValid] = useState(false);
  const [isPostalCodeValid, setIsPostalCodeValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [userId, setUserId] = React.useState(null);
  const [totalWthMember, setTotalWthMember] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const sortOrderIndexMap = new Map();
  const [endDate, setEndDate] = useState(new Date());
  const [mapLoaded, setMapLoaded] = useState(false);
  const [paymentIs, setPaymentIs] = useState(false);
  const [couponDetails, setCouponDetails] = useState(null);
  const [ratings, setReviews] = useState(null);
  const [BookingConfirmed, setBookingConfirmedOnParent] = useState(false);
  const [BookingFailed, setBookingFailedOnParent] = useState(false);
  const [bookingLoaded, setBookingLoaded] = useState(false);
  let autoComplete;
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);
  const [title, setTitle] = useState("Mr");

  const [formData, setFormData] = useState({
    occupancies: [
      {
        numOfAdults: 1,
        childAges: [],
      },
    ],
  });
  const [isUserAddress, setIsUserAddress] = useState(false);
  const bookingID = generateBookingID(); // Generate a new booking ID

  useEffect(() => {
    window.onload = () => {
      setMapLoaded(true);
    };
  }, []);

  const billingData = {
    firstname: firstName,
    lastName: lastName,
    line1: line1,
    city: city,
    country: country,
    email: email,
    value: value,
  };

  useEffect(() => {
    const paramsCookies = cookie.get("searchParams");
    if (paramsCookies) {
      const searchParams = JSON.parse(paramsCookies) || {};
      if (searchParams && Object.keys(searchParams).length > 0) {
        setFormData({
          occupancies: searchParams.occupancies,
        });
      }
    }

    if (checkIn && checkOut) {
      const formattedCheckOutDate = moment(checkOut).format("ddd, D MMM YYYY");
      const formattedCheckInDate = moment(checkIn).format("ddd, D MMM YYYY");

      setEndDate(formattedCheckOutDate);
      setStartDate(formattedCheckInDate);
    }
  }, []);

  const numofoccupanice = rateInfo.reduce((accumulator, details) => {
    details.occupancies.forEach((occupancy) => {
      accumulator += parseInt(occupancy.numOfAdults);
    });
    return accumulator;
  }, 0);

  const numofchild = rateInfo.reduce((accumulator, details) => {
    details.occupancies.forEach((occupancy) => {
      accumulator += parseInt(occupancy.numOfChildren);
    });
    return accumulator;
  }, 0);

  let otherRateComponentAmount = 0;
  const totalRates = rateInfo.map((details) => details.totalRate);
  let totalWithoutServiceCharge = totalRates.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  let total = totalRates.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  rateInfo.forEach((details) => {
    if(details.otherRateComponents && details.otherRateComponents.length > 0) {
      details.otherRateComponents.forEach((component) => {
          if (component.amount > 0) {
            // If the amount is positive, add it to the total
            otherRateComponentAmount += component.amount;
          } else {
            // If the amount is negative, convert it to positive and add to the total
            otherRateComponentAmount += Math.abs(component.amount);
          }
      });
    }
  });
  const PublishedRate = rateInfo.map((details) => details.baseRate);
  const totalRate = PublishedRate.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const date1 = moment(startDate);
  const date2 = moment(endDate);
  const differenceInDays = date2.diff(date1, "days");
  const hotelId = hotelInfo.id;
  const rateId = [];
  rateInfo.map((item) => rateId.push(item.id));
  const occupanciesFromApi = [];
  rateInfo.forEach((details) => {
    details.occupancies.forEach((occupancy) => {
      occupanciesFromApi.push(occupancy);
    });
  });

  formData.occupancies.forEach((item, index) => {
    sortOrderIndexMap.set(JSON.stringify(item), index);
  });

  occupanciesFromApi.sort((a, b) => {
    const indexA = sortOrderIndexMap.get(JSON.stringify(a));
    const indexB = sortOrderIndexMap.get(JSON.stringify(b));

    if (indexA !== undefined && indexB !== undefined) {
      return indexA - indexB;
    } else if (indexA !== undefined) {
      return -1;
    } else if (indexB !== undefined) {
      return 1;
    }

    return 0;
  });

  const [occupancies, setOccupancies] = useState(occupanciesFromApi);
  const [roomsAllocations, setRoomsAllocations] = useState(() => {
    return occupanciesFromApi.map((occupancy, index) => {
      const numOfAdults = parseInt(occupancy.numOfAdults);
      const numOfChildren = parseInt(occupancy.numOfChildren);
      const guests = [];
      // Find the corresponding occupancy in singleroom array
      const matchingRoom = hotelDetails.rateInfo.find(room => room.occupancies.some(o => o.roomId === occupancy.roomId));

      // Use the rateId if found, otherwise use a default value (you may adjust as needed)
      const rateIdsngle = matchingRoom ? matchingRoom.id : rateId[0];
      // Assign "adult" type to the first numOfAdults guests
      for (let i = 0; i < numOfAdults; i++) {
        guests.push({
          type: "Adult",
          title: "",
          firstname: "",
          lastname: "",
          middlename: "",
          suffix: "",
          age: 24,
          email: "",
        });
      }

      // Assign "child" type to the remaining numOfChildren guests
      for (let i = 0; i < numOfChildren; i++) {
        guests.push({
          type: "Child",
          title: "",
          firstname: "",
          lastname: "",
          middlename: "",
          suffix: "",
          age: parseInt(occupancy.childAges[i] || 0),
          email: "",
        });
      }

      return {
        roomid: occupancy.roomId,
        rateid: rateIdsngle,
        guests: guests,
      };
    });
  });

  const handleGuestChange = (roomIndex, guestIndex, field, value) => {
    const updatedRoomsAllocations = [...roomsAllocations];
    const updatedGuest = {
      ...updatedRoomsAllocations[roomIndex].guests[guestIndex],
      [field]: value,
    };

    updatedRoomsAllocations[roomIndex].guests[guestIndex] = updatedGuest;
    setRoomsAllocations(updatedRoomsAllocations);
  };

  const renderGuestInputs = (roomIndex) => {
    const guestInputs = [];
    let child = 1;
    for (let i = 0; i < roomsAllocations[roomIndex].guests.length; i++) {
      const guest = { ...roomsAllocations[roomIndex].guests[i] };
      guestInputs.push(
        <div key={i} className="mt-3">
          <span className="text-[#002248] text-[18px] mt-[15px]  font-bold">
            {roomIndex === 0 && i === 0
              ? "Lead Guest"
              : roomsAllocations[roomIndex].guests[i].type === "adult"
              ? "Other Guest(s)"
              : roomsAllocations[roomIndex].guests[i].type === "child"
              ? `Child ${child}, Age ${roomsAllocations[roomIndex].guests[i].age}`
              : "Details"}
          </span>
          <div className="flex justify-around w-full gap-3.5 flex-col md:flex-row ">
            <div className="flex w-full flex-row gap-2">
              <div className="flex lg:w-[15%] w-full flex-col ">
                <label className="text-[#697687] text-[12px]">Title</label>
                <select
                  className="border w-full md:w-auto h-10 border-gray-300 rounded-md px-2 py-2 focus:border-gray-300"
                  value={guest.title}
                  onChange={(event) => handleGuestChange(roomIndex, i, "title", event.target.value)}
                >
                  <option value="mr">Mr</option>
                  <option value="mrs">Mrs</option>
                  <option value="miss">Miss</option>
                </select>
              </div>
              <div className="flex lg:w-[85%] justify-around w-full gap-3.5 flex-col md:flex-row ">
                <div className="flex flex-col w-full md:w-1/2">
                  <label className="text-[#697687] text-[12px]">First Name</label>
                  <input
                    value={guest.firstname}
                    onChange={(event) => {
                      handleGuestChange(roomIndex, i, "firstname", event.target.value);
                      if (roomIndex === 0 && i === 0) setFirstName(event.target.value);
                    }}
                    type="text"
                    className="border w-full border-gray-300 capitalize rounded-md px-2 py-2 focus:border-gray-300"
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/2 ">
                  <label className="text-[#697687] text-[12px]">Last Name</label>
                  <input
                    value={guest.lastname}
                    onChange={(event) => {
                      if (roomIndex === 0 && i === 0) setLastName(event.target.value);
                      handleGuestChange(roomIndex, i, "lastname", event.target.value);
                    }}
                    type="text"
                    className="border w-full border-gray-300 capitalize rounded-md px-2 py-2 focus:border-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    child++;
    return guestInputs;
  };

  const renderRoomInputs = () => {
    const roomInputs = [];
    for (let i = 0; i < occupancies.length; i++) {
      const occupancy = occupancies[i];
      const roomIndex = i + 1;
      roomInputs.push(
        <div key={occupancy.roomId} className="space-y-3 mt-5 mb-6">
          <span className="text-[#002248] mb-3 text-[22px] mt-[10px]  font-bold">
            Room {roomIndex} Guests
          </span>

          {renderGuestInputs(i)}
        </div>
      );
    }
    return roomInputs;
  };

  const body = {
    rateIds: rateId,
    bookingRefId: bookingID,
    specialRequests: null,
    roomsAllocations: roomsAllocations,
    billingContact: {
      title: title,
      firstName: firstName,
      lastName: lastName,
      middleName: "",
      suffix: "",
      age: 24,
      contact: {
        phone: value,
        address: {
          line1: line1,
          line2: "",
          city: {
            name: city,
            code: "",
          },
          state: {
            name: state,
            code: "",
          },
          country: {
            name: country,
            code: "",
          },
          postalCode: postalCode,
        },
        email: email,
      },
    },
    creditCard: null,
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !(
        isTitleValid &&
        isFirstNameValid &&
        isLastNameValid &&
        isEmailValid &&
        isLine1Valid &&
        isCityValid &&
        isStateValid &&
        isCountryValid &&
        isPostalCodeValid
      )
    ) {
      console.log("Invalid entry");
      setIsTitleValid(!!title);
      setIsFirstNameValid(!!firstName);
      setIsLastNameValid(!!lastName);
      setIsEmailValid(!!email);
      setIsLine1Valid(!!line1);
      setIsCityValid(!!city);
      setIsStateValid(!!state);
      setIsCountryValid(!!country);
      setIsPostalCodeValid(!!postalCode);

      const firstInvalidField = document.querySelector(".border-red-500");
      if (firstInvalidField) {
        firstInvalidField.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setPaymentIs(true);
      if (isUserAddress) {
        userLocationUpdate();
      }
    }
  };

  const loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState === "loaded" || script.readyState === "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  function handleScriptLoad(updateQuery, autoCompleteRef) {
    autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {
      types: ["address"],
    });
    autoComplete.setFields(["address_components", "formatted_address"]);
    autoComplete.addListener("place_changed", () => handlePlaceSelect(updateQuery));
    autoCompleteRef.current.classList.add("autocomplete-input");
  }

  async function handlePlaceSelect(updateQuery) {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    const addressComponents = addressObject.address_components;
    const cityComponent = addressComponents.find((component) =>
      component.types.includes("administrative_area_level_2")
    );
    const localityComponent = addressComponents.find((component) =>
      component.types.includes("locality")
    );
    const stateComponent = addressComponents.find((component) =>
      component.types.includes("administrative_area_level_1")
    );
    const countryComponent = addressComponents.find((component) =>
      component.types.includes("country")
    );
    const postalCodeComponent = addressComponents.find((component) =>
      component.types.includes("postal_code")
    );
    const city = cityComponent
      ? cityComponent.long_name === "Santa Clara County"
        ? localityComponent.long_name
        : cityComponent.long_name
      : "";
    const country = countryComponent ? countryComponent.long_name : "";
    const state = stateComponent ? stateComponent.long_name : "";
    const postalcode = postalCodeComponent ? postalCodeComponent.long_name : "";

    setCity(city);
    setCountry(country);
    setState(state);
    setPostalCode(postalcode);
    updateQuery(query);
    setLine1(query);
  }

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyAW_PMwz5G2neE_lOW5C8DXz-Cb3d9RLB8&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  useEffect(() => {
    if (userDetails) {
      getUserData();
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setLine1("");
      setValue("");
      setUserId(null);
      handleGuestChange(0, 0, "firstname", "");
      handleGuestChange(0, 0, "lastname", "");
    }
  }, [isAuthenticated]);

  let getUserDataCount = 0;
  const getUserData = async () => {
    try {
      setFirstName(userDetails.firstName ? userDetails.firstName : "");
      setIsFirstNameValid(userDetails.firstName ? true : false);

      setLastName(userDetails.lastName ? userDetails.lastName : "");
      setIsLastNameValid(userDetails.lastName ? true : false);

      setEmail(userDetails.email ? userDetails.email : "");
      setIsEmailValid(userDetails.email ? true : false);

      setLine1(userDetails.address ? userDetails.address : "");
      setIsLine1Valid(userDetails.address ? true : false);

      setValue(userDetails.phone ? userDetails.phone : null);

      setCity(userDetails.city ? userDetails.city : "");
      setIsCityValid(userDetails.city ? true : false);

      setState(userDetails.state ? userDetails.state : "");
      setIsStateValid(userDetails.state ? true : false);

      setPostalCode(userDetails.postal_code ? userDetails.postal_code : "");
      setIsPostalCodeValid(userDetails.postal_code ? true : false);

      setCountry(userDetails.country ? userDetails.country : "");
      setIsCountryValid(userDetails.country ? true : false);

      if (
        userDetails.address &&
        userDetails.city &&
        userDetails.state &&
        userDetails.postal_code &&
        userDetails.country
      ) {
        setIsUserAddress(true);
      }

      setUserId(userDetails.id);
      const commonFirstName = userDetails.firstName ? userDetails.firstName : "";
      const commonLastName = userDetails.lastName ? userDetails.lastName : "";
      const updatedRoomsAllocations = roomsAllocations.map((room) => {
        const updatedGuests = room.guests.map((guest) => ({
          ...guest,
          firstname: commonFirstName,
          lastname: commonLastName,
        }));
        return {
          ...room,
          guests: updatedGuests,
        };
      });

      setRoomsAllocations(updatedRoomsAllocations);

    } catch (error) {
      if (getUserDataCount < 3) {
        getUserDataCount++;
        getUserData();
      }
    }
  };

  useEffect(() => {
      setTotalWthMember(total);
     
  }, [total, isAuthenticated]);


  const userLocationUpdate = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/user/userLocation/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            city: city,
            state: state,
            country: country,
            postal_code: postalCode,
            address: line1,
            email: email,
          }),
        }
      );
      if (response.status === 200) {
        console.log(response);
        // toast.success("User Location Updated");
      } else {
        console.error("Failed to update user location");
        // toast.error("Failed to update user location");
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.error);
      // Handle error, e.g., show an error message to the user
    }
  };

  function formatCurrency(currency) {
    let symbol = "";

    switch (currency) {
      case "USD":
        symbol = "$";
        break;
      case "EUR":
        symbol = "€";
        break;
      case "GBP":
        symbol = "£";
        break;
      // Add more cases as needed

      // Default case if the currency is not recognized
      default:
        symbol = "";
    }
    return `${symbol}`;
  }

  const requestFormat = {
		bookingID : bookingID,
		bookingDetailsPayload : body,
		billingData : billingData,
		totalRate : Math.ceil(total),
		Amount : Math.ceil(totalWthMember),
		couponDetails : couponDetails,
		totalSaving : Math.ceil(totalSaving),
		hotelInfo : hotelInfo,
		rateInfo : rateInfo,
		roomInfo : roomInfo,
		startDate : startDate ,
		endDate : endDate,
		hotelId : hotelId,
		numofoccupanice : numofoccupanice,
		taxes : Math.ceil(otherRateComponentAmount),
		rooms : formData.occupancies.length,
		numofchild : numofchild,
		nights : differenceInDays,
		baseRate : Math.ceil(totalRate),
    userId : userId,
    roomsAllocations: roomsAllocations,
    providerWebsite : "CheckinsAI"
	}

  const [currentStep, setCurrentStep] = useState(2);

  console.log(rateInfo[0])

  return (
    <>
      <div className="border-1 md:border-t-2 container lg:w-[1350px] md:w-auto flex flex-col-reverse items-center mx-auto space-y-0 md:space-y-0 md:flex-row"></div>
      <section id="hero" className="bg-gray-50 font-homepage  mb-[20px]">
      
        <div className="container mb-20 flex flex-col px-4 w-full lg:w-10/12 mx-auto mt-0 space-y-4 md:space-y-6">
          {!BookingConfirmed ? (
            <button onClick={handleGoBack} className="flex space-x-2 mt-4">
              <div className="flex-none mt-[7px]">
                <BackArrow />
              </div>
              <div className="flex-none mt-0">
                <span className="text-l  md:text-[20px] text-bluedark md:text-left font-Montserrat font-bold">
                  Review your Booking
                </span>
              </div>
            </button>
          ) : (
            <span className="text-l font-[600] md:text-[17px] text-bluedark md:text-left">
              Booking Details
            </span>
          )}

          <BookingSteps currentStep={currentStep} />
          
        </div>
       {/* Bill Section (Price Summary) */}
        {currentStep === 2 && <ReviewBookingInfo 
                                hotelDetails={hotelDetails}
                                hotelInfo={hotelInfo}
                                ratings={ratings}
                                BookingConfirmed={BookingConfirmed}
                                paymentIs={paymentIs}
                                handleSubmit={handleSubmit}
                                renderRoomInputs={renderRoomInputs}
                                setTitle={setTitle}
                                setIsTitleValid={setIsTitleValid}
                                title={title}
                                firstName={firstName}
                                setFirstName={setFirstName}
                                setIsFirstNameValid={setIsFirstNameValid}
                                isFirstNameValid={isFirstNameValid}
                                lastName={lastName}
                                setLastName={setLastName}
                                setIsLastNameValid={setIsLastNameValid}
                                isLastNameValid={isLastNameValid}
                                email={email}
                                setEmail={setEmail}
                                setIsEmailValid={setIsEmailValid}
                                isEmailValid={isEmailValid}
                                setLine1={setLine1}
                                setIsLine1Valid={setIsLine1Valid}
                                line1={line1}
                                isLine1Valid={isLine1Valid}
                                city={city}
                                setIsCityValid={setIsCityValid}
                                setCity={setCity}
                                isCityValid={isCityValid}
                                state={state}
                                setState={setState}
                                setIsStateValid={setIsStateValid}
                                isStateValid={isStateValid}
                                country={country}
                                setIsCountryValid={setIsCountryValid}
                                setCountry={setCountry}
                                isCountryValid={isCountryValid}
                                postalCode={postalCode}
                                isPostalCodeValid={isPostalCodeValid}
                                setIsPostalCodeValid={setIsPostalCodeValid}
                                setPostalCode={setPostalCode}
                                startDate={startDate}
                                endDate={endDate}
                                differenceInDays={differenceInDays}
                                numofoccupanice={numofoccupanice}
                                numofchild={numofchild}
                                rateInfo={rateInfo}
                                roomInfo={roomInfo}
                                setIsPopupOpen={setIsPopupOpen}
                                isPopupOpen={isPopupOpen}
                                setSelectedPaymentMethod={setSelectedPaymentMethod}
                                selectedPaymentMethod={selectedPaymentMethod}
                                handlePayNow={handlePayNow}
                                value={value}
                                setValue={setValue}
                                autoCompleteRef={autoCompleteRef}
                                DateConversion={DateConversion}
                                formatCurrency={formatCurrency}
                                totalSaving={totalSaving} 
                                Math={Math}
                                TotalSavings={TotalSavings}
                                totalRate={totalRate}
                                total={total}
                                totalWithoutServiceCharge={totalWithoutServiceCharge}
                                totalWthMember={totalWthMember}
                                />}
      {/* Bill Section (Confirmation bill) */}
        {currentStep === 4 && <ReviewBookingConfirmation 
                                setCurrentStep={setCurrentStep}
                                startDate={startDate}
                                endDate={endDate}
                                hotelInfo={hotelInfo}
                                selectedPaymentMethod={selectedPaymentMethod}
                                DateConversion={DateConversion}
                                total={total}
                                email={email}
                                title={title}
                                firstName={firstName}
                                lastName={lastName}
                                line1={line1}
                                city={city}
                                state={state}
                                country={country}
                                postalCode={postalCode}
                                value={value}
                                differenceInDays={differenceInDays } 
                                numofoccupanice={numofoccupanice}
                                 />}
      </section>

    </>
  );
}


