"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
/**
 *
 * @param n is the user input that determines how many lines should be printed vertically.
 * @returns Returns the generated output in string format
 */
const printSymbol = (n) => {
    let result = "";
    for (let i = 0; i < n; i++) {
        let row = "";
        for (let j = 0; j < i + 1; j++) {
            if (j % 2 == 0) {
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
//This function checks whether the following function gives the expected output by using assertion, if the output is unexpected then it will throw an error.
(0, assert_1.deepEqual)(printSymbol(6), `💚
💚 💙
💚 💙 💚
💚 💙 💚 💙
💚 💙 💚 💙 💚
💚 💙 💚 💙 💚 💙
`, "correct pattern");
//# sourceMappingURL=alternateHeartPattern.js.map