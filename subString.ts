const assert = require("assert");

/**
 * Extracts character from the input string until duplicate character is found.
 * @param input the string is to be processed.
 * @returns A string containing unique characters from the beginning of the input string up to (but not including) the first repeated character.
 */
const repeatingCharacters = (input: string): string => {
  let result: string = "";

  for (let i = 0; i < input.length; i++) {
    if (result.includes(input[i])) {
      return result;
    }
    result += input[i];
  }

  return result;
};

// Verifies that the function returns the expected output
assert.deepStrictEqual(repeatingCharacters("abc"), "abc");
assert.deepStrictEqual(repeatingCharacters("Terminal"), "Terminal");
assert.deepStrictEqual(repeatingCharacters("assignment"), "as");
assert.deepStrictEqual(repeatingCharacters("I am shrijith"), "I am");
