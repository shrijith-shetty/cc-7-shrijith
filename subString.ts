import { deepEqual } from "node:assert";

//function to return the character till it's not repeating
const repeatingCharecters = (input: string): string => {
  let result: string = ""; // result will be stored here
  for (let i = 0; i < input.length; i++) {
    if (result.includes(input[i])) {
      return result;
    }
    result += input[i];
  }
  return result;
};
//printing to check the result
console.log(repeatingCharecters("abca"));
//checking whether the expected and actual output is same or different
deepEqual(
  repeatingCharecters("abc"),
  "abc",
  "There is no repeating charecters in abc",
);
deepEqual(
  repeatingCharecters("Terminal"),
  "Terminal",
  "There is no repeating charecters in Terminal",
);
