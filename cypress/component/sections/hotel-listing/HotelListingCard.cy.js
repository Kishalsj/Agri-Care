import HotelListingCard from "@/components/sections/hotel-listing/HotelListingCard";

describe("HotelListingCard", () => {
  const hotel = {
    id: 1,
    name: "Sample Hotel",
    starRating: 4,
    contact: {
      address: {
        line1: "123 Main St",
      },
    },
    distance: 5,
    geoCode: {
      lat: 123,
      long: 456,
    },
    ratings: [4, 5, 3],
    facilityGroups: [
      { id: 1, name: "WiFi" },
      { id: 2, name: "Television" },
    ],
    heroImage: "sample-image.jpg",
    rate: {
      dailyPublishedRate: 100,
      dailyTotalRate: 80,
      baseRate: 120,
      totalRate: 100,
      totalTripRate: 200,
    },
    currency: "USD",
  };

  const currentDate = new Date();
  const checkIn = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate()
  ).toISOString();
  const checkOut = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate() + 7
  ).toISOString();
  const dateSelected = [checkIn, checkOut];
  const occupancies = [{ adults: 2, children: 0 }];

  beforeEach(() => {
    cy.mount(
      <HotelListingCard
        key={1}
        hotel={hotel}
        noOfDays={2}
        noOfRooms={1}
        isFetchingRateHawkData={false}
        dateSelected={dateSelected}
        occupancies={occupancies}
      />
    );
  });

  it("renders hotel details correctly", () => {
    cy.contains(hotel.name).should("be.visible");
    cy.contains(hotel.contact.address.line1).should("be.visible");
    cy.contains(hotel.rate.totalRate).should("be.visible");
    cy.contains(hotel.rate.dailyTotalRate).should("be.visible");
    cy.contains(hotel.rate.totalTripRate).should("be.visible");

    // Check if the star rating is rendered
    cy.get(`#star-rating`).find(`.full-star`).should("have.length", 4);
    cy.get(`#star-rating`).find(`.gray-star`).should("have.length", 1);

    // Check if address is visible
    cy.contains(hotel.contact.address.line1).should("be.visible");

    // Check if "Show on map" link is present
    cy.contains("Show on map").should("be.visible");

    // Check if facility icons are present
    cy.get("#wi-fi").should("be.visible");
    cy.get("#television").should("be.visible");
    cy.get("#parking").should("be.visible");
    cy.get("#internet").should("be.visible");
  });

  it("handles map modal correctly", () => {
    // Your application logic might determine the rendering of the HotelListingCard
    // Here, we assume there is a HotelListingCard rendered for the provided hotel data

    // Click on "Show on map" link to trigger modal
    cy.contains("Show on map").click({ force: true });

    // Check if the modal is visible
    cy.get(".popup-content").should("be.visible");

    // Check if modal contains the correct content
    cy.contains(hotel.name).should("be.visible");
  });
});
