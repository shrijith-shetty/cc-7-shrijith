import { Stack } from "./stack";

/**
 * Returns precedence of operators.
 */
function precedence(op: string): number {
  switch (op) {
    case "+":
    case "-":
      return 1;
    case "*":
    case "/":
      return 2;
    case "^":
      return 3;
    default:
      return 0;
  }
}

/**
 * Checks if character is operator.
 */
function isOperator(char: string): boolean {
  return ["+", "-", "*", "/", "^"].includes(char);
}

/**
 * Convert infix to postfix using Shunting Yard algorithm.
 */
export function infixToPostfix(expression: string): string {
  const stack = new Stack<string>();
  let output = "";

  for (let char of expression) {
    if (!isNaN(Number(char))) {
      output += char;
    } else if (char === "(") {
      stack.push(char);
    } else if (char === ")") {
      while (!stack.isEmpty() && stack.peek() !== "(") {
        output += stack.pop();
      }
      stack.pop();
    } else if (isOperator(char)) {
      while (
        !stack.isEmpty() &&
        precedence(stack.peek()!) >= precedence(char)
      ) {
        output += stack.pop();
      }
      stack.push(char);
    }
  }

  while (!stack.isEmpty()) {
    output += stack.pop();
  }

  return output;
}

/**
 * Evaluate postfix expression.
 */
export function evaluatePostfix(postfix: string): number {
  const stack = new Stack<number>();

  for (let char of postfix) {
    if (!isNaN(Number(char))) {
      stack.push(Number(char));
    } else {
      const b = stack.pop();
      const a = stack.pop();

      if (a === null || b === null) {
        throw new Error("Invalid expression");
      }

      switch (char) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          stack.push(a / b);
          break;
        case "^":
          stack.push(Math.pow(a, b));
          break;
        default:
          throw new Error("Unsupported operator");
      }
    }
  }

  const result = stack.pop();
  if (result === null) {
    throw new Error("Invalid expression");
  }

  return result;
}

/**
 * Evaluate infix expression directly.
 */
export function evaluateInfix(expression: string): number {
  const postfix = infixToPostfix(expression);
  return evaluatePostfix(postfix);
}
