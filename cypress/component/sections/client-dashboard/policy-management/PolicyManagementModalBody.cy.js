import PolicyManagementModalBody from "@/components/sections/client-dashboard/policy-management/PolicyManagementModalBody";

describe("PolicyManagementModalBody Component", () => {
  it("renders PolicyManagementModalBody component with default values", () => {
    const setPolicy = cy.stub().as("setPolicy");
    const max_price_policy = 0;
    const setMaxPricePolicy = cy.stub().as("setMaxPricePolicy");
    const star_rating_policy = "0";
    const setStarRating = cy.stub().as("setStarRating");

    cy.mount(
      <PolicyManagementModalBody
        setPolicy={setPolicy}
        max_price_policy={max_price_policy}
        setMaxPricePolicy={setMaxPricePolicy}
        star_rating_policy={star_rating_policy}
        setStarRating={setStarRating}
      />
    );

    // Assertions for rendering
    cy.contains("Optimize your hotel's financial strategy").should(
      "be.visible"
    );
    cy.contains("Policy Name").should("be.visible");
    cy.contains("Maximum Price").should("be.visible");
    cy.get("#policy-name").should("have.value", "Max Price Policy");
    cy.get("#maximum-price").should("have.value", "0");
  });
});
