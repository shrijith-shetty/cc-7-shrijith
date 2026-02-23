const assert = require("assert");

/**
 * Generates a triangular pattern of alternating 💚 and 💙 symbols.
 *
 * Each row contains one more symbol than the previous row.
 * Symbols alternate based on position within the row.
 *
 * @param n The number of rows to generate.
 * @returns A string containing the formatted triangle pattern, with each row separated by a newline.
 */
const printPattern = (n: number): string => {
  let result: string = "";
  for (let i = 0; i < n; i++) {
    let row = "";
    for (let j = 0; j < i + 1; j++) {
      if (j % 2 == 0) {
        row += "💚 ";
      } else {
        row += "💙 ";
      }
    }
    result += row.trimEnd() + "\n";
  }
  return result;
};

// Verifies that the function returns the expected output
assert.deepStrictEqual(
  printPattern(6),
  `💚
💚 💙
💚 💙 💚
💚 💙 💚 💙
💚 💙 💚 💙 💚
💚 💙 💚 💙 💚 💙
`,
);
assert.deepStrictEqual(printPattern(0), ``);
assert.deepStrictEqual(
  printPattern(2),
  `💚
💚 💙
`,
);
assert.deepStrictEqual(
  printPattern(3),
  `💚
💚 💙
💚 💙 💚
`,
);
