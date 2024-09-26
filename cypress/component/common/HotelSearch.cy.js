import HotelSearch from "@/components/common/HotelSearch";

describe("HotelSearch Component", () => {
  const occupancies = [{ numOfAdults: 2, childAges: [] }];
  const currentDate = new Date();
  const checkIn = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate()
  );
  const checkOut = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate() + 7
  );

  it("renders correctly for Home Page", () => {
    cy.mount(
      <HotelSearch
        isHomePage={true}
        checkIn={checkIn}
        checkOut={checkOut}
        occupanciesInitialValue={occupancies}
      />
    );

    cy.get("#hotel-search-input").should("exist");
    cy.get("#hotel-search-date-selector").should("exist");
    cy.get("#hotel-search-travelers").should("exist");
  });

  it("renders correctly for Non Home Page", () => {
    cy.mount(
      <HotelSearch
        isHomePage={false}
        checkIn={checkIn}
        checkOut={checkOut}
        occupanciesInitialValue={occupancies}
      />
    );

    cy.get("#hotel-search-input").should("not.exist");
    cy.get("#hotel-search-date-selector").should("exist");
    cy.get("#hotel-search-travelers").should("exist");
  });
});
