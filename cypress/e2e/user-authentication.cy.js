describe("User Authentication", () => {
  describe("Registration", () => {
    it("should be able to check validation errors", () => {
      cy.viewport("macbook-16");

      // Start from the register page
      cy.visit("http://localhost:3000/register");

      cy.get(`button:contains("Join for Free")`).click();

      // Should display Error 'Too Short'
      cy.get("#firstName").type("S");

      // Should display Error 'Too Short'
      cy.get("#lastName").type("S");

      // Should display Error 'Too Short'
      cy.get("#companyName").type("H");

      // Should display Error 'email must be valid email'
      cy.get("#email-address").type("shen");

      // Click the "Join for Free" button
      cy.get(`button:contains("Join for Free")`).click();

      /* Error Handling Checker(span-sibling) */
      cy.get("#firstName + span").contains("Too Short!");

      cy.get("#lastName + span").contains("Too Short!");

      cy.get("#companyName + span").contains("Too Short!");

      cy.get(`button:contains("Join for Free")`).click();

      cy.get("#phone-number + span").contains("Phone number is required");

      cy.get("#email-address + span").contains("email must be a valid email");

      // Correct Input Values
    });

    it("should have no validation errors when input values are correct", () => {
      cy.viewport("macbook-16");

      // Start from the register page
      cy.visit("http://localhost:3000/register");

      cy.get(`button:contains("Join for Free")`).click();

      cy.get("#firstName").type("SH");

      cy.get("#lastName").type("San Antonio");

      cy.get("#companyName").type("Checkins.ai");

      cy.get("#email-address").type("testemail991015@gmail.com");

      cy.get("#referral").type("Amazon");
    });
  });

  describe("Sign-in", () => {
    it("should be able to check validation errors", () => {
      cy.viewport("macbook-16");

      // Start from the sign-in page
      cy.visit("http://localhost:3000/sign-in");

      //Checks if email does not exist in the system
      cy.get("#email").type("wrongemail@gmail.com");
      cy.get("#password").type("wrongemail");
      cy.get("button[type='submit']").click();
      cy.get("#userauth-error").contains("Wrong Email");

      //Checks if password is incorrect
      cy.visit("http://localhost:3000/sign-in");
      cy.get("#email").type("testemail991015@gmail.com");
      cy.get("#password").type("wrongpassword");
      cy.get("button[type='submit']").click();
      cy.get("#userauth-error").contains("Wrong Password");
    });

    it("should have no validation errors when input values are correct", () => {
      cy.viewport("macbook-16");

      // Clicking register link should work
      cy.visit("http://localhost:3000/sign-in");
      cy.get('a[href*="/register"]').click();

      // Clicking forgot password link should work
      cy.visit("http://localhost:3000/sign-in");
      cy.get('a[href*="/forgot-password"]').click();

      // Successful sign-in
      cy.visit("http://localhost:3000/sign-in");
      cy.get("#email")
        .type("testemail991015@gmail.com")
        .should("have.value", "testemail991015@gmail.com");
      cy.get("#password").type("amila1234").should("have.value", "amila1234");

      // Click the "Continue" button
      cy.get("button[type='submit']").click();
    });
  });

  describe("Forgot Password", () => {
    it("should be able to check validation errors", () => {
      cy.viewport("macbook-16");

      // Start from the forgot password page
      cy.visit("http://localhost:3000/forgot-password");

      //Checks if email does not exist in the system
      cy.get("#email").type("wrongemail@gmail.com");
      cy.get("button[type='submit']").click();
      cy.get("#forgot-password-error").contains(
        "We couldn’t find a registered account"
      );
    });

    it("should have no validation errors when input values are correct", () => {
      cy.viewport("macbook-16");

      // Start from the forgot password page
      cy.visit("http://localhost:3000/forgot-password");

      //Checks if email does not exist in the system
      cy.get("#email").type("testemail991015@gmail.com");
      cy.get("button[type='submit']").click();
    });
  });

  describe("Reset Password", () => {
    it("should be able to check validation errors", () => {
      cy.viewport("macbook-16");

      // Start from the forgot password page
      cy.visit(
        "http://localhost:3000/reset-password/211/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoZWxlZW5AaG90ZWxjaGVja2lucy5jb20iLCJpZCI6MjExLCJpYXQiOjE2OTkyNDcxMzAsImV4cCI6MTY5OTI0ODAzMH0.54ZjetVd5Bq-LrehvpHl1OGAWxWTOr2tDznehxZeYLc"
      );

      //Checks if password is not valid
      cy.get("#password").type("a");
      cy.get("#confirmPassword").type("a");
      cy.get(`button:contains("Activate")`).click();
    });
    it("should have no validation errors when input values are correct", () => {
      cy.viewport("macbook-16");

      // Start from the forgot password page
      cy.visit(
        "http://localhost:3000/reset-password/211/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoZWxlZW5AaG90ZWxjaGVja2lucy5jb20iLCJpZCI6MjExLCJpYXQiOjE2OTkyNDcxMzAsImV4cCI6MTY5OTI0ODAzMH0.54ZjetVd5Bq-LrehvpHl1OGAWxWTOr2tDznehxZeYLc"
      );

      // Valid Password
      cy.get("#password").type("amila1234");
      cy.get("#confirmPassword").type("amila1234");
      cy.get(`button:contains("Activate")`).click();
    });
  });
});
