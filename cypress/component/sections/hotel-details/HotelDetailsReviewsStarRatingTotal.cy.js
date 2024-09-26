import HotelDetailsReviewsStarRatingTotal from "@/components/sections/hotel-details/HotelDetailsReviewsStarRatingTotal";

const mockReviews = [
  { rating: 5 },
  { rating: 4 },
  { rating: 3 },
  { rating: 2 },
  { rating: 5 },
];

describe("HotelDetailsReviewsStarRatingTotal", () => {
  it("renders star rating distribution correctly", () => {
    cy.mount(<HotelDetailsReviewsStarRatingTotal reviews={mockReviews} />);

    // Assertions for the rendered content
    cy.get("#hotel-details-review-star-rating-total").should("exist");

    // Check for each star rating category
    cy.get(`#hotel-details-review-star-rating-1`).should("have.text", "0%");
    cy.get(`#hotel-details-review-star-rating-2`).should("have.text", "20%");
    cy.get(`#hotel-details-review-star-rating-3`).should("have.text", "20%");
    cy.get(`#hotel-details-review-star-rating-4`).should("have.text", "20%");
    cy.get(`#hotel-details-review-star-rating-5`).should("have.text", "40%");
  });
});
