describe("Client Dashboard", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");

    // Start from the home page
    cy.visit("http://localhost:3000/");

    // The url should be "http://localhost:3000/sign-in" (Sign In Page)
    cy.url().should("equal", "http://localhost:3000/sign-in");

    // Fill in "sheleen@checkins.ai" into the "email" input field
    cy.get("#email")
      .type("testemail991015@gmail.com")
      .should("have.value", "testemail991015@gmail.com");

    // Fill in "secret!1620" into the "password" input field
    cy.get("#password").type("amila1234").should("have.value", "amila1234");

    // Click the "Continue" button
    cy.get("button[type='submit']").click();
  });

  // All tests below this comment are temporary. Component testing
  // is not yet fully supported in NextJS 14 (https://github.com/cypress-io/cypress/issues/28185)
  // so some components blow up while running their component tests (especially those that use useRouter).
  // To remedy this, we're going to temporary write E2E Tests for these components and then
  // port them to Component Tests once fully supported.
  describe("PersonalDetails", () => {
    it("renders properly", () => {
      // Click "Need Help" Nav Bar
      cy.get(".nav-link:nth-child(3)").click();

      // Click "Personal Details" Left Nav
      cy.get("a:contains('Personal Details'):eq(0)").click();

      // Should display My Profile section
      cy.get("div:contains('My Profile')").should("exist");
      cy.get("#firstName-value").should("have.text", "amila");
      cy.get("#lastName-value").should("have.text", "thushara");
      cy.get("#email-value").should("have.text", "testemail991015@gmail.com");
      cy.get("#phone-value").should("have.text", "94702638129");
      cy.get("#gender-value").should("have.text", "Male");
      cy.get("#dob-value").should("have.text", "Oct 14, 1999");
      cy.get("#address-value").should(
        "have.text",
        "Sathyamoorthy St, Shankar Nagar, Sriramapuram, Tiruchirappalli, Tamil Nadu 620006, India"
      );

      // Should display Preferences section
      cy.get("div:contains('Preferences')").should("exist");
      cy.get("#language-value").should("have.text", "American English");

      // Should display Email Notifications section
      cy.get("div:contains('Email Notifications')").should("exist");
      cy.get("#booking-confirmation")
        .should("be.disabled")
        .should("be.checked");
      cy.get("#account-information").should("be.disabled").should("be.checked");
      cy.get("#newsletter")
        .should("exist")
        .should("be.disabled")
        .should("not.be.checked");
      cy.get("#promotions")
        .should("exist")
        .should("be.disabled")
        .should("not.be.checked");

      // Should display Security section
      cy.get("div:contains('Security')").should("exist");
      cy.contains("Permanently delete your Checkins.ai account").should(
        "exist"
      );
    });
  });
});
