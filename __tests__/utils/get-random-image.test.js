import getRandomImage from "@/utils/get-random-image";

describe("getRandomImage", () => {
  it('should return an object with "links" property', () => {
    const result = getRandomImage();
    expect(result).toHaveProperty("links");
  });

  it('should return an object with "links" containing at least one element', () => {
    const result = getRandomImage();
    expect(result.links).toBeInstanceOf(Array);
    expect(result.links.length).toBeGreaterThan(0);
  });

  it('should return an object with "links" elements having "url" and "size" properties', () => {
    const result = getRandomImage();
    const firstLink = result.links[0];
    expect(firstLink).toHaveProperty("url");
    expect(firstLink).toHaveProperty("size");
  });

  it("should return a different image object on consecutive calls", () => {
    const result1 = getRandomImage();
    const result2 = getRandomImage();
    expect(result1).not.toEqual(result2);
  });

  it('should return a valid "url" property in each "links" element', () => {
    const result = getRandomImage();
    result.links.forEach((link) => {
      expect(link.url).toMatch(
        /^https:\/\/photos\.hotelbeds\.com\/giata\/.*\.jpg$/
      );
    });
  });

  it('should return a valid "size" property in each "links" element', () => {
    const result = getRandomImage();
    result.links.forEach((link) => {
      expect(link.size).toMatch(/^(Standard|XL)$/);
    });
  });
});
