import HotelDetailsRoomsAvailableRoomProvider from "@/components/sections/hotel-details/HotelDetailsRoomsAvailableRoomProvider";
describe("HotelDetailsRoomsAvailableRoomProvider", () => {
  const providerName = "RateHawk";
  it("renders provider name when showProviderInfo is true", () => {
    cy.mount(
      <HotelDetailsRoomsAvailableRoomProvider providerName={providerName} />
    );

    // Initially, provider info should not be visible
    cy.get(".text-blue-600").should("not.exist");

    // Trigger the key combination to show provider info
    cy.get("body").type("{ctrl}{shift}H");

    // Now, provider info should be visible
    cy.get(".text-blue-600").should("exist").contains(providerName);
  });

  it("does not render provider name when showProviderInfo is false", () => {
    const providerName = "Sample Provider";

    cy.mount(
      <HotelDetailsRoomsAvailableRoomProvider providerName={providerName} />
    );

    // Provider info should not be visible initially
    cy.get(".text-blue-600").should("not.exist");
  });

  it("renders provider name after triggering key combination", () => {
    cy.mount(
      <HotelDetailsRoomsAvailableRoomProvider providerName={providerName} />
    );

    // Trigger the key combination to show provider info
    cy.get("body").type("{ctrl}{shift}H");

    // Provider info should be visible after triggering the key combination
    cy.get(".text-blue-600").should("exist").contains(providerName);
  });

  it("hides provider name after triggering key combination twice", () => {
    cy.mount(
      <HotelDetailsRoomsAvailableRoomProvider providerName={providerName} />
    );

    // Trigger the key combination to show provider info
    cy.get("body").type("{ctrl}{shift}H");

    // Provider info should be visible after triggering the key combination
    cy.get(".text-blue-600").should("exist").contains(providerName);

    // Trigger the key combination again to hide provider info
    cy.get("body").type("{ctrl}{shift}H");

    // Provider info should not be visible after triggering the key combination again
    cy.get(".text-blue-600").should("not.exist");
  });
});
