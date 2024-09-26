import HotelDetailsHeader from "@/components/sections/hotel-details/HotelDetailsHeader";

const mockData = {
  name: "Sample Hotel",
  address: "123 Main St, City",
  numReviews: 42,
  reviews: [],
};

describe("HotelDetailsHeader", () => {
  it("renders with the correct content", () => {
    cy.mount(<HotelDetailsHeader {...mockData} />);

    // Assertions for the rendered content
    cy.contains("Sample Hotel").should("exist");
    cy.contains("123 Main St, City").should("exist");
    cy.contains("42 Reviews").should("exist");
  });

  it("handles the case when there are no reviews", () => {
    const dataWithoutReviews = { ...mockData, numReviews: 0, reviews: [] };
    cy.mount(<HotelDetailsHeader {...dataWithoutReviews} />);

    // Assertions for the case when there are no reviews
    cy.contains("0 Reviews").should("exist");
  });
});
