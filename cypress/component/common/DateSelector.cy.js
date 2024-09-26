import DateSelector from "@/components/common/DateSelector";
import formatDate from "@/utils/format-date";

describe("<DateSelector />", () => {
  it("renders", () => {
    cy.mount(<DateSelector />);
    cy.get("#dateInput").should("exist");
  });

  it("should select a date range", () => {
    cy.mount(
      <DateSelector setDateSelected={cy.stub().as("onChildStateChange")} />
    );

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    cy.get("#dateInput").click();

    // Select start date
    cy.get(".react-datepicker__day:not(.react-datepicker__day--outside-month)")
      .contains(today.getDate())
      .click();

    // Select end date
    cy.get(".react-datepicker__day:not(.react-datepicker__day--outside-month)")
      .contains(tomorrow.getDate())
      .click();

    // Assert that the selected date range is displayed
    cy.get("#dateInput").should(
      "have.value",
      `${formatDate(today, {
        day: "numeric",
        month: "short",
        year: "numeric",
      })} - ${formatDate(tomorrow, {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}`
    );

    cy.get("@onChildStateChange").should("have.been.calledOnce");
  });

  it("should clear selected date range", () => {
    cy.mount(
      <DateSelector setDateSelected={cy.stub().as("onChildStateChange")} />
    );

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    // Select a date range
    cy.get("#dateInput").click();
    cy.get(".react-datepicker__day:not(.react-datepicker__day--outside-month)")
      .contains(today.getDate())
      .click();
    cy.get(".react-datepicker__day:not(.react-datepicker__day--outside-month)")
      .contains(tomorrow.getDate())
      .click();

    // Clear the date range
    cy.get(".react-datepicker__close-icon").click();

    // Assert that the date input is empty
    cy.get("#dateInput").should("have.value", "");
  });
});
