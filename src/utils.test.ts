import { ellipsizeCenter } from "./utils";

describe("ellipsizeCenter", () => {
  it("returns the original string if it's shorter than the max length", () => {
    expect(ellipsizeCenter("abc", 5)).toEqual("abc");
  });

  it("returns the original string if it's equal to the max length", () => {
    expect(ellipsizeCenter("abcde", 5)).toEqual("abcde");
  });

  it("returns ellipsized string if string longer than max length", () => {
    expect(ellipsizeCenter("abcdefghijklmno", 8)).toEqual("abc...mno");
  });
});
