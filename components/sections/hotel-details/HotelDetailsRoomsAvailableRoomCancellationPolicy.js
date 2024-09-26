"use client";

import React, { useState } from "react";
import formatDate from "@/utils/format-date";
import { computePriceDifference, getCurrencySymbol } from "@/utils/hotel-detail-helper";
import HotelDetailsRoomsAvailableRoomProvider from "./HotelDetailsRoomsAvailableRoomProvider";
import HotelDetailsRoomsAvailableRoomCancellationPolicyModal from "./HotelDetailsRoomsAvailableRoomCancellationPolicyModal";

import BedIcon from "@/components/icons/BedIcon";
import BreakfastIcon from "@/components/icons/BreakfastIcon";
import GuestsIcon from "@/components/icons/GuestsIcon";
import PersonIcon from "@/components/icons/PersonIcon";
import AllInclusiveIcon from "@/components/icons/AllInclusiveIcon";

export default function HotelDetailsRoomsAvailableRoomCancellationPolicy({
  recommendations,
  selectedRecommendation,
  setSelectedRecommendation,
  setDailyRate,
}) {
  const minLabel = `$0`;
  // const maxLabel = "$1000";
  const step = 10;
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000);

  const handleChange = (event) => {
    const newMinValue = Math.min(event.target.value, maxValue);
    const newMaxValue = Math.max(event.target.value + step, minValue);

    setDailyRate(recommendations[newMinValue].rates[0].dailyTotalRate);
    setSelectedRecommendation(recommendations[newMinValue]);

    setMinValue(newMinValue);
    setMaxValue(newMaxValue);
  };

  // Refundability component
  const Refundable = ({ rec }) => {
    return rec.rates[0].refundability === "Refundable" ? (
      <div className="text-green-700 flex flex-row ">
        Fully Refundable
        {rec.rates[0].cancellationPolicies &&
        rec.rates[0].cancellationPolicies[0].rules &&
        rec.rates[0].cancellationPolicies[0].rules ? (
          <>
            {" "}
            Before{" "}
            {formatDate(rec.rates[0].cancellationPolicies[0].rules[0].end, {
              month: "short",
              day: "numeric",
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    ) : (
      <span className=" text-red-600">Non Refundable</span>
    );

    <span aria-label={rec.rates[0].totalRate}>
      +{getCurrencySymbol(rec.rates[0].currency)}
      {computePriceDifference({
        secondPrice: rec.rates[0].dailyTotalRate,
        lowestPrice: rec[0].rates[0].dailyTotalRate,
      })}
    </span>;
  };

  // Refundability component
  const ShortenedRefundable = ({ rec }) => {
    return rec.rates[0].refundability === "Refundable" ? (
      <div className="text-green-700 flex flex-col text-left text-[13px] ml-4">
        <>Yes</>
        <div>
          {rec.rates[0].cancellationPolicies &&
          rec.rates[0].cancellationPolicies[0].rules &&
          rec.rates[0].cancellationPolicies[0].rules ? (
            <>
              {formatDate(rec.rates[0].cancellationPolicies[0].rules[0].end, {
                month: "short",
                day: "numeric",
              })}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    ) : (
      <>
        <span className=" text-red-600">No</span>
        <div className="invisible">No</div>
      </>
    );

    <span aria-label={rec.rates[0].totalRate}>
      +{getCurrencySymbol(rec.rates[0].currency)}
      {computePriceDifference({
        secondPrice: rec.rates[0].dailyTotalRate,
        lowestPrice: rec[0].rates[0].dailyTotalRate,
      })}
    </span>;
  };

  // BoardBasis component - contains policy modal and room provider
  const BoardBasis = ({ rec }) => (
    <div className="ml-2 flex justify-between align-items">
      <div className="flex items-center">
        <span className="ml-3 flex items-center mr-1">
          {rec.rates[0]?.boardBasis?.type === "BedAndBreakfast" ? (
            <>(incl. breakfast)</>
          ) : rec.rates[0]?.boardBasis?.type === "AllInclusive" ? (
            <>All Inclusive</>
          ) : rec.rates[0]?.boardBasis?.type === "RoomOnly" ? (
            <>Room Only</>
          ) : rec.rates[0]?.boardBasis?.type === "FullBoard" ? (
            <>Full Board</>
          ) : (
            <p className="capitalize">{rec.rates[0]?.boardBasis?.description}</p>
          )}
        </span>
        <HotelDetailsRoomsAvailableRoomCancellationPolicyModal
          policies={rec.rates[0]?.cancellationPolicies}
          currency={rec.rates[0].currency}
        />
      </div>

      <HotelDetailsRoomsAvailableRoomProvider providerName={rec.rates[0].providerName} />
    </div>
  );

  const ShortenedBoardBasis = ({ rec }) => (
    <>
      {/* Board Basis type check */}
      <span className="flex justify-center ">
        {rec.rates[0]?.boardBasis?.type === "BedAndBreakfast" ? (
          <div className="group flex relative cursor-pointer">
            <BreakfastIcon />
            <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-[10px] text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">
              Breakfast
            </span>
          </div>
        ) : rec.rates[0]?.boardBasis?.type === "AllInclusive" ? (
          <div className="group flex relative cursor-pointer">
            <AllInclusiveIcon />
            <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-[10px] text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">
              All Inclusive
            </span>
          </div>
        ) : rec.rates[0]?.boardBasis?.type === "RoomOnly" ? (
          <div className="group flex relative cursor-pointer">
            <BedIcon />
            <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-[10px] text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-1/2 opacity-0 m-4 mx-auto">
              Room Only
            </span>
          </div>
        ) : rec.rates[0]?.boardBasis?.type === "FullBoard" ? (
          <div className="group flex relative cursor-pointer">
            <GuestsIcon />
            <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-[10px] text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">
              Full Boarding
            </span>
          </div>
        ) : (
          <div className="group flex relative cursor-pointer">
            <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-[10px] text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">
              <PersonIcon />
              <p className="capitalize">{rec.rates[0]?.boardBasis?.description}</p>
            </span>
          </div>
        )}
      </span>

      <HotelDetailsRoomsAvailableRoomCancellationPolicyModal
        policies={rec.rates[0]?.cancellationPolicies}
        currency={rec.rates[0].currency}
      />
      <HotelDetailsRoomsAvailableRoomProvider providerName={rec.rates[0].providerName} />
    </>
  );

  return (
    <div className="hotel-details-cancellation-policy flex justify-start p-4 flex-col flex-1 font-Montserrat">
      <span className="mb-4 font-bold">Room Options</span>
      <div className="flex flex-row space-y-2 text-[15px] ">
        {/* <Tags index={0} /> */}
        <div className="relative  flex flex-col top-[43px] text-[13px] font-Montserrat">
          <span>Refund:</span>
          <span>By:</span>
          <span>Incl:</span>
        </div>
        {/* Price Slider */}
        {recommendations && (
          <div className="w-full text-[10px]">
            <input
              id="price-slider"
              className="w-full"
              type="range"
              min={0}
              max={recommendations.length - 1}
              step={1}
              value={minValue}
              onChange={handleChange}
            />

            <div className="flex flex-grow justify-between">
              {/* First min label */}
              <div className="flex flex-col text-center justify-center">
                <span className="min-value flex flex-col ">
                  {/* Price should always be +0 */}
                  <span className="price-label text-center relative top-[-34px]">
                    +{getCurrencySymbol(recommendations[0].rates[0].currency)}0
                  </span>

                  {/* Refundability */}
                  <ShortenedRefundable rec={recommendations[0]} />
                </span>

                {/* Room details and policy */}
                <ShortenedBoardBasis rec={recommendations[0]} />
              </div>

              {/* Middle labels */}
              {recommendations.length > 1 &&
                recommendations.slice(1, -1, 2).map((rec) => (
                  <div key={rec.id} className="range-labels justify-end text-end">
                    <span className="price-label text-start relative top-[-34px] left-[-6px]">
                      +{getCurrencySymbol(rec.rates[0].currency)}
                      {computePriceDifference({
                        secondPrice: rec.rates[0].dailyTotalRate,
                        lowestPrice: recommendations[0].rates[0].dailyTotalRate,
                      })}
                    </span>
                    <span className={`label-${rec.id}`}>
                      <label htmlFor={`recommendation-${rec.id}`}>
                        <ShortenedRefundable rec={rec} />
                      </label>
                    </span>

                    <div className="flex-col text-center justify-center">
                      <ShortenedBoardBasis rec={rec} />
                    </div>
                  </div>
                ))}

              {/* End max label */}
              {recommendations.length > 1 && (
                <div className="flex-col text-center justify-center">
                  <span className="max-value ">
                    <span className="price-label text-end relative top-[-34px]">
                      +{getCurrencySymbol(recommendations[0].rates[0].currency)}
                      {computePriceDifference({
                        secondPrice: recommendations.reduce(
                          (max, rec) => Math.max(max, rec.rates[0].dailyTotalRate),
                          -Infinity
                        ),
                        lowestPrice: recommendations[0].rates[0].dailyTotalRate,
                      })}
                    </span>
                    <ShortenedRefundable rec={recommendations[recommendations.length - 1]} />
                  </span>

                  <ShortenedBoardBasis rec={recommendations[recommendations.length - 1]} />
                </div>
              )}
            </div>
          </div>
        )}
        {/* Selecting recommendation with radio */}
        {/* {recommendations &&
          recommendations.map((recommendation) => (
            <div key={recommendation.id} className="recommendation">
              <div className="flex gap-2 items-center justify-between">
                <div className="flex gap-2 items-center">
                  <input
                    type="radio"
                    id={`recommendation-${recommendation.id}`}
                    name={`recommendation-${recommendation.id}`}
                    checked={selectedRecommendation.id === recommendation.id}
                    onChange={() => {
                      setDailyRate(recommendation.rates[0].dailyTotalRate);
                      setSelectedRecommendation(recommendation);
                      //   setRoomPrice(recommendation.rates[0].totalRate);
                      //   setRate(recommendation.rates[0]);
                      //   setRoom(recommendation.room);
                      //   setRoomRatesStatus(true);
                      //   setPriceCheckLoading(false);
                    }}
                  />
                  <label htmlFor={`recommendation-${recommendation.id}`}>
                    <Refundable rec={recommendation} />
                  </label>
                </div>
                <span aria-label={recommendation.rates[0].totalRate}>
                  +{getCurrencySymbol(recommendation.rates[0].currency)}
                  {computePriceDifference({
                    secondPrice: recommendation.rates[0].dailyTotalRate,
                    lowestPrice: recommendations[0].rates[0].dailyTotalRate,
                  })}
                </span>
              </div>
              <BoardBasis rec={recommendation} />
            </div>
          ))} */}
      </div>
    </div>
  );
}
