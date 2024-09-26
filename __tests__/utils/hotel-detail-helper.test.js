import {
  filterRecommendations,
  extractNumberFromHotelName,
  computePriceDifference,
  filterRateOccupancyByStandardRoomId,
  groupByStandardizedRoomId,
  getCurrencySymbol,
  parseHtmlString,
  filterRooms,
} from "@/utils/hotel-detail-helper";

describe("Hotel Detail Helper", () => {
  describe("filterRecommendations", () => {
    it("should filter recommendations based on refundability and board basis", () => {
      const recommendations = [
        {
          rates: [
            {
              refundability: "unknown",
              boardBasis: {
                type: "RoomOnly",
              },
              cancellationPolicies: [
                {
                  rules: [
                    {
                      end: "2023-12-31",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          rates: [
            {
              refundability: "NonRefundable",
              boardBasis: {
                type: "BedAndBreakfast",
              },
              cancellationPolicies: [
                {
                  rules: [
                    {
                      end: "2023-12-30",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          rates: [
            {
              refundability: "Refundable",
              boardBasis: {
                type: "RoomOnly",
              },
              cancellationPolicies: [
                {
                  rules: [
                    {
                      end: "2023-12-29",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];

      const filteredRecommendations = filterRecommendations(recommendations);

      expect(filteredRecommendations).toHaveLength(2); // Only 2 recommendations should pass the filtering
      expect(filteredRecommendations[0].rates[0].refundability).toBe("unknown");
      expect(filteredRecommendations[1].rates[0].refundability).toBe(
        "Refundable"
      );
    });

    it("should handle empty recommendations array", () => {
      const recommendations = [];
      const filteredRecommendations = filterRecommendations(recommendations);
      expect(filteredRecommendations).toHaveLength(0);
    });
  });

  describe("extractNumberFromHotelName", () => {
    it("should extract a number from the hotel name", () => {
      const hotelNameWithNumber = "Hotel123 Example";
      const hotelNameWithoutNumber = "NoNumber Hotel";

      const resultWithNumber = extractNumberFromHotelName(hotelNameWithNumber);
      const resultWithoutNumber = extractNumberFromHotelName(
        hotelNameWithoutNumber
      );

      expect(resultWithNumber).toBe(123);
      expect(resultWithoutNumber).toBeNull();
    });

    it("should handle names with multiple numbers and return the first one", () => {
      const hotelNameWithMultipleNumbers = "Hotel123 Example456";

      const resultWithMultipleNumbers = extractNumberFromHotelName(
        hotelNameWithMultipleNumbers
      );

      expect(resultWithMultipleNumbers).toBe(123);
    });

    it("should handle names with non-numeric characters", () => {
      const hotelNameWithNonNumericChars = "Hotel No Number";

      const resultWithNonNumericChars = extractNumberFromHotelName(
        hotelNameWithNonNumericChars
      );

      expect(resultWithNonNumericChars).toBeNull();
    });
  });

  describe("computePriceDifference", () => {
    it("should compute the price difference between secondPrice and lowestPrice", () => {
      const case1 = { secondPrice: 50, lowestPrice: 30 };
      const case2 = { secondPrice: 25, lowestPrice: 25 };
      const case3 = { secondPrice: 40, lowestPrice: 55 };

      const result1 = computePriceDifference(case1);
      const result2 = computePriceDifference(case2);
      const result3 = computePriceDifference(case3);

      expect(result1).toBe(20);
      expect(result2).toBe(0);
      expect(result3).toBe(-15);
    });
  });

  describe("filterRateOccupancyByStandardRoomId", () => {
    it("should filter rates based on standardRoomId and sort them by totalRate", () => {
      const rates = [
        { occupancies: [{ stdRoomId: 1 }], totalRate: 50 },
        { occupancies: [{ stdRoomId: 2 }], totalRate: 30 },
        { occupancies: [{ stdRoomId: 1 }], totalRate: 40 },
        { occupancies: [{ stdRoomId: 3 }], totalRate: 60 },
      ];

      const standardRoomIdToFilter = 1;
      const result = filterRateOccupancyByStandardRoomId({
        rates,
        standardRoomId: standardRoomIdToFilter,
      });

      expect(result).toHaveLength(2);
      expect(result[0].totalRate).toBe(40);
      expect(result[1].totalRate).toBe(50);
    });

    it("should handle empty rates array", () => {
      const rates = [];
      const standardRoomIdToFilter = 1;
      const result = filterRateOccupancyByStandardRoomId({
        rates,
        standardRoomId: standardRoomIdToFilter,
      });

      expect(result).toHaveLength(0);
    });
  });

  describe("groupByStandardizedRoomId", () => {
    it("should group rates, recommendations, and roomInfo based on standardizedRooms", () => {
      const standardizedRooms = [
        { id: 1, name: "Room 1" },
        { id: 2, name: "Room 2" },
      ];

      const rates = [
        { id: 101, occupancies: [{ stdRoomId: 1 }], totalRate: 50 },
        { id: 102, occupancies: [{ stdRoomId: 2 }], totalRate: 30 },
        { id: 103, occupancies: [{ stdRoomId: 1 }], totalRate: 40 },
        { id: 104, occupancies: [{ stdRoomId: 2 }], totalRate: 60 },
      ];

      const rooms = [
        { id: 201, name: "Room 1", occupancy: 1 },
        { id: 202, name: "Room 2", occupancy: 2 },
      ];

      const recommendations = [
        { id: "rec1", rates: [101], room: rooms[0] },
        { id: "rec2", rates: [102], room: rooms[1] },
        { id: "rec3", rates: [103], room: rooms[0] },
        { id: "rec4", rates: [104], room: rooms[1] },
      ];

      const result = groupByStandardizedRoomId({
        standardizedRooms,
        rates,
        rooms,
        recommendations,
      });

      expect(result).toHaveLength(2);
      expect(result[0].rates).toHaveLength(2);
      expect(result[0].recommendations).toHaveLength(2);
      expect(result[0].roomInfo).toEqual(standardizedRooms[0]);
    });

    it("should handle empty standardizedRooms array", () => {
      const result = groupByStandardizedRoomId({
        standardizedRooms: [],
        rates: [],
        rooms: [],
        recommendations: [],
      });

      expect(result).toHaveLength(0);
    });
  });

  describe("getCurrencySymbol", () => {
    it("should return $ for USD", () => {
      const result = getCurrencySymbol("USD");
      expect(result).toBe("$");
    });

    it("should return € for EUR", () => {
      const result = getCurrencySymbol("EUR");
      expect(result).toBe("€");
    });

    it("should return £ for GBP", () => {
      const result = getCurrencySymbol("GBP");
      expect(result).toBe("£");
    });

    it("should return $ for unknown currency", () => {
      const result = getCurrencySymbol("XYZ");
      expect(result).toBe("$");
    });
  });

  describe("parseHtmlString", () => {
    it("should parse HTML string and replace <br> with newline character", () => {
      const htmlString = "<p>First line<br>Second line<br>Third line</p>";
      const result = parseHtmlString(htmlString);
      expect(result).toBe("First lineSecond lineThird line");
    });

    it("should handle empty HTML string", () => {
      const htmlString = "";
      const result = parseHtmlString(htmlString);
      expect(result).toBe("");
    });

    it("should handle HTML string with no <br>", () => {
      const htmlString = "<p>No line breaks</p>";
      const result = parseHtmlString(htmlString);
      expect(result).toBe("No line breaks");
    });

    it("should handle HTML string with multiple <br> tags", () => {
      const htmlString = "<p>Line 1<br>Line 2<br><br>Line 3</p>";
      const result = parseHtmlString(htmlString);
      expect(result).toBe("Line 1Line 2Line 3");
    });
  });

  describe("filterRooms", () => {
    const exampleData = [
      {
        rates: [
          {
            refundability: "Refundable",
            boardBasis: { type: "BedAndBreakfast" },
          },
          { refundability: "NonRefundable", boardBasis: { type: "RoomOnly" } },
        ],
        recommendations: [
          { rates: [{ refundability: "Refundable" }] },
          { rates: [{ refundability: "NonRefundable" }] },
        ],
        roomInfo: { name: "Room 1" },
      },
    ];

    it('should filter by "refundable"', () => {
      const result = filterRooms(exampleData, "refundable");
      expect(result).toEqual([
        {
          rates: [
            {
              refundability: "Refundable",
              boardBasis: { type: "BedAndBreakfast" },
            },
          ],
          recommendations: [{ rates: [{ refundability: "Refundable" }] }],
          roomInfo: { name: "Room 1" },
        },
      ]);
    });

    it("should return original array for unknown filter", () => {
      const result = filterRooms(exampleData, "unknownFilter");
      expect(result).toEqual(exampleData);
    });
  });
});
