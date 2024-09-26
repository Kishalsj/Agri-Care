import HotelDetailsRoomsAvailableRoomHeader from "@/components/sections/hotel-details/HotelDetailsRoomsAvailableRoomHeader";

describe("HotelDetailsRoomsAvailableRoomHeader Component", () => {
  it("renders the HotelDetailsRoomsAvailableRoomHeader component", () => {
    const name = "Sample Room";
    const beds = ["Queen", "Single"];
    const room = {
      description: "Lorem ipsum",
      amenities: ["Wi-Fi", "TV", "Air Conditioning"],
    };
    const numOfGuests = 4;
    const images = [{ links: ["image1.jpg"] }, { links: ["image2.jpg"] }];

    cy.mount(
      <HotelDetailsRoomsAvailableRoomHeader
        name={name}
        beds={beds}
        room={room}
        numOfGuests={numOfGuests}
        images={images}
      />
    );

    cy.contains("Sample Room").should("exist");
    cy.contains("Sleeps 4").should("exist");
    cy.get(".room-header-modal").click();
    cy.get(".hotel-details-header-image-item").should("have.length", 2);
  });
});
