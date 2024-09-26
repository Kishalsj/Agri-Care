import getRatingsLabel from "@/utils/get-ratings-label";

describe("getRatingsLabel", () => {
  it('should return "Excellent" for ratings greater than 4.3', () => {
    const result = getRatingsLabel(4.5);
    expect(result).toBe("Excellent");
  });

  it('should return "Very Good" for ratings greater than 3.8', () => {
    const result = getRatingsLabel(4.0);
    expect(result).toBe("Very Good");
  });

  it('should return "Good" for ratings greater than 3', () => {
    const result = getRatingsLabel(3.5);
    expect(result).toBe("Good");
  });

  it('should return "Fair" for ratings greater than 2', () => {
    const result = getRatingsLabel(2.5);
    expect(result).toBe("Fair");
  });

  it('should return "Poor" for ratings 2 or lower', () => {
    const result = getRatingsLabel(1.9);
    expect(result).toBe("Poor");
  });

  it('should return "Poor" for negative ratings', () => {
    const result = getRatingsLabel(-1);
    expect(result).toBe("Poor");
  });

  it('should return "Poor" for NaN ratings', () => {
    const result = getRatingsLabel(NaN);
    expect(result).toBe("Poor");
  });
});
