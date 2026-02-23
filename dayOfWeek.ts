import assert from "assert";

//returning perfect square till the user reuirement
const perfectSquare = (n: number): number[] => {
  let result: number[] = [];
  for (let i = 1; i <= n; i++) result[i - 1] = i * i;
  return result; //returning result in array format
};

//checking whether the expected and actual output is same or different
assert.deepEqual(
  perfectSquare(3),
  [1, 4, 9],
  "1,4,9 are the first 3 perfect square",
);
assert.deepEqual(
  perfectSquare(4),
  [1, 4, 9, 16],
  "1,4,9,16 are the first 3 perfect square",
);
assert.deepEqual(
  perfectSquare(2),
  [1, 4],
  "1,4 are the first 3 perfect square",
);
