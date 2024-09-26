import computeOverallRating from "@/utils/compute-overall-rating";

describe("computeOverallRating", () => {
  test('should return "0.0" for an empty array of reviews', () => {
    const result = computeOverallRating([]);
    expect(result).toBe("0.0");
  });

  test("should calculate the overall rating for a single review", () => {
    const reviews = [{ rating: 4.5 }];
    const result = computeOverallRating(reviews);
    expect(result).toBe("4.5");
  });

  test("should calculate the correct overall rating for multiple reviews", () => {
    const reviews = [{ rating: 3.0 }, { rating: 4.0 }, { rating: 5.0 }];
    const result = computeOverallRating(reviews);
    expect(result).toBe("4.0");
  });

  test("should handle fractional overall ratings with one decimal place", () => {
    const reviews = [{ rating: 2.3 }, { rating: 4.6 }, { rating: 3.1 }];
    const result = computeOverallRating(reviews);
    expect(result).toBe("3.3");
  });

  test("should handle overall ratings for a large number of reviews", () => {
    const reviews = Array.from({ length: 1000 }, (_, index) => ({
      rating: (index % 5) + 1,
    }));
    const result = computeOverallRating(reviews);
    expect(result).toBe("3.0");
  });
});
