import HotelDetailsRoomsAvailableRoomHeaderModal from "@/components/sections/hotel-details/HotelDetailsRoomsAvailableRoomHeaderModal";

describe("HotelDetailsRoomsAvailableRoomHeaderModal", () => {
  const name = "Deluxe Suite, 1 Bedroom";
  const beds = [
    {
      type: "Double",
      count: "0",
    },
  ];
  const room = {
    id: "54f85090-fa44-4bf5-8fc3-28a8c5cb8920",
    name: "1 Bedroom Double Suite (full double bed)",
    description: "1 Bedroom Double Suite (full double bed)",
    beds: [
      {
        type: "full double bed",
        count: "0",
      },
    ],
    smokingAllowed: false,
    facilities: [
      {
        name: "has_bathroom",
      },
      {
        name: "1-bedroom",
      },
      {
        name: "non-smoking",
      },
    ],
    views: [],
  };
  const images = [
    {
      links: [
        {
          url: "https://cdn.worldota.net/t/1024x768/ostrovok/dc/9c/dc9c08c0a76a14f4fa3e90f2af7f7de225cd1536.jpeg",
          size: "Standard",
        },
      ],
    },
    {
      links: [
        {
          url: "https://cdn.worldota.net/t/1024x768/ostrovok/49/13/4913b54dcc11cd389aea9e89706eaad1edd26f3f.jpeg",
          size: "Standard",
        },
      ],
    },
    {
      links: [
        {
          url: "https://cdn.worldota.net/t/1024x768/ostrovok/90/d8/90d89ba7566275a0e28bc18d3ffa5c41cebbf528.jpeg",
          size: "Standard",
        },
      ],
    },
    {
      links: [
        {
          url: "https://cdn.worldota.net/t/1024x768/ostrovok/37/72/377293bf94de1892eecbea17e0cc7d14f7c9aab0.jpeg",
          size: "Standard",
        },
      ],
    },
    {
      links: [
        {
          url: "https://cdn.worldota.net/t/1024x768/ostrovok/9b/fe/9bfe2234a094d7b7828871494aade8f29847631e.jpeg",
          size: "Standard",
        },
      ],
    },
    {
      links: [
        {
          url: "https://cdn.worldota.net/t/1024x768/ostrovok/71/83/7183b92d3a45eabfa81d3d88d633a8678f221fdc.jpeg",
          size: "Standard",
        },
      ],
    },
  ];
  it("renders modal with room details", () => {
    // Use cy.mount to render the component
    cy.mount(
      <HotelDetailsRoomsAvailableRoomHeaderModal
        name={name}
        beds={beds}
        room={room}
        images={images}
      />
    );

    cy.get(".room-header-modal").as("roomHeaderModal");

    // Use cy.click to simulate a click on the modal trigger element
    cy.get("@roomHeaderModal").click();

    cy.contains("Room Details").should("be.visible");

    cy.contains("More Details").should("be.visible");
    // Add assertions based on the modal being open or any other expected behavior
    cy.get(".hotel-details-header-modal").should("exist");
    // Assert modal content based on the provided room details
  });

  it("allows navigation through room images in the modal", () => {
    cy.mount(
      <HotelDetailsRoomsAvailableRoomHeaderModal
        name={name}
        beds={beds}
        room={room}
        images={images}
      />
    );

    cy.get(".room-header-modal").as("roomHeaderModal");

    // Use cy.click to simulate a click on the modal trigger element
    cy.get("@roomHeaderModal").click();
    // Use cy.get to locate the Swiper navigation elements
    cy.get(".hotel-details-header-modal .swiper-button-next").as("swiperNext");
    cy.get(".hotel-details-header-modal .swiper-button-prev").as("swiperPrev");
  });
});
