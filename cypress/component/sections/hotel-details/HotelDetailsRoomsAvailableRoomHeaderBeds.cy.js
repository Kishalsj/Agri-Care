import HotelDetailsRoomsAvailableRoomHeaderBeds from "@/components/sections/hotel-details/HotelDetailsRoomsAvailableRoomHeaderBeds";

describe("HotelDetailsRoomsAvailableRoomHeaderBeds Component", () => {
  it("renders the HotelDetailsRoomsAvailableRoomHeaderBeds component", () => {
    const name = "Sample Room";
    const beds = [{ type: "Queen", count: 2 }];

    cy.mount(
      <HotelDetailsRoomsAvailableRoomHeaderBeds name={name} beds={beds} />
    );

    cy.contains("2 Queen Bed").should("exist");
    cy.get(".bed-icon").should("have.length", 1);
  });
});
