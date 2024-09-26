import toggleArrayItem from "@/utils/toggle-array-item";

describe("toggleArrayItem", () => {
  test("should add item to array if it does not exist", () => {
    const initialArray = [1, 2, 3];
    const itemToAdd = 4;

    const result = toggleArrayItem(initialArray, itemToAdd);

    expect(result).toEqual([...initialArray, itemToAdd]);
  });

  test("should remove item from array if it exists", () => {
    const initialArray = [1, 2, 3];
    const itemToRemove = 2;

    const result = toggleArrayItem(initialArray, itemToRemove);

    expect(result).toEqual([1, 3]);
  });

  test("should not modify the original array", () => {
    const initialArray = [1, 2, 3];
    const itemToAdd = 4;

    const result = toggleArrayItem(initialArray, itemToAdd);

    expect(initialArray).toEqual([1, 2, 3]);
    expect(result).not.toBe(initialArray);
  });

  test("should return a new array even if item is not found", () => {
    const initialArray = [1, 2, 3];
    const itemNotInArray = 4;

    const result = toggleArrayItem(initialArray, itemNotInArray);

    expect(result).not.toBe(initialArray);
  });
});
