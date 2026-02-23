"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
//to check the length of the array without using .length function
const lengthOfString = (input) => {
    let n = 0;
    while (true) {
        if (input.includes(input[n + 1]))
            ++n;
        else {
            return n > 0 ? n + 1 : n; // here done some maths so we can get exact expected output
        }
    }
    return 0; // simply added to silent the compiler
};
//This function checks whether the given function gives expected output
assert_1.default.deepEqual(lengthOfString(""), 0, "For empty string the length is 0");
assert_1.default.deepEqual(lengthOfString("abc"), 3, "For string abc the length is 3");
assert_1.default.deepEqual(lengthOfString("I am the man"), 12, "For following string the length is 12");
//# sourceMappingURL=stringLenth.js.map