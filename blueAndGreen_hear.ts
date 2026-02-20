import { deepEqual } from "assert";
//printing the pattern using symbol and sending the result in string format
const printSymbol = (n: number): string => {
    let result = "";
    for (let i = 0; i < n; i++) {
        let row = "";
        for (let j = 0; j <= i; j++) {
            if (i % 2 === 0) {
                row += "💚 ";
            }
            else {
                row += "💙 ";
            }
        }
        result += row.trimEnd() + "\n";

    }
    return result;
}

//checking whether the expected and actual output is same or different
deepEqual(
    printSymbol(5),
    `💚
💙 💙
💚 💚 💚
💙 💙 💙 💙
💚 💚 💚 💚 💚
`,
    "correct pattern"
);
