interface ListNode<T> {
  head: ListNode<T> | null;
  tail: ListNode<T> | null;
  addEnd(t: T): T;
  removeAtEnd(): T | null;
  addAtHead(t: T): T;
  removeAtHead(t: T): T | null;
  searchFor(t: T): T | null;
  length(): number;
}

interface Stack<T> {
  items: ListNode<T>;
  puhs: (item: T) => T;
  pop: () => T | null;
  top: () => T | null;
}

function evaluateExpression(expression: string): number | undefined {
  let output: number = 0;
  infixToPostfix(expression);
  return output;
}

function infixToPostfix(expression: string): string {
  const map = {
    "(": 3,
    ")": 3,
    "*": 2,
    "/": 2,
    "-": 1,
    "+": 1,
  };
  let charecters: string[];
  let exp: string[];
  let numb: string;
  for (let i = 0; i < expression.length; i++)
  {
    if (expression[i] === " ") continue;
    if(expression[i]==='-' && (i===0 || '+-*/^('.contains(expression[i-1]) ))
    {
        if(numb.startsWith('-'))
        {
            numb = numb.substring(1);
        }else{
            num = ''
        }
    }
  }
  return "";
}


interface ListNode<T> {
  head: ListNode<T> | null;
  tail: ListNode<T> | null;
  addEnd(t: T): T;
  removeAtEnd(): T | null;
  addAtHead(t: T): T;
  removeAtHead(t: T): T | null;
  searchFor(t: T): T | null;
  length(): number;
}

interface Stack<T> {
  items: ListNode<T>;
  puhs: (item: T) => T;
  pop: () => T | null;
  top: () => T | null;
}

function evaluateExpression(expression: string): number | undefined {
  let output: number = 0;
  infixToPostfix(expression);
  return output;
}

function infixToPostfix(expression: string): string {
  const map = {
    "(": 3,
    ")": 3,
    "*": 2,
    "/": 2,
    "-": 1,
    "+": 1,
  };
  let charecters: string[];
  let exp: string[];
  let numb: string;
  for (let i = 0; i < expression.length; i++)
  {
    if (expression[i] === " ") continue;
    if(expression[i]==='-' && (i===0 || '+-*/^('.contains(expression[i-1]) ))
    {
        if(numb.startsWith('-'))
        {
            numb = numb.substring(1);
        }else{
            num = ''
        }
    }
  }
  return "";
}