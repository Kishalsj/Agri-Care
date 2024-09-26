import ProgressBar from "@/components/common/ProgressBar";

describe("ProgressBar Component", () => {
  it("renders the progress bar with custom values", () => {
    cy.mount(
      <ProgressBar
        completed={cy.stub().as("50")}
        bgColor={cy.stub().as("#1D1A4E")}
        labelColor={cy.stub().as("#FFFFFF")}
        height={cy.stub().as("20px")}
      />
    );

    // Check if progress-bar class of component exists
    cy.get(".progress-bar").should("exist");

    // Check if the width of the completed portion is correct
    cy.get(".progress-bar div").should("have.css", "width", "242px");

    // Check if the label inside the ProgressBar is correct
    cy.get(".progress-bar div span").should("have.text", `50%`);
  });
});
