import HotelDetailsCheckinInfo from "@/components/sections/hotel-details/HotelDetailsCheckinInfo";

describe("HotelDetailsCheckinInfo", () => {
  it("renders check-in and check-out information when provided", () => {
    // Mock check-in and check-out information
    const checkinInfo = { beginTime: "16:00:00", minAge: "0" };

    const checkoutInfo = { time: "12:00:00" };

    // Mount the component with mocked props
    cy.mount(
      <HotelDetailsCheckinInfo
        checkinInfo={checkinInfo}
        checkoutInfo={checkoutInfo}
      />
    );

    // Assert that the component is rendered
    cy.get(".container").should("exist");

    // Assert that the check-in information is rendered
    cy.get(".container").should("contain.text", "Check-in and Check-out");
    cy.get(".container").should("contain.text", "Check-in");
    cy.get(".container").should("contain.text", "16:00:00");

    // Assert that the check-out information is rendered
    cy.get(".container").should("contain.text", "Check-out");
    cy.get(".container").should("contain.text", "12:00:00");
  });

  it("does not render anything when checkinInfo is not provided", () => {
    // Mount the component without checkinInfo
    cy.mount(<HotelDetailsCheckinInfo checkoutInfo={{ time: "12:00:00" }} />);

    // Assert that the component is not rendered
    cy.get(".container").should("not.exist");
  });
});
