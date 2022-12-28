import { describe, expect, it } from "@jest/globals";
import { isFiveStarRating } from "./letterboxd.types";

jest.mock("axios");

// TODO: finish this test and double check mocking
// TODO: figure out expect messages
describe("isFiveStarRating", () => {
  it("should return true for all valid five star ratings", () => {
    for (let i = 0.5; i <= 5; i += 0.5) {
      expect(isFiveStarRating(i)).toEqual(true);
    }
  });

  it("should return false for all incorrect basic types", () => {
    expect(isFiveStarRating(true)).toEqual(false);
    expect(isFiveStarRating(false)).toEqual(false);
    expect(isFiveStarRating("0.5")).toEqual(false);
    expect(isFiveStarRating([1, 2, 3])).toEqual(false);
  });

  it("should return false for all numbers out of range", () => {
    expect(isFiveStarRating(0)).toEqual(false);
    expect(isFiveStarRating(5.5)).toEqual(false);
    expect(isFiveStarRating(10)).toEqual(false);
    expect(isFiveStarRating(-10)).toEqual(false);
  });

  it("should return false for all numbers with incorrect increment", () => {
    expect(isFiveStarRating(2.1)).toEqual(false);
    expect(isFiveStarRating(3.9433430123)).toEqual(false);
  });
});
