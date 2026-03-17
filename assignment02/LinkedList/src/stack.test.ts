import { describe, it, expect, beforeEach } from "vitest";
import { Stack } from "./stack";

describe("Stack", () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
  });

  it("should initialize as empty", () => {
    expect(stack.isEmpty()).toBe(true);
    expect(stack.sizeOfStack()).toBe(0);
    expect(stack.top()).toBeNull();
  });

  it("should add elements using addAtEnd", () => {
    stack.addAtEnd(10);
    stack.addAtEnd(20);

    expect(stack.sizeOfStack()).toBe(2);
    expect(stack.top()).toBe(20);
    expect(stack.isEmpty()).toBe(false);
  });

  it("should remove elements in LIFO order", () => {
    stack.addAtEnd(1);
    stack.addAtEnd(2);
    stack.addAtEnd(3);

    expect(stack.removeAtEnd()).toBe(3);
    expect(stack.removeAtEnd()).toBe(2);
    expect(stack.removeAtEnd()).toBe(1);
    expect(stack.removeAtEnd()).toBeNull();
  });

  it("should update size correctly", () => {
    stack.addAtEnd(5);
    stack.addAtEnd(6);

    expect(stack.sizeOfStack()).toBe(2);

    stack.removeAtEnd();

    expect(stack.sizeOfStack()).toBe(1);
  });

  it("should return null when removing from empty stack", () => {
    expect(stack.removeAtEnd()).toBeNull();
  });

  it("should return correct top without removing", () => {
    stack.addAtEnd(100);
    stack.addAtEnd(200);

    expect(stack.top()).toBe(200);
    expect(stack.sizeOfStack()).toBe(2);
  });
});
