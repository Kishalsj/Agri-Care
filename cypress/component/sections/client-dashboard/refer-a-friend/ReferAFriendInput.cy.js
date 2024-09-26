import ReferAFriendInput from "@/components/sections/client-dashboard/refer-a-friend/ReferAFriendInput";

describe("Refer A Friend Input", () => {
  it("renders the input field with the provided label", () => {
    // Mount the component using cy.mount
    cy.mount(
      <ReferAFriendInput
        id="email"
        label="Email"
        value=""
        setValue={() => {}}
      />
    );

    // Check if the label is rendered correctly
    cy.get("label").should("have.text", "Email");

    // Check if the input field is visible
    cy.get("input").should("be.visible");
  });
});
