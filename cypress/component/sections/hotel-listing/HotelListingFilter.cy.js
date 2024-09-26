import HotelListingFilter from "@/components/sections/hotel-listing/HotelListingFilter";

describe("HotelListingFilter", () => {
  it("renders the component with the correct content given empty hotels data", () => {
    const hotels = [];
    const selectedFilters = {
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
    };

    cy.mount(
      <HotelListingFilter
        hotels={hotels}
        filteredHotels={hotels}
        selectedFilters={selectedFilters}
        handleSelectedFilters={cy.stub().as("handleSelectedFilters")}
      />
    );

    cy.get("#name-filter").should("exist");
    cy.get("#price-min-filter").should("exist");
    cy.get("#price-max-filter").should("exist");
    cy.get(".full-star").should("have.length", 1);
    cy.get(".gray-star").should("have.length", 5);
    cy.get("#free-refundable-filter").should("exist");
    cy.get("#swimming-pool-filter").should("exist");
    cy.get("#wifi-filter").should("exist");
    cy.get("#parking-filter").should("exist");
    cy.get("#breakfast-filter").should("exist");
    cy.get("#business-center-filter").should("exist");
    cy.get("#bar-filter").should("exist");
    cy.get("#type-hotel").should("not.exist");
    cy.get("#type-villa").should("not.exist");
    cy.get("#type-resort").should("not.exist");
    cy.get("#type-house").should("not.exist");
    cy.get("#type-palace").should("not.exist");
    cy.get("#type-apartment").should("not.exist");
    cy.get("#type-condo").should("not.exist");
    cy.get("#type-inn").should("exist");
  });

  it("renders the component with the correct content given hotels data", () => {
    const hotels = [
      {
        id: "41486532",
        relevanceScore: "30.7",
        rate: {
          totalRate: 2419,
          publishedRate: 3534.1515,
          baseRate: 3534.1515,
          commission: 0,
          taxes: 0,
          fees: 0,
          discounts: 0,
          providerId: "ci-hbb2b-live",
          providerName: "hotelbeds",
          distributionType: "Unknown",
          distributionChannel: "Any",
          type: "Negotiated",
          publishedRateProviderId: "ci-hbb2b-live",
          publishedRateProviderName: "hotelbeds",
          payAtHotel: false,
          otherRateComponents: [
            {
              amount: -785.367,
              description: "Agency Discount",
              type: "Discount",
              isIncludedInBaseRate: false,
            },
            {
              amount: 916.2615,
              description: "Agency Markup",
              type: "Markup",
              isIncludedInBaseRate: false,
            },
            {
              amount: 329.85414000000003,
              description: "Agency Fee",
              type: "Fee",
            },
          ],
          publishedBaseRate: 0,
          cancellationPolicy: [
            {
              text: "All times are in the local timezone of the hotel",
              rules: [
                {
                  value: 2617.89,
                  valueType: "Amount",
                  estimatedValue: 2617.89,
                  start: "2024-01-15T07:59:00Z",
                  end: "2024-01-18T00:00:00Z",
                },
              ],
            },
          ],
          additionalInformation: [],
          isChildConvertedToAdult: false,
          totalRateOld: 2748.7845,
          baseRateOld: 3534.1515,
          dailyTotalRate: 346,
          dailyPublishedRate: 505,
          totalTripRate: 2420,
        },
        isNewInResult: true,
        moreRatesExpected: true,
        isRecommended: false,
        options: {
          freeBreakfast: false,
          freeCancellation: false,
          refundable: true,
          payAtHotel: false,
          contractedRateExists: false,
          roomOnly: true,
          halfBoard: false,
          fullBoard: false,
          isGstMandatory: false,
          isPANMandatory: true,
          allInclusive: false,
          isPrivateDistribution: false,
          isPublicDistribution: false,
          isOptimizedDistribution: false,
          isCorporateDistribution: false,
        },
        name: "Caesars Suites At Caesars Palace",
        providerId: "RateHawk",
        providerHotelId: "anthology_suites_and_villas_at_caesars_palace",
        providerName: "RateHawk",
        language: "en-US",
        geoCode: {
          lat: "36.117367",
          long: "-115.17292",
        },
        contact: {
          address: {
            line1: "3570 Las Vegas Boulevard South, Las Vegas",
            city: {
              code: "2008",
              name: "Las Vegas",
            },
            state: {},
            country: {
              code: "US",
              name: "United States Of America",
            },
            postalCode: "89109",
            destinationCode: "2008",
          },
          phones: ["81018662275938"],
          fax: [],
          emails: ["lvwholesale@caesars.com"],
        },
        chainName: "No chain",
        type: "Palace",
        category: "Palace",
        starRating: "5",
        facilityGroups: [
          {
            id: "1",
            name: "Parking",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "4",
            name: "Casino",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "36",
            name: "Night Club",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "6",
            name: "Business Center",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "7",
            name: "Currency Exchange",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "8",
            name: "Bar",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "9",
            name: "Spa",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "11",
            name: "Television",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "12",
            name: "Laundry Services",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "13",
            name: "Swimming Pool",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "14",
            name: "Restaurant",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "16",
            name: "Internet",
            culture: "en-us",
            type: "Room",
          },
          {
            id: "17",
            name: "Fitness Facility",
            culture: "en-us",
            type: "Room",
          },
          {
            id: "48",
            name: "ATM",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "49",
            name: "Concierge Services",
            culture: "en-us",
            type: "Hotel",
          },
        ],
        heroImage:
          "https://cdn.worldota.net/t/1024x768/content/1c/4e/1c4eddbc32780ef80ba0a82528a7c7b45b97d5a7.jpeg",
        distance: "0.3",
        ratePlanTypes: [],
        imageCount: "95",
      },
      {
        id: "39693536",
        relevanceScore: "30.7",
        rate: {
          totalRate: 3126,
          publishedRate: 4566.2265,
          baseRate: 4566.2265,
          commission: 0,
          taxes: 0,
          fees: 0,
          discounts: 0,
          providerId: "ci-hbb2b-live",
          providerName: "hotelbeds",
          distributionType: "Unknown",
          distributionChannel: "Any",
          type: "Negotiated",
          publishedRateProviderId: "ci-hbb2b-live",
          publishedRateProviderName: "hotelbeds",
          payAtHotel: false,
          otherRateComponents: [
            {
              amount: -1014.717,
              description: "Agency Discount",
              type: "Discount",
              isIncludedInBaseRate: false,
            },
            {
              amount: 1183.8365,
              description: "Agency Markup",
              type: "Markup",
              isIncludedInBaseRate: false,
            },
            {
              amount: 426.18113999999997,
              description: "Agency Fee",
              type: "Fee",
            },
          ],
          publishedBaseRate: 0,
          cancellationPolicy: [
            {
              text: "All times are in the local timezone of the hotel",
              rules: [
                {
                  value: 3382.39,
                  valueType: "Amount",
                  estimatedValue: 3382.39,
                  start: "2023-12-18T23:59:00Z",
                  end: "2024-01-18T00:00:00Z",
                },
              ],
            },
          ],
          additionalInformation: [],
          isChildConvertedToAdult: false,
          totalRateOld: 3551.5095,
          baseRateOld: 4566.2265,
          dailyTotalRate: 447,
          dailyPublishedRate: 653,
          totalTripRate: 3126,
        },
        isNewInResult: true,
        moreRatesExpected: true,
        isRecommended: false,
        options: {
          freeBreakfast: false,
          freeCancellation: false,
          refundable: true,
          payAtHotel: false,
          contractedRateExists: false,
          roomOnly: true,
          halfBoard: false,
          fullBoard: false,
          isGstMandatory: false,
          isPANMandatory: true,
          allInclusive: false,
          isPrivateDistribution: false,
          isPublicDistribution: false,
          isOptimizedDistribution: false,
          isCorporateDistribution: false,
        },
        name: "Nobu Hotel at Caesars Palace",
        providerId: "RateHawk",
        providerHotelId: "nobu_hotel",
        providerName: "RateHawk",
        language: "en-US",
        geoCode: {
          lat: "36.117367",
          long: "-115.17297",
        },
        contact: {
          address: {
            line1: "3570 Las Vegas Boulevard South, Las Vegas",
            city: {
              code: "2008",
              name: "Las Vegas",
            },
            state: {},
            country: {
              code: "US",
              name: "United States Of America",
            },
            postalCode: "NV89109",
            destinationCode: "2008",
          },
          phones: ["18007274923"],
          fax: [],
          emails: ["lvwholesale@caesars.com"],
        },
        chainName: "No chain",
        type: "",
        category: "",
        starRating: "5",
        facilityGroups: [
          {
            id: "1",
            name: "Parking",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "34",
            name: "Disable Friendly",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "4",
            name: "Casino",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "36",
            name: "Night Club",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "5",
            name: "Breakfast",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "6",
            name: "Business Center",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "7",
            name: "Currency Exchange",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "8",
            name: "Bar",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "9",
            name: "Spa",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "10",
            name: "Non Smoking",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "11",
            name: "Television",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "43",
            name: "Karaoke",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "12",
            name: "Laundry Services",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "13",
            name: "Swimming Pool",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "14",
            name: "Restaurant",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "16",
            name: "Internet",
            culture: "en-us",
            type: "Room",
          },
          {
            id: "17",
            name: "Fitness Facility",
            culture: "en-us",
            type: "Room",
          },
          {
            id: "48",
            name: "ATM",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "49",
            name: "Concierge Services",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "24",
            name: "Room service",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "30",
            name: "Medical",
            culture: "en-us",
            type: "Hotel",
          },
        ],
        heroImage:
          "https://cdn.worldota.net/t/1024x768/content/b7/70/b770c7569d7901499a8a97565c7b80082fd82bb4.jpeg",
        distance: "0.3",
        ratePlanTypes: [],
        imageCount: "247",
      },
      {
        id: "39688211",
        relevanceScore: "30.61",
        rate: {
          totalRate: 2475,
          publishedRate: 3615.327,
          baseRate: 3615.327,
          commission: 0,
          taxes: 0,
          fees: 0,
          discounts: 0,
          providerId: "ci-hbb2b-live",
          providerName: "hotelbeds",
          distributionType: "Unknown",
          distributionChannel: "Any",
          type: "Negotiated",
          publishedRateProviderId: "ci-hbb2b-live",
          publishedRateProviderName: "hotelbeds",
          payAtHotel: false,
          otherRateComponents: [
            {
              amount: -803.406,
              description: "Agency Discount",
              type: "Discount",
              isIncludedInBaseRate: false,
            },
            {
              amount: 937.307,
              description: "Agency Markup",
              type: "Markup",
              isIncludedInBaseRate: false,
            },
            {
              amount: 337.43051999999994,
              description: "Agency Fee",
              type: "Fee",
            },
          ],
          publishedBaseRate: 0,
          cancellationPolicy: [
            {
              text: "All times are in the local timezone of the hotel",
              rules: [
                {
                  value: 2678.02,
                  valueType: "Amount",
                  estimatedValue: 2678.02,
                  start: "2024-01-15T07:59:00Z",
                  end: "2024-01-18T00:00:00Z",
                },
              ],
            },
          ],
          additionalInformation: [],
          isChildConvertedToAdult: false,
          totalRateOld: 2811.921,
          baseRateOld: 3615.327,
          dailyTotalRate: 354,
          dailyPublishedRate: 517,
          totalTripRate: 2475,
        },
        isNewInResult: true,
        moreRatesExpected: true,
        isRecommended: false,
        options: {
          freeBreakfast: false,
          freeCancellation: false,
          refundable: true,
          payAtHotel: false,
          contractedRateExists: false,
          roomOnly: true,
          halfBoard: false,
          fullBoard: false,
          isGstMandatory: false,
          isPANMandatory: true,
          allInclusive: false,
          isPrivateDistribution: false,
          isPublicDistribution: false,
          isOptimizedDistribution: false,
          isCorporateDistribution: false,
        },
        name: "Bellagio",
        providerId: "RateHawk",
        providerHotelId: "bellagio",
        providerName: "RateHawk",
        language: "en-US",
        geoCode: {
          lat: "36.113007",
          long: "-115.17672",
        },
        contact: {
          address: {
            line1: "3600 Las Vegas Blvd S, Las Vegas",
            city: {
              code: "2008",
              name: "Las Vegas",
            },
            state: {},
            country: {
              code: "US",
              name: "United States Of America",
            },
            postalCode: "NV89109",
            destinationCode: "2008",
          },
          phones: ["+1 888-987-6667"],
          fax: [],
          emails: ["bellagioguestservices@bellagioresort.com"],
        },
        chainName: "MGM Resorts",
        type: "",
        category: "",
        starRating: "5",
        facilityGroups: [
          {
            id: "1",
            name: "Parking",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "3",
            name: "Childcare Service",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "34",
            name: "Disable Friendly",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "4",
            name: "Casino",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "5",
            name: "Breakfast",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "6",
            name: "Business Center",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "7",
            name: "Currency Exchange",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "8",
            name: "Bar",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "9",
            name: "Spa",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "10",
            name: "Non Smoking",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "11",
            name: "Television",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "12",
            name: "Laundry Services",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "13",
            name: "Swimming Pool",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "14",
            name: "Restaurant",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "15",
            name: "Pets Allowed",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "16",
            name: "Internet",
            culture: "en-us",
            type: "Room",
          },
          {
            id: "17",
            name: "Fitness Facility",
            culture: "en-us",
            type: "Room",
          },
          {
            id: "48",
            name: "ATM",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "18",
            name: "Airport Shuttle",
            culture: "en-us",
            type: "Room",
          },
          {
            id: "49",
            name: "Concierge Services",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "22",
            name: "Suite",
            culture: "en-us",
            type: "Room",
          },
          {
            id: "24",
            name: "Room service",
            culture: "en-us",
            type: "Hotel",
          },
        ],
        heroImage:
          "https://cdn.worldota.net/t/1024x768/content/05/26/05265890deba26675fbfa4d585c0f7cb9c501618.jpeg",
        distance: "0.39",
        ratePlanTypes: [],
        imageCount: "90",
      },
      {
        id: "39628779",
        relevanceScore: "30.42",
        rate: {
          totalRate: 2807,
          publishedRate: 4100.679,
          baseRate: 4100.679,
          commission: 0,
          taxes: 0,
          fees: 0,
          discounts: 0,
          providerId: "ci-hbb2b-live",
          providerName: "hotelbeds",
          distributionType: "Unknown",
          distributionChannel: "Any",
          type: "Negotiated",
          publishedRateProviderId: "ci-hbb2b-live",
          publishedRateProviderName: "hotelbeds",
          payAtHotel: false,
          otherRateComponents: [
            {
              amount: -911.262,
              description: "Agency Discount",
              type: "Discount",
              isIncludedInBaseRate: false,
            },
            {
              amount: 1063.139,
              description: "Agency Markup",
              type: "Markup",
              isIncludedInBaseRate: false,
            },
            {
              amount: 382.73004,
              description: "Agency Fee",
              type: "Fee",
            },
          ],
          publishedBaseRate: 0,
          cancellationPolicy: [
            {
              text: "All times are in the local timezone of the hotel",
              rules: [
                {
                  value: 3037.54,
                  valueType: "Amount",
                  estimatedValue: 3037.54,
                  start: "2024-01-14T23:59:00Z",
                  end: "2024-01-18T00:00:00Z",
                },
              ],
            },
          ],
          additionalInformation: [],
          isChildConvertedToAdult: false,
          totalRateOld: 3189.417,
          baseRateOld: 4100.679,
          dailyTotalRate: 401,
          dailyPublishedRate: 586,
          totalTripRate: 2808,
        },
        isNewInResult: true,
        moreRatesExpected: true,
        isRecommended: false,
        options: {
          freeBreakfast: false,
          freeCancellation: false,
          refundable: true,
          payAtHotel: false,
          contractedRateExists: false,
          roomOnly: true,
          halfBoard: false,
          fullBoard: false,
          isGstMandatory: false,
          isPANMandatory: true,
          allInclusive: false,
          isPrivateDistribution: false,
          isPublicDistribution: false,
          isOptimizedDistribution: false,
          isCorporateDistribution: false,
        },
        name: "The Cosmopolitan Of Las Vegas",
        providerId: "RateHawk",
        providerHotelId: "the_cosmopolitan_of_las_vegas",
        providerName: "RateHawk",
        language: "en-US",
        geoCode: {
          lat: "36.109715",
          long: "-115.17505",
        },
        contact: {
          address: {
            line1: "3708 Las Vegas Blvd S, Las Vegas",
            city: {
              code: "2008",
              name: "Las Vegas",
            },
            state: {},
            country: {
              code: "US",
              name: "United States Of America",
            },
            postalCode: "89109",
            destinationCode: "2008",
          },
          phones: ["81017026987100"],
          fax: [],
          emails: ["resortservices@cosmopolitanlasvegas.com"],
        },
        chainName: "MGM Resorts",
        type: "",
        category: "",
        starRating: "5",
        facilityGroups: [
          {
            id: "1",
            name: "Parking",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "3",
            name: "Childcare Service",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "34",
            name: "Disable Friendly",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "4",
            name: "Casino",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "36",
            name: "Night Club",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "5",
            name: "Breakfast",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "6",
            name: "Business Center",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "7",
            name: "Currency Exchange",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "8",
            name: "Bar",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "9",
            name: "Spa",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "10",
            name: "Non Smoking",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "11",
            name: "Television",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "12",
            name: "Laundry Services",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "13",
            name: "Swimming Pool",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "14",
            name: "Restaurant",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "15",
            name: "Pets Allowed",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "16",
            name: "Internet",
            culture: "en-us",
            type: "Room",
          },
          {
            id: "17",
            name: "Fitness Facility",
            culture: "en-us",
            type: "Room",
          },
          {
            id: "48",
            name: "ATM",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "18",
            name: "Airport Shuttle",
            culture: "en-us",
            type: "Room",
          },
          {
            id: "49",
            name: "Concierge Services",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "50",
            name: "Billiards",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "51",
            name: "Tennis",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "21",
            name: "Golf",
            culture: "en-us",
            type: "Room",
          },
          {
            id: "24",
            name: "Room service",
            culture: "en-us",
            type: "Hotel",
          },
        ],
        heroImage:
          "https://cdn.worldota.net/t/1024x768/content/2f/2b/2f2bc466ecc945a20e0573528e64e2b038469aff.jpeg",
        distance: "0.58",
        ratePlanTypes: [],
        imageCount: "112",
      },
      {
        id: "38758379",
        relevanceScore: "30.23",
        rate: {
          totalRate: 1852,
          publishedRate: 2704.455,
          baseRate: 2704.455,
          commission: 0,
          taxes: 0,
          fees: 0,
          discounts: 0,
          providerId: "ci-hbb2b-live",
          providerName: "hotelbeds",
          distributionType: "Unknown",
          distributionChannel: "Any",
          type: "Negotiated",
          publishedRateProviderId: "ci-hbb2b-live",
          publishedRateProviderName: "hotelbeds",
          payAtHotel: false,
          otherRateComponents: [
            {
              amount: -600.99,
              description: "Agency Discount",
              type: "Discount",
              isIncludedInBaseRate: false,
            },
            {
              amount: 701.155,
              description: "Agency Markup",
              type: "Markup",
              isIncludedInBaseRate: false,
            },
            {
              amount: 252.41580000000002,
              description: "Agency Fee",
              type: "Fee",
            },
          ],
          publishedBaseRate: 0,
          cancellationPolicy: [
            {
              text: "All times are in the local timezone of the hotel",
              rules: [
                {
                  value: 2003.3,
                  valueType: "Amount",
                  estimatedValue: 2003.3,
                  start: "2024-01-15T07:59:00Z",
                  end: "2024-01-18T00:00:00Z",
                },
              ],
            },
          ],
          additionalInformation: [],
          isChildConvertedToAdult: false,
          totalRateOld: 2103.465,
          baseRateOld: 2704.455,
          dailyTotalRate: 265,
          dailyPublishedRate: 387,
          totalTripRate: 1852,
        },
        isNewInResult: true,
        moreRatesExpected: true,
        isRecommended: false,
        options: {
          freeBreakfast: false,
          freeCancellation: false,
          refundable: true,
          payAtHotel: false,
          contractedRateExists: false,
          roomOnly: true,
          halfBoard: false,
          fullBoard: false,
          isGstMandatory: false,
          isPANMandatory: true,
          allInclusive: false,
          isPrivateDistribution: false,
          isPublicDistribution: false,
          isOptimizedDistribution: false,
          isCorporateDistribution: false,
        },
        name: "Vdara Hotel & Spa at ARIA Las Vegas",
        providerId: "RateHawk",
        providerHotelId: "vdara_hotel__spa",
        providerName: "RateHawk",
        language: "en-US",
        geoCode: {
          lat: "36.109043",
          long: "-115.17786",
        },
        contact: {
          address: {
            line1: "2600 West Harmon Avenue, Las Vegas",
            city: {
              code: "2008",
              name: "Las Vegas",
            },
            state: {},
            country: {
              code: "US",
              name: "United States Of America",
            },
            postalCode: "NV89109",
            destinationCode: "2008",
          },
          phones: ["81018667457111"],
          fax: [],
          emails: ["guestservices@vdara.com"],
        },
        chainName: "MGM Resorts",
        type: "Hotel",
        category: "Hotel",
        starRating: "5",
        facilityGroups: [
          {
            id: "31",
            name: "Sauna",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "1",
            name: "Parking",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "34",
            name: "Disable Friendly",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "36",
            name: "Night Club",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "5",
            name: "Breakfast",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "6",
            name: "Business Center",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "7",
            name: "Currency Exchange",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "8",
            name: "Bar",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "9",
            name: "Spa",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "10",
            name: "Non Smoking",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "11",
            name: "Television",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "12",
            name: "Laundry Services",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "13",
            name: "Swimming Pool",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "14",
            name: "Restaurant",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "15",
            name: "Pets Allowed",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "16",
            name: "Internet",
            culture: "en-us",
            type: "Room",
          },
          {
            id: "17",
            name: "Fitness Facility",
            culture: "en-us",
            type: "Room",
          },
          {
            id: "48",
            name: "ATM",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "49",
            name: "Concierge Services",
            culture: "en-us",
            type: "Hotel",
          },
          {
            id: "21",
            name: "Golf",
            culture: "en-us",
            type: "Room",
          },
          {
            id: "24",
            name: "Room service",
            culture: "en-us",
            type: "Hotel",
          },
        ],
        heroImage:
          "https://cdn.worldota.net/t/1024x768/content/b3/df/b3df44477ccb9e11d2e0eac06e0fef51ce9c0e14.jpeg",
        distance: "0.77",
        ratePlanTypes: [],
        imageCount: "95",
      },
    ];

    const selectedFilters = {
      searchFilter: "Sample hotel",
      priceMinFilter: "100",
      priceMaxFilter: "200",
      starRatingFilter: ["4", "5"],
      refundableFilter: true,
      swimmingPoolFilter: false,
      internetFilter: true,
      parkingFilter: false,
      breakfastFilter: true,
      businessCenterFilter: false,
      barFilter: false,
      hotelFilter: true,
      villaFilter: false,
      resortFilter: false,
      houseFilter: false,
      palaceFilter: false,
      apartmentFilter: false,
      condoFilter: false,
      innFilter: true,
    };

    cy.mount(
      <HotelListingFilter
        hotels={hotels}
        filteredHotels={hotels}
        selectedFilters={selectedFilters}
        handleSelectedFilters={cy.stub().as("handleSelectedFilters")}
      />
    );

    cy.get("#name-filter").should("exist");
    cy.get("#price-min-filter").should("exist");
    cy.get("#price-max-filter").should("exist");
    cy.get(".full-star").should("have.length", 2);
    cy.get(".gray-star").should("have.length", 4);
    cy.get("#free-refundable-filter").should("be.checked");
    cy.get("#swimming-pool-filter").should("not.be.checked");
    cy.get("#wifi-filter").should("be.checked");
    cy.get("#parking-filter").should("not.be.checked");
    cy.get("#breakfast-filter").should("be.checked");
    cy.get("#business-center-filter").should("not.be.checked");
    cy.get("#bar-filter").should("not.be.checked");
    cy.get("#type-hotel").should("be.checked");
    cy.get("#type-villa").should("not.exist");
    cy.get("#type-resort").should("not.exist");
    cy.get("#type-house").should("not.exist");
    cy.get("#type-palace").should("exist");
    cy.get("#type-apartment").should("not.exist");
    cy.get("#type-condo").should("not.exist");
    cy.get("#type-inn").should("be.checked");
  });
});
