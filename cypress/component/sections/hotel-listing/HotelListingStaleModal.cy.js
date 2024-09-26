import HotelListingStaleModal from "@/components/sections/hotel-listing/HotelListingStaleModal";

describe("HotelListingStaleModal", () => {
  it("renders the component with the correct content", () => {
    // cy.mount the component with isOpen prop set to true
    cy.mount(<HotelListingStaleModal isOpen={true} />);

    // Check if the modal content is rendered correctly
    cy.contains("These rates are now stale by more than 15 minutes.").should(
      "exist"
    );
    cy.contains(
      "Please click refresh and we will renegotiate the prices"
    ).should("exist");

    // Check if the "Refresh" and "Close" buttons are rendered
    cy.contains("Refresh").should("exist");
    cy.contains("Close").should("exist");
  });

  it('calls the close function when "Close" button is clicked', () => {
    // cy.mount the component with isOpen prop set to true
    cy.mount(<HotelListingStaleModal isOpen={true} />);

    // Click the "Close" button
    cy.contains("Close").click();

    // Check if the modal exists
    cy.get("#hotel-listing-stale-modal").should("not.exist");
  });
});
