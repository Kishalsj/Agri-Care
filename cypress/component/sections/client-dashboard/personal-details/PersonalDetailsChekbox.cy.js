import PersonalDetailsCheckbox from "@/components/sections/client-dashboard/personal-details/PersonalDetailsChekbox";

describe("PersonalDetailsCheckbox Component", () => {
  it("renders correctly and toggles when clicked", () => {
    // Mount the component with Cypress mount command
    cy.mount(
      <PersonalDetailsCheckbox
        id="checkbox"
        label="Enable Feature"
        initialValue={false}
        disabled={false}
      />
    );

    // Verify that the checkbox is initially unchecked
    cy.get('input[type="checkbox"]').should("not.be.checked");

    // Click the checkbox
    cy.get('input[type="checkbox"]').click();

    // Verify that the checkbox is checked after clicking
    cy.get('input[type="checkbox"]').should("be.checked");
  });

  it("renders correctly when disabled", () => {
    // Mount the component with Cypress mount command
    cy.mount(
      <PersonalDetailsCheckbox
        id="checkbox"
        label="Enable Feature"
        initialValue={false}
        disabled={true}
      />
    );

    // Verify that the checkbox is initially unchecked and disabled
    cy.get('input[type="checkbox"]')
      .should("not.be.checked")
      .and("be.disabled");
  });
});
