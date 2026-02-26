import { describe, it, expect } from "vitest";
import {
  infixToPostfix,
  evaluatePostfix,
  evaluateInfix,
} from "./expressionEvaluation";

describe("Expression Evaluation - Infix to Postfix", () => {
  it("should convert simple addition", () => {
    expect(infixToPostfix("2+3")).toBe("23+");
  });

  it("should respect operator precedence", () => {
    expect(infixToPostfix("2+3*4")).toBe("234*+");
  });

  it("should handle parentheses", () => {
    expect(infixToPostfix("(2+3)*4")).toBe("23+4*");
  });

  it("should handle power operator", () => {
    expect(infixToPostfix("2^3")).toBe("23^");
  });

  it("should handle multiple operators", () => {
    expect(infixToPostfix("2+3*4-5")).toBe("234*+5-");
  });
});

describe("Expression Evaluation - Postfix Evaluation", () => {
  it("should evaluate simple addition", () => {
    expect(evaluatePostfix("23+")).toBe(5);
  });

  it("should evaluate multiplication", () => {
    expect(evaluatePostfix("34*")).toBe(12);
  });

  it("should evaluate mixed operations", () => {
    expect(evaluatePostfix("234*+")).toBe(14);
  });

  it("should evaluate with subtraction", () => {
    expect(evaluatePostfix("52-")).toBe(3);
  });

  it("should evaluate power operator", () => {
    expect(evaluatePostfix("23^")).toBe(8);
  });

  it("should throw error for invalid expression", () => {
    expect(() => evaluatePostfix("+")).toThrow();
  });
});

describe("Expression Evaluation - Infix Evaluation", () => {
  it("should evaluate simple addition", () => {
    expect(evaluateInfix("2+3")).toBe(5);
  });

  it("should evaluate operator precedence correctly", () => {
    expect(evaluateInfix("2+3*4")).toBe(14);
  });

  it("should evaluate parentheses correctly", () => {
    expect(evaluateInfix("(2+3)*4")).toBe(20);
  });

  it("should evaluate subtraction left-to-right", () => {
    expect(evaluateInfix("8-3-2")).toBe(3);
  });

  it("should evaluate complex expression", () => {
    expect(evaluateInfix("2+3*(4-1)")).toBe(11);
  });

  it("should evaluate power operator", () => {
    expect(evaluateInfix("2^3")).toBe(8);
  });
});
