import SearchBar from "@/components/common/SearchBar";

describe("SearchBar Component", () => {
  it("renders correctly", () => {
    // Mount the component
    cy.mount(<SearchBar location={{ fullName: "Test Location" }} />);

    cy.get("#default-search").should("exist");
    cy.get("#default-search").click();
    cy.get("#default-search").should("have.value", "Test Location");
  });

  it("handles input change", () => {
    // Mount the component
    cy.mount(<SearchBar setLocation={cy.stub()} />);

    cy.get("#default-search").should("exist");
    cy.get("#default-search").click();
    cy.get(".default-search-item:nth-child(1)").click();
    cy.get("#default-search").should("have.value", "Singapore, Singapore");
  });
});
