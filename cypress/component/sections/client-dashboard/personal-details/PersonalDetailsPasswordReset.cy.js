import PersonalDetailsPasswordReset from "@/components/sections/client-dashboard/personal-details/PersonalDetailsPasswordReset";
import { AuthProvider } from "@/components/contexts/AuthProvider";

describe("PersonalDetailsPasswordReset Component", () => {
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

  it("renders correctly and triggers password reset", () => {
    // Mount the component with Cypress mount command
    cy.mount(
      <AuthProvider value={user}>
        <PersonalDetailsPasswordReset
          id="password-reset"
          label="Password Reset"
          email="test@example.com"
        />
      </AuthProvider>
    );

    // Verify that the hidden password is displayed as stars
    cy.contains("*********").should("exist");

    // Click the "Reset Link" button to trigger password reset
    cy.contains("Reset Link").click();
  });
});
