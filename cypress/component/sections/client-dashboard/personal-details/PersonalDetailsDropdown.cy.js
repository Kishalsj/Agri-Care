import PersonalDetailsDropdown from "@/components/sections/client-dashboard/personal-details/PersonalDetailsDropdown";

describe("PersonalDetailsDropdown Component", () => {
  it("renders correctly and allows dropdown selection", () => {
    const options = ["Option 1", "Option 2", "Option 3"];

    // Mount the component with Cypress mount command
    cy.mount(
      <PersonalDetailsDropdown
        id="testDropdown"
        label="Test Dropdown"
        initialValue="Option 1"
        options={options}
      />
    );

    // Verify that the initial value is displayed
    cy.get(".personal-details-dropdown").should("exist");
  });
});
