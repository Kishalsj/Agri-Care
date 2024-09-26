import PersonalDetailsProfile from "@/components/sections/client-dashboard/personal-details/PersonalDetailsProfile";
import { AuthProvider } from "@/components/contexts/AuthProvider";

describe("PersonalDetailsProfile Component", () => {
  const user = {
    id: 211,
    name: null,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    state: null,
    postal_code: null,
    country: null,
    city: null,
    address: "1111 Lockheed Martin Way, Sunnyvale, CA, USA",
    dob: "2000-11-11T00:00:00.000Z",
    phone: "33333",
    gender: "Male",
    policies: {
      code: 200,
      status: "success",
      star_rating_policy: 0,
      max_price_policy: 0,
    },
  };

  it("renders correctly and updates profile successfully", () => {
    // Mount the component with Cypress mount command
    cy.mount(
      <AuthProvider value={user}>
        <PersonalDetailsProfile />
      </AuthProvider>
    );

    // Verify that the form is rendered with user data
    cy.get("#firstName-value").should("have.text", user.firstName);
    cy.get("#lastName-value").should("have.text", user.lastName);
    cy.get("#email-value").should("have.text", user.email);
    cy.get("#phone-value").should("have.text", user.phone);
    cy.get("#gender-value").should("have.text", user.gender);
    cy.get("#dob-value").should("have.text", "Nov 10, 2000");
    cy.get("#address-value").should("have.text", user.address);
  });
});
