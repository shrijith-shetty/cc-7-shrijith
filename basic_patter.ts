import { deepEqual } from "node:assert";
//printing the 💙 using for loop in javascript
const printSymbol = (n: number): string => {
    let result = ""
    for (let i = 0; i < 8; i++) { //first for loop
        let row = "";
        for (let j = 0; j < i + 1; j++) { //second for loop
            row += "💙 ";
        }
        result += row.trimEnd() + "\n";
    }
    return result;
}

//here i am checking the function is returning expected output or not using assertion (deepEqual)
deepEqual(printSymbol(8),
`💙
💙 💙
💙 💙 💙
💙 💙 💙 💙
💙 💙 💙 💙 💙
💙 💙 💙 💙 💙 💙
💙 💙 💙 💙 💙 💙 💙
💙 💙 💙 💙 💙 💙 💙 💙
`,
    "Correct pattern"
)