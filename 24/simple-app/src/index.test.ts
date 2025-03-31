import { describe, expect, test } from "@jest/globals";
import { add, divide, multiply, subtract } from "./index";

describe("Calculator", () => {
  describe("add", () => {
    test("adds 1 + 2 to equal 3", () => {
        expect(add(1, 2)).toBe(3);
      }); 
  })

  describe("subtract", () => {
    test("subtract 2-1 to 1", () => {
        expect(subtract(2, 1)).toBe(1);
      }); 
  })

  describe("divide", () => {
    test("divide 10/5 to 2", () => {
        expect(divide(10, 5)).toBe(2);
      }); 
  })

  describe("multiplication", () => {
    test("multiply 1 * 2 to equal 2", () => {
        expect(multiply(1, 2)).toBe(2);
      }); 
  })

});
