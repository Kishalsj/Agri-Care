import HotelDetailsRoomsSkeletonCards from "@/components/sections/hotel-details/HotelDetailsRoomsSkeletonCards";

describe("HotelDetailsRoomsSkeletonCards", () => {
  it("renders with complete mock data", () => {
    cy.mount(<HotelDetailsRoomsSkeletonCards />);

    // Assertions for the rendered content
    cy.get("#hotel-details-rooms-skeleton-cards").should("exist");
    cy.get(".animate-pulse").should("have.length", 3);
    cy.get(".animate-pulse:first span.sr-only").should(
      "have.text",
      "Loading..."
    );
  });
});
