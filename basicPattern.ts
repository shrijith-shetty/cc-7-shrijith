const assert = require("assert");

/**
 * Generates a left-aligned triangular pattern using the 💙 symbol.
 * @param n The number of rows to generate.
 * @returns A string representing the triangular pattern, with each row separated by a newline.
 */
const printPattern = (n: number): string => {
  let result = "";
  for (let i = 0; i < n; i++) {
    let row = "";
    for (let j = 0; j < i + 1; j++) {
      row += "💙 ";
    }
    result += row.trimEnd() + "\n";
  }
  return result;
};

// Verifies that the function returns the expected output
assert.deepStrictEqual(
  printPattern(8),
  `💙
💙 💙
💙 💙 💙
💙 💙 💙 💙
💙 💙 💙 💙 💙
💙 💙 💙 💙 💙 💙
💙 💙 💙 💙 💙 💙 💙
💙 💙 💙 💙 💙 💙 💙 💙
`,
);
assert.deepStrictEqual(
  printPattern(4),
  `💙
💙 💙
💙 💙 💙
💙 💙 💙 💙
`,
);
assert.deepStrictEqual(printPattern(0), ``);
