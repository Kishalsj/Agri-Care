import PersonalDetailsDatePicker from "@/components/sections/client-dashboard/personal-details/PersonalDetailsDatePicker";

describe("PersonalDetailsDatePicker Component", () => {
  it("renders correctly and allows editing", () => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };

    // Mount the component with Cypress mount command
    cy.mount(
      <PersonalDetailsDatePicker
        id="datepicker"
        label="Birth Date"
        initialValue={new Date()}
        justSaved={false}
        options={options}
      />
    );

    // Verify that the birth date is displayed correctly
    cy.contains(
      "div",
      new Date().toLocaleDateString("en-US", options).replace(/\//g, "/")
    );

    // Click the "Edit" button
    cy.contains("button", "Edit").click();
    cy.get("input").click();

    // Verify that the date picker is displayed
    cy.get(".react-datepicker").should("exist");

    // Select a new date using the date picker
    const newDate = new Date();
    newDate.setFullYear(newDate.getFullYear() - 25);
    cy.get(".react-datepicker__input-container input").type(
      newDate.toLocaleDateString("en-US", options)
    );

    // Click the "Save" button
    cy.contains("button", "Save").click({ force: true });
  });
});
