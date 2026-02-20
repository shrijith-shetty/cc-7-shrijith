import { deepEqual } from "assert";

//printing the patter using for loop
const printSymbol = (n: number): string => {
    let result: string = "";
    for (let i = 0; i < n; i++) {
        let row = "";
        for (let j = 0; j < i + 1; j++) {
            if (j % 2 == 0) {
                row += "💚 ";

            } else {
                row += "💙 ";
            }
        }
        result += row.trimEnd() + "\n";
    }
    return result;
}

//checking whether the expected and actual output is same or different
deepEqual(
    printSymbol(6),
`💚
💚 💙
💚 💙 💚
💚 💙 💚 💙
💚 💙 💚 💙 💚
💚 💙 💚 💙 💚 💙
`,
"correct pattern"
);

