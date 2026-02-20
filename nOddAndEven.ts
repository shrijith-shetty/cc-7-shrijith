import { deepEqual } from "node:assert";

//printing the odd or even number till the user want where he should give a number and string('odd' or 'even')
function printEvenOdd(num: number, evenOrOdd: string): number[] {
  let result: number[] = [];
  let k = 0;
  if (evenOrOdd.toLowerCase() === "odd") {
    for (let i = 1; i <= num; i += 2) {
      //skipping by 1 so the time takes will be n/2 => O(n) (only)
      result[k++] = i;
    }
    return result; //returning result
  }
  if (evenOrOdd.toLowerCase() === "even") {
    for (let i = 0; i <= num; i += 2) {
      result[k++] = i;
    }
    return result; //returning result
  }
  return []; //returning empty array if the user mention any wrong statement like 'even' or 'odd'
}
//printing the output
console.log(printEvenOdd(3, "odd"));
console.log(printEvenOdd(2, "even"));
//checking whether the expected and actual output is same or different
deepEqual(printEvenOdd(3, "odd"), [1, 3], "The odd numbers till 3 is 1, 3");
deepEqual(printEvenOdd(2, "even"), [0, 2], "The even numbers till 2 is 0, 2");
