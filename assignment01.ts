import assert from "node:assert/strict";

/*
#1.a
Write a Higher Order Function (HOF)

This function demonstrates a Higher Order Function.
`createCutOff` takes a number as input and returns another function.
The returned function compares the input value with the cutoff value
and returns true if the input is less than the cutoff value.
*/

function createCutOff(cutOffValue: number) {
  return function (inputValue: number): boolean {
    return cutOffValue > inputValue;
  };
}

const cutOff100 = createCutOff(100);

assert.equal(cutOff100(89), true);
assert.equal(cutOff100(189), false);
assert.equal(cutOff100(100), false);

/*
#2
Replace ‘CraftCode’ with ‘CodeCraft’

- The input is an array of strings containing the word "CraftCode".
- The `map()` method is used to transform each string.
- The `replace()` method replaces "CraftCode" with "CodeCraft".
- The result is a new array with the corrected word.
*/

const strings = [
  "CraftCode is a nice company",
  "We love CraftCode",
  "We are working in CraftCode",
  "Where is CraftCode?",
];

const transformedStrings = strings.map((line) =>
  line.replace("CraftCode", "CodeCraft"),
);

assert.equal(transformedStrings[0], "CodeCraft is a nice company");
assert.equal(transformedStrings[1], "We love CodeCraft");
assert.equal(transformedStrings[3], "Where is CodeCraft?");

/*
#3
Filter lines that do not contain 4 and add 10 to quantity

- The input is a multiline string representing table data.
- `split("\n")` is used to convert the string into an array of lines.
- `filter()` removes lines that contain the number 4.
- `map()` (if used) would update the quantity by adding 10.
- `join("\n")` converts the array back into string format.
- The final result is a formatted string with updated quantities.
*/
const purchases = `items qty
apple 24
mango 50
guava 42
onion 31
water 10`;

const lines = purchases.split("\n");
console.log(lines);

const rowsWithFour = lines.filter((line) => !line.includes("4"));
console.log(rowsWithFour);
const updatedRows = rowsWithFour.map((fruit, index) => {
  if (index === 0) return fruit;
  else {
    const [item, qty] = fruit.split(" ");
    let numberQuantity = Number(qty);
    if (!isNaN(numberQuantity)) {
      numberQuantity += 10;
    }
    return `${item} ${numberQuantity}`;
  }
});

assert.equal(updatedRows.includes("mango 60"), true);
assert.equal(updatedRows.includes("onion 41"), true);
assert.equal(updatedRows.includes("water 20"), true);

/*
#4
Filter out strings containing ‘u’ or ‘g’

- The input is an array of strings.
- `filter()` is used to remove elements that contain the letters 'u' or 'g'.
- The result is a new array containing only strings without 'u' and 'g'.
- Assertions verify that expected values are included or excluded.
*/

const itemsList1 = ["browl", "faaast", "energy", "stand", "eat", "lunch"];

const filteredItems1 = itemsList1.filter(
  (item) => !item.includes("u") && !item.includes("g"),
);

assert.equal(filteredItems1.includes("browl"), true);
assert.equal(filteredItems1.includes("eat"), true);
assert.equal(filteredItems1.includes("energy"), false);

/*
#5
Filter elements that start with "mang" or end with "fy"

- The input is an array of strings.
- `filter()` removes elements that start with "mang" or end with "fy".
- The result is a new array excluding those matching conditions.
- Assertions confirm correct filtering behavior.
*/

let items1 = [
  "mangalore",
  "semangin",
  "2 lonely",
  "verify",
  "rectify",
  "mangala",
  "notifyy",
];
const filterItems = items1.filter(
  (line) => !line.startsWith("mang") && !line.endsWith("fy"),
);

assert.equal(filterItems.includes("mangalore"), false);
assert.equal(filterItems.includes("verify"), false);
assert.equal(filterItems.includes("2 lonely"), true);

/*
# Regex Filter

Removes strings that:
- Start with "mang"
- End with "fy"

const filteredItems = items1.filter(
  (row) => !row.match(/^mang/) && !row.match(/fy$/),
);

^mang → starts with "mang"  
fy$ → ends with "fy"  
! → excludes those matches

Assertions confirm:
- "mangalore" is removed
- "verify" is removed
- "2 lonely" remains
*/

const patternFilteredItems = items1.filter(
  (row) => !row.match(/^mang/) && !row.match(/fy$/),
);
assert.equal(patternFilteredItems.includes("mangalore"), false);
assert.equal(patternFilteredItems.includes("verify"), false);
assert.equal(patternFilteredItems.includes("2 lonely"), true);

/*
#6
Add 10 to each number and filter numbers divisible by 4

- The input is an array of numbers.
- `map()` adds 10 to each number.
- `filter()` keeps only numbers divisible by 4.
- The result is a new array containing valid numbers.
*/

const numbers = [34, 45, 2, 53, 84, 542, 31, 23];

const processedNumbers = numbers
  .map((num) => num + 10)
  .filter((num) => num % 4 === 0);

assert.equal(processedNumbers.includes(44), true);
assert.equal(processedNumbers.includes(12), true);
assert.equal(processedNumbers.includes(552), true);

/*
#7
Return Fibonacci numbers at given indices

- `fibonacciSeries` calculates the Fibonacci number for a given index.
- `map()` is used to transform an array of indices into their Fibonacci values.
- The result is an array containing Fibonacci numbers at those indices.
*/

/**
 *
 * @param num takes the index and return the it's fibonacci value
 * @returns return the fibonacci value.
 */
const fibAtIndex = (num: number): number => {
  if (num === 0) return 0;
  if (num === 1) return 1;
  let fib = 1;
  let lastFib = 0;
  for (let i = 1; i < num; i++) {
    let value = fib + lastFib;
    lastFib = fib;
    fib = value;
  }
  return fib;
};
let indexValue = [2, 1, 5, 7];
const outputFibonacci = indexValue.map((fibIndex) => fibAtIndex(fibIndex));
console.log(outputFibonacci);

assert.equal(fibAtIndex(0), 1);
assert.equal(fibAtIndex(2), 5);
assert.equal(fibAtIndex(3), 13);

/*
#8
Extract Emails from Address Strings

This code extracts valid email addresses from the `addressList` array.
Each string may contain address information along with an email, or no email at all.

Steps performed:
1. `map()` is used with a regular expression to search for valid email patterns in each string.
2. `filter()` removes any null results (lines without valid emails).
3. `map()` converts all extracted emails to lowercase.

The final result is an array containing only valid email addresses in lowercase.

The assertions verify that:
- "bs@sft.com" exists in the result.
- "michel@sun.it" exists in the result.
- Only 2 valid emails were extracted.
*/

const addressList = [
  "34, brighten street, email: BS@sft.com",
  "Behind hotel paragon, rode street, micHel@sun.it",
  "ulef court, cown street, email:cown@street",
  "CodeCraft",
];

const extractedEmails = addressList
  .map((line) => line.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/))
  .filter((match): match is RegExpMatchArray => match !== null)
  .map((match) => match[0].toLowerCase());

assert.equal(extractedEmails.includes("bs@sft.com"), true);
assert.equal(extractedEmails.includes("michel@sun.it"), true);
assert.equal(extractedEmails.length, 2);

/*
#9
Get list of ages

This code extracts the `age` property from each object in the `people` array.
Using the `map()` method, it creates a new array called `ages` that contains
only the age values.

The assertions verify that:
- Specific ages (13 and 67) exist in the result.
- The total number of extracted ages is 5.

This demonstrates how to transform an array of objects into
an array of specific property values using `map()`.
*/

const people = [
  { name: "John", age: 13 },
  { name: "Mark", age: 56 },
  { name: "Rachel", age: 45 },
  { name: "Nate", age: 67 },
  { name: "Jeniffer", age: 65 },
];

const ages = people.map((person) => person.age);

assert.equal(ages.includes(13), true);
assert.equal(ages.includes(67), true);
assert.equal(ages.length, 5);
