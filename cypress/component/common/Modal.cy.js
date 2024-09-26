import Modal from "@/components/common/Modal";

describe("Modal Component", () => {
  it("renders modal with default props", () => {
    // Use cy.mount to mount the component directly
    cy.mount(
      <Modal
        trigger={<button id="trigger-element">Open Modal</button>}
        headerText="Sample Header"
        bodyText="Sample Body"
        confirmationText="Confirm"
        cancelText="Cancel"
        onConfirm={() => {}}
        onOpen={() => {}}
      />
    );

    cy.get("#trigger-element").click();
    cy.get("#sample-header").should("contain.text", "Sample Header");
    cy.get("#sample-header").should("contain.text", "Sample Body");
    cy.get("#confirm").should("exist");
    cy.get("#cancel").should("exist").click();
  });
});
