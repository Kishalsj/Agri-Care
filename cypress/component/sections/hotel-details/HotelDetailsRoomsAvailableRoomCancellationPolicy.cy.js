import HotelDetailsRoomsAvailableRoomCancellationPolicy from "@/components/sections/hotel-details/HotelDetailsRoomsAvailableRoomCancellationPolicy";

describe("HotelDetailsRoomsAvailableRoomCancellationPolicy", () => {
  it("renders cancellation policy options", () => {
    const mockRecommendations = [
      {
        id: "df2aad2c-2c9d-4bf9-8fad-a717e5f059a4",
        rates: [
          {
            id: "m-435cf982-1cd4-5337-91dc-0f3cfbd0309e",
            availability: "3",
            needsPriceCheck: true,
            providerId: "ci-ratehawk-live",
            providerName: "RateHawk",
            isContractedRate: false,
            occupancies: [
              {
                roomId: "23729ea7-4021-44b9-8eb8-6aa27e78ead6",
                stdRoomId: "9",
                numOfAdults: "2",
                numOfChildren: "0",
                childAges: [],
              },
            ],
            type: "Negotiated",
            baseRate: 3830.19,
            totalRate: 2947,
            minSellingRate: 0,
            publishedRate: 4569.2235,
            currency: "USD",
            publishedRateProviderId: "ci-hbb2b-live",
            publishedRateProviderName: "hotelbeds",
            taxes: [
              {
                amount: 54.28,
                description: "city_tax",
                isIncludedInBaseRate: false,
              },
              {
                amount: 420.68,
                description: "occupancy_tax",
                isIncludedInBaseRate: false,
              },
            ],
            dailyRates: [
              {
                amount: 615.02,
                date: "2024-01-20T00:00:00",
                taxIncluded: true,
                discount: 0,
              },
              {
                amount: 615.02,
                date: "2024-01-21T00:00:00",
                taxIncluded: true,
                discount: 0,
              },
              {
                amount: 615.02,
                date: "2024-01-22T00:00:00",
                taxIncluded: true,
                discount: 0,
              },
              {
                amount: 615.02,
                date: "2024-01-23T00:00:00",
                taxIncluded: true,
                discount: 0,
              },
              {
                amount: 615.02,
                date: "2024-01-24T00:00:00",
                taxIncluded: true,
                discount: 0,
              },
              {
                amount: 615.02,
                date: "2024-01-25T00:00:00",
                taxIncluded: true,
                discount: 0,
              },
              {
                amount: 615.02,
                date: "2024-01-26T00:00:00",
                taxIncluded: true,
                discount: 0,
              },
            ],
            refundable: true,
            refundability: "Refundable",
            allGuestsInfoRequired: true,
            onlineCancellable: true,
            specialRequestSupported: false,
            payAtHotel: false,
            cardRequired: true,
            policies: [
              {
                type: "Meals",
                text: "Information about the type of meals included in the price is indicated in the rate details.",
              },
              {
                type: "Children and information about extra beds",
                text: "Fee for an extra bed: 25.00 USD per night.,The number of extra beds depends on the room category. You must take a look at the information about the size of the selected room.",
              },
              {
                type: "Special living conditions",
                text: "A deposit of 300.00 USD per stay will be required by bank transfer upon arrival to cover any potential damages.",
              },
              {
                type: "Pets",
                text: "Pets are allowed for an additional fee. Price of accommodation: 150.00 USD per stay.",
              },
            ],
            boardBasis: {
              description: "nomeal",
              type: "RoomOnly",
            },
            offers: [],
            cancellationPolicies: [
              {
                rules: [
                  {
                    value: 0,
                    valueType: "Amount",
                    estimatedValue: 0,
                    start: "2023-12-21T00:00:00",
                    end: "2024-01-18T02:00:00",
                  },
                  {
                    value: 593.45,
                    valueType: "Amount",
                    estimatedValue: 593.45,
                    start: "2024-01-18T02:00:00",
                    end: "2024-01-21T00:00:00",
                  },
                  {
                    value: 3348.45,
                    valueType: "Amount",
                    estimatedValue: 3348.45,
                    start: "2024-01-21T00:00:00",
                    end: "2024-01-20T00:00:00",
                  },
                ],
              },
            ],
            additionalCharges: [],
            depositRequired: false,
            guaranteeRequired: true,
            otherRateComponents: [
              {
                amount: -956.7,
                description: "Agency Discount applied on totalAmount",
                type: "Discount",
                isIncludedInBaseRate: false,
              },
              {
                amount: 1116.15,
                description: "Agency Markup applied on totalAmount",
                type: "Markup",
                isIncludedInBaseRate: false,
              },
              {
                amount: 401.81399999999996,
                description: "Agency Fee",
                type: "Fee",
              },
            ],
            distributionType: "Unknown",
            distributionChannel: "Any",
            publishedBaseRate: 4556.823070778473,
            IsPassportMandatory: false,
            IsPANMandatory: false,
            providerHotelId: "sls_hotel_at_beverly_hills",
            isChildConvertedToAdult: false,
            totalRateOld: 3348.45,
            baseRateOld: 3830.19,
            dailyTotalRate: 421,
            dailyPublishedRate: 653,
          },
        ],
        room: {
          id: "23729ea7-4021-44b9-8eb8-6aa27e78ead6",
          name: "1 Bedroom Double Suite (full double bed)",
          description: "1 Bedroom Double Suite (full double bed)",
          beds: [
            {
              type: "full double bed",
              count: "0",
            },
          ],
          smokingAllowed: false,
          facilities: [
            {
              name: "has_bathroom",
            },
            {
              name: "1-bedroom",
            },
            {
              name: "non-smoking",
            },
          ],
          views: [],
        },
      },
    ];
    const mockSelectedRecommendation = {
      id: "df2aad2c-2c9d-4bf9-8fad-a717e5f059a4",
      rates: [
        {
          id: "m-435cf982-1cd4-5337-91dc-0f3cfbd0309e",
          availability: "3",
          needsPriceCheck: true,
          providerId: "ci-ratehawk-live",
          providerName: "RateHawk",
          isContractedRate: false,
          occupancies: [
            {
              roomId: "23729ea7-4021-44b9-8eb8-6aa27e78ead6",
              stdRoomId: "9",
              numOfAdults: "2",
              numOfChildren: "0",
              childAges: [],
            },
          ],
          type: "Negotiated",
          baseRate: 3830.19,
          totalRate: 2947,
          minSellingRate: 0,
          publishedRate: 4569.2235,
          currency: "USD",
          publishedRateProviderId: "ci-hbb2b-live",
          publishedRateProviderName: "hotelbeds",
          taxes: [
            {
              amount: 54.28,
              description: "city_tax",
              isIncludedInBaseRate: false,
            },
            {
              amount: 420.68,
              description: "occupancy_tax",
              isIncludedInBaseRate: false,
            },
          ],
          dailyRates: [
            {
              amount: 615.02,
              date: "2024-01-20T00:00:00",
              taxIncluded: true,
              discount: 0,
            },
            {
              amount: 615.02,
              date: "2024-01-21T00:00:00",
              taxIncluded: true,
              discount: 0,
            },
            {
              amount: 615.02,
              date: "2024-01-22T00:00:00",
              taxIncluded: true,
              discount: 0,
            },
            {
              amount: 615.02,
              date: "2024-01-23T00:00:00",
              taxIncluded: true,
              discount: 0,
            },
            {
              amount: 615.02,
              date: "2024-01-24T00:00:00",
              taxIncluded: true,
              discount: 0,
            },
            {
              amount: 615.02,
              date: "2024-01-25T00:00:00",
              taxIncluded: true,
              discount: 0,
            },
            {
              amount: 615.02,
              date: "2024-01-26T00:00:00",
              taxIncluded: true,
              discount: 0,
            },
          ],
          refundable: true,
          refundability: "Refundable",
          allGuestsInfoRequired: true,
          onlineCancellable: true,
          specialRequestSupported: false,
          payAtHotel: false,
          cardRequired: true,
          policies: [
            {
              type: "Meals",
              text: "Information about the type of meals included in the price is indicated in the rate details.",
            },
            {
              type: "Children and information about extra beds",
              text: "Fee for an extra bed: 25.00 USD per night.,The number of extra beds depends on the room category. You must take a look at the information about the size of the selected room.",
            },
            {
              type: "Special living conditions",
              text: "A deposit of 300.00 USD per stay will be required by bank transfer upon arrival to cover any potential damages.",
            },
            {
              type: "Pets",
              text: "Pets are allowed for an additional fee. Price of accommodation: 150.00 USD per stay.",
            },
          ],
          boardBasis: {
            description: "nomeal",
            type: "RoomOnly",
          },
          offers: [],
          cancellationPolicies: [
            {
              rules: [
                {
                  value: 0,
                  valueType: "Amount",
                  estimatedValue: 0,
                  start: "2023-12-21T00:00:00",
                  end: "2024-01-18T02:00:00",
                },
                {
                  value: 593.45,
                  valueType: "Amount",
                  estimatedValue: 593.45,
                  start: "2024-01-18T02:00:00",
                  end: "2024-01-21T00:00:00",
                },
                {
                  value: 3348.45,
                  valueType: "Amount",
                  estimatedValue: 3348.45,
                  start: "2024-01-21T00:00:00",
                  end: "2024-01-20T00:00:00",
                },
              ],
            },
          ],
          additionalCharges: [],
          depositRequired: false,
          guaranteeRequired: true,
          otherRateComponents: [
            {
              amount: -956.7,
              description: "Agency Discount applied on totalAmount",
              type: "Discount",
              isIncludedInBaseRate: false,
            },
            {
              amount: 1116.15,
              description: "Agency Markup applied on totalAmount",
              type: "Markup",
              isIncludedInBaseRate: false,
            },
            {
              amount: 401.81399999999996,
              description: "Agency Fee",
              type: "Fee",
            },
          ],
          distributionType: "Unknown",
          distributionChannel: "Any",
          publishedBaseRate: 4556.823070778473,
          IsPassportMandatory: false,
          IsPANMandatory: false,
          providerHotelId: "sls_hotel_at_beverly_hills",
          isChildConvertedToAdult: false,
          totalRateOld: 3348.45,
          baseRateOld: 3830.19,
          dailyTotalRate: 421,
          dailyPublishedRate: 653,
        },
      ],
      room: {
        id: "23729ea7-4021-44b9-8eb8-6aa27e78ead6",
        name: "1 Bedroom Double Suite (full double bed)",
        description: "1 Bedroom Double Suite (full double bed)",
        beds: [
          {
            type: "full double bed",
            count: "0",
          },
        ],
        smokingAllowed: false,
        facilities: [
          {
            name: "has_bathroom",
          },
          {
            name: "1-bedroom",
          },
          {
            name: "non-smoking",
          },
        ],
        views: [],
      },
    };

    const mockSetSelectedRecommendation = () => {};

    const setDailyRate = () => {};

    cy.mount(
      <HotelDetailsRoomsAvailableRoomCancellationPolicy
        recommendations={mockRecommendations}
        selectedRecommendation={mockSelectedRecommendation}
        setSelectedRecommendation={mockSetSelectedRecommendation}
        setDailyRate={setDailyRate}
      />
    );

    cy.get('.flex-1 input[type="radio"]').first().check();

    cy.get(".hotel-details-cancellation-policy").should("exist");

    cy.get('.flex-1 input[type="radio"]').should("have.length.greaterThan", 0);

    cy.get(".hotel-details-cancellation-policy").first().click();
  });
});
