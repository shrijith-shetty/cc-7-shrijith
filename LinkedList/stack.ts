import { ListNode } from "./linkedList";

/**
 * Stack implementation using a Singly Linked List.
 *
 * Stack follows the LIFO principle:
 * Last In → First Out
 *
 * Maintains:
 * - head → first node
 * - tail → top of stack
 * - length → number of elements
 *
 * Time Complexity:
 * addAtEnd → O(1)
 * removeAtEnd → O(n)
 * top → O(1)
 */
export class Stack<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private length = 0;

  /**
   * Adds an element to the top of the stack.
   *
   * @param value - Value to push.
   * @returns Inserted value.
   */
  addAtEnd(value: T): T {
    const newNode = new ListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }

    this.length++;
    return value;
  }

  /**
   * Removes the top element of the stack.
   *
   * @returns Removed value or null if stack empty.
   */
  removeAtEnd(): T | null {
    if (!this.tail) return null;

    if (this.head === this.tail) {
      const value = this.head.value;
      this.head = null;
      this.tail = null;
      this.length--;
      return value;
    }

    let current = this.head;

    while (current!.next !== this.tail) {
      current = current!.next;
    }

    const value = this.tail.value;
    current!.next = null;
    this.tail = current;

    this.length--;
    return value;
  }

  /**
   * Returns the top element without removing it.
   *
   * @returns Top value or null if stack empty.
   */
  top(): T | null {
    return this.tail ? this.tail.value : null;
  }

  /**
   * Returns the number of elements in the stack.
   */
  sizeOfStack(): number {
    return this.length;
  }

  /**
   * Checks whether stack is empty.
   */
  isEmpty(): boolean {
    return this.length === 0;
  }
}
