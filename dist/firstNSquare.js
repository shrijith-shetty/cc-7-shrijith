"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
//returning perfect square till the user reuirement
const perfectSquare = (n) => {
    let result = [];
    for (let i = 1; i <= n; i++)
        result[i - 1] = i * i;
    return result; //returning result in array format
};
//This function checks whether the given function gives expected output
assert_1.default.deepEqual(perfectSquare(3), [1, 4, 9], "1,4,9 are the first 3 perfect square");
assert_1.default.deepEqual(perfectSquare(4), [1, 4, 9, 16], "1,4,9,16 are the first 3 perfect square");
assert_1.default.deepEqual(perfectSquare(2), [1, 4], "1,4 are the first 3 perfect square");
//# sourceMappingURL=firstNSquare.js.map