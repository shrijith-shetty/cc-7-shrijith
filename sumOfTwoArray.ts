const assert = require("assert");

/**
 *
 * @param array1 the first array of number
 * @param array2 the second array of number
 * @returns return the sum of two array of number
 * if the array having different length then it adds to the modify the larger array
 */
const sumOfArray = (array1: number[], array2: number[]): number[] => {
  if (array1.length <= array2.length) {
    // If array1 is smaller or equal length, modify array2 and return it
    for (let i = 0; i < array1.length; i++) {
      array2[i] += array1[i];
    }
    return array2;
  } else {
    //otherwise, modify array1 and returns.
    for (let i = 0; i < array2.length; i++) {
      array1[i] += array2[i];
    }
    return array1;
  }
};

//Verify that the function returns expected output
assert.deepStrictEqual(sumOfArray([1, 2, 3], [1, 2, 3]), [2, 4, 6]);
assert.deepStrictEqual(sumOfArray([1, 4, 3], [1, 2, 3]), [2, 6, 6]);
