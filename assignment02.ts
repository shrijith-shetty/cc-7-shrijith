import movies from "./movies.json" with { type: "json" };
import assert from "assert";

/**
 * #10 Food Ingredients Analysis
 *
 * We have a list of foods with their ingredients.
 * We perform three operations:
 *
 * 1. Find foods that do NOT contain sugar.
 * 2. Find foods that contain BOTH chilli and oil.
 * 3. Generate an array showing whether each food is "safe" or "unsafe".
 *
 * Rule:
 * - Foods containing sugar → "unsafe"
 * - Foods without sugar → "safe"
 *
 */

const foods = [
  { idli: ["rice", "urad", "oil", "cashew", "water"] },
  { chapathi: ["atta", "gluten", "water", "oil", "sugar"] },
  { pizza: ["maida", "sugar", "oil", "chiili", "flakes", "sause"] },
  { "paneer masala": ["paneer", "onion", "tomato", "garlic", "oil"] },
];

/**
 * Find foods that do not contain sugar
 */
const noSugarFoods = foods
  .filter((food) => !Object.values(food)[0].includes("sugar"))
  .map((food) => Object.keys(food)[0]);

assert.strictEqual(noSugarFoods.length, 2);
assert.strictEqual(noSugarFoods[0], "idli");
assert.strictEqual(noSugarFoods[1], "paneer masala");

/**
 * Find foods containing BOTH chilli and oil
 */
const chilliOilFoods = foods
  .filter((food) => {
    const ingredients = Object.values(food)[0];
    return ingredients.includes("chiili") && ingredients.includes("oil");
  })
  .map((food) => Object.keys(food)[0]);
assert.deepStrictEqual(noSugarFoods.includes("idli"), true);
assert.deepStrictEqual(noSugarFoods.includes("paneer masala"), true);
/**
 * Generate safety status for each food
 */
const safetyStatus = foods.map((food) => {
  const name = Object.keys(food)[0];
  const ingredients = Object.values(food)[0];

  return {
    [name]: ingredients.includes("sugar") ? "unsafe" : "safe",
  };
});

assert.deepStrictEqual(noSugarFoods.includes("idli"), true);
assert.deepStrictEqual(noSugarFoods.includes("paneer masala"), true);
assert.deepStrictEqual(noSugarFoods.includes("chapathi"), false);

/**
 * Assertions to verify results
 */

// Assertion 1: Foods without sugar
assert.deepStrictEqual(noSugarFoods, ["idli", "paneer masala"]);

// Assertion 2: Foods with chilli and oil
assert.deepStrictEqual(chilliOilFoods, ["pizza"]);

// Assertion 3: Safety status check
assert.deepStrictEqual(safetyStatus, [
  { idli: "safe" },
  { chapathi: "unsafe" },
  { pizza: "unsafe" },
  { "paneer masala": "safe" },
]);

/**
Find the second largest number in an array using an imperative approach.
Iteration is performed using forEach without using reduce.
*/

const inputValues = [42, 7, 19, 88, 3, 56, 91, 24, 65, 12];

const secondLargestEleme = (inputArray: number[]): number => {
  let firstLargeValue = -Infinity;
  let secondLargeValue = -Infinity;

  inputArray.forEach((value) => {
    if (value > firstLargeValue) {
      secondLargeValue = firstLargeValue;
      firstLargeValue = value;
    } else if (secondLargeValue < value) {
      secondLargeValue = value;
    }
  });

  return secondLargeValue;
};

assert.strictEqual(secondLargestEleme(inputValues), 88);
assert.strictEqual(secondLargestEleme([10, 20, 5, 15]), 15);
assert.strictEqual(secondLargestEleme([3, 1, 2]), 2);

/**
Implement a method called some that checks whether at least one element
in an array satisfies the given predicate. One implementation uses an
imperative loop and another implementation uses reduce.
*/

const some = (arr: number[], predict: (value: number) => boolean): boolean => {
  for (let num of arr) {
    if (predict(num)) {
      return true;
    }
  }
  return false;
};

const someUsingReduce = (
  array: number[],
  predicate: (value: number) => boolean,
): boolean => {
  return array.reduce((acc, cur) => {
    return acc || predicate(cur);
  }, false);
};

assert.strictEqual(
  some([2, 3, 4, 5], (value) => value > 4),
  true,
);
assert.strictEqual(
  some([1, 2, 3], (value) => value > 5),
  false,
);

assert.strictEqual(
  someUsingReduce([4, 23, 42], (value) => value > 40),
  true,
);
assert.strictEqual(
  someUsingReduce([1, 2, 3], (value) => value > 10),
  false,
);

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

// I. We want to get an object that will have keys as author names, and values will be an array of their quotes.  The sample output will look something like this:

const grouped = Objects.reduce(
  (acc: Record<string, string[]>, { author, text }) => {
    if (acc[author] == null) {
      acc[author] = [];
    }
    acc[author].push(text);
    return acc;
  },
  {} as Record<string, string[]>,
);

assert.deepStrictEqual(grouped, {
  "Thomas Edison": [
    "Genius is one percent inspiration and ninety-nine percent perspiration.",
    "To invent, you need a good imagination and a pile of junk",
  ],
  "Yogi Berra": [
    "You can observe a lot just by watching.",
    "Difficulties increase the nearer we get to the goal.",
    "Life is a learning experience, only if you learn.",
  ],
  "Byron Pulsifer": [
    "Fate is in your hands and no one elses",
    "Nothing happens unless first we dream.",
    "What you give is what you get.",
  ],
  "Lao Tzu": [
    "Be the chief but never the lord.",
    "We can only learn to love by loving.",
  ],
  Aristotle: ["Well begun is half done."],
  "Margaret Sangster": ["Self-complacency is fatal to progress."],
  Buddha: [
    "Peace comes from within. Do not seek it without.",
    "You'll see it when you believe it.",
  ],
  "Karen Clark": ["Life is change. Growth is optional. Choose wisely."],
});

// II. A function getQuotesContainingWord(word). that will return an array of quotes (not the quote objects)  that contain the specified word.

function getQuotesContainingWord(word: string) {
  let result: string[] = [];
  result = Objects.filter((sentence) => sentence.text.includes(word)).map(
    (sentence) => sentence.text,
  );
  return result;
}
assert.deepStrictEqual(getQuotesContainingWord("Life"), [
  "Life is a learning experience, only if you learn.",
  "Life is change. Growth is optional. Choose wisely.",
]);
assert.deepStrictEqual(getQuotesContainingWord("dream"), [
  "Nothing happens unless first we dream.",
]);
assert.deepStrictEqual(getQuotesContainingWord("apple"), []);

// III. Get the array of quote strings

function arrayOfQuaotes() {
  let result: string[];
  result = Objects.map((quotes) => quotes.text);
  return result;
}
assert.deepStrictEqual(arrayOfQuaotes(), [
  "Genius is one percent inspiration and ninety-nine percent perspiration.",
  "You can observe a lot just by watching.",
  "To invent, you need a good imagination and a pile of junk",
  "Difficulties increase the nearer we get to the goal.",
  "Fate is in your hands and no one elses",
  "Be the chief but never the lord.",
  "Nothing happens unless first we dream.",
  "Well begun is half done.",
  "Life is a learning experience, only if you learn.",
  "Self-complacency is fatal to progress.",
  "Peace comes from within. Do not seek it without.",
  "What you give is what you get.",
  "We can only learn to love by loving.",
  "Life is change. Growth is optional. Choose wisely.",
  "You'll see it when you believe it.",
]);
// IV. Array of all authors by removing any duplicates using reduce.
const authors = Objects.reduce((acc: string[], quote: any) => {
  if (!acc.includes(quote.author)) {
    acc.push(quote.author);
  }
  return acc;
}, []);
assert.deepStrictEqual(authors, [
  "Thomas Edison",
  "Yogi Berra",
  "Byron Pulsifer",
  "Lao Tzu",
  "Aristotle",
  "Margaret Sangster",
  "Buddha",
  "Karen Clark",
]);

//#14
/**
Compute the total salary paid to employees younger than thirty
and produce an array containing the full names of employees.
*/
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

const fullNameOfEmployee = employees.map((emp) => {
  let fullName = emp.firstName + " " + emp.lastName;
  return fullName;
});

assert.deepStrictEqual(fullNameOfEmployee, [
  "Molly Rojas",
  "Marguerite Santiago",
  "Evelyn Oneil",
  "Consuelo Case",
  "Earline Bush",
  "Sanford Hurley",
  "Todd Gomez",
]);
assert.strictEqual(fullNameOfEmployee.includes("Todd Gomez"), true);

/**
Dataset of fruits and nuts with their nutrition information and health benefits.
Each computation below derives information from this dataset using functional
operations such as map filter and reduce.
*/

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

/**
Returns the nutrition name and value having the highest quantity
inside a nutrition object.
*/
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

// Get an array of all unique health conditions that the fruits treat.
const healthIssue = fruites.reduce((acc: string[], fruite) => {
  fruite.treats.forEach((key) => {
    if (!acc.includes(key)) acc.push(key);
  });
  return acc;
}, []);

//Get the array of all common health conditions that are treated by  all nuts.
const nutsNames = fruites.reduce((acc: string[], nut) => {
  if (nut.type === "nut") acc.push(nut.name);
  return acc;
}, []);

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

// Find the total nutrition value of all fruits and nuts
const totalNutrition = fruites.reduce((acc, fruit) => {
  const total = Object.values(fruit.nutritions).reduce(
    (sum, value) => sum + value,
    0,
  );
  return acc + total;
}, 0);

// Which fruits  / nuts solve the bone issues?
let solveBoneProblem = fruites
  .filter((fruit) => fruit.treats.includes("bone issues"))
  .map((fruit) => fruit.name);

// Which fruit or nut has maximum nutrition types ( like different type of nutritions)?
const numberOfNutrition = (nutrition: Record<string, number>) => {
  return Object.keys(nutrition).length;
};

const maxNutritionArray = Math.max(
  ...fruites.map((fruit) => numberOfNutrition(fruit.nutritions)),
);

const maximumNutrition = fruites
  .filter((fruit) => numberOfNutrition(fruit.nutritions) === maxNutritionArray)
  .map((fruit) => fruit.name);

// Which fruits or nuts solve migraine and have vitamins greater than or equal to 60
const solveMigrane = (treats: string[]): boolean => {
  return treats.includes("migraine");
};

const resultOfVitamins = fruites
  .filter(
    (fruit) => fruit.nutritions.vitamins >= 60 && solveMigrane(fruit.treats),
  )
  .map((fruit) => fruit.name);

// Which fruit or nut has lowest carbs? (Ignore the fruits/nuts that don't have carbs in the first place)
const lowerCarbs = fruites
  .filter((fruit) => fruit.nutritions.carbs !== undefined)
  .reduce((minFruit, fruit) => {
    if (fruit.nutritions.carbs < minFruit.nutritions.carbs) {
      return fruit;
    }
    return minFruit;
  });
const result = lowerCarbs.name;

//What is the total amount of proteins I will end up intaking if I eat each of the nuts except nuts those do not solve sugar issues as doctor has warned that my skin will become pale in
// case I eat such nuts?

const totalAmountProtien = fruites
  .filter((fruit) => fruit.treats.includes("sugar") && fruit.type === "nut")
  .map((fruit) => fruit.name);

// If I eat one fruit and nut  each from the all fruits and nuts available in the above list, what is the quantity of vitamins I will end up intaking? Doctor has asked me to avoid
// fruit containing any sugar in it.
const isIncludesSugar = (nutrients: Record<string, number>) => {
  return "sugar" in nutrients;
};
const totalVitamins = fruites
  .filter((fruit) => {
    if (fruit.type === "fruit") return !isIncludesSugar(fruit.nutritions);
    return fruit.type === "nut";
  })
  .reduce((total, fruit) => total + fruit.nutritions.vitamins, 0);

assert.deepStrictEqual(allNutrition.includes("protein"), true);
assert.deepStrictEqual(solveBoneProblem.includes("Cashew"), true);
assert.strictEqual(result, "Badam");

/**
Generate natural numbers and classify them into odd and even arrays
then compute sums of odd numbers and even numbers.
*/

// Generate an array that contains first n natural numbers.  Then get us an object, that contains two keys, ‘odd’, and ‘even’.  Each of these keys will have values as  arrays of
// odd numbers and even numbers respectively.  How do you transform this result such that keys remain same, but values will be sums of odd numbers and even numbers?

const sumOfNNatureOddAndEven = (input: number) => {
  let result = [];
  for (let i = 0; i < input; i++) result.push(i + 1);

  const evenOdd = result.reduce(
    (acc, num) => {
      num % 2 === 0 ? acc.even.push(num) : acc.odd.push(num);
      return acc;
    },
    { odd: [] as number[], even: [] as number[] },
  );
  return evenOdd;
};

const result1 = sumOfNNatureOddAndEven(10);

const sums = {
  odd: result1.odd.reduce((a, b) => a + b, 0),
  even: result1.even.reduce((a, b) => a + b, 0),
};

assert.strictEqual(sums.odd, 25);
assert.strictEqual(sums.even, 30);

/**
Generate alphabets from a to z and classify them into vowels and consonants.
*/

// #17.
// Generate an array containing alphabets. Then produce an object that contain two keys, ‘vowels’ and 'consonants'. The values will be array of alphabets representing vowels and consonants.

const alphabet = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(97 + i),
).reduce(
  (acc, char) => {
    if (["a", "e", "i", "o", "u"].includes(char)) {
      acc.vowels.push(char);
    } else {
      acc.consonants.push(char);
    }
    return acc;
  },
  { vowels: [] as string[], consonants: [] as string[] },
);

assert.deepStrictEqual(alphabet.vowels, ["a", "e", "i", "o", "u"]);
assert.strictEqual(alphabet.consonants.length, 21);
assert.strictEqual(alphabet.vowels.length, 5);

/**
Embed movie data and derive actor names, group movies by year,
and implement map and filter using reduce.
*/

// Get the array of all actor names  (cast) that are seen in the movies data.

const actorsName: string[] = movies
  .map((movie: any) => movie.cast)
  .flat()
  .filter(
    (actor: string, index: number, arr: string[]) =>
      !arr.slice(0, index).includes(actor),
  );

// Get an object with keys being year and values  being the array of names of movies released in the given year (consider only 3 at max). The format should be something like this:

const moviesByYear = movies.reduce(
  (acc: Record<string, string[]>, movie) => {
    const year = movie.year;

    if (!acc[year]) {
      acc[year] = [];
    }

    if (acc[year].length < 3) {
      acc[year].push(movie.title);
    }

    return acc;
  },
  {} as Record<string, string[]>,
);

// #20.
// Implement map and filter using reduce.

const map = <T, U>(array: T[], transform: (item: T) => U): U[] => {
  return array.reduce((acc: U[], item) => {
    acc.push(transform(item));
    return acc;
  }, []);
};

const filter = <T>(array: T[], predicate: (item: T) => boolean): T[] => {
  return array.reduce((acc: T[], item) => {
    if (predicate(item)) {
      acc.push(item);
    }
    return acc;
  }, []);
};

assert.deepStrictEqual(actorsName.sort(), [
  "Actor1",
  "Actor2",
  "Actor3",
  "Actor4",
  "Actor5",
  "Actor6",
]);

assert.strictEqual(moviesByYear["2020"].length <= 3, true);

assert.deepStrictEqual(
  map([1, 2, 3], (x) => x * 2),
  [2, 4, 6],
);

assert.deepStrictEqual(
  filter([1, 2, 3, 4], (x) => x % 2 === 0),
  [2, 4],
);
