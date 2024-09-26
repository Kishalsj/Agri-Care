import HotelDetailsRoomsFilter from "@/components/sections/hotel-details/HotelDetailsRoomsFilter";

describe("HotelDetailsRoomsFilter", () => {
  it("renders with complete mock data and interacts with filters", () => {
    // Mock data for filters
    const filters = [
      {
        id: "all-rooms",
        label: "All Rooms",
      },
      {
        id: "refundable",
        label: "Refundable",
      },
      {
        id: "bed-and-breakfast",
        label: "Bed And Breakfast",
      },
      {
        id: "accessible-rooms",
        label: "Accessible Rooms",
      },
      {
        id: "hotel-loyalty",
        label: "Hotel Loyalty",
      },
    ];

    // Initial state for testing
    const initialState = "all-rooms";

    // Mount the component with props
    cy.mount(
      <HotelDetailsRoomsFilter filter={initialState} setFilter={() => {}} />
    );

    // Assertions for the existence of the filters
    cy.get(".flex.items-center").should("have.length", filters.length);

    // Assertions for each filter
    filters.forEach(({ id, label }) => {
      cy.get(`input#${id}`).should("exist");
      cy.get(`label[for=${id}]`).should("exist").and("have.text", label);
    });

    // Interaction with filters
    cy.get("#all-rooms").should("be.checked");
    cy.get("#refundable").should("not.be.checked");
    cy.get("#bed-and-breakfast").should("not.be.checked");
    cy.get("#accessible-rooms").should("not.be.checked");
    cy.get("#hotel-loyalty").should("not.be.checked");
  });
});
