"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importStar(require("assert"));
//function to covnert decimal to binary
const decimalToBinary = (input) => {
    let n = Math.floor(Math.log2(input)); // took log so it's should not go more than it's size
    let result = ""; // result will be stored here
    for (let i = n; i >= 0; i -= 1) {
        // running the branch in reverse format
        // console.log(n)
        if (input >= Math.pow(2, i)) {
            result += "1"; //insert 1 if
            input -= Math.pow(2, i);
        }
        else {
            result += "0";
        }
    }
    return result; //return result in string format
};
//This function checks whether the given function gives expected output
(0, assert_1.deepEqual)(decimalToBinary(10), "1010", "The binary value of decimal 10 is 1010");
(0, assert_1.deepEqual)(decimalToBinary(20), "10100", "The binary value of decimal 10 is 10100");
//# sourceMappingURL=decimalToBinary.js.map