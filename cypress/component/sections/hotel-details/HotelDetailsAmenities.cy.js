import HotelDetailsAmenities from "@/components/sections/hotel-details/HotelDetailsAmenities";

describe("HotelDetailsAmenities component", () => {
  it("renders amenities correctly", () => {
    const facilities = [
      { id: 1, groupId: "48", name: "ATM" },
      { id: 2, groupId: "0", name: "Shopping on site" },
    ];

    // Mount the component with Cypress and pass the sample amenities data
    cy.mount(<HotelDetailsAmenities facilities={facilities} />);

    // Verify that the component renders correctly
    cy.get("#amenities").should("exist");
    cy.get(".bg-white").should("exist");
    cy.get("h3").should("have.text", "Property Amenities in Detail");

    // Verify that each amenity is rendered correctly
    facilities.forEach((amenity) => {
      cy.contains(".grid-cols-2 li", amenity.name).should("exist");
    });
  });

  it("handles no amenities case correctly", () => {
    // Mount the component with Cypress and pass an empty amenities array
    cy.mount(<HotelDetailsAmenities facilities={[]} />);

    // Verify that the component renders correctly when there are no amenities
    cy.get("#amenities").should("exist");
    cy.get(".bg-white").should("exist");
    cy.get("h3").should("have.text", "Property Amenities in Detail");
    cy.contains(".grid-cols-2 div", "No Amenities").should("exist");
  });
});
