import LoyaltyProgramModalBody from "@/components/sections/client-dashboard/loyalty-program/LoyaltyProgramModalBody";

const programOptions = [
  "Program Name",
  "Accor Live Limitless",
  "Best Western Rewards",
  "Choice Privileges",
  "Drury Rewards",
  "IHG Rewards Club",
  "Hilton Honors",
  "Hello Rewards",
  "Redi Rewards",
  "Radisson Rewards",
  "Wyndham Rewards",
  "M Life Rewards",
  "Extended Perks",
  "Marriott Bonvoy",
  "Sonesta Travel Pass",
];

describe("LoyaltyProgramModalBody Component", () => {
  it("renders LoyaltyProgramModalBody component correctly", () => {
    const loyaltyId = "123456";
    const loyaltyProgramname = "Hilton Honors";

    cy.mount(
      <LoyaltyProgramModalBody
        loyaltyId={loyaltyId}
        loyaltyProgramname={loyaltyProgramname}
        setLoyaltyId={() => {}}
        setLoyaltyProgramname={() => {}}
      />
    );

    // Assertions for rendering
    cy.contains("Save your hotel loyalty program numbers").should("be.visible");
    cy.contains("Program Name").should("be.visible");
    cy.get("select#program-name").should("have.value", loyaltyProgramname);
    cy.contains("Program Number").should("be.visible");
    cy.get("input#program-number").should("have.value", loyaltyId);
  });
});
