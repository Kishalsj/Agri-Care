describe("Hotel Details", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");

    cy.intercept(
      {
        method: "POST",
        url: "/api/v1/rates/individualHotel/roomAndRates/availability/init/rh",
      },
      { fixture: "rateHawkAvailability" }
    ).as("fetchRateHawkAvailability");

    cy.intercept(
      {
        method: "POST",
        url: "/api/v1/rates/individualHotel/roomAndRates/availability/init",
      },
      { fixture: "nonRateHawkAvailability" }
    ).as("fetchNonRateHawkAvailability");

    // Start from the home page
    cy.visit("http://localhost:3000/");

    // The url should be "http://localhost:3000/sign-in" (Sign In Page)
    cy.url().should("equal", "http://localhost:3000/sign-in");

    // Fill in "sheleen@checkins.ai" into the "email" input field
    cy.get("#email")
      .type("testemail991015@gmail.com")
      .should("have.value", "testemail991015@gmail.com");

    // Fill in "secret!1620" into the "password" input field
    cy.get("#password").type("amila1234").should("have.value", "amila1234");

    // Click the "Continue" button
    cy.get("button[type='submit']").click();
  });

  // All tests below this comment are temporary. Component testing
  // is not yet fully supported in NextJS 14 (https://github.com/cypress-io/cypress/issues/28185)
  // so some components blow up while running their component tests (especially those that use useRouter).
  // To remedy this, we're going to temporary write E2E Tests for these components and then
  // port them to Component Tests once fully supported.
  describe("HotelDetailsRoomsAvailableRoomRecommendations", () => {
    it("renders properly", () => {
      // Click the First Hotel from Home Page
      cy.get(".psds-carousel__item").first().click();

      // Wait to redirect to Hotel Details Page
      cy.get(".hotel-details-cancellation-policy").should("have.length", 9);
      cy.get(".hotel-details-cancellation-policy:eq(0) .recommendation").should(
        "have.length",
        2
      );
      cy.get(
        ".hotel-details-cancellation-policy:eq(0) .recommendation:eq(0)"
      ).should(
        "have.text",
        "Fully Refundable Before January 16+$0Room Only(View Policy)"
      );
      cy.get(
        ".hotel-details-cancellation-policy:eq(0) .recommendation:eq(1)"
      ).should(
        "have.text",
        "Fully Refundable Before January 18+$11Room Only(View Policy)"
      );
    });
  });

  describe("HotelDetailsRoomsAvailableRoomReserve", () => {
    it("renders properly", () => {
      // Click the First Hotel from Home Page
      cy.get(".psds-carousel__item").first().click();

      // Wait to redirect to Hotel Details Page
      cy.get(".available-room:eq(0) button:contains('Reserve')").click();
      cy.get("#booking-details").should("be.visible");
    });
  });
});
