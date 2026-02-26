const assert = require("assert");

/**
 * Pads a number with leading zeros until it reaches the specified length.
 *
 * @param numb The number to be padded.
 * @param numberOfDigits The desired total length of the resulting string.
 * @returns A string representation of the number with leading zeros if required.
 */
const paddingZero = (numb: number, numberOfDigits: number): string => {
  let stringRepOfNum = numb.toString();

  while (stringRepOfNum.length < numberOfDigits) {
    stringRepOfNum = "0" + stringRepOfNum;
  }

  return stringRepOfNum;
};

// Verifies that the function returns the expected output
assert.deepStrictEqual(paddingZero(23, 4), "0023");
assert.deepStrictEqual(paddingZero(1223, 4), "1223");
assert.deepStrictEqual(paddingZero(131231, 3), "131231");
assert.deepStrictEqual(paddingZero(-131231, 3), "-131231");
