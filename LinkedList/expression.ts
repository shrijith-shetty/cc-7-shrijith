/**
 * Evaluates a mathematical infix expression.
 *
 * Example:
 * "3 + 5 * 2"
 *
 * Supported operators:
 * +  -  *  /
 *
 * Uses stack-based evaluation.
 *
 * @param expression - Input infix expression.
 * @returns Result of evaluation.
 */
export function evaluateExpression(expression: string): number {
  const tokens = expression.match(/(\d+|\+|\-|\*|\/|\(|\))/g);
  if (!tokens) return 0;

  const values: number[] = [];
  const ops: string[] = [];

  /**
   * Returns precedence of operator.
   */
  const precedence = (op: string) => {
    if (op === "+" || op === "-") return 1;
    if (op === "*" || op === "/") return 2;
    return 0;
  };

  /**
   * Applies operator on top two values.
   */
  const applyOp = () => {
    const b = values.pop()!;
    const a = values.pop()!;
    const op = ops.pop()!;

    if (op === "+") values.push(a + b);
    if (op === "-") values.push(a - b);
    if (op === "*") values.push(a * b);
    if (op === "/") values.push(a / b);
  };

  for (const token of tokens) {
    if (!isNaN(Number(token))) {
      values.push(Number(token));
    } else if (token === "(") {
      ops.push(token);
    } else if (token === ")") {
      while (ops.length && ops[ops.length - 1] !== "(") {
        applyOp();
      }
      ops.pop();
    } else {
      while (
        ops.length &&
        precedence(ops[ops.length - 1]) >= precedence(token)
      ) {
        applyOp();
      }
      ops.push(token);
    }
  }

  while (ops.length) {
    applyOp();
  }

  return values.pop()!;
}
