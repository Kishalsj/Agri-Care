import StarRating from "@/components/common/StarRating";
import FullStarIcon from "@/components/icons/FullStarIcon";
import GrayStarIcon from "@/components/icons/GrayStarIcon";

describe("StarRating Component", () => {
  it("renders correctly with full stars", () => {
    // Mount the component with Cypress mount command
    cy.mount(<StarRating count={5} />, {
      // Provide the FullStarIcon component as a stub
      icons: { FullStarIcon },
    });

    // Verify that the component renders the correct number of full stars
    cy.get(".full-star").should("have.length", 5);
    cy.get(".gray-star").should("have.length", 0);
  });

  it("renders correctly with a mix of full and gray stars", () => {
    // Mount the component with Cypress mount command
    cy.mount(<StarRating count={3} />, {
      // Provide the FullStarIcon and GrayStarIcon components as stubs
      icons: { FullStarIcon, GrayStarIcon },
    });

    // Verify that the component renders the correct number of full and gray stars
    cy.get(".full-star").should("have.length", 3);
    cy.get(".gray-star").should("have.length", 2);
  });

  it("renders correctly with all gray stars", () => {
    // Mount the component with Cypress mount command
    cy.mount(<StarRating count={0} />, {
      // Provide the GrayStarIcon component as a stub
      icons: { GrayStarIcon },
    });

    // Verify that the component renders all gray stars
    cy.get(".full-star").should("have.length", 0);
    cy.get(".gray-star").should("have.length", 5);
  });
});
