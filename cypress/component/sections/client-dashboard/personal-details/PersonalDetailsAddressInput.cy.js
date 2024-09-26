import PersonalDetailsAddressInput from "@/components/sections/client-dashboard/personal-details/PersonalDetailsAddressInput";

describe("PersonalDetailsAddressInput Component", () => {
  it("renders and allows editing", () => {
    cy.mount(
      <PersonalDetailsAddressInput
        id="address"
        label="home"
        initialValue="123 Main St"
        justSaved={false}
      />
    );

    // Verify that the initial value is displayed
    cy.contains("123 Main St").should("exist");

    // Click the Edit button
    cy.contains("Edit").click();

    // Verify that the Autocomplete input is rendered in edit mode
    cy.get('input[name="address"]').should("exist");

    // Simulate selecting a place from Autocomplete
    cy.get('input[name="address"]').type("New York, NY, USA");

    // Verify that the value is updated in the input
    cy.get('input[name="address"]').should(
      "have.value",
      "123 Main StNew York, NY, USA"
    );

    // Click the Save button
    cy.contains("Save").click();
  });
});
