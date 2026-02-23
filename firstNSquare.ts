const assert = require("assert");

/**
 * Generates the first n perfect square numbers.
 *
 * @param n The number of perfect squares to generate.
 * @returns An array containing the first n perfect squares.
 */
const perfectSquare = (n: number): number[] => {
  let result: number[] = [];
  for (let i = 0; i < n; i++) {
    result[i] = (i + 1) * (i + 1);
  }
  return result;
};

// Verifies that the function returns the expected output
assert.deepStrictEqual(perfectSquare(3), [1, 4, 9]);
assert.deepStrictEqual(perfectSquare(4), [1, 4, 9, 16]);
assert.deepStrictEqual(perfectSquare(2), [1, 4]);
