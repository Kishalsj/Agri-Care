import ImageSlider from "@/components/common/ImageSlider";

describe("ImageSlider Component", () => {
  const images = [
    {
      links: [
        { url: "https://example.com/image1.jpg" },
        { url: "https://example.com/image1-thumbnail.jpg" },
      ],
    },
    {
      links: [
        { url: "https://example.com/image2.jpg" },
        { url: "https://example.com/image2-thumbnail.jpg" },
      ],
    },
  ];

  it("renders the ImageSlider component", () => {
    // cy.mount the component using cy.cy.mount
    cy.mount(<ImageSlider images={images} close={() => {}} />);

    cy.get(".image-slider-item").should("have.length", 2);
  });
});
