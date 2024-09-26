import LoyaltyProgram from "@/components/sections/client-dashboard/loyalty-program/LoyaltyProgram";
import { AuthProvider } from "@/components/contexts/AuthProvider";

describe("LoyaltyProgram Component", () => {
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

  it("renders LoyaltyProgram component with no programs", () => {
    cy.mount(
      <AuthProvider value={user}>
        <LoyaltyProgram programs={[]} />
      </AuthProvider>
    );

    // Assertions for rendering when no programs are available
    cy.contains("No Programs yet").should("be.visible");
    cy.contains("Add a Program and it will show up here.").should("be.visible");
  });

  it("renders LoyaltyProgram component with programs", () => {
    const programs = [
      { id: "1", loyaltyProgramname: "Program 1", loyalty_id: "123" },
      { id: "2", loyaltyProgramname: "Program 2", loyalty_id: "456" },
    ];

    cy.mount(
      <AuthProvider value={user}>
        <LoyaltyProgram programs={programs} />
      </AuthProvider>
    );

    // Assertions for rendering when programs are available
    cy.get("th").contains("Program").should("be.visible");
    cy.get("th").contains("Loyalty ID").should("be.visible");
    cy.get("th").contains("Actions").should("be.visible");

    programs.forEach((program, index) => {
      cy.contains(program.loyaltyProgramname).should("be.visible");
      cy.contains(program.loyalty_id).should("be.visible");
    });
  });

  it("adds a new program", () => {
    cy.intercept("POST", "**/api/v1/auth/user/loyaltyPrograms/create", {
      statusCode: 200,
      body: {},
    }).as("addProgram");

    cy.mount(
      <AuthProvider value={user}>
        <LoyaltyProgram programs={[]} />
      </AuthProvider>
    );

    // Interaction to add a program
    cy.contains("Add Program").should("be.visible").click();
    cy.get("#program-name").type("New Program");
    cy.get("#program-number").type("789");
    cy.contains("Save").should("be.visible").click();
  });

  it("deletes a program", () => {
    const programs = [
      { id: "1", loyaltyProgramname: "Program 1", loyalty_id: "123" },
      { id: "2", loyaltyProgramname: "Program 2", loyalty_id: "456" },
    ];

    cy.intercept("POST", "**/api/v1/auth/user/loyaltyPrograms/delete", {
      statusCode: 200,
      body: {},
    }).as("deleteProgram");

    cy.mount(
      <AuthProvider value={user}>
        <LoyaltyProgram programs={programs} />
      </AuthProvider>
    );

    // Interaction to delete a program
    cy.get("td")
      .contains("Program 1")
      .parent("tr")
      .within(() => {
        cy.get(".cursor-pointer").click();
      });
  });
});
