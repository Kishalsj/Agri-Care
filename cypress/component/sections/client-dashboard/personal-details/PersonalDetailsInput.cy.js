import PersonalDetailsInput from "@/components/sections/client-dashboard/personal-details/PersonalDetailsInput";

describe("PersonalDetailsInput Component", () => {
  it("renders correctly and allows input editing", () => {
    // Define initial values
    const id = "exampleId";
    const label = "exampleLabel";
    const initialValue = "Initial Value";
    const disabled = false;

    // Mount the component with Cypress mount command
    cy.mount(
      <PersonalDetailsInput
        id={id}
        label={label}
        initialValue={initialValue}
        disabled={disabled}
      />
    );

    // Verify that the initial value is displayed
    cy.get("#exampleId-value").should("exist");

    // Verify that the "Edit" button is present
    cy.contains("Edit").should("exist");

    // Click the "Edit" button to enable editing
    cy.contains("Edit").click();

    // Verify that the input field is present
    cy.get(`#${id}`).should("exist").should("have.value", initialValue);

    // Change the input value
    const newValue = "New Value";
    cy.get(`#${id}`).clear().type(newValue);

    // Click the "Save" button to save the changes
    cy.contains("Save").click();

    // Verify that the saved value is displayed
    cy.get("#exampleId").should("have.value", newValue);
  });

  it('displays "Can\'t Edit" message for disabled input', () => {
    // Define initial values
    const id = "exampleId";
    const label = "exampleLabel";
    const initialValue = "Initial Value";
    const disabled = true;

    // Mount the component with Cypress mount command
    cy.mount(
      <PersonalDetailsInput
        id={id}
        label={label}
        initialValue={initialValue}
        disabled={disabled}
      />
    );

    // Verify that the "Can't Edit" message is displayed
    cy.contains(`Can't Edit`).should("exist");
  });
});
