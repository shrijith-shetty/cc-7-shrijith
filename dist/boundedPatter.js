"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_assert_1 = require("node:assert");
/**
 *
 * @param n Specifies the input value that determines when the pattern generation should stop.
 * @returns Returns a string containing all the generated patterns.
 */
const printSymbol = (n) => {
    let result = "";
    for (let i = 0; i < n; i++) {
        let row = "";
        for (let j = 0; j <= i; j++) {
            if (j === 0 || i === j || i === n - 1) {
                row += "💚 ";
            }
            else {
                row += "💙 ";
            }
        }
        result += row.trimEnd() + "\n";
    }
    return result;
};
//This function checks whether the given function gives expected output
(0, node_assert_1.deepEqual)(printSymbol(8), `💚
💚 💚
💚 💙 💚
💚 💙 💙 💚
💚 💙 💙 💙 💚
💚 💙 💙 💙 💙 💚
💚 💙 💙 💙 💙 💙 💚
💚 💚 💚 💚 💚 💚 💚 💚
`, "Correct pattern");
//# sourceMappingURL=boundedPatter.js.map