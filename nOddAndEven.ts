const assert = require("assert");
/**
 * Generates either even or odd numbers up to the given limit.
 *
 * @param num The upper limit (inclusive).
 * @param evenOrOdd Specifies whether to generate "even" or "odd" numbers.
 * @returns An array of even or odd numbers up to the given limit.
 */
function printEvenOdd(num: number, evenOrOdd: string): number[] {
  const result: number[] = [];
  const type = evenOrOdd.toLowerCase();

  if (type === "odd") {
    for (let i = 0; i <= num; i += 2) {
      result.push(i + 1);
    }
  } else if (type === "even") {
    for (let i = 0; i <= num; i += 2) {
      result.push(i);
    }
  }

  return result;
}

// Verifies that the function returns the expected output
assert.deepStrictEqual(printEvenOdd(3, "odd"), [1, 3]);
assert.deepStrictEqual(printEvenOdd(2, "even"), [0, 2]);
