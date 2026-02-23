"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_assert_1 = require("node:assert");
//printing the odd or even number till the user want where he should give a number and string('odd' or 'even')
function printEvenOdd(num, evenOrOdd) {
    let result = [];
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
//This function checks whether the given function gives expected output
(0, node_assert_1.deepEqual)(printEvenOdd(3, "odd"), [1, 3], "The odd numbers till 3 is 1, 3");
(0, node_assert_1.deepEqual)(printEvenOdd(2, "even"), [0, 2], "The even numbers till 2 is 0, 2");
//# sourceMappingURL=nOddAndEven.js.map