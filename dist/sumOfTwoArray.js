"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
/**
 *
 * @param array1 Takes the input first array of number
 * @param array2 Takes the input second array of number
 * @returns return the sum of two array of number
 */
const sumOfArray = (array1, array2) => {
    if (array1.length <= array2.length) {
        // It checks whether array1 is smaller or array2. If array1 is smaller then it will store it in array2, else in array1
        for (let i = 0; i < array1.length; i++) {
            array2[i] += array1[i];
        }
        return array2;
    }
    else {
        for (let i = 0; i < array2.length; i++) {
            array1[i] += array2[i];
        }
        return array1;
    } // result will be sent by adding to the input array so the space can usage can be reduced
};
//This function checks whether the given function gives expected output
assert_1.default.deepEqual(sumOfArray([1, 2, 3], [1, 2, 3]), [2, 4, 6], "The sum of the array is 2,4,6");
assert_1.default.deepEqual(sumOfArray([1, 4, 3], [1, 2, 3]), [2, 6, 6], "The sum of the array is 2,6,6");
//# sourceMappingURL=sumOfTwoArray.js.map