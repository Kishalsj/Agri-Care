import PolicyManagementDeletePolicyModal from "@/components/sections/client-dashboard/policy-management/PolicyManagementDeletePolicyModal";

describe("PolicyManagementDeletePolicyModal Component", () => {
  it("renders PolicyManagementDeletePolicyModal component", () => {
    const deletePolicy = cy.stub().as("deletePolicy");
    const policy = "Max Price Policy";

    cy.mount(
      <PolicyManagementDeletePolicyModal
        deletePolicy={deletePolicy}
        policy={policy}
      />
    );

    // Interaction to trigger delete confirmation
    cy.get("#delete").click();

    // Assertions for rendering
    cy.contains("Delete Selected Policy").should("be.visible");
    cy.contains("Are you sure you want to delete this Policy?").should(
      "be.visible"
    );
    cy.get("#delete").should("be.visible");
  });

  it("closes modal when cancellation is clicked", () => {
    const deletePolicy = cy.stub().as("deletePolicy");
    const policy = "Max Price Policy";

    cy.mount(
      <PolicyManagementDeletePolicyModal
        deletePolicy={deletePolicy}
        policy={policy}
      />
    );

    // Interaction to trigger delete confirmation
    cy.get("div.cursor-pointer").click();

    // Assertions for confirmation modal
    cy.contains("Delete Selected Policy").should("be.visible");
    cy.contains("Are you sure you want to delete this Policy?").should(
      "be.visible"
    );
    cy.get("div.cursor-pointer").should("be.visible");
    cy.get("#delete").should("be.visible");

    // Interaction to cancel deletion
    cy.contains("Cancel").click();

    // Assertions for modal closure
    cy.get("@deletePolicy").should("not.be.called");
  });
});
