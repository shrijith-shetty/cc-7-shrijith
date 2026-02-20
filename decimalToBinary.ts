import assert, { deepEqual } from "assert";

//function to covnert decimal to binary
const decimalToBinary = (input: number): string => {
  let n = Math.floor(Math.log2(input)); // took log so it's should not go more than it's size
  let result: string = ""; // result will be stored here
  for (let i = n; i >= 0; i -= 1) {
    // running the branch in reverse format
    // console.log(n)
    if (input >= Math.pow(2, i)) {
      result += "1"; //insert 1 if
      input -= Math.pow(2, i);
    } else {
      result += "0";
    }
  }
  return result; //return result in string format
};

//printing the output
console.log(decimalToBinary(10));

//checking whether the expected and actual output is same or different
deepEqual(
  decimalToBinary(10),
  "1010",
  "The binary value of decimal 10 is 1010",
);
deepEqual(
  decimalToBinary(20),
  "10100",
  "The binary value of decimal 10 is 10100",
);
