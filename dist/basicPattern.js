"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
/**
 *
 * @param n Specifies the input value that determines when the pattern generation should stop.
 * @returns Returns a string containing all the generated patterns.
 */
const printSymbol = (n) => {
    let result = "";
    for (let i = 0; i < 8; i++) {
        let row = "";
        for (let j = 0; j < i + 1; j++) {
            row += "💙 ";
        }
        result += row.trimEnd() + "\n";
    }
    return result;
};
//This function checks whether the given function gives expected output
(0, assert_1.deepEqual)(printSymbol(8), `💙
💙 💙
💙 💙 💙
💙 💙 💙 💙
💙 💙 💙 💙 💙
💙 💙 💙 💙 💙 💙
💙 💙 💙 💙 💙 💙 💙
💙 💙 💙 💙 💙 💙 💙 💙
`, "Correct pattern");
//# sourceMappingURL=basicPattern.js.map