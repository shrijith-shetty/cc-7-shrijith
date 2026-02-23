"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_assert_1 = require("node:assert");
/**
 * @param input Takes a string as input. The function iterates through the string
 * and stops when a duplicate character is encountered, returning the collected
 * set of unique characters up to that point.
 * @returns Returns a string containing non-duplicate characters.
 */
const repeatingCharecters = (input) => {
    let result = "";
    for (let i = 0; i < input.length; i++) {
        if (result.includes(input[i])) {
            return result;
        }
        result += input[i];
    }
    return result;
};
//This function checks whether the given function gives expected output
(0, node_assert_1.deepEqual)(repeatingCharecters("abc"), "abc", "There is no repeating charecters in abc");
asserts.deepStrictEqual(repeatingCharecters("Terminal"), "Terminal", "There is no repeating charecters in Terminal");
//# sourceMappingURL=subString.js.map