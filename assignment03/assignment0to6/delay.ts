/**
 * Creates a delay for the specified amount of time.
 *
 * This function returns a Promise that resolves after the given
 * number of milliseconds. It can be used with `await` to pause
 * execution in asynchronous functions.
 *
 * @param milliseconds - The amount of time in milliseconds to delay.
 * @returns A Promise that resolves with `undefined` after the delay.
 *
 * @example
 * await delay(2000); // waits for 2 seconds
 */
export function delay(milliseconds: number): Promise<undefined> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
