/**
 * Represents a user object returned from the API.
 */
export interface User {
  /** Unique identifier for the user */
  id: number;

  /** Full name of the user */
  name: string;

  /** Username of the user */
  username: string;

  /** Email address of the user */
  email: string;
}

/**
 * Fetches users from the JSONPlaceholder API and returns them after a delay.
 *
 * @param delay - Time in milliseconds to wait before returning the users. Default is 2000 ms.
 * @returns A promise that resolves to an array of User objects.
 *
 * @example
 * const users = await getUsers(3000);
 * console.log(users);
 */
export async function getUsers(delay = 2000): Promise<User[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  const users: User[] = await response.json();

  await new Promise((resolve) => setTimeout(resolve, delay));

  return users;
}
