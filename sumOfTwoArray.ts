import assert from "assert";

//Function to add two array where i am using same array to sum so space complexity can be reduced
const sumOfArray = (array1: number[], array2: number[]): number[] => {
  for (let i = 0; i < array1.length; i++) {
    array1[i] += array2[i];
  }
  return array1; // result will be sent by adding to the input array so the space can usage can be reduced
};

//printing to check the result
console.log(sumOfArray([1, 2, 3], [1, 2, 3]));

//checking whether the expected and actual output is same or different
assert.deepEqual(
  sumOfArray([1, 2, 3], [1, 2, 3]),
  [2, 4, 6],
  "The sum of the array is 2,4,6",
);
assert.deepEqual(
  sumOfArray([1, 4, 3], [1, 2, 3]),
  [2, 6, 6],
  "The sum of the array is 2,6,6",
);
