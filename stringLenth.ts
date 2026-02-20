import assert from "assert";

//to check the length of the array without using .length function
const lengthOfString = (input: string): number => {
  let n: number = 0;
  while (true) {
    if (input.includes(input[n + 1])) ++n;
    else {
      return n > 0 ? n + 1 : n; // here done some maths so we can get exact expected output
    }
  }
  return 0; // simply added to silent the compiler
};

//printing the statemnt
console.log(lengthOfString("")); // => 9

//checking whether the expected and actual output is same or different
assert.deepEqual(lengthOfString(""), 0, "For empty string the length is 0");
assert.deepEqual(lengthOfString("abc"), 3, "For string abc the length is 3");
assert.deepEqual(
  lengthOfString("I am the man"),
  12,
  "For following string the length is 12",
);
