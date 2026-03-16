const assert = require("assert");

/**
 * Generates a hollow left-aligned triangle pattern using emojis.
 *
 * The triangle consists of `n` rows. The first column, last column of each row,
 * and the entire last row are filled with 💚. All inner positions are filled with 💙.
 * @param n The number of rows to generate.
 * @returns A string representing the formatted triangle, with each row separated by a newline.
 */
const printPattern = (n: number): string => {
  let result = "";

  for (let i = 0; i < n; i++) {
    let row = "";

    for (let j = 0; j <= i; j++) {
      if (j === 0 || i === j || i === n - 1) {
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
  printPattern(8),
  `💚
💚 💚
💚 💙 💚
💚 💙 💙 💚
💚 💙 💙 💙 💚
💚 💙 💙 💙 💙 💚
💚 💙 💙 💙 💙 💙 💚
💚 💚 💚 💚 💚 💚 💚 💚
`,
);
assert.deepStrictEqual(
  printPattern(6),
  `💚
💚 💚
💚 💙 💚
💚 💙 💙 💚
💚 💙 💙 💙 💚
💚 💚 💚 💚 💚 💚
`,
);

assert.deepStrictEqual(printPattern(0), ``);
