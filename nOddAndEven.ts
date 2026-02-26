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
  const typeIs = evenOrOdd.toLowerCase();
  let value = 0;
  if (typeIs == "odd") value = 1;
  for (let i = 0; i < num * 2; i += 2) {
    result.push(i + value);
  }
  return result;
}

// Verifies that the function returns the expected output
assert.deepStrictEqual(printEvenOdd(3, "odd"), [1, 3, 5]);
assert.deepStrictEqual(printEvenOdd(2, "even"), [0, 2]);
assert.deepStrictEqual(printEvenOdd(5, "even"), [0, 2, 4, 6, 8]);
assert.deepStrictEqual(printEvenOdd(5, "odd"), [1, 3, 5, 7, 9]);
