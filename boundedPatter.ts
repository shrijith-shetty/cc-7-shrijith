import { deepEqual } from "node:assert";

//printing the pattern using for loop
const printSymbol = (n: number): string => {
  let result = "";

  for (let i = 0; i < n; i++) {
    let row = "";

    for (let j = 0; j <= i; j++) {
      if (j === 0 || i === j || i === n - 1) {
        row += "💚 ";
      } else {
        row += "💙 ";
      }
    }

    result += row.trimEnd() + "\n";
  }

  return result;
};

//checking whether the expected and actual output is same or different
deepEqual(
  printSymbol(8),
  `💚
💚 💚
💚 💙 💚
💚 💙 💙 💚
💚 💙 💙 💙 💚
💚 💙 💙 💙 💙 💚
💚 💙 💙 💙 💙 💙 💚
💚 💚 💚 💚 💚 💚 💚 💚
`,
  "Correct pattern",
);
