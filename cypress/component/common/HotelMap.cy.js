import HotelMap from "@/components/common/HotelMap";

describe("HotelMap Component", () => {
  const id = "mapId";
  const lat = "37.7749";
  const lng = "-122.4194";
  const zoom = 13;

  it("renders the HotelMap component", () => {
    // Mount the component using cy.mount
    cy.mount(<HotelMap id={id} lat={lat} lng={lng} zoom={zoom} />);

    // Your assertions go here
    cy.get("#hotel-map").should("exist");
  });
});
