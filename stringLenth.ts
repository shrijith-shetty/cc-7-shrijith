const assert = require("assert");

/**
 *  Calculate the length of the string without using .length property.
 * @param input the input string whose length needs to calculated.
 * @returns the number of string in string.
 */
const lengthOfString = (input: string): number => {
  let count: number = 0;
  for (const _ of input) {
    count++;
  }
  return count;
};

// Verifies that the function returns the expected output
assert.deepStrictEqual(lengthOfString(""), 0);
assert.deepStrictEqual(lengthOfString("abc"), 3);
assert.deepStrictEqual(lengthOfString("I am the man"), 12);
assert.deepStrictEqual(lengthOfString("🤣🤣"), 2);
