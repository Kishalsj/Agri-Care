import formatDate from "@/utils/format-date";

describe("formatDate", () => {
  const originalToLocaleString = Date.prototype.toLocaleString;

  beforeAll(() => {
    Date.prototype.toLocaleString = function (locale, options) {
      const { weekday, day, month, year } = options;

      if (isNaN(this.getTime())) {
        return "Invalid Date";
      }

      const date = new Date(this);
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: weekday,
        day: day,
        month: month,
        year: year,
      }).format(date);

      return formattedDate;
    };
  });

  afterAll(() => {
    Date.prototype.toLocaleString = originalToLocaleString;
  });

  it("should format the date with default options", () => {
    const date = new Date("2023-01-15T12:00:00Z");
    const result = formatDate(date);
    expect(result).toBe("Sun, Jan 15, 2023");
  });

  it("should format the date with custom options", () => {
    const date = new Date("2023-03-20T18:30:00Z");
    const customOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const result = formatDate(date, customOptions);
    expect(result).toBe("Monday, March 20, 2023");
  });

  it("should handle invalid date input", () => {
    const invalidDate = "invalidDate";
    const result = formatDate(invalidDate);
    expect(result).toBe("Invalid Date");
  });
});
