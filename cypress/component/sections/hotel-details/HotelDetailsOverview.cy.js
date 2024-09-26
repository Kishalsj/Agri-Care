import HotelDetailsOverview from "@/components/sections/hotel-details/HotelDetailsOverview";

const mockHotel = {
  id: 1,
  descriptions: [{ text: "Hotel description text" }],
  geoCode: { lat: 123.456, long: -789.012 },
  facilities: [
    { id: 101, name: "Facility 1" },
    { id: 102, name: "Facility 2" },
  ],
};

describe("HotelDetailsOverview", () => {
  it("renders with the correct content", () => {
    cy.mount(<HotelDetailsOverview hotel={mockHotel} />);

    // Assertions for the rendered content
    cy.get("#overview").should("exist");
    cy.contains("About").should("exist");
    cy.contains("Hotel description text").should("exist");
    cy.contains("Popular amenities").should("exist");
    cy.get("ul.grid.grid-cols-1.md\\:grid-cols-2.gap-4.mt-5").should("exist");
  });

  it("displays hotel map with correct coordinates", () => {
    cy.mount(<HotelDetailsOverview hotel={mockHotel} />);

    // Assertions for the displayed map
    cy.get("#hotel-map").should("exist");
  });

  it("displays popular amenities", () => {
    cy.mount(<HotelDetailsOverview hotel={mockHotel} />);

    // Assertions for the displayed amenities
    cy.contains("Popular amenities").should("exist");
    cy.get("li.flex.flex-row.justify-between").should(
      "have.length.at.least",
      1
    );
  });
});
