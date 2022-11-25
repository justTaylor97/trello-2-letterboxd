import { describe, expect, it } from "@jest/globals";
import axios from "axios";
import { getToken } from "./letterboxd";

jest.mock("axios");

// TODO: finish this test and double check mocking
describe("getToken", () => {
  describe("when given the correct username and password", () => {
    it("returns a new Bearer token", () => {});
  });
});
