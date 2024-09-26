import HotelDetailsLocation from "@/components/sections/hotel-details/HotelDetailsLocation";

const mockData = {
  descriptions: [
    { type: "Attraction", text: "Nearby attractions description" },
    { type: "Transportation", text: "Transportation details" },
  ],
};

describe("HotelDetailsLocation", () => {
  it("renders with the correct content", () => {
    cy.mount(<HotelDetailsLocation {...mockData} />);

    // Assertions for the rendered content
    cy.get("#location").should("exist");
    cy.contains("About this area").should("exist");
  });

  it("renders descriptions correctly", () => {
    cy.mount(<HotelDetailsLocation {...mockData} />);

    // Assertions for each description
    mockData.descriptions.forEach((item) => {
      cy.contains(item.type).should("exist");
      cy.contains(item.text).should("exist");
    });
  });
});
