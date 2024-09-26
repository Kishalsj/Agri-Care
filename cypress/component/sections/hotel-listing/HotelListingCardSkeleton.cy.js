import HotelListingCardSkeleton from "@/components/sections/hotel-listing/HotelListingCardSkeleton";

describe("HotelListingCardSkeleton", () => {
  it("renders the skeleton loader correctly", () => {
    cy.mount(<HotelListingCardSkeleton />);

    // Check if the skeleton loader is visible
    cy.get(".hotel-listing-card-skeleton").should("be.visible");
  });
});
