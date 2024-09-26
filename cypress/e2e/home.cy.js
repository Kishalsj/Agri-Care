describe("Home", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");

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

  it("should be able to navigate the app", () => {
    // The page should contain an h1 with "Hotel Bookings Redefined"
    cy.get("h1").contains("Find a Stay");

    // Click the "Going to" input field (this would open a dropdown)
    cy.get("#default-search").click();

    // Fill in "Singapore" into the "Where are you going" input field inside the dropdown
    cy.get(".input-container > input").type("Singapore");

    // Click the first item in the dropdown
    cy.get(".input-container > ul > li:nth-child(1)").click();

    // Click the Date Picker (input field)
    cy.get(".react-datepicker__input-container input").click();

    // Click the 7th day of the current month
    cy.get(".react-datepicker__day--007:first").click();

    // Click the 24th day of the current month
    cy.get(".react-datepicker__day--024:last").click();

    // Click "My Trips" Nav Bar
    cy.get(".nav-link:nth-child(2)").click();

    // Click "Need Help" Nav Bar
    cy.get(".nav-link:nth-child(3)").click();

    return;
  });

  // All tests below this comment are temporary. Component testing
  // is not yet fully supported in NextJS 14 (https://github.com/cypress-io/cypress/issues/28185)
  // so some components blow up while running their component tests (especially those that use useRouter).
  // To remedy this, we're going to temporary write E2E Tests for these components and then
  // port them to Component Tests once fully supported.
  describe("Hero", () => {
    it("renders properly", () => {
      cy.get("#hero > div")
        .should("have.css", "background-image")
        .and("include", "wallpaper.jpg");
      cy.get("#hero h1").should("have.text", "Find a Stay");
      cy.get("#hero span").should(
        "have.text",
        "Save on thousands of places across the globe"
      );

      // Click the "Going to" input field (this would open a dropdown)
      cy.get("#default-search").click();

      // Fill in "Singapore" into the "Where are you going" input field inside the dropdown
      cy.get(".input-container > input").type("Singapore");

      // Click the first item in the dropdown
      cy.get(".input-container > ul > li:nth-child(1)").click();

      // Click the Date Picker (input field)
      cy.get(".react-datepicker__input-container input").click();

      // Click the 7th day of the current month
      cy.get(".react-datepicker__day--007:first").click();

      // Click the 24th day of the current month
      cy.get(".react-datepicker__day--024:last").click();

      cy.get("#hotel-search-travelers").should("exist");

      // Click Travelers Input
      cy.get("#roomInput").click();
      cy.get(".travelers-modal").should("be.visible");

      // Increase Number of Adults
      cy.get(".increment-adults").click();

      // Increase Number of Children
      cy.get(".increment-children").click();

      // Add Room
      cy.get(".add-room").click();
      cy.get(".room").should("have.length", 2);
    });
  });

  describe("PopularLocations", () => {
    it("renders properly", () => {
      cy.get("#locations h2").should("have.text", "Top Hotels");

      // Check if there are at least 7 popular location items in the carousel
      cy.get(".psds-carousel__item").should("have.length.at.least", 7);

      // Check if there are at least 7 book now buttons
      cy.get("[href^='/hotel-details/']").should("have.length.at.least", 7);

      // Click on the first popular location item
      cy.get(".psds-carousel__item").first().click();

      // Wait for the navigation to complete
      cy.location("pathname").should("match", /\/hotel-details\/\d+/);
    });
  });

  describe("Destinations", () => {
    it("renders properly", () => {
      cy.get("#Destinations h2").should(
        "have.text",
        "Book Hotels At Popular Destinations"
      );

      // Check if there are at least 12 destination items
      cy.get(".img-hover-zoom").should("have.length.at.least", 12);

      // Click on the first destination item
      cy.get(".img-hover-zoom").first().click();

      // Wait for the navigation to complete
      cy.location("pathname").should("eq", "/hotel-listing");
    });
  });
});
