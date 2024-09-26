import HotelDetailsImageGallery from "@/components/sections/hotel-details/HotelDetailsImageGallery";

const mockData = {
  heroImage: "path/to/hero-image.jpg",
  images: [
    { links: [{ url: "path/to/image1.jpg" }] },
    { links: [{ url: "path/to/image2.jpg" }] },
  ],
};

describe("HotelDetailsImageGallery", () => {
  it("renders with the correct content", () => {
    cy.mount(<HotelDetailsImageGallery {...mockData} />);

    // Assertions for the rendered content
    cy.get("#hotel-details-image-gallery").should("exist");
    cy.get("#hotel-details-image-gallery-more-button").should(
      "have.text",
      `+ ${mockData.images.length}`
    );
  });

  it("opens the image slider on button click", () => {
    cy.mount(<HotelDetailsImageGallery {...mockData} />);

    // Click on the button to open the image slider
    cy.get("#hotel-details-image-gallery-more-button").click();

    // Assertions for the opened image slider
    cy.get(".popup-content").should("exist");
  });
});
