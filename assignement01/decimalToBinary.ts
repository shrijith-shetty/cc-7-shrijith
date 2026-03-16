const assert = require("assert");

/**
 * Converts a decimal number to its binary representation.
 *
 * @param input The decimal number to convert.
 * @returns A string representing the binary form of the input number.
 */
const decimalToBinary = (input: number): string => {
  let num = Math.abs(input);
  let n = Math.floor(Math.log2(num));
  let result = "";

  for (let i = n; i >= 0; i -= 1) {
    if (num >= Math.pow(2, i)) {
      result += "1";
      num -= Math.pow(2, i);
    } else {
      result += "0";
    }
  }

  return input < 0 ? "-" + result : result;
};

// Verifies that the function returns the expected output
assert.deepStrictEqual(decimalToBinary(10), "1010");
assert.deepStrictEqual(decimalToBinary(20), "10100");
assert.deepStrictEqual(decimalToBinary(-20), "-10100");
assert.deepStrictEqual(decimalToBinary(-40), "-101000");
