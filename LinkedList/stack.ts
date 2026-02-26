import { ListNode } from "./linkedList.ts";

/**
 * Interface representing a Stack (LIFO structure).
 * Stack follows Last-In-First-Out principle.
 */
interface IStack<T> {
  push(value: T): T;
  pop(): T | null;
  peek(): T | null;
  isEmpty(): boolean;
  size(): number;
  print(): void;
}

/**
 * Stack implementation using a Singly Linked List.
 *
 * Internally maintains:
 * - #head → first node
 * - #tail → top of stack
 * #length → number of elements
 *
 * Time Complexity:
 * - push  → O(1)
 * - pop   → O(n)  (traverses to find second last node)
 * - peek  → O(1)
 * - size  → O(1)
 */
export class Stack<T> implements IStack<T> {
  #head: ListNode<T> | null = null;
  #tail: ListNode<T> | null = null;
  #length = 0;

  /**
   * Adds an element to the top of the stack.
   * Equivalent to addAtEnd in your original version.
   */
  push(value: T): T {
    const newNode = new ListNode<T>(value);

    if (!this.#tail) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      this.#tail.next = newNode;
      this.#tail = newNode;
    }

    this.#length++;
    return value;
  }

  /**
   * Removes and returns the top element of the stack.
   * Equivalent to removeAtEnd in your original version.
   */
  pop(): T | null {
    if (!this.#tail) {
      return null;
    }

    // If only one element exists
    if (this.#head === this.#tail) {
      const value = this.#head.value;
      this.#head = null;
      this.#tail = null;
      this.#length--;
      return value;
    }

    // Traverse to the node before #tail
    let currentNode = this.#head;

    while (currentNode!.next !== this.#tail) {
      currentNode = currentNode!.next;
    }

    const value = this.#tail.value;
    this.#tail = currentNode;
    this.#tail!.next = null;
    this.#length--;

    return value;
  }

  /**
   * Returns the top element without removing it.
   * Equivalent to top() in your original version.
   */
  peek(): T | null {
    return this.#tail ? this.#tail.value : null;
  }

  /**
   * Checks whether the stack is empty.
   */
  isEmpty(): boolean {
    return this.#length === 0;
  }

  /**
   * Returns number of elements in stack.
   * Equivalent to sizeOfStack().
   */
  size(): number {
    return this.#length;
  }

  /**
   * Prints all stack elements from bottom to top.
   */
  print(): void {
    let node = this.#head;

    while (node !== null) {
      console.log(node.value);
      node = node.next;
    }
  }
}
