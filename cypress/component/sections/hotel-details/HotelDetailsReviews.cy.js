import HotelDetailsReviews from "@/components/sections/hotel-details/HotelDetailsReviews";

const mockReviews = [
  {
    title: "Great Stay",
    user: "John Doe",
    date: "2023-01-15",
    rating: 4,
    main_text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

describe("HotelDetailsReviews", () => {
  it("renders with the correct content when reviews exist", () => {
    cy.mount(<HotelDetailsReviews reviews={mockReviews} />);

    // Assertions for the rendered content with reviews
    cy.get("#reviews").should("exist");
    cy.contains("Reviews").should("exist");
    cy.get(".hotel-details-review").should("have.length", mockReviews.length);
  });

  it('renders with "No reviews yet" when reviews array is empty', () => {
    cy.mount(<HotelDetailsReviews reviews={[]} />);

    // Assertions for the rendered content without reviews
    cy.get("#reviews").should("exist");
    cy.contains("Reviews").should("exist");
    cy.contains("No reviews yet").should("exist");
  });
});
