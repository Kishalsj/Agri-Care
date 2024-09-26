import HotelListingPills from "@/components/sections/hotel-listing/HotelListingFilterPills";

// Mock data for testing
const selectedFiltersMock = {
  starRatingFilter: [4, 5],
  refundableFilter: true,
  swimmingPoolFilter: true,
  internetFilter: false,
  parkingFilter: true,
  breakfastFilter: false,
  businessCenterFilter: false,
  barFilter: true,
  hotelFilter: true,
  villaFilter: false,
  resortFilter: false,
  houseFilter: false,
  palaceFilter: false,
  apartmentFilter: false,
  condoFilter: false,
  innFilter: false,
};

describe("HotelListingPills", () => {
  it("renders the component with selected filters", () => {
    cy.mount(
      <HotelListingPills
        selectedFilters={selectedFiltersMock}
        handleSelectedFilters={() => {}}
      />
    );

    // Check if the component renders with the correct number of filters
    cy.get(".custom-scrollbar .rounded-full").should("have.length", 7);
  });

  it("removes a filter when the close button is clicked", () => {
    const handleSelectedFiltersStub = cy.stub().as("handleSelectedFilters");
    cy.mount(
      <HotelListingPills
        selectedFilters={selectedFiltersMock}
        handleSelectedFilters={handleSelectedFiltersStub}
      />
    );

    // Click the close button of the first filter
    cy.get(".custom-scrollbar .rounded-full")
      .first()
      .find("div")
      .last()
      .click();

    // Check if the handleSelectedFilters function is called with the correct parameters
    cy.get("@handleSelectedFilters").should(
      "be.calledWith",
      Cypress.sinon.match.has("starRatingFilter", [5])
    );
  });
});
