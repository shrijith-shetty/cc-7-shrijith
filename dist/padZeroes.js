"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
//function will add zero in the begining if the length of given input is not match to total number of digit which the user mention
const paddingZero = (numb, numberOfDigits) => {
    let duplicateNumb = numb.toString();
    while (duplicateNumb.length < numberOfDigits) {
        duplicateNumb = "0" + duplicateNumb; // added '0' in first so 0 should be added in first not in last
    }
    return duplicateNumb; //returning duplicate number in the string format;
};
//This function checks whether the given function gives expected output
(0, assert_1.deepEqual)(paddingZero(23, 4), "0023", "The output is 0023");
(0, assert_1.deepEqual)(paddingZero(1223, 4), "1223", "The output is 1223");
//# sourceMappingURL=padZeroes.js.map