import Loader from "@/components/common/Loader";

describe("Loader Component", () => {
  it("renders the loader component", () => {
    // Use cy.mount to mount the component directly
    cy.mount(<Loader />);

    cy.get(".overlay").should("exist");
    cy.get(".flex").should("exist");
    cy.get(".justify-center").should("exist");
    cy.get(".items-center").should("exist");
    cy.get(".bg-slate-700").should("exist");
    cy.get(".bg-opacity-50").should("exist");
    cy.get(".load").should("exist");
  });
});
