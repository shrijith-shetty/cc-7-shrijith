const assert = require("assert");

/**
 * Converts a decimal number to its binary representation.
 *
 * @param input The decimal number to convert.
 * @returns A string representing the binary form of the input number.
 */
const decimalToBinary = (input: number): string => {
  let n = Math.floor(Math.log2(input));
  let result: string = "";
  for (let i = n; i >= 0; i -= 1) {
    if (input >= Math.pow(2, i)) {
      result += "1";
      input -= Math.pow(2, i);
    } else {
      result += "0";
    }
  }
  return result;
};

// Verifies that the function returns the expected output
assert.deepStrictEqual(decimalToBinary(10), "1010");
assert.deepStrictEqual(decimalToBinary(20), "10100");
