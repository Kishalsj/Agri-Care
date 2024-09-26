import HotelDetailsPolicies from "@/components/sections/hotel-details/HotelDetailsPolicies";

const mockPolicies = [
  { type: "Policy 1", text: "Policy 1 details" },
  { type: "Policy 2", text: "Policy 2 details" },
];

describe("HotelDetailsPolicies", () => {
  it("renders with the correct content when policies exist", () => {
    cy.mount(<HotelDetailsPolicies policies={mockPolicies} />);

    // Assertions for the rendered content with policies
    cy.get("#policies").should("exist");
    cy.contains("Policies").should("exist");
    cy.get("ul.space-y-3").should("exist");
    cy.get("li.text-justify").should("have.length", mockPolicies.length);
  });

  it('renders with "No Policies" when policies array is empty', () => {
    cy.mount(<HotelDetailsPolicies policies={[]} />);

    // Assertions for the rendered content without policies
    cy.get("#policies").should("exist");
    cy.contains("Policies").should("exist");
    cy.contains("No Policies").should("exist");
  });
});
