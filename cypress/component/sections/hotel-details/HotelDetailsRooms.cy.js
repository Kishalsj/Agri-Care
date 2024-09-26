import HotelDetailsRooms from "@/components/sections/hotel-details/HotelDetailsRooms";

const mockHotel = {
  id: "39714475",
  name: "SLS Hotel, a Luxury Collection Hotel, Beverly Hills",
  relevanceScore: "19",
  providerId: "RateHawk",
  providerHotelId: "sls_hotel_at_beverly_hills",
  providerName: "RateHawk",
  language: "en-US",
  geoCode: {
    lat: "34.070007",
    long: "-118.37691",
  },
  neighbourhoods: [],
  contact: {
    address: {
      line1: "465 S La Cienega Blvd, Los Angeles",
      city: {
        code: "2011",
        name: "Los Angeles",
      },
      state: {},
      country: {
        code: "US",
        name: "United States Of America",
      },
      postalCode: "CA90048",
      destinationCode: "2011",
    },
    phones: ["+13102470400"],
    fax: [],
    emails: ["slsbh.reservations@luxurycollection.com"],
  },
  chainName: "The Luxury Collection",
  type: "Hotel",
  descriptions: [
    {
      type: "Location",
      text: "Sophisticated but very comfortable hotel «SLS Hotel, a Luxury Collection Hotel, Beverly Hills» is located in Los Angeles. This hotel is located in 12 km from the city center. You can take a walk and explore the neighbourhood area of the hotel — Farmers Market, Los Angeles County Museum of Art and Hollywood/Highland.",
    },
    {
      type: "At the hotel",
      text: "You can stop by the bar. Taste the local cuisine and have a rest in the restaurant. The hotel cafe is a nice place to have a snack. Free Wi-Fi on the territory will help you to stay on-line.,Specially for tourists who travel by car, there’s a parking zone. The following services are also available for the guests: a massage room, a sauna, a spa center and a doctor. Guests who love doing sports will be able to enjoy a fitness center and a gym. Tourists who can’t live without swimming will appreciate a pool and an outdoor pool.,There are playrooms for children at the hotel. They will be having so much fun that you might have to spend the evening with adults. The tour assistance desk of the hotel will help you book an excursion. You can take your pet with you for the journey. Pets are allowed. For the free movement around the city, the hotel offers a transfer for you.,Accessibility: there is an elevator/lift. Additional services that the hotel offers to its guests: a laundry, dry cleaning, an ATM, private check-in and check-out, ironing, press, car rental, a safe-deposit box and a concierge. The staff of the hotel speaks English, Spanish, German, Russian, French and Korean.",
    },
    {
      type: "Room amenities",
      text: "The room is warmly decorated and has everything you need to have a rest after a long eventful day. There is a DVD player, an alarm clock, a TV, a mini-bar, a bathrobe and slippers. Please note that the listed services may not be available in all the rooms.",
    },
  ],
  category: "Hotel",
  starRating: "5",
  nearByAttractions: [],
  reviews: [],
  checkinInfo: {
    beginTime: "16:00:00",
    minAge: "0",
  },
  checkoutInfo: {
    time: "12:00:00",
  },
  heroImage:
    "https://cdn.worldota.net/t/1024x768/content/6f/94/6f94129d1975f164f223f519d25c36389fe5bf44.jpeg",
  distance: "0",
  attributes: [],
  ratePlanTypes: [],
  imageCount: "148",
};

const mockSearchParams = {};

describe("HotelDetailsRooms", () => {
  it("renders with default data", () => {
    cy.intercept(
      {
        method: "POST",
        url: "/api/v1/rates/individualHotel/roomAndRates/availability/init", // that have a URL that matches '/users/*'
      },
      []
    ).as("getAvailableRoomsNonRateHawk");

    cy.intercept(
      {
        method: "POST",
        url: "/api/v1/rates/individualHotel/roomAndRates/availability/init/rh", // that have a URL that matches '/users/*'
      },
      []
    ).as("getAvailableRoomsRateHawk");

    cy.mount(
      <HotelDetailsRooms hotel={mockHotel} searchParams={mockSearchParams} />
    );

    // Assertions for the rendered content
    cy.get("#room").should("exist");
    cy.get("#hotel-search").should("exist");
    cy.get("#hotel-search-date-selector").should("exist");
    cy.get("#hotel-search-travelers").should("exist");
    cy.get("#hotel-search").contains("Change Search").should("exist");
    cy.get("#hotel-details-rooms-filter").should("exist");
  });
});
