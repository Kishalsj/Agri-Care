import debounce from "@/utils/debounce";

const DELAY = 270;

jest.useFakeTimers();

describe("debounce", () => {
  it("should execute the function after the delay", () => {
    const mockFunction = jest.fn();
    const debouncedFunction = debounce(mockFunction);

    debouncedFunction();
    jest.advanceTimersByTime(DELAY);
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it("should not execute the function immediately", () => {
    const mockFunction = jest.fn();
    const debouncedFunction = debounce(mockFunction);

    debouncedFunction();
    expect(mockFunction).not.toBeCalled();
    jest.advanceTimersByTime(DELAY - 1);
    expect(mockFunction).not.toBeCalled();
  });

  it("should reset the timer on consecutive calls within the delay", () => {
    const mockFunction = jest.fn();
    const debouncedFunction = debounce(mockFunction);

    debouncedFunction();
    debouncedFunction();
    debouncedFunction();
    expect(mockFunction).not.toBeCalled();
    jest.advanceTimersByTime(DELAY);
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it("should pass along the correct context and arguments to the original function", () => {
    const mockFunction = jest.fn();
    const debouncedFunction = debounce(mockFunction);
    const context = { key: "value" };

    debouncedFunction.call(context, 1, "arg2", true);
    jest.advanceTimersByTime(DELAY);

    expect(mockFunction).toHaveBeenCalledWith(1, "arg2", true);
    expect(mockFunction).toHaveBeenLastCalledWith(1, "arg2", true);
    expect(mockFunction.mock.instances[0]).toBe(context);
  });
});
