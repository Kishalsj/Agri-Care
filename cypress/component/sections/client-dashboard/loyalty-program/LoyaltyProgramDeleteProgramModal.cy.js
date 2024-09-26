import LoyaltyProgramDeleteProgramModal from "@/components/sections/client-dashboard/loyalty-program/LoyaltyProgramDeleteProgramModal";

describe("LoyaltyProgramDeleteProgramModal Component", () => {
  it("renders LoyaltyProgramDeleteProgramModal component correctly", () => {
    const deleteProgramMock = cy.stub().as("deleteProgram");

    cy.mount(
      <LoyaltyProgramDeleteProgramModal
        deleteProgram={deleteProgramMock}
        loyaltyId="123"
      />
    );

    // Assertions for rendering
    cy.get("#delete").click();
    cy.get("#delete-hotel-loyalty-program").should("exist");
    cy.contains(
      "Are you sure you want to delete this hotel loyalty program?"
    ).should("be.visible");
    cy.contains("This cannot be undone.").should("be.visible");
    cy.contains("Delete").should("be.visible");
    cy.contains("Cancel").should("be.visible");
  });

  it("interacts with LoyaltyProgramDeleteProgramModal component", () => {
    const deleteProgramMock = cy.stub().as("deleteProgram");

    cy.mount(
      <LoyaltyProgramDeleteProgramModal
        deleteProgram={deleteProgramMock}
        loyaltyId="456"
      />
    );

    // Interaction test
    cy.get("#delete").click();
    cy.contains("Delete Hotel Loyalty Program").should("be.visible");
    cy.contains(
      "Are you sure you want to delete this hotel loyalty program?"
    ).should("be.visible");
    cy.contains("This cannot be undone.").should("be.visible");
    cy.contains("Delete").should("be.visible").click();
  });
});
