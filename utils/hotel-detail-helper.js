export function filterRecommendations(recommendations) {
  let foundNonRefundableBedAndBreakfast = false;
  let foundNonRefundableRoomOnly = false;
  let foundUnkownRoomOnly = false;
  let foundUnkownBedAndBreakfast = false;

  return recommendations.filter((recommendation, index) => {
    const refundability = recommendation.rates[0].refundability;
    const boardBasisType = recommendation.rates[0].boardBasis.type;

    if (index === 0) {
      return true;
    }

    if (refundability === "unknown") {
      const foundNonRefundable =
        boardBasisType === "RoomOnly"
          ? foundNonRefundableRoomOnly
          : foundNonRefundableBedAndBreakfast;
      const foundUnknown =
        boardBasisType === "RoomOnly"
          ? foundUnkownRoomOnly
          : foundUnkownBedAndBreakfast;

      if (!foundNonRefundable && !foundUnknown) {
        foundNonRefundableRoomOnly = boardBasisType === "RoomOnly";
        foundNonRefundableBedAndBreakfast =
          boardBasisType === "BedAndBreakfast";
        foundUnkownRoomOnly = foundUnkownBedAndBreakfast = true;
        return true;
      } else {
        return false;
      }
    }

    if (refundability === "NonRefundable") {
      const foundNonRefundable =
        boardBasisType === "RoomOnly"
          ? foundNonRefundableRoomOnly
          : foundNonRefundableBedAndBreakfast;

      if (!foundNonRefundable) {
        foundNonRefundableRoomOnly = boardBasisType === "RoomOnly";
        foundNonRefundableBedAndBreakfast =
          boardBasisType === "BedAndBreakfast";
        foundUnkownRoomOnly = foundUnkownBedAndBreakfast = true;
        return index === 0;
      } else {
        return false;
      }
    }

    if (refundability === "Refundable") {
      const currentEndDate =
        recommendation.rates[0].cancellationPolicies[0]?.rules[0]?.end;

      foundNonRefundableRoomOnly = foundNonRefundableBedAndBreakfast = true;
      foundUnkownRoomOnly = foundUnkownBedAndBreakfast = true;

      const previousRefundableEndDates = recommendations
        .slice(0, index)
        .reverse()
        .filter((rec) => rec.rates[0].refundability === "Refundable")
        .map((rec) => rec.rates[0].cancellationPolicies[0]?.rules[0]?.end);

      const latestPreviousRefundableEndDate =
        previousRefundableEndDates.length > 0
          ? Math.max(
              ...previousRefundableEndDates.map((date) => new Date(date))
            )
          : null;

      return (
        !latestPreviousRefundableEndDate ||
        new Date(currentEndDate) > latestPreviousRefundableEndDate
      );
    }

    return true;
  });
}

export function extractNumberFromHotelName(name) {
  const numberPattern = /\d+/;
  const match = name.match(numberPattern);

  if (match) {
    const number = parseInt(match[0], 10);
    return number;
  }

  return null;
}

export function computePriceDifference({ secondPrice, lowestPrice }) {
  const difference = secondPrice - lowestPrice;

  return Math.ceil(difference);
}

// Find the rates associated with the given standardRoomId
export function filterRateOccupancyByStandardRoomId({ rates, standardRoomId }) {
  return rates
    .filter((rate) =>
      rate.occupancies.some(
        (occupancy) => occupancy.stdRoomId === standardRoomId
      )
    )
    .sort((a, b) => a.totalRate - b.totalRate);
}

export function groupByStandardizedRoomId({
  standardizedRooms = [],
  rates = [],
  rooms = [],
  recommendations = [],
}) {
  //Create an empty array to store the final grouped data
  const groupedData = [];

  // Iterate over the standardized rooms
  standardizedRooms.forEach((standardRoom) => {
    const standardRoomId = standardRoom.id;
    const standardRoomObject = {
      roomInfo: [],
      recommendations: [],
      rates: [],
    };

    const standardRoomRates = filterRateOccupancyByStandardRoomId({
      rates,
      standardRoomId,
    });

    // Iterate over the rates and filter them based on recommendations
    standardRoomRates.forEach((rate) => {
      if (recommendations.some((rec) => rec.rates.includes(rate.id))) {
        standardRoomObject.rates.push(rate);

        recommendations.forEach((rec) => {
          if (rec.rates.includes(rate.id)) {
            standardRoomObject.recommendations.push({
              id: rec.id,
              rates: [rate],
              room: rooms.find(
                (room) => room.id === rate.occupancies[0].roomId
              ),
            });
          }
        });
      }
    });

    standardRoomObject.roomInfo = standardRoom;
    groupedData.push(standardRoomObject);
  });

  return groupedData;
}

export function getCurrencySymbol(currency) {
  switch (currency) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    default:
      return "$";
  }
}

export function parseHtmlString(value) {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(value, "text/html");

  const policyText = htmlDoc.body.textContent.replace(/<br\s*\/?>/g, "\n");
  return policyText;
}

export function filterRooms(sortedDataArray, filter) {
  switch (filter) {
    case "refundable":
      const refundableRates =
        sortedDataArray &&
        sortedDataArray
          .map((item) => {
            const containsBedAndBreakfast = item.rates.filter(
              (rate) => rate.refundability === "Refundable"
            );
            const filteredRecommendations = item.recommendations.filter(
              (recommendation) =>
                recommendation.rates[0].refundability === "Refundable"
            );
            if (
              filteredRecommendations.length > 0 &&
              containsBedAndBreakfast.length > 0
            ) {
              return {
                ...item,
                rates: containsBedAndBreakfast,
                recommendations: filteredRecommendations,
              };
            }
            return null;
          })
          .filter(Boolean);

      return refundableRates;
    case "bedandbreakfast":
      const bedAndBreakfastArray =
        sortedDataArray &&
        sortedDataArray
          .map((item) => {
            const containsBedAndBreakfast = item.rates.filter(
              (rate) => rate.boardBasis.type === "BedAndBreakfast"
            );
            const filteredRecommendations = item.recommendations.filter(
              (recommendation) =>
                recommendation.rates[0].boardBasis.type === "BedAndBreakfast"
            );
            if (
              filteredRecommendations.length > 0 &&
              containsBedAndBreakfast.length > 0
            ) {
              return {
                ...item,
                rates: containsBedAndBreakfast,
                recommendations: filteredRecommendations,
              };
            }
            return null;
          })
          .filter(Boolean);
      return bedAndBreakfastArray;
    case "accessible":
      const accessibleRoomsArray = [];
      sortedDataArray.forEach((item) => {
        if (item.roomInfo.name.includes("Accessible")) {
          accessibleRoomsArray.push(item);
        }
      });
      return accessibleRoomsArray;
    case "loyalty":
      const loyalityRoomsArray = [];

      return loyalityRoomsArray;
    default:
      return sortedDataArray;
  }
}
