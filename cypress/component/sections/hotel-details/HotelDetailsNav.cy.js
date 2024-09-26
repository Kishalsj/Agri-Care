import HotelDetailsNav from "@/components/sections/hotel-details/HotelDetailsNav";

const mockNavItems = [
  { id: 1, title: "Overview" },
  { id: 2, title: "Room" },
  { id: 3, title: "Location" },
  { id: 4, title: "Amenities" },
  { id: 5, title: "Policies" },
  { id: 6, title: "Reviews" },
];

describe("HotelDetailsNav", () => {
  it("renders with the correct content", () => {
    cy.mount(<HotelDetailsNav />);

    // Assertions for the rendered content
    cy.get(
      ".w-full.md\\:flex.md\\:items-center.md\\:justify-between.md\\:space-x-8.bg-white.rounded-xl.p-0.md\\:p-2.shadow"
    ).should("exist");
  });

  it("renders all navigation items", () => {
    cy.mount(<HotelDetailsNav />);

    // Assertions for each navigation item
    mockNavItems.forEach((navItem) => {
      cy.get(`[href="#${navItem.title.toLowerCase()}"]`).should("exist");
    });
  });
});
