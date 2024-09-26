import AllHotelsMaps from "@/components/common/AllHotelsMap";

describe("AllHotelsMaps Component", () => {
  it("renders the AllHotelsMaps component", () => {
    const currency = "USD";
    const hotels = [
      {
        id: 1,
        geoCode: { lat: "37.7749", long: "-122.4194" },
        rate: { dailyTotalRate: 150 },
      },
    ];
    const lat = "37.7749";
    const lng = "-122.4194";
    const noOfDays = 3;
    const noOfRooms = 2;

    // Mount the component using cy.mount
    cy.mount(
      <AllHotelsMaps
        currency={currency}
        hotels={hotels}
        lat={lat}
        lng={lng}
        noOfDays={noOfDays}
        noOfRooms={noOfRooms}
      />
    );

    cy.get("#all-hotels-map").should("exist");
    cy.get("#all-hotels-default-image").click();
  });
});
