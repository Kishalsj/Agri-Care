import Travelers from "@/components/common/Travelers";

describe("Travelers Component", () => {
  it("renders the Travelers component with default values", () => {
    // Define your initial state or props if needed
    const initialState = {
      occupancies: [
        { numOfAdults: 2, childAges: [] },
        { numOfAdults: 2, childAges: [] },
      ],
      setOccupancies: () => {}, // Mock function
      isHomePage: false,
    };

    // Mount the component
    cy.mount(<Travelers {...initialState} />);

    // Wait for the component to render (adjust the time as needed)
    cy.wait(1000);

    cy.get("#roomInput").should("be.visible");

    cy.get("#roomInput").should(
      "have.value",
      `${initialState.occupancies.length} Rooms , ${4} Adults  , ${0} Children`
    );

    // Trigger a click on the input to open the modal
    cy.get("#roomInput").click();

    // Check if the modal is visible after clicking on the input
    cy.get(".flex-col").should("be.visible");

    // Check if the "Add another room" button is visible
    cy.contains("Add another room").should("be.visible");

    // Check if the "Done" button is visible
    cy.contains("Done").should("be.visible");

    // Check the content of the first room
    cy.get(".flex-col > div:first-child")
      .should("contain.text", "Room 1")
      .and("contain.text", "Adults")
      .and("contain.text", "Children");

    // Check the content of the second room
    cy.get(".flex-col > div:nth-child(2)")
      .should("contain.text", "Room 2")
      .and("contain.text", "Adults")
      .and("contain.text", "Children");

    // Check if the "Remove room" button is visible for additional rooms
    cy.get(".flex-col > div:not(:first-child) button")
      .should("be.visible")
      .and("contain.text", "Remove room");

    // Check if the child age dropdowns are visible for the first room
    cy.get(".flex-col > div:first-child select").should("have.length", 0);

    // Trigger the "Add another room" button
    cy.contains("Add another room").click();

    // Close the modal
    cy.get("body").click();
  });
});
