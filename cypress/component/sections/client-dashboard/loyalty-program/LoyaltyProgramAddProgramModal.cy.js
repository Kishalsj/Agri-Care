import LoyaltyProgramAddProgramModal from "@/components/sections/client-dashboard/loyalty-program/LoyaltyProgramAddProgramModal";

describe("LoyaltyProgramAddProgramModal Component", () => {
  it("renders LoyaltyProgramAddProgramModal component correctly", () => {
    const addProgramMock = cy.stub().as("addProgram");

    cy.mount(
      <LoyaltyProgramAddProgramModal
        addProgram={addProgramMock}
        loyaltyId="123"
        loyaltyProgramname="Accor Live Limitless"
        setLoyaltyId={() => {}}
        setLoyaltyProgramname={() => {}}
      />
    );

    // Assertions for rendering
    cy.contains("Add Program").should("be.visible").click();
    cy.contains("Save hotel loyalty program number").should("be.visible");
    cy.contains("Save").should("be.visible");
    cy.contains("Cancel").should("be.visible");
    cy.get("button").should("have.class", "bg-[#1893F8]").and("be.visible");
  });
});
