const assert = require("assert");

/**
 * Returns the numeric index of the given weekday.
 *
 * The function accepts a three-letter weekday abbreviation
 * (case-insensitive) and maps it to its corresponding index.
 *
 * @param dayName A three-letter abbreviation of the weekday (e.g., "sun", "Mon").
 * @returns The corresponding day index (0–6), or -1 if the input is invalid.
 */

function getDayOfWeek(dayName: string): number {
  const normalized = dayName.toLowerCase();

  const days: { [key: string]: number } = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
  };

  return normalized in days ? days[normalized] : -1; // checks whether input is present in days if then return day of that week else return -1
}

// Verifies that the function returns the expected output
assert.strictEqual(getDayOfWeek("sun"), 0);
assert.strictEqual(getDayOfWeek("Mon"), 1);
assert.strictEqual(getDayOfWeek("fri"), 5);
assert.strictEqual(getDayOfWeek("xyz"), -1);
