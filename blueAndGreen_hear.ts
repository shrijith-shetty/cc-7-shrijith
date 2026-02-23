const assert = require("assert");
/**
 * @param n The number of rows to generate.
 * @returns A string representing the formatted triangle, with each row separated by a newline.
 */
const printSymbol = (n: number): string => {
  let result = "";
  for (let i = 0; i < n; i++) {
    let row = "";
    for (let j = 0; j <= i; j++) {
      if (i % 2 === 0) {
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
  printSymbol(5),
  `💚
💙 💙
💚 💚 💚
💙 💙 💙 💙
💚 💚 💚 💚 💚
`,
);

assert.deepStrictEqual(printSymbol(0), ``);
assert.deepStrictEqual(
  printSymbol(3),
  `💚
💙 💙
💚 💚 💚
`,
);
