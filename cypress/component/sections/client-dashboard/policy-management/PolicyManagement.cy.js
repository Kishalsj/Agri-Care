import PolicyManagement from "@/components/sections/client-dashboard/policy-management/PolicyManagement";
import { AuthProvider } from "@/components/contexts/AuthProvider";

describe("PolicyManagement Component", () => {
  const user = {
    id: 211,
    name: null,
    firstName: "Ashley",
    lastName: "San Antonio",
    email: "sheleen@checkins.ai",
    state: null,
    postal_code: null,
    country: null,
    city: null,
    address: "1111 Lockheed Martin Way, Sunnyvale, CA, USA",
    dob: "2000-11-11T00:00:00.000Z",
    phone: "33333",
    gender: "Other",
    policies: {
      code: 200,
      status: "success",
      star_rating_policy: 0,
      max_price_policy: 0,
    },
  };

  it("renders PolicyManagement component with policies", () => {
    const policies = {
      max_price_policy: 100,
      star_rating_policy: 4,
    };

    cy.mount(
      <AuthProvider value={user}>
        <PolicyManagement policies={policies} />
      </AuthProvider>
    );

    // Assertions for rendering
    cy.contains("Maximum Price Limit").should("be.visible");
    cy.contains("100 USD").should("be.visible");
    cy.contains("Star Rating").should("be.visible");
    cy.contains("4").should("be.visible");
  });

  it("handles policy update and deletion", () => {
    const policies = {
      max_price_policy: 150,
      star_rating_policy: 5,
    };

    cy.intercept(
      {
        method: "POST",
        url: "/api/v1/auth/user/policy/create",
      },
      {
        message: "Message saved to the database",
      }
    ).as("postMessage");

    cy.intercept(
      {
        method: "POST",
        url: "/api/v1/auth/messages/211",
      },
      [
        {
          id: 147,
          user_id: 211,
          content: "Test message",
          created_at: "2023-12-17T01:52:11.000Z",
          replies: [],
        },
        {
          id: 148,
          user_id: 211,
          content: "Hello World!",
          created_at: "2023-12-17T01:52:14.000Z",
          replies: [],
        },
      ]
    ).as("getMessage");

    cy.mount(
      <AuthProvider value={user}>
        <PolicyManagement policies={policies} />
      </AuthProvider>
    );

    // Assertions for rendering initial values
    cy.contains("Maximum Price Limit").should("be.visible");
    cy.contains("150 USD").should("be.visible");
    cy.contains("Star Rating").should("be.visible");
    cy.contains("5").should("be.visible");

    // Interaction to trigger policy update
    cy.get("button").contains("Update Policy").click();

    // Assertions for modal opening
    cy.contains("Which Policy do you need to update ?").should("be.visible");

    // Interaction to update policy value
    cy.get("input").clear().type("200");
    cy.contains("Save").click();

    // Assertions for updated values
    cy.contains("Maximum Price Limit").should("be.visible");
    cy.contains("200 USD").should("be.visible");

    // Interaction to trigger policy deletion
    cy.get("#delete").click();

    // Assertions for deletion confirmation modal
    cy.contains("Are you sure you want to delete this Policy?").should(
      "be.visible"
    );

    // Interaction to confirm deletion
    cy.get("#delete-selected-policy").contains("Delete").click();
  });
});
