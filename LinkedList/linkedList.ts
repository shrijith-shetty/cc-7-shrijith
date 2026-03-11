/**
 * Represents a single node in a singly linked list.
 *
 * @typeParam T - The type of value stored in the node.
 */
export class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  /**
   * Creates a new ListNode.
   *
   * @param value - The value stored in the node.
   * @param next - Reference to the next node (default: null).
   */
  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

/**
 * Generic implementation of a Singly Linked List.
 *
 * Maintains references to:
 * - head → first node
 * - tail → last node
 * - length → number of elements
 *
 * Time Complexity:
 * addAtHead  → O(1)
 * addAtEnd   → O(1)
 * removeFromHead → O(1)
 * removeFromEnd  → O(n)
 * searchFor  → O(n)
 */
export class LinkedList<T> {
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;
  private length = 0;

  /**
   * Adds an element at the end of the list.
   *
   * @param value - Value to insert.
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
   * Adds an element at the beginning of the list.
   *
   * @param value - Value to insert.
   * @returns Inserted value.
   */
  addAtHead(value: T): T {
    const newNode = new ListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
    return value;
  }

  /**
   * Removes and returns the first element of the list.
   *
   * @returns Removed value or null if list is empty.
   */
  removeFromHead(): T | null {
    if (!this.head) return null;

    const value = this.head.value;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }

    this.length--;
    return value;
  }

  /**
   * Removes and returns the last element of the list.
   *
   * @returns Removed value or null if list is empty.
   */
  removeFromEnd(): T | null {
    if (!this.head) return null;

    if (this.head === this.tail) {
      const value = this.head.value;
      this.head = null;
      this.tail = null;
      this.length--;
      return value;
    }

    let current = this.head;

    while (current.next !== this.tail) {
      current = current.next!;
    }

    const value = this.tail!.value;
    current.next = null;
    this.tail = current;

    this.length--;
    return value;
  }

  /**
   * Searches for a value in the list.
   *
   * @param value - Value to search.
   * @returns Found value or null if not present.
   */
  searchFor(value: T): T | null {
    let current = this.head;

    while (current) {
      if (current.value === value) {
        return current.value;
      }
      current = current.next;
    }

    return null;
  }

  /**
   * Returns the number of elements in the list.
   *
   * @returns Length of linked list.
   */
  lengthOfLinkedList(): number {
    return this.length;
  }

  /**
   * Prints all values of the list.
   */
  printList(): void {
    let current = this.head;

    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }
}
