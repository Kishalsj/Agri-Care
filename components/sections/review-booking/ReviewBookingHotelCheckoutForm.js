import { useState } from "react";
import { PaymentElement, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter, useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import cookie from "cookie-cutter";
import Image from "next/image";
import moment from "moment";
import Popup from "reactjs-popup";
import PropagateLoader from "react-spinners/PropagateLoader";

// import within the project
import bookingcon from "@/public/img/bookingcon.png";
import "@/public/styles/table.css";

function Cancellation({ cancellationPolicy, currency }) {
  //console.log("cancellationPolicy", cancellationPolicy);

  return (
    <div className="flex flex-col gap-3 mt-3">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-[#002248] px-2 py-1">From</th>
            <th className="text-[#002248] px-2 py-1">To</th>
            <th className="text-[#002248] px-2 py-1">Amount</th>
          </tr>
        </thead>
        <tbody>
          {cancellationPolicy[0]?.rules &&
            cancellationPolicy[0]?.rules.map((policy, index) => {
              const startDate = moment(policy?.start).format("MMM DD YYYY");
              const endDate = moment(policy?.end).format("MMM DD YYYY");
              const rate = policy && policy.value && Math.ceil(policy.value);
              const estimatedValue =
                policy && policy.estimatedValue && Math.ceil(policy.estimatedValue);

              return (
                <tr key={index} className="text-[13px] mt-3 text-center">
                  <td className="text-[#002248] px-2 py-3">{startDate}</td>
                  <td className="text-[#002248] px-2 py-3">{endDate}</td>
                  <td className="text-[#002248] px-2 py-3">
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
                          : ""}{" "}
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
  );
}
const correlationId = `chk${uuidv4()}`;

const getIPAddress = async () => {
  const response = await fetch("https://api.ipify.org?format=json");
  const data = await response.json();
  return data.ip;
};

const ipAddress = getIPAddress();

const DateConversion = ({ date }) => {
  // Convert the date to a Moment.js object
  const momentDate = moment(date);

  // Format the date as desired without affecting time zones
  const formattedDate = momentDate.format("ddd, D MMM YYYY");

  return formattedDate;
};


const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


export default function HotelCheckoutForm({
  setBookingConfirmedOnParent,
  setBookingFailedOnParent,
  setBookingLoaded,
  requestFormat
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { id, roomtoken } = useParams();
  const BookingID = requestFormat.bookingID;
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [providerConfirmationNumber, setProviderConfirmationNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isClickedPayNow, setIsClickedPayNow] = useState(false);
  const [error, setError] = useState("");
  const [errorHeading, setErrorHeading] = useState("");

  const [clientPaymentMethod, setClientPaymentMethod] = useState("card");
  let color = "#1893F8";
  // const roomsAllocations = JSON.stringify(data);

  /*

	How a payment is made:
		Initialization:
			In ReviewBookingHotelPayment,
				Stripe config is initailized
				A payment intent is created to generate a clientSecret
.

	First Booking API Request:
		Endpoint: ${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/firstBookingApi
		Purpose: Send initial booking details to the server, including billing information, room and hotel details, and other relevant data.

*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      console.log("Stripe not yet loaded");
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsClickedPayNow(true);


    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (paymentIntent && paymentIntent.status === "succeeded") {
      setPaymentSuccess(true);


      const firstBookingApi = {
        requestPayload: requestFormat,
        stripeInfo : {
          stripeid: paymentIntent.id,
          paymentstatus: "Success",
        },
        chkbookingid: BookingID,
        ipAddress: await getIPAddress(),
        correlationId: correlationId,
        roomtoken:roomtoken
      };

      const firstBookingBody = JSON.stringify(firstBookingApi);


      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/booking`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: firstBookingBody,
        });

        if (response.ok) {
          // We don't do anything with the data right now
          const data = await response.json();
  
          if (data?.bookingStatus === "Failed") {
            // Handle failed booking
            setBookingLoaded(true);
            setBookingFailedOnParent(true);
            setIsProcessing(false);
            setIsClickedPayNow(false);
            setErrorHeading("Booking Failed");
            setMessage(`Booking failed. Please contact support team with this ID ${BookingID}`);
            setError(`Booking failed. Please contact support team with this ID ${BookingID}`);
            setShowModal(true);
            document.body.classList.add("body-overflow-hidden");
  
          } else {
            // setBookingID(data.bookingId)
            setProviderConfirmationNumber(data.providerConfirmationNumber);
            setBookingLoaded(true);
            setBookingConfirmed(true);
            setBookingConfirmedOnParent(true);
            setIsModalOpen(true);
  
            setIsProcessing(false);
            
          }
        } else {
            setBookingLoaded(true);
            setBookingFailedOnParent(true);
            setIsProcessing(false);
            setIsClickedPayNow(false);
            setErrorHeading("Booking Failed");
            setMessage(`Booking failed. Please contact support team with this ID ${BookingID}`);
            setError(`Booking failed. Please contact support team with this ID ${BookingID}`);
            setShowModal(true);
            document.body.classList.add("body-overflow-hidden");
              // toast('Booking details send failed')
            const errorText = await response.text();
            throw new Error(`Booking details error: ${errorText}`);
        }
      } catch (error) {
        // Handle fetch error
        console.log("Error in zentrumhub booking: ", error);
        setBookingLoaded(true);
        setBookingFailedOnParent(true);
        setIsProcessing(false);
        setIsClickedPayNow(false);
        setErrorHeading("Booking Failed");
        setMessage(`Booking failed. Please contact support team with this ID ${BookingID}`);
        setError(`Booking failed. Please contact support team with this ID ${BookingID}`);
        setShowModal(true);
        document.body.classList.add("body-overflow-hidden");
      }
    }
    if (error) {
      // console.log(error.message);
      setIsProcessing(false);
      setIsClickedPayNow(false);
    }
    if (error?.type === "card_error" || error?.type === "validation_error") {
      setErrorHeading("Payment Failed");
      setIsProcessing(false);

      setError(error.message);
      setShowModal(true);
      document.body.classList.add("body-overflow-hidden");
    }
    setIsProcessing(false);
    setIsClickedPayNow(false);
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.classList.remove("body-overflow-hidden");
  };

  return (
    <>
      {paymentSuccess === true ? (
        bookingConfirmed && (
          <div>
            <div className="w-full border mb-[200px] text-[13px] 2xl:text-[15px] rounded-lg px-2 lg:px-4 py-2 flex flex-col gap-5">
              <h1 className="text-[#002248] text-center text-[25px] font-bold">
                Booking Confirmed!
              </h1>
              <div className=" text-[#697687] text-[13px] 2xl:text-[15px] justify-between rounded-lg flex flex-col md:flex-row 2xl:py-5 px-3 py-3">
                <div className="flex flex-col gap-2">
                  <span>Check In</span>
                  <div className="flex md:flex-col flex-row justify-between md:justify-start">
                    <span className="text-[#002248] 2xl:text-[18px] text-[16px] font-bold">
                      {DateConversion({
                        date: requestFormat.startDate,
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex-none md:hidden h-[1px] bg-[#5C6A7A]"></div>
                <div className="flex flex-col gap-2">
                  <span>Check Out</span>
                  <div className="flex md:flex-col flex-row justify-between md:justify-start">
                    <span className="text-[#002248] 2xl:text-[18px] text-[16px] font-bold">
                      {DateConversion({
                        date: requestFormat.endDate,
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex-none md:hidden h-[1px] bg-[#5C6A7A]"></div>
                <div className="flex flex-col gap-2">
                  <span>Guest</span>
                  <div className="flex md:flex-col flex-row justify-between md:justify-start">
                    <span className="text-[#002248] 2xl:text-[18px] text-[16px] font-bold">
                      {requestFormat.nights} night, {requestFormat.numofoccupanice} adults{" "}
                      {requestFormat.numofchild > 0 && `, ${requestFormat.numofchild} Children`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse w-full lg:flex-row">
                <div className="flex w-full lg:w-[70%] flex-col gap-5">
                  <div className="flex flex-col lg:gap-0 gap-4 lg:flex-row w-full justify-between">
                    <div className="">
                      <span className="text-[#697687]  font-bold">Room Types</span>

                      {requestFormat.rateInfo.map((rate, index) => {
                        const roomnumber = index + 1;
                        return (
                          <div key={index} className="flex-col flex">
                            <div className="justify-start flex">
                              <span>
                                Room {roomnumber} ( {requestFormat.roomInfo.name} )
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="">
                      <div className="space-x-1.5">
                        <span>
                          {requestFormat.rateInfo[0].boardBasis?.type === "RoomOnly"
                            ? "Room Only"
                            : requestFormat.rateInfo[0].boardBasis?.type === "BedAndBreakfast"
                            ? "Bed And Breakfast"
                            : requestFormat.rateInfo[0].boardBasis?.type}
                        </span>
                        <span className="text-[#1893F8]">
                          {requestFormat.rateInfo[0].refundable === true ? "Refundable" : "Non Refundable"}
                        </span>
                      </div>
                      <Popup
                        trigger={
                          <button className=" text-blue-600 hover:underline ">
                            View Booking & Cancellation Policy
                          </button>
                        }
                        modal
                      >
                        {(close) => (
                          <div className="bg-[white] h-[270px] overflow-y-auto flex flex-col gap-5 w-[500px] xl:w-[700px] shadow-xl rounded-md px-3 py-4">
                            <div className="flex justify-start gap-2 items-center">
                              <svg
                                onClick={() => {
                                  close();
                                }}
                                className="h-6 w-6 cursor-pointer"
                                aria-label="Close, go back to hotel details."
                                role="img"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <title id="undefined-close-toolbar-title">
                                  Close, go back to hotel details.
                                </title>
                                <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
                              </svg>
                              <span className="text-[15px] mb-0.5 font-semibold leading-relaxed primary-font-color">
                                Policies
                              </span>
                            </div>
                            <div className="w-full">
                              <span className="text-[15px] mb-0.5 font-semibold leading-relaxed primary-font-color">
                                Cancellation Policy
                              </span>

                              {requestFormat.rateInfo[0]?.cancellationPolicies && (
                                <Cancellation
                                  currency={requestFormat.rateInfo[0].currency}
                                  cancellationPolicy={requestFormat.rateInfo[0].cancellationPolicies}
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </Popup>
                    </div>
                  </div>
                  <div className="flex flex-col w-full items-start text-start">
                    <span className=" text-[#697687]">Travelers</span>
                    {requestFormat &&
                      requestFormat.roomsAllocations &&
                      requestFormat.roomsAllocations.map((item, index) => (
                        <div key={index} className="flex  text-start w-full flex-col gap-3">
                          <div className="flex  text-start flex-col gap-3">
                            {item.guests.map((guest, index) => (
                              <div key={index} className="flex flex-col gap-3">
                                <span className="text-start capitalize">
                                  {guest.title ? guest.title : ""}{" "}
                                  {guest.firstname ? guest.firstname : ""}{" "}
                                  {guest.lastname ? guest.lastname : ""}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="">Thank you for booking with Hotel Chekins!</span>
                    <span className=" ">Please take a note of your confirmation number</span>
                  </div>
                  <div className="flex text-[#697687]  flex-col ">
                    <span>Booking confirmation </span>
                    <span className="text-[#1893F8] ">{BookingID && BookingID}</span>
                  </div>
                  <div className="flex text-[#697687] flex-col ">
                    <span>Hotel confirmation </span>
                    <span className="text-[#1893F8] ">
                      {providerConfirmationNumber && providerConfirmationNumber}
                    </span>
                  </div>
                  <div className="flex  flex-col gap-1 ">
                    <span className=" text-[#697687]">Email confirmation </span>
                    <span className=" ">
                      Booking confirmation email has been sent to{" "}
                      <span className="text-blue-600  ">
                        {requestFormat.billingData.email ? requestFormat.billingData.email : ""}
                      </span>
                    </span>
                    <span className="">
                      Please check your JUNK folder if the email has not arrived within 1 hour.
                    </span>
                  </div>
                </div>

                <div className="w-full lg:w-[30%] flex justify-center items-center">
                  {/* <img src={bookingcon} alt="bookingcon" className="w-full h-full object-cover" /> */}

                  <Image
                    src={bookingcon}
                    alt="bookingcon"
                    objectFit="cover"
                    height={300}
                    width={300}
                  />
                </div>
              </div>
            </div>
            {/* {isModalOpen && (
              <>
                <div className="w-full flex flex-col gap-3">
                  <span className="text-center font-bold">
                    Booking Confirmation Details
                  </span>
                  <div className="flex  lg:flex-row flex-col ">
                    <span>Booking confirmation: </span>
                    <span>{BookingID && BookingID}</span>
                  </div>
                  <div className="flex  lg:flex-row flex-col ">
                    <span>Hotel confirmation: </span>
                    <span>
                      {providerConfirmationNumber && providerConfirmationNumber}
                    </span>
                  </div>
                </div>

                <BookingConfirmed
                  close={close}
                  startDate={startDate}
                  endDate={endDate}
                  numofoccupanice={numofoccupanice}
                  basicDetails={basicDetails}
                  providerConfirmationNumber={providerConfirmationNumber}
                  BookingID={BookingID}
                  data={data}
                  billingData={billingData}
                  Amount={Amount}
                  Currency={Currency}
                />
              </>
            )} */}
          </div>
        )
      ) : (
        <div className="bg-white  rounded-lg shadow-md w-full  mx-auto px-4 py-4">
          <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            {/* <CardElement
							id="payment-element"
							className="py-2 bg-[#cbd8d8ee] rounded-lg px-2"
							// onChange={(e) => setClientPaymentMethod(e.value.type)}
						/> */}

            <button
              className="bg-[#1893F8] rounded-full font-bold py-3 px-5 w-full text-white disabled:opacity-50 mx-auto mt-2"
              disabled={isClickedPayNow || !stripe || !elements}
              id="submit"
            >
              <span id="button-text">{isClickedPayNow ? "Processing... " : "Pay now"}</span>
            </button>
            {/* Show any error or success messages */}
            {message && (
              <div id="payment-message" className="flex flex-col">
                <span>
                  We are sorry we could not confirm this booking with the property. It seems the
                  hotel has restricted inventory due to high demand.
                </span>
                <span>
                  Your payment refund has automatically been processed for this transaction and will
                  be available within 24 hours.
                </span>
              </div>
            )}
          </form>
        </div>
      )}
      {!isProcessing ? (
        <></>
      ) : (
        !bookingConfirmed && (
          <div className="justify-center bg-slate-700 bg-opacity-50 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 higherIndexScroll outline-none focus:outline-none sweet-loading">
            <div className=" bg-slate-600 bg-opacity-50">
              <PropagateLoader
                color={color}
                cssOverride={override}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          </div>
        )
        // <></>
      )}

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none">
            <div
              // ref={wrapperRef}
              className="relative justify-center items-center rounded-2xl  sm:w-6/12 lg:w-[39%] w-full  bg-[#fff] my-6"
            >
              <div className="w-full flex justify-end items-end px-3 pt-2">
                <div
                  className="bg-[#F5F5F6] cursor-pointer border-none rounded-full w-8 py-2 mt-1"
                  onClick={() => closeModal()}
                >
                  <svg
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    className="ml-2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3327 1.1665L1.66602 12.8332"
                      stroke="#282C3F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1.66602 1.1665L13.3327 12.8332"
                      stroke="#282C3F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="px-4 justify-center xl:justify-start py-4 flex flex-col xl:flex-row space-x-0 xl:space-x-5">
                <div className="w-full">
                  <div className="flex space-y-5  right-0 mr-0 justify-end items-end flex-col"></div>
                  <div className="pb-4 xl:justify-start xl:items-start items-center justify-center">
                    <div className="text-[#5C6A7A] xl:justify-start xl:items-start items-center justify-center text-[15px] font-[500] flex flex-col space-y-3">
                      <div className="space-y-2 xl:justify-start xl:items-start justify-center items-center ">
                        <span className="text-[#002248]  text-[28px] font-bold">
                          {errorHeading}
                        </span>
                        <div className="bg-[#1893F8] items-center justify-center w-12 h-[6px] rounded-full"></div>
                      </div>
                      <div className="flex items-start justify-start flex-col">
                        <span className="text-start">
                          {error !== "" && (
                            <span className="text-[#af3232] text-[12px] text-center">{error}</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed  overflow-hidden inset-0 z-40 bg-[#1893F8]"></div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
