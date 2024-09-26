import ContactSupport from "@/components/sections/client-dashboard/contact-support/ContactSupport";
import { AuthProvider } from "@/components/contexts/AuthProvider";

describe("Contact Support Component", () => {
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

  it("renders Contact Support component correctly", () => {
    const data = [];

    cy.mount(
      <AuthProvider value={user}>
        <ContactSupport data={data} />
      </AuthProvider>
    );

    // Assertions for rendering
    cy.contains("Contact Support").should("be.visible");
    cy.get("textarea#message").should("be.visible");
    cy.contains("Clear History").should("be.visible");
    cy.contains("Submit").should("be.visible");
  });

  it("interacts with Contact Support component", () => {
    const data = [];

    cy.intercept(
      {
        method: "POST",
        url: "/api/v1/auth/messages/new/211",
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
        <ContactSupport data={data} />
      </AuthProvider>
    );

    // Interaction test
    cy.get("textarea#message").type("Test message");
    cy.contains("Submit").click();

    cy.get("#message-list").should("be.visible");

    // Check the first user message
    cy.contains("Test message").should("be.visible");
    cy.contains("Sat, Dec 16, 2023").should("be.visible");

    // Check the second user message
    cy.contains("Hello World!").should("be.visible");
    cy.contains("Sat, Dec 16, 2023").should("be.visible");
  });
});
