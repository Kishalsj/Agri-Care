import HotelListingCardReview from "@/components/sections/hotel-listing/HotelListingCardReview";

describe("HotelListingCardReview", () => {
  const ratings = {
    Rating: 4.5,
    NumReviews: 100,
  };

  it("renders review details correctly", () => {
    cy.mount(<HotelListingCardReview ratings={ratings} />);

    // Check if the rating badge is visible and has the correct content
    cy.get(".rating-badge").should("be.visible").contains("4.5");

    // Check if the ratings label is visible and has the correct content
    cy.get(".ratings-label").should("be.visible").contains("Excellent");

    // Check if the number of reviews is visible and has the correct content
    cy.get(".num-reviews").should("be.visible").contains("100 reviews");
  });

  it("does not render anything when ratings are not provided", () => {
    cy.mount(<HotelListingCardReview />);

    // Check if the component is not rendered when ratings are not provided
    cy.get(".rating-badge").should("not.exist");
    cy.get(".ratings-label").should("not.exist");
    cy.get(".num-reviews").should("not.exist");
  });
});
