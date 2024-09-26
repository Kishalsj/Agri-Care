import HotelDetailsRoomsAvailableRoomCancellationPolicyModal from "@/components/sections/hotel-details/HotelDetailsRoomsAvailableRoomCancellationPolicyModal";

describe("HotelDetailsRoomsAvailableRoomCancellationPolicyModal", () => {
  it("renders modal with cancellation policy table", () => {
    const policies = [
      {
        rules: [
          {
            value: 0,
            valueType: "Amount",
            estimatedValue: 0,
            start: "2023-12-20T00:00:00",
            end: "2024-01-16T00:00:00",
          },
          {
            value: 489.875,
            valueType: "Amount",
            estimatedValue: 489.875,
            start: "2024-01-17T00:00:00",
            end: "2024-01-19T00:00:00",
          },
        ],
      },
    ];
    const currency = "USD";

    cy.mount(
      <HotelDetailsRoomsAvailableRoomCancellationPolicyModal
        policies={policies}
        currency={currency}
      />
    );

    cy.get(".room-cancellation-modal").as("roomCancellationModal");

    // Use cy.click to simulate a click on the modal trigger element
    cy.get("@roomCancellationModal").click();

    cy.contains("Cancellation Policy").should("be.visible");

    cy.contains("Cancel").should("be.visible");

    cy.contains("(View Policy)").should("be.visible");
    // Add assertions based on the modal being open or any other expected behavior
    cy.get(".hotel-details-cancellation-policy-modal").should("exist");

    cy.get(".hotel-details-cancellation-policy-modal tbody tr").should(
      "have.length",
      policies[0].rules.length
    );
  });
});
