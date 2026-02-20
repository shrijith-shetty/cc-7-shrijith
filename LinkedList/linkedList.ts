/**
 * Defines the contract for a generic singly linked list.
 *
 * @typeParam T - The type of elements stored in the list.
 */
interface ILinkedList<T> {
  addAtEnd(value: T): T;
  removeFromEnd(): T | null;

  addAtHead(value: T): T;
  removeFromHead(): T | null;

  search(value: T): T | null;

  size(): number;
  print(): void;

  valueAtHead(): T | null;
  valueAtTail(): T | null;
  valueAtIndex(index: number): T | null;
}

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
   * @param value - The value to store in the node.
   * @param next - Reference to the next node (default: null).
   */
  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

/**
 * A generic implementation of a singly linked list.
 *
 * Maintains references to:
 * - #head → First node in the list
 * - #tail → Last node in the list
 * - #length → Number of elements in the list
 *
 * Characteristics:
 * - Dynamic size
 * - Efficient insertions at head and tail
 * - Sequential access (no random access)
 *
 * Time Complexities:
 * - addAtHead → O(1)
 * - addAtEnd → O(1)
 * - removeFromHead → O(1)
 * - removeFromEnd → O(n)
 * - search → O(n)
 * - valueAtIndex → O(n)
 *
 * @typeParam T - The type of elements stored in the list.
 */
export class LinkedList<T> implements ILinkedList<T> {
  #head: ListNode<T> | null = null;
  #tail: ListNode<T> | null = null;
  #length = 0;

  /**
   * Adds a new element at the end of the list.
   *
   * @param value - The value to add.
   * @returns The inserted value.
   * @complexity O(1)
   */
  addAtEnd(value: T): T {
    const newNode = new ListNode<T>(value);

    if (!this.#head) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      this.#tail!.next = newNode;
      this.#tail = newNode;
    }

    this.#length++;
    return value;
  }

  /**
   * Removes and returns the last element of the list.
   *
   * @returns The removed value, or null if the list is empty.
   * @complexity O(n)
   */
  removeFromEnd(): T | null {
    if (!this.#head) return null;

    if (this.#head === this.#tail) {
      const value = this.#head.value;
      this.#head = null;
      this.#tail = null;
      this.#length--;
      return value;
    }

    let current = this.#head;

    while (current.next !== this.#tail) {
      current = current.next!;
    }

    const value = this.#tail!.value;
    current.next = null;
    this.#tail = current;
    this.#length--;

    return value;
  }

  /**
   * Adds a new element at the beginning of the list.
   *
   * @param value - The value to add.
   * @returns The inserted value.
   * @complexity O(1)
   */
  addAtHead(value: T): T {
    const newNode = new ListNode(value);

    if (!this.#head) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      newNode.next = this.#head;
      this.#head = newNode;
    }

    this.#length++;
    return value;
  }

  /**
   * Removes and returns the first element of the list.
   *
   * @returns The removed value, or null if the list is empty.
   * @complexity O(1)
   */
  removeFromHead(): T | null {
    if (!this.#head) return null;

    const value = this.#head.value;

    if (this.#head === this.#tail) {
      this.#head = null;
      this.#tail = null;
    } else {
      const currentNode = this.#head;
      this.#head = this.#head.next;
      currentNode.next = null;
    }

    this.#length--;
    return value;
  }

  /**
   * Searches for a value in the list.
   *
   * @param value - The value to search for.
   * @returns The matching value if found, otherwise null.
   * @complexity O(n)
   */
  search(value: T): T | null {
    let currentNode = this.#head;

    while (currentNode !== null) {
      if (currentNode.value === value) {
        return currentNode.value;
      }
      currentNode = currentNode.next;
    }

    return null;
  }

  /**
   * Returns the number of elements in the list.
   *
   * @returns The size of the list.
   * @complexity O(1)
   */
  size(): number {
    return this.#length;
  }

  /**
   * Prints all elements in the list to the console.
   *
   * @complexity O(n)
   */
  print(): void {
    let currentNode = this.#head;

    while (currentNode !== null) {
      console.log(currentNode.value);
      currentNode = currentNode.next;
    }
  }

  /**
   * Retrieves the value stored at the head (first node).
   *
   * @returns The value of the first element, or null if the list is empty.
   * @complexity O(1)
   */
  valueAtHead(): T | null {
    return this.#head ? this.#head.value : null;
  }

  /**
   * Retrieves the value stored at the tail (last node).
   *
   * @returns The value of the last element, or null if the list is empty.
   * @complexity O(1)
   */
  valueAtTail(): T | null {
    return this.#tail ? this.#tail.value : null;
  }

  /**
   * Retrieves the value at the specified zero-based index.
   *
   * Index rules:
   * - 0 corresponds to the first element.
   * - size() - 1 corresponds to the last element.
   *
   * @param index - The zero-based position of the element to retrieve.
   * @returns The value at the specified index,
   *          or null if the index is out of bounds.
   *
   * @complexity O(n)
   */
  valueAtIndex(index: number): T | null {
    if (index < 0 || index >= this.#length) return null;

    let current = this.#head;
    let currentIndex = 0;

    while (current !== null) {
      if (currentIndex === index) {
        return current.value;
      }
      current = current.next;
      currentIndex++;
    }

    return null;
  }
}
