import ContactSupportMessageList from "@/components/sections/client-dashboard/contact-support/ContactSupportMessageList";

describe("Contact Support Message List Component", () => {
  const messages = [
    {
      id: 1,
      content: "User message 1",
      created_at: "2023-01-01T12:00:00Z",
      replies: [
        {
          id: 101,
          content: "Admin reply 1",
          created_at: "2023-01-01T12:05:00Z",
        },
        {
          id: 102,
          content: "Admin reply 2",
          created_at: "2023-01-01T12:10:00Z",
        },
      ],
    },
    {
      id: 2,
      content: "User message 2",
      created_at: "2023-01-01T12:15:00Z",
      replies: [],
    },
  ];

  it("renders user and admin messages correctly", () => {
    cy.mount(<ContactSupportMessageList messages={messages} />);

    cy.get("#message-list").should("be.visible");

    // Check the first user message
    cy.contains("User message 1").should("be.visible");
    cy.contains("Sun, Jan 1, 2023").should("be.visible");

    // Check admin replies
    cy.contains("Admin reply 1").should("be.visible");
    cy.contains("Sun, Jan 1, 2023").should("be.visible");
    cy.contains("Admin reply 2").should("be.visible");
    cy.contains("Sun, Jan 1, 2023").should("be.visible");

    // Check the second user message
    cy.contains("User message 2").should("be.visible");
    cy.contains("Sun, Jan 1, 2023").should("be.visible");
  });
});
