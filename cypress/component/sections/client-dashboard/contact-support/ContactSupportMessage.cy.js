import formatDate from "@/utils/format-date";
import ContactSupportMessage from "@/components/sections/client-dashboard/contact-support/ContactSupportMessage";

describe("Contact Support Message Component", () => {
  it("renders user message correctly", () => {
    const createdAt = "2023-01-01T12:00:00Z";
    const content = "This is a user message";
    const isUserMessage = true;

    cy.mount(
      <ContactSupportMessage
        content={content}
        createdAt={createdAt}
        isUserMessage={isUserMessage}
      />
    );

    cy.get(".self-end").should("exist");
    cy.contains(content).should("be.visible");
    cy.contains("me").should("be.visible");
    cy.contains(formatDate(createdAt)).should("be.visible");
  });

  it("renders admin message correctly", () => {
    const createdAt = "2023-01-01T12:00:00Z";
    const content = "This is an admin message";
    const isUserMessage = false;

    cy.mount(
      <ContactSupportMessage
        content={content}
        createdAt={createdAt}
        isUserMessage={isUserMessage}
      />
    );

    cy.get(".self-start").should("exist");
    cy.contains(content).should("be.visible");
    cy.contains("checkins.ai support").should("be.visible");
    cy.contains(formatDate(createdAt)).should("be.visible");
  });
});
