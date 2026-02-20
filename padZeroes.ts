import { deepEqual } from "assert";

//function will add zero in the begining if the length of given input is not match to total number of digit which the user mention
const paddingZero = (numb: number, numberOfDigits: number): string => {
  let duplicateNumb: string = numb.toString();

  while (duplicateNumb.length < numberOfDigits) {
    duplicateNumb = "0" + duplicateNumb; // added '0' in first so 0 should be added in first not in last
  }
  return duplicateNumb; //returning duplicate number in the string format;
};

//printing the statement
console.log(paddingZero(234, 5));

//checking whether the expected and actual output is same or different
deepEqual(paddingZero(23, 4), "0023", "The output is 0023");
deepEqual(paddingZero(1223, 4), "1223", "The output is 1223");
