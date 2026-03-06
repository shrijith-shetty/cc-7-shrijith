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

// console.log(some([2, 3, 4, 5], (value) => value > 1));

const every = (
  array: number[],
  predicate: (value: number) => boolean,
): boolean => {
  return array.reduce((acc, cur) => {
    return acc && predicate(cur);
  }, true);
};
// console.log(every([4, 23, 42], (en) => en > 13));

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

// i
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

// ii
function getQuotesContainingWord(word: string) {
  let result: string[] = [];

  result = Objects.filter((sentence) => sentence.text.includes(word)).map(
    (sentence) => sentence.text,
  );
  return result;
}

//iii

function arrayOfQuaotes() {
  let result: string[];
  result = Objects.map((quotes) => quotes.text);
  return result;
}
// console.log(arrayOfQuaotes());
let authorName: string[] = Objects.reduce((acc: string[], author) => {
  if (!acc.includes(author.author)) {
    acc.push(author.author);
  }
  return acc;
}, []);

// console.log(authorName);

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

// #15
// We have an array that contains a list of objects that represent a fruit or a nut like so.

let fruites = [
  {
    name: "Banana",
    type: "fruit",
    treats: [
      "constipation",
      "vitamin deficiency",
      "skin issues",
      "sleep problems",
    ],
    nutritions: {
      protein: 8,
      carbs: 40,
      sugar: 30,
      vitamins: 45,
    },
  },
  {
    name: "Badam",
    type: "nut",
    treats: ["bp", "protein deficiency", "skin issues", "sugar"],
    nutritions: {
      protein: 18,
      carbs: 20,
      sugar: 20,
      vitamins: 65,
    },
  },
  {
    name: "Cashew",
    type: "nut",
    treats: ["bp", "protein deficiency", "skin issues", "bone issues"],
    nutritions: {
      protein: 22,
      carbs: 22,
      vitamins: 60,
    },
  },
  {
    name: "Wallnut",
    type: "nut",
    treats: ["bp", "protein deficiency", "skin issues", "bone issues"],
    nutritions: {
      protein: 33,
      carbs: 26,
      vitamins: 64,
    },
  },
  {
    name: "Apple",
    type: "fruit",
    treats: ["heart problems", "skin issues", "bone issues", "migraine"],
    nutritions: {
      protein: 22,
      carbs: 22,
      vitamins: 60,
    },
  },
];

// Write a function that will generate an object that will contain a key for each nutrition, and the value should be a fruit or nut that has highest content of that nutrition. If there is a tie, choose  the first one.
const highestNutrition = (nutritions: { [key: string]: number }) => {
  let highestFruit = "";
  let highestValue: number = 0;
  for (let [fruit, value] of Object.entries(nutritions)) {
    if (value > highestValue) {
      highestFruit = fruit;
      highestValue = value;
    }
  }
  let result = highestFruit + " " + highestValue;
  return result;
};

const nutritionOfFruitsOrNuts = fruites.map((fruit) => {
  const maxNutrions = highestNutrition(fruit.nutritions);
  const fruitName = fruit.name;

  return { fruitName: maxNutrions };
});

// Get an array of all unique nutritions that are present in all the fruits and nuts above

const allNutrition = fruites.reduce((acc: string[], fruite) => {
  const keys = Object.keys(fruite.nutritions);
  keys.forEach((key) => {
    if (!acc.includes(key)) acc.push(key);
  });
  return acc;
}, []);

// console.log(allNutrition);

// Get an array of all unique health conditions that the fruits treat.
const healthIssue = fruites.reduce((acc: string[], fruite) => {
  fruite.treats.forEach((key) => {
    if (!acc.includes(key)) acc.push(key);
  });
  return acc;
}, []);

// console.log(healthIssue);

//Get the array of all common health conditions that are treated by  all nuts.
const nutsNames = fruites.reduce((acc: string[], nut) => {
  if (nut.type === "nut") acc.push(nut.name);
  return acc;
}, []);

// console.log(nutsNames);

// Get a modified array of the fruits and nuts, where a new key called, totalNutritions get added to each object.  Total nutritions is nothing but the total of the values of the nutritions keys.
const totalNutri = (nutrition: number[]) => {
  return nutrition.reduce((acc, nutri) => acc + nutri, 0);
};

const totalNutritionObject = fruites.map((fruit) => {
  const totalNutritionValue = totalNutri(Object.values(fruit.nutritions));

  return {
    ...fruit,
    totalNutritions: totalNutritionValue,
  };
});

// console.log(totalNutritionObject);

// Find the total nutrition value of all fruits and nuts
const totalNutrition = fruites.reduce((acc, fruit) => {
  const total = Object.values(fruit.nutritions).reduce(
    (sum, value) => sum + value,
    0,
  );
  return acc + total;
}, 0);

// console.log(totalNutrition);

const solveBoneIssue = fruites.map((fruit)=>{
  const treats = Object.values(fruit.treats).reduce(
    (name, value)=>value.includes()
  )

})
