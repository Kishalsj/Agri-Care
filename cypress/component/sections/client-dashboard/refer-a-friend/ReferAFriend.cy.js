import ReferAFriend from "@/components/sections/client-dashboard/refer-a-friend/ReferAFriend";
import { AuthProvider } from "@/components/contexts/AuthProvider";

describe("Refer A Friend Component", () => {
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

  it("renders the component with initial values", () => {
    cy.mount(
      <AuthProvider value={user}>
        <ReferAFriend />
      </AuthProvider>
    );

    cy.get("#referral-code").should("be.visible");
    cy.get("#name").should("be.visible");
    cy.get("#email").should("be.visible");
    cy.get("#send-invitation").should("be.visible");
  });

  it("copies referral code to clipboard when the Copy button is clicked", () => {
    cy.mount(
      <AuthProvider value={user}>
        <ReferAFriend />
      </AuthProvider>
    );

    cy.get("#copy").click();
  });

  it("submits the form and updates the referred users list", () => {
    cy.intercept(
      {
        method: "POST",
        url: "/api/v1/auth/refferalUsers/create/211",
      },
      {
        msg: "c",
        status: 1,
      }
    ).as("postReferral");

    cy.intercept(
      {
        method: "POST",
        url: "/api/v1/auth/refferalUsers/211",
      },
      [
        { date: "2023-11-05T00:00:00.000Z", name: "John Doe", joined: 0 },
        { date: "2023-11-05T00:00:00.000Z", name: "Test 2", joined: 1 },
        { date: "2023-11-05T00:00:00.000Z", name: "Test 1", joined: 0 },
      ]
    ).as("getReferrals");

    cy.mount(
      <AuthProvider value={user}>
        <ReferAFriend />
      </AuthProvider>
    );

    cy.get("#name").type("John Doe");
    cy.get("#email").type("john.doe@example.com");
    cy.get("#send-invitation").click();
    cy.get("#referred-users-table").should("be.visible");
  });
});
