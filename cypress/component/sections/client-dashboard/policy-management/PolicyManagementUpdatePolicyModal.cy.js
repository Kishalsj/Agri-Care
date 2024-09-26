import PolicyManagementUpdatePolicyModal from "@/components/sections/client-dashboard/policy-management/PolicyManagementUpdatePolicyModal";

describe("PolicyManagementUpdatePolicyModal Component", () => {
  it("renders PolicyManagementUpdatePolicyModal component", () => {
    const policy = "Some Policy";
    const setPolicy = cy.stub().as("setPolicy");
    const handlePolicySubmit = cy.stub().as("handlePolicySubmit");
    const max_price_policy = 100;
    const setMaxPricePolicy = cy.stub().as("setMaxPricePolicy");
    const star_rating_policy = 4;
    const setStarRating = cy.stub().as("setStarRating");

    cy.mount(
      <PolicyManagementUpdatePolicyModal
        policy={policy}
        setPolicy={setPolicy}
        handlePolicySubmit={handlePolicySubmit}
        max_price_policy={max_price_policy}
        setMaxPricePolicy={setMaxPricePolicy}
        star_rating_policy={star_rating_policy}
        setStarRating={setStarRating}
      />
    );

    // Assertions for rendering
    cy.contains("Update Policy").should("be.visible").click();
    cy.contains("Update Policy").should("be.visible");
    cy.contains("Which Policy do you need to update ?").should("be.visible");
  });
});
