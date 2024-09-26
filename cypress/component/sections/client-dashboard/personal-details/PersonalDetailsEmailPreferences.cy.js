import PersonalDetailsEmailPreferences from "@/components/sections/client-dashboard/personal-details/PersonalDetailsEmailPreferences";
import { AuthProvider } from "@/components/contexts/AuthProvider";

describe("PersonalDetailsEmailPreferences Component", () => {
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

  it("renders correctly and allows email preferences update", () => {
    // Define mock email preferences
    const emailPreferences = {
      bookingConfirmation: true,
      accountInformation: true,
      newsletter: false,
      promotions: true,
    };

    cy.intercept(
      {
        method: "POST",
        url: "/api/auth/updateEmailPreferences/211",
      },
      "Email Preferences Updated Successfully"
    ).as("updateEmailPreferences");

    // Mount the component with Cypress mount command
    cy.mount(
      <AuthProvider value={user}>
        <PersonalDetailsEmailPreferences emailPreferences={emailPreferences} />
      </AuthProvider>
    );

    // Verify that the initial email preferences are displayed
    cy.contains("Email Preferences").should("exist");
    cy.contains("Booking Confirmation").should("exist");
    cy.contains("Account Information").should("exist");
    cy.contains("Newsletter").should("exist");
    cy.contains("Promotions & Announcements").should("exist");

    // Verify that the "Edit" button is present
    cy.contains("Edit").should("exist");

    // Click the "Edit" button to enable editing
    cy.contains("Edit").click();

    // Verify that the checkboxes are present and initial values are correct
    cy.get("#newsletter").should("be.enabled").should("not.be.checked");
    cy.get("#promotions").should("be.enabled").should("be.checked");

    // Check the "Newsletter" checkbox
    cy.get("#newsletter").check();

    // Click the "Save" button to save the changes
    cy.contains("Save").click();
  });
});
