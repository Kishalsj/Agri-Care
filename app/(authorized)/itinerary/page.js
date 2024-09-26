"use client";

import React, { useState, useEffect, useRef } from "react";
import { BiRightArrowAlt, BiShareAlt } from "react-icons/bi";
import { BsPrinter } from "react-icons/bs";
import { IoFilterSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import { PiShareFat } from "react-icons/pi";

import moment from "moment";
import { useSearchParams, useRouter } from "next/navigation";
import cookie from "cookie-cutter";
import HotelMap from "@/components/common/HotelMap";

import ClipLoader from "react-spinners/ClipLoader";

import StarRating from "@/components/common/StarRating";
import BackArrow from "@/public/svg/backarrow";

import Image from "next/image";

const DateConversion = ({ date }) => {
  const startDate = new Date(date);

  const formattedEndDate = startDate.toLocaleString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return formattedEndDate;
};

const roomPrice = (string) => {
  return Math.ceil(parseFloat(string) * 100) / 100;
};

const getUniquePolicy = (policies) => {
  const uniqueObjects = new Set();
  const uniquePolicies = [];

  for (const obj of policies) {
    const stringified = JSON.stringify({ end: obj.end, start: obj.start, amount: obj.amount });
    if (!uniqueObjects.has(stringified)) {
      uniqueObjects.add(stringified);
      uniquePolicies.push(obj);
    }
  }
  return uniquePolicies;
};

function Cancellation({ cancellationPolicy, currency }) {
  return (
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
          {cancellationPolicy &&
            cancellationPolicy?.map((policy, index) => {
              const startDate = moment(policy?.start).format("MMM DD YYYY");
              const endDate = moment(policy?.end).format("MMM DD YYYY");
              const rate = policy && policy.amount && roomPrice(policy.amount);

              return (
                <tr
                  key={index}
                  className="flex flex-row text-left justify-between items-center border-b-0 last-of-type:border-b-0 p-3"
                >
                  <td className="w-1/3 text-center border-none">{startDate}</td>
                  <td className="w-1/3 text-center border-none">{endDate}</td>
                  <td className="w-1/3 text-center border-none">
                    {rate === 0 ? "Free" : `${currencySymbol(currency)} ${rate}`}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

function currencySymbol(currency) {
  switch (currency) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    default:
      return "";
  }
}

export default function Itinerary() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [id, setId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const [bookingDetails, setbookingDetails] = useState(null);
  const [checkin, setcheckin] = useState(null);
  const [checkout, setcheckout] = useState(null);
  const [emailModal, setEmailModal] = useState(false);
  const [resendEmail, setResendEmail] = useState(null);
  const [isShare, setIsShare] = useState(false);

  function handleGoBack() {
    router.push("/my-trips");
  }

  let getBookingDataCount = 0;

  const getBookingData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/bookingDetails/single/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Specify content type for POST request
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ email: resendEmail, id: id }), // Include request body as JSON
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`); // Handle non-200 status codes
      }

      const data = await response.json();
      setbookingDetails(data[0]);
      setcheckout(new Date(data[0].chekout));
      setcheckin(new Date(data[0].checkin));
      setIsLoading(false);
    } catch (e) {
      if (getBookingDataCount < 3) {
        getBookingDataCount++;
        getBookingData();
      } else {
        console.error("Failed to fetch booking data after 3 retries:", e);
      }
    }
  };

  useEffect(() => {
    const contract_number = searchParams.get("contract_number");
    const email = cookie.get("email");
    const userId = cookie.get("id");
    const isAuthenticated = cookie.get("isAuthenticated");
    const access_token = cookie.get("access_token");

    setResendEmail(email);
    setUserId(userId);
    setId(contract_number);
    setIsAuthenticated(isAuthenticated);
    setAccessToken(access_token);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getBookingData();
    }
  }, [isAuthenticated, userId, id, accessToken]);

  const secondClose = () => {
    setEmailModal(false);
  };

  const resendTheEmail = async (e) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(resendEmail)) {
      toast.error("Please enter an valid email address!");
      return;
    }
    const body = {
      email: resendEmail,
      details: e.bookingDetail,
      isShare: isShare,
    };
    if (resendEmail !== "") {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/resendConfirmationEmail`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(body),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error(errorText);
          throw new Error(`HTTP error! ${errorText}`);
        }

        const data = await response.text();
        toast.info("Booking confirmation email has been sent.");
        setResendEmail("");
        secondClose();
      } catch (error) {
        toast.error("Failed to resend email:", error.message); // Handle error messages appropriately
      }
    } else {
      toast.error("Please enter your email address!");
    }
  };

  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      {emailModal && (
        <div className="fixed z-50 h-screen w-screen bg-gray-700 bg-opacity-50 pb-4 inset-0 sm:flex sm:items-center sm:justify-center">
          <div
            className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all "
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          ></div>
          <div className="bg-[#fff] register md:h-auto w-full md:w-[600px] rounded-xl text-[#5C6A7A]">
            <div className="flex w-full flex-row px-3 items-end justify-end">
              <div>
                <div
                  className="bg-[#F5F5F6] cursor-pointer border-none rounded-full mx-auto px-3 lg:px-2 lg:py-2 py-3 lg:mt-1 items-end justify-end "
                  onClick={() => {
                    secondClose();
                  }}
                >
                  <svg
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
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
            </div>
            <div className="w-full px-3 py-3">
              <span>
                {isShare
                  ? "Please enter the email address with which you want to share this booking."
                  : "We can send your booking confirmation to your email address.Please provide your email to send the information to."}
              </span>
              <div className="flex mt-3 justify-start w-full gap-3.5 flex-col md:flex-row ">
                <div className="flex flex-col w-full  space-y-2">
                  <label className="text-[#697687] text-[12px]">Email</label>
                  <input
                    value={resendEmail}
                    type="text"
                    className="border w-full border-gray-300 rounded-md px-2 py-2"
                    onChange={(e) => {
                      setResendEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className={`bg-[#1893F8] rounded-full mt-3 px-6 font-bold py-2  text-white
                               `}
                  type="submit"
                  onClick={() => resendTheEmail({ bookingDetail: bookingDetails })}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {!bookingDetails && (
        <div className="min-h-screen flex justify-center items-center">
          <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 z-50 flex justify-center items-center">
            <ClipLoader color="#123abc" loading={true} size={100} />
          </div>
        </div>
      )}
      {bookingDetails && (
        <div style={{ display: "none" }}>
          <div ref={componentRef}>
            <>
              <table
                width="100%"
                border="0"
                cellPadding="0"
                cellSpacing="0"
                align="center"
                className="fullTable"
                bgcolor="#e1e1e1"
              >
                <tbody>
                  <tr>
                    <td height="20"></td>
                  </tr>
                  <tr>
                    <td>
                      <table
                        width="100%"
                        border="0"
                        cellPadding="0"
                        cellSpacing="0"
                        align="center"
                        className="fullTable"
                        bgcolor="#ffffff"
                        style={{ borderRadius: "10px 10px 0 0" }}
                      >
                        <tbody>
                          <tr className="hiddenMobile">
                            <td height="40"></td>
                          </tr>
                          <tr className="visibleMobile">
                            <td height="30"></td>
                          </tr>
                          <tr>
                            <td>
                              <table
                                width="480"
                                border="0"
                                cellPadding="0"
                                cellSpacing="0"
                                align="center"
                              >
                                <tbody>
                                  <tr>
                                    <td>
                                      <table
                                        width="220"
                                        border="0"
                                        cellPadding="0"
                                        cellSpacing="0"
                                        align="left"
                                        className="col"
                                      >
                                        <tbody>
                                          <tr>
                                            <td align="left">
                                              {" "}
                                              <Image
                                                width={250}
                                                height={250}
                                                src="https://members.checkins.ai/static/media/navbarlogo.f7835011ccdccbf1732e.png"
                                                alt="logo"
                                                border="0"
                                              />
                                            </td>
                                          </tr>
                                          <tr className="hiddenMobile">
                                            <td height="40"></td>
                                          </tr>
                                          <tr className="visibleMobile">
                                            <td height="20"></td>
                                          </tr>
                                          <tr>
                                            <td
                                              style={{
                                                fontSize: "12px",
                                                color: "#5b5b5b",
                                                fontFamily: "Open Sans, sans-serif",
                                                lineHeight: "18px",
                                                verticalAlign: "top",
                                                textAlign: "left",
                                              }}
                                            >
                                              <b>HOTEL INFORMATION</b> <br />
                                              {bookingDetails.hotel_name}
                                              <br />
                                              {bookingDetails.hotel_address}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <table
                                        width="220"
                                        border="0"
                                        cellPadding="0"
                                        cellSpacing="0"
                                        align="right"
                                        className="col"
                                      >
                                        <tbody>
                                          <tr className="visibleMobile">
                                            <td height="20"></td>
                                          </tr>
                                          <tr>
                                            <td height="5"></td>
                                          </tr>
                                          <tr>
                                            <td
                                              style={{
                                                fontSize: "21px",
                                                color: "#1893F8",
                                                letterSpacing: "-1px",
                                                fontFamily: "Open Sans, sans-serif",
                                                lineHeight: "1",
                                                verticalAlign: "top",
                                                textAlign: "right",
                                              }}
                                            >
                                              Invoice
                                            </td>
                                          </tr>
                                          <tr className="hiddenMobile">
                                            <td height="50"></td>
                                          </tr>
                                          <tr className="visibleMobile">
                                            <td height="20"></td>
                                          </tr>
                                          <tr>
                                            <td
                                              style={{
                                                fontSize: "12px",
                                                color: "#5b5b5b",
                                                fontFamily: "Open Sans, sans-serif",
                                                lineHeight: "18px",
                                                verticalAlign: "top",
                                                textAlign: "right",
                                              }}
                                            >
                                              <b>BOOKER INFORMATION</b> <br />
                                              <b>Booker:</b> {bookingDetails.firstname}{" "}
                                              {bookingDetails.lastname}
                                              <br />
                                              <b>Phone:</b> {bookingDetails.mobile_number}
                                              <br />
                                              <b>Date</b>{" "}
                                              {DateConversion({
                                                date: new Date(
                                                  bookingDetails.bookingdate
                                                ).toLocaleDateString(),
                                              })}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table
                        width="100%"
                        border="0"
                        cellPadding="0"
                        cellSpacing="0"
                        align="center"
                        className="fullTable"
                        bgcolor="#e1e1e1"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                width="600"
                                border="0"
                                cellPadding="0"
                                cellSpacing="0"
                                align="center"
                                className="fullTable"
                                bgcolor="#ffffff"
                              >
                                <tbody>
                                  <tr className="hiddenMobile">
                                    <td height="60"></td>
                                  </tr>
                                  <tr className="visibleMobile">
                                    <td height="40"></td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <table
                                        width="480"
                                        border="0"
                                        cellPadding="0"
                                        cellSpacing="0"
                                        align="center"
                                        className="fullPadding"
                                      >
                                        <tbody>
                                          <tr>
                                            <th
                                              style={{
                                                fontSize: "8px",
                                                fontFamily: "Open Sans, sans-serif",
                                                fontWeight: "bold",
                                                lineHeight: "1",
                                                verticalAlign: "top",
                                                padding: "0 10px 7px 0",
                                              }}
                                              align="left"
                                            >
                                              Guest Name
                                            </th>
                                            <th
                                              style={{
                                                fontSize: "8px",
                                                fontFamily: "Open Sans, sans-serif",
                                                fontWeight: "bold",
                                                lineHeight: "1",
                                                verticalAlign: "top",
                                                padding: "0 0 7px",
                                              }}
                                              align="left"
                                            >
                                              Checkins.ai #
                                            </th>
                                            <th
                                              style={{
                                                fontSize: "8px",
                                                fontFamily: "Open Sans, sans-serif",
                                                fontWeight: "bold",
                                                lineHeight: "1",
                                                verticalAlign: "top",
                                                padding: "0 0 7px",
                                              }}
                                              align="left"
                                            >
                                              Hotel Confirmation{" "}
                                            </th>
                                            <th
                                              style={{
                                                fontSize: "8px",
                                                fontFamily: "Open Sans, sans-serif",
                                                fontWeight: "bold",
                                                lineHeight: "1",
                                                verticalAlign: "top",
                                                padding: "0 0 7px",
                                              }}
                                              align="left"
                                            >
                                              Start Date
                                            </th>
                                            <th
                                              style={{
                                                fontSize: "8px",
                                                fontFamily: "Open Sans, sans-serif",
                                                fontWeight: "bold",
                                                lineHeight: "1",
                                                verticalAlign: "top",
                                                padding: "0 0 7px",
                                              }}
                                              align="left"
                                            >
                                              End Date
                                            </th>

                                            <th
                                              style={{
                                                fontSize: "8px",
                                                fontFamily: "Open Sans, sans-serif",
                                                fontWeight: "bold",
                                                lineHeight: "1",
                                                verticalAlign: "top",
                                                padding: "0 0 7px",
                                              }}
                                              align="left"
                                            >
                                              Nights
                                            </th>
                                            {/* <th
                                                      style={{
                                                        fontSize: "12px",
                                                        fontFamily:
                                                          "Open Sans, sans-serif",
                                                        color: "#5b5b5b",
                                                        fontWeight: "normal",
                                                        lineHeight: "1",
                                                        verticalAlign: "top",
                                                        padding: "0 0 7px",
                                                      }}
                                                      align="center"
                                                    >
                                                      No.of Rooms
                                                    </th> */}
                                            <th
                                              style={{
                                                fontSize: "8px",
                                                fontFamily: "Open Sans, sans-serif",
                                                fontWeight: "bold",
                                                lineHeight: "1",
                                                verticalAlign: "top",
                                              }}
                                              align="right"
                                            >
                                              Nightly Rate
                                            </th>
                                          </tr>
                                          <tr>
                                            <td
                                              height="1"
                                              style={{
                                                background: "#bebebe",
                                              }}
                                              colSpan="7"
                                            ></td>
                                          </tr>
                                          <tr>
                                            <td height="10" colSpan="7"></td>
                                          </tr>
                                          <tr>
                                            <td
                                              style={{
                                                fontSize: "8px",
                                                fontFamily: "Open Sans, sans-serif",
                                                color: "#1893F8",
                                                lineHeight: "18px",
                                                verticalAlign: "top",
                                                padding: "10px 0",
                                              }}
                                              className="article"
                                            >
                                              {bookingDetails.firstname} {bookingDetails.lastname}
                                            </td>
                                            <td
                                              style={{
                                                fontSize: "8px",
                                                fontFamily: "Open Sans, sans-serif",
                                                color: "#646a6e",
                                                lineHeight: "18px",
                                                verticalAlign: "top",
                                                padding: "10px 0",
                                              }}
                                            >
                                              <small>{bookingDetails.chk_booking_id}</small>
                                            </td>
                                            <td
                                              style={{
                                                fontSize: "8px",
                                                fontFamily: "Open Sans, sans-serif",
                                                color: "#646a6e",
                                                lineHeight: "18px",
                                                verticalAlign: "top",
                                                padding: "10px 0",
                                              }}
                                            >
                                              <small>
                                                {bookingDetails.providerConfirmationNumber}
                                              </small>
                                            </td>
                                            <td
                                              style={{
                                                fontSize: "8px",
                                                fontFamily: "Open Sans, sans-serif",
                                                color: "#646a6e",
                                                lineHeight: "18px",
                                                verticalAlign: "top",
                                                padding: "10px 0",
                                              }}
                                            >
                                              <small>{checkin.toLocaleDateString()}</small>
                                            </td>
                                            <td
                                              style={{
                                                fontSize: "8px",
                                                fontFamily: "Open Sans, sans-serif",
                                                color: "#646a6e",
                                                lineHeight: "18px",
                                                verticalAlign: "top",
                                                padding: "10px 0",
                                              }}
                                            >
                                              <small>{checkout.toLocaleDateString()}</small>
                                            </td>
                                            <td
                                              style={{
                                                fontSize: "8px",
                                                fontFamily: "Open Sans, sans-serif",
                                                color: "#646a6e",
                                                lineHeight: "18px",
                                                verticalAlign: "top",
                                                padding: "10px 0",
                                              }}
                                            >
                                              <small>{bookingDetails.nights}</small>
                                            </td>
                                            {/* <td
                                                      style={{
                                                        fontSize: "12px",
                                                        fontFamily:
                                                          "Open Sans, sans-serif",
                                                        color: "#646a6e",
                                                        lineHeight: "18px",
                                                        verticalAlign: "top",
                                                        padding: "10px 0",
                                                      }}
                                                      align="center"
                                                    >
                                                      {detail.}
                                                    </td> */}
                                            <td
                                              style={{
                                                fontSize: "8px",
                                                fontFamily: "Open Sans, sans-serif",
                                                color: "#1e2b33",
                                                lineHeight: "18px",
                                                verticalAlign: "top",
                                                padding: "10px 0",
                                              }}
                                              align="right"
                                            >
                                              {bookingDetails.currency === "USD"
                                                ? "$"
                                                : bookingDetails.currency === "EUR"
                                                ? "€"
                                                : bookingDetails.currency === "GBP"
                                                ? "£"
                                                : ""}
                                              {Math.ceil(bookingDetails.amount)}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              height="1"
                                              colSpan="7"
                                              style={{
                                                borderBottom: "1px solid #e4e4e4",
                                              }}
                                            ></td>
                                          </tr>

                                          <tr>
                                            <td
                                              height="1"
                                              colSpan="7"
                                              style={{
                                                borderBottom: "1px solid #e4e4e4",
                                              }}
                                            ></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td height="20"></td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        width="100%"
                        border="0"
                        cellPadding="0"
                        cellSpacing="0"
                        align="center"
                        className="fullTable"
                        bgcolor="#e1e1e1"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                width="600"
                                border="0"
                                cellPadding="0"
                                cellSpacing="0"
                                align="center"
                                className="fullTable"
                                bgcolor="#ffffff"
                              >
                                <tbody>
                                  <tr>
                                    <td>
                                      <table
                                        width="480"
                                        border="0"
                                        cellPadding="0"
                                        cellSpacing="0"
                                        align="center"
                                        className="fullPadding"
                                      >
                                        <tbody>
                                          {/* Existing table content */}
                                          <tr>
                                            <td
                                              style={{
                                                fontSize: "12px",
                                                fontFamily: "Open Sans, sans-serif",
                                                color: "#646a6e",
                                                lineHeight: "22px",
                                                verticalAlign: "top",
                                                textAlign: "right",
                                              }}
                                            >
                                              Subtotal
                                            </td>
                                            <td
                                              style={{
                                                fontSize: "12px",
                                                fontFamily: "Open Sans, sans-serif",
                                                color: "#646a6e",
                                                lineHeight: "22px",
                                                verticalAlign: "top",
                                                textAlign: "right",
                                                whiteSpace: "nowrap",
                                              }}
                                              width="80"
                                            >
                                              {bookingDetails.currency === "USD"
                                                ? "$"
                                                : bookingDetails.currency === "EUR"
                                                ? "€"
                                                : bookingDetails.currency === "GBP"
                                                ? "£"
                                                : ""}
                                              {Math.ceil(bookingDetails.amount)}
                                            </td>
                                          </tr>

                                          <tr>
                                            <td
                                              style={{
                                                fontSize: "12px",
                                                fontFamily: "Open Sans, sans-serif",
                                                color: "#000",
                                                lineHeight: "22px",
                                                verticalAlign: "top",
                                                textAlign: "right",
                                              }}
                                            >
                                              <strong>Grand Total (Incl.Tax)</strong>
                                            </td>
                                            <td
                                              style={{
                                                fontSize: "12px",
                                                fontFamily: "Open Sans, sans-serif",
                                                color: "#000",
                                                lineHeight: "22px",
                                                verticalAlign: "top",
                                                textAlign: "right",
                                              }}
                                            >
                                              <strong>
                                                {bookingDetails.currency === "USD"
                                                  ? "$"
                                                  : bookingDetails.currency === "EUR"
                                                  ? "€"
                                                  : bookingDetails.currency === "GBP"
                                                  ? "£"
                                                  : ""}
                                                {Math.ceil(bookingDetails.amount)}
                                              </strong>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table
                        width="100%"
                        border="0"
                        cellPadding="0"
                        cellSpacing="0"
                        align="center"
                        className="fullTable"
                        bgcolor="#e1e1e1"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                width="600"
                                border="0"
                                cellPadding="0"
                                cellSpacing="0"
                                align="center"
                                className="fullTable"
                                bgcolor="#ffffff"
                                style={{
                                  borderRadius: "0 0 10px 10px",
                                }}
                              >
                                <tbody>
                                  <tr>
                                    <td>
                                      <table
                                        width="480"
                                        border="0"
                                        cellPadding="0"
                                        cellSpacing="0"
                                        align="center"
                                        className="fullPadding"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              style={{
                                                fontSize: "12px",
                                                color: "#5b5b5b",
                                                fontFamily: "Open Sans, sans-serif",
                                                lineHeight: "18px",
                                                verticalAlign: "top",
                                                textAlign: "left",
                                              }}
                                            >
                                              Checkins.ai, Inc
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr className="spacer">
                                    <td height="50"></td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td height="20"></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          </div>
        </div>
      )}
      {bookingDetails && (
        <div className="w-full h-auto lg:max-h-[84vh] flex lg:flex-row flex-col">
          <div className="w-full overflow-y-scroll lg:w-1/2 px-5 flex flex-col gap-5">
            <button onClick={handleGoBack} className="flex space-x-2">
              <div className="flex-none mt-[4px] ">
                <BackArrow />
              </div>
              <div className="flex-none mt-0">
                <span className="text-l font-[600] md:text-[14px] md:text-left">
                  Return To Trips
                </span>
              </div>
            </button>
            <div className="flex gap-2  ">
              <Image
                src={
                  bookingDetails.hotelImage
                    ? bookingDetails.hotelImage
                    : "https://placehold.co/150?text=Image+not+found"
                }
                width={200}
                height={151}
                alt="hotel"
                className="h-[151px] rounded-md "
              />
              <div>
                <h1 className="text-[21px] font-semibold">{bookingDetails.hotel_name}</h1>
                <StarRating
                  count={bookingDetails.noofstars !== null ? bookingDetails.noofstars : 1}
                />
                <h2 className="text-[14px] w-[70%]">{bookingDetails.hotel_address}</h2>
              </div>
            </div>
            {/* {bookingDetails.hotelAbout} */}
            {/* <div className="h-[1px] bg-[#5C6A7A] mb-6 mt-4 opacity-40"></div> */}

            <h1 className="text-[21px] font-semibold">Trip Information</h1>

            {/* <div className="h-[1px] bg-[#5C6A7A] mb-6 mt-4 opacity-40 w-full"></div> */}

            <div className="flex flex-col gap-4">
              <h1 className="text-[16px] font-semibold">Room</h1>
              <div className="flex items-center gap-5">
                <div className="flex flex-col gap-2">
                  <span>Check-In</span>
                  <span className="text-[15px] font-semibold">
                    <DateConversion date={checkin.toLocaleDateString()} />
                  </span>
                </div>
                <BiRightArrowAlt className="h-6" />
                <div className="flex flex-col gap-2">
                  <span>Check-out</span>
                  <span className="text-[15px] font-semibold">
                    <DateConversion date={checkout.toLocaleDateString()} />
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="h-[1px] bg-[#5C6A7A] mb-6 mt-4 opacity-40 w-full"></div> */}
            <div className="text-[14px] flex flex-col gap-3 capitalize ">
              <div className="w-full flex">
                <span className="w-1/2">Hotel Confirmation #:</span>
                <span className="w-1/2">{bookingDetails.hotelConfirmationNumber}</span>
              </div>
              <div className="w-full flex">
                <span className="w-1/2">Guests:</span>
                <span className="w-1/2">
                  {bookingDetails?.members
                    ?.slice(0, bookingDetails?.guests || 2)
                    .filter((member) => member.firstname && member.lastname) // filter out members with null names
                    .map((member, index) => `${member.firstname} ${member.lastname}`)
                    .join(", ")}
                </span>
              </div>
              <div className="w-full flex">
                <span className="w-1/2">Email:</span>
                <span className="w-1/2 normal-case">
                  {bookingDetails.email && bookingDetails.email}
                </span>
              </div>
              <div className="w-full flex">
                <span className="w-1/2">Mobile:</span>
                <span className="w-1/2">{bookingDetails.mobile_number}</span>
              </div>

              <div className="w-full flex">
                <span className="w-1/2">Nights:</span>
                <span className="w-1/2">{bookingDetails.nights} </span>
              </div>
              {/* <div  className="w-full flex">
                <span className="w-1/2">Guests:</span>
                <span className="w-1/2">{bookingDetails.guests}</span>
                </div> */}
              <div className="w-full flex">
                <span className="w-1/2">Booking ID:</span>
                <span className="w-1/2">{bookingDetails.chk_booking_id}</span>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => handlePrint()}
                className="border px-4 py-1.5 gap-1 flex items-center rounded-md"
              >
                <BsPrinter /> Print
              </button>
              <button
                onClick={() => {
                  setIsShare(false);
                  setEmailModal(!emailModal);
                }}
                className="border px-4 py-1.5 gap-1 flex items-center rounded-md"
              >
                <PiShareFat /> Resend
              </button>
              <button
                onClick={() => {
                  setEmailModal(!emailModal);
                  setIsShare(true);
                }}
                className="border px-4 py-1.5 gap-1 flex items-center rounded-md"
              >
                <BiShareAlt /> Share
              </button>
            </div>
            {/* <div className="h-[1px] bg-[#5C6A7A] mb-6 mt-4 opacity-40 w-full"></div> */}
            <div className="flex flex-col gap-4">
              <h1 className="text-[16px] font-semibold">Room Information</h1>
            </div>
            <div className="text-[14px] flex flex-col gap-3 capitalize ">
              {/* <div  className="w-full flex">
                <span className="w-1/2">Room Confirmation #:</span>
                <span className="w-1/2">{bookingDetails.hotelConfirmationNumber}</span>
                </div> */}
              <div className="w-full flex">
                <span className="w-1/2">Room Type:</span>
                <span className="w-1/2">{bookingDetails.room_type}</span>
              </div>
              <div className="w-full flex">
                <span className="w-1/2">Board Basics</span>
                <span className="w-1/2">{bookingDetails.boardbasics}</span>
              </div>
              <div className="w-full flex">
                <span className="w-1/2">Rooms:</span>
                <span className="w-1/2">{bookingDetails.rooms ? bookingDetails.rooms : 1} </span>
              </div>
            </div>
            {/* <div className="h-[1px] bg-[#5C6A7A] mb-6 mt-4 opacity-40 w-full"></div> */}
            <h1 className="text-[16px] font-semibold">Summary of Charges</h1>
            <div className="w-full font-semibold text-[14px] flex justify-between">
              <span className="">Booking Cost</span>
              <span className="">${roomPrice(bookingDetails.amount)} </span>
            </div>
            <div>
              <span className="text-[12px]">
                Payment has been made for the full amount of the reservation; however, the guest may
                provide a valid credit card upon check in for any incidentals. Please be advised the
                hotel may place a pre-authorization on this card that will be released upon
                checkout.
              </span>
            </div>
            {/* <div className="h-[1px] bg-[#5C6A7A] mb-6 mt-4 opacity-40 w-full"></div> */}
            <h1 className="text-[16px] font-semibold">Refund Policy</h1>
            <Cancellation
              cancellationPolicy={getUniquePolicy(bookingDetails.cancellation_policies)}
              currency={"USD"}
            />
            {/* <div className="h-[1px] bg-[#5C6A7A] mb-6 mt-4 opacity-40 w-full"></div> */}
            <h1 className="text-[16px] font-semibold">Additional Details</h1>
            <div className="w-full flex">
              <span className="w-1/2">Booked By:</span>
              <span className="w-1/2 capitalize">
                {bookingDetails.firstname} {bookingDetails.lastname}
              </span>
            </div>
            <div className="w-full  flex">
              <span className="w-1/2">Booked Date:</span>
              <span className="w-1/2">
                <DateConversion date={new Date(bookingDetails.bookingdate).toLocaleDateString()} />
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold">Need Assistance?</span>
              <span className="">Contact support: +1-650-308-8202</span>
            </div>
          </div>
          <div className="w-full lg:w-1/2 ">
            <HotelMap lat={bookingDetails.lat} lng={bookingDetails.long} height="84vh" />
          </div>
        </div>
      )}
    </>
  );
}
