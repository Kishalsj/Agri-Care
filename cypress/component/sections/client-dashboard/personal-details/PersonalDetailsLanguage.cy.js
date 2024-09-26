import PersonalDetailsLanguage from "@/components/sections/client-dashboard/personal-details/PersonalDetailsLanguage";

describe("PersonalDetailsLanguage Component", () => {
  it("renders correctly and allows language selection", () => {
    // Mount the component with Cypress mount command
    cy.mount(<PersonalDetailsLanguage />);

    // Verify that the initial language value is displayed
    cy.get("#personal-details-language").should("exist");

    // Click the "Edit" button to enable editing
    cy.contains("Edit").click();

    // Verify that the dropdown is present
    cy.get("#language").should("exist");

    // Click the "Save" button to save the changes
    cy.contains("Save").click();
  });
});
