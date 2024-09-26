import HotelListingSort from "@/components/sections/hotel-listing/HotelListingSort";

// Mock data for testing
const filteredHotelsMock = [];
const sortByMock = "relevanceAsc";

describe("HotelListingSort", () => {
  it("renders the component with the selected sort option", () => {
    cy.mount(
      <HotelListingSort
        filteredHotels={filteredHotelsMock}
        sortBy={sortByMock}
        handleSort={cy.stub().as("handleSort")}
      />
    );

    // Check if the radio button for the selected sort option is checked
    cy.get(`input[name="sortOption"][value="${sortByMock}"]`).should(
      "be.checked"
    );

    // Check if the select dropdown has the correct value
    cy.get("#sort-select").should("have.value", sortByMock);
  });

  it("changes the sort option when a radio button is clicked", () => {
    cy.mount(
      <HotelListingSort
        filteredHotels={filteredHotelsMock}
        sortBy={sortByMock}
        handleSort={cy.stub().as("handleSort")}
      />
    );

    // Click the radio button for "Lowest Price"
    cy.get(`input[name="sortOption"][value="priceAsc"]`).click();

    // Check if the handleSort function is called with the correct parameters
    cy.get("@handleSort").should(
      "be.calledWith",
      "priceAsc",
      filteredHotelsMock
    );
  });

  it("changes the sort option when the select dropdown is changed", () => {
    cy.mount(
      <HotelListingSort
        filteredHotels={filteredHotelsMock}
        sortBy={sortByMock}
        handleSort={cy.stub().as("handleSort")}
      />
    );

    // Change the value in the select dropdown to "Highest Saving"
    cy.get("#sort-select").select("saveAsc");

    // Check if the handleSort function is called with the correct parameters
    cy.get("@handleSort").should(
      "be.calledWith",
      "saveAsc",
      filteredHotelsMock
    );
  });
});
