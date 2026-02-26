import { describe, it, expect, beforeEach, vi } from "vitest";
import { LinkedList } from "./linkedList";

describe("LinkedList", () => {
  let list: LinkedList<number>;

  beforeEach(() => {
    list = new LinkedList<number>();
  });

  it("should initialize empty", () => {
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
    expect(list.lengthOfLinkedList()).toBe(0);
  });

  it("should add elements at head", () => {
    list.addAtHead(10);
    list.addAtHead(20);

    expect(list.head?.value).toBe(20);
    expect(list.tail?.value).toBe(10);
    expect(list.lengthOfLinkedList()).toBe(2);
  });

  it("should add elements at end", () => {
    list.addAtEnd(5);
    list.addAtEnd(15);

    expect(list.head?.value).toBe(5);
    expect(list.tail?.value).toBe(15);
    expect(list.lengthOfLinkedList()).toBe(2);
  });

  it("should remove from head correctly", () => {
    list.addAtEnd(1);
    list.addAtEnd(2);

    expect(list.removeFromHead()).toBe(1);
    expect(list.head?.value).toBe(2);
    expect(list.lengthOfLinkedList()).toBe(1);
  });

  it("should remove from end correctly", () => {
    list.addAtEnd(1);
    list.addAtEnd(2);
    list.addAtEnd(3);

    expect(list.removeFromEnd()).toBe(3);
    expect(list.tail?.value).toBe(2);
    expect(list.lengthOfLinkedList()).toBe(2);
  });

  it("should return null when removing from empty list", () => {
    expect(list.removeFromHead()).toBeNull();
    expect(list.removeFromEnd()).toBeNull();
  });

  it("should search existing value", () => {
    list.addAtEnd(10);
    list.addAtEnd(20);

    expect(list.searchFor(20)).toBe(20);
  });

  it("should return null when searching non-existing value", () => {
    list.addAtEnd(10);
    expect(list.searchFor(99)).toBeNull();
  });

  it("should track size correctly", () => {
    list.addAtEnd(1);
    list.addAtHead(2);
    list.removeFromEnd();

    expect(list.lengthOfLinkedList()).toBe(1);
  });

  it("should print list values (mock console.log)", () => {
    const spy = vi.spyOn(console, "log");

    list.addAtEnd(1);
    list.addAtEnd(2);

    list.printList();

    expect(spy).toHaveBeenCalledWith(1);
    expect(spy).toHaveBeenCalledWith(2);

    spy.mockRestore();
  });
});
