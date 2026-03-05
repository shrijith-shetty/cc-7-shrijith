// #11
// Find the second largest number in a given array first by using an imperative approach without using reduce. Use a forEach HOF to iterate over items and figure out the second largest item.

const inputValues = [42, 7, 19, 88, 3, 56, 91, 24, 65, 12];

const secondLargestEleme = (inputArray: number[]): number => {
  inputArray.sort();
  return inputArray[inputArray.length - 2];
};

let firstLargeValue = -Infinity;
let secondLargeValue = -Infinity;
inputValues.forEach((value) => {
  if (value > firstLargeValue) {
    secondLargeValue = firstLargeValue;
    firstLargeValue = value;
  } else if (secondLargeValue < value) {
    secondLargeValue = value;
  }
});

// #11
// Implement a method called as   some  that takes the array as its first argument, and a predicate as its second argument.  Predicate is a function that takes an item in the array as its argument, and returns a boolean.  some function will return true if at-least one item in the array passes the predicate, otherwise will return false. Give an imperative solution, and then give a solution using reduce.

const some = (arr: number[], predict: (value: number) => boolean): boolean => {
  for (let num of arr) {
    if (!predict(num)) {
      return false;
    }
  }
  return true;
};

console.log(some([2, 3, 4, 5], (value) => value > 1));

const every = (
  array: number[],
  predicate: (value: number) => boolean,
): boolean => {
  return array.reduce((acc, cur) => {
    return acc && predicate(cur);
  }, true);
};
console.log(every([4, 23, 42], (en) => en > 13));

// #13
// 1. We want to get an object that will have keys as author names, and values will be an array of their quotes.  The sample output will look something like this:

const Objects = [
  {
    text: "Genius is one percent inspiration and ninety-nine percent perspiration.",
    author: "Thomas Edison",
  },
  {
    text: "You can observe a lot just by watching.",
    author: "Yogi Berra",
  },
  {
    text: "To invent, you need a good imagination and a pile of junk",
    author: "Thomas Edison",
  },
  {
    text: "Difficulties increase the nearer we get to the goal.",
    author: "Yogi Berra",
  },
  {
    text: "Fate is in your hands and no one elses",
    author: "Byron Pulsifer",
  },
  {
    text: "Be the chief but never the lord.",
    author: "Lao Tzu",
  },
  {
    text: "Nothing happens unless first we dream.",
    author: "Byron Pulsifer",
  },
  {
    text: "Well begun is half done.",
    author: "Aristotle",
  },
  {
    text: "Life is a learning experience, only if you learn.",
    author: "Yogi Berra",
  },
  {
    text: "Self-complacency is fatal to progress.",
    author: "Margaret Sangster",
  },
  {
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
  },
  {
    text: "What you give is what you get.",
    author: "Byron Pulsifer",
  },
  {
    text: "We can only learn to love by loving.",
    author: "Lao Tzu",
  },
  {
    text: "Life is change. Growth is optional. Choose wisely.",
    author: "Karen Clark",
  },
  {
    text: "You'll see it when you believe it.",
    author: "Buddha",
  },
];

const grouped = Objects.reduce(
  (acc: Record<string, string[]>, { author, text }) => {
    if (acc[author] == null) {
      acc[author] = [];
    }
    acc[author].push(text);
    return acc;
  },
  {},
);

//#14
// Here is an array of employees:
let employees = [
  {
    firstName: "Molly",
    lastName: "Rojas",
    age: 38,
    email: "mollyrojas@plasmox.com",
    salary: 3065,
  },
  {
    firstName: "Marguerite",
    lastName: "Santiago",
    age: 27,
    email: "margueritesantiago@plasmox.com",
    salary: 2796,
  },
  {
    firstName: "Evelyn",
    lastName: "Oneil",
    age: 26,
    email: "evelynoneil@plasmox.com",
    salary: 3947,
  },
  {
    firstName: "Consuelo",
    lastName: "Case",
    age: 23,
    email: "consuelocase@plasmox.com",
    salary: 2819,
  },
  {
    firstName: "Earline",
    lastName: "Bush",
    age: 29,
    email: "earlinebush@plasmox.com",
    salary: 3494,
  },
  {
    firstName: "Sanford",
    lastName: "Hurley",
    age: 26,
    email: "sanfordhurley@plasmox.com",
    salary: 3068,
  },
  {
    firstName: "Todd",
    lastName: "Gomez",
    age: 33,
    email: "toddgomez@plasmox.com",
    salary: 3906,
  },
];

let totalSalaryPaid = 0;
employees.map((emp) => {
  if (emp.age < 30) totalSalaryPaid += emp.salary;
});

// console.log(totalSalaryPaid);

const fullNameOfEmployee = employees.map((emp) => {
  let fullName = emp.firstName + " " + emp.lastName;
  return fullName;
});

// console.log(fullNameOfEmployee);

const emailId = employees.map((emp) => emp.email);
// console.log(emailId);
