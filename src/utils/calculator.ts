import { parseExpression } from './parser';

// функция для выполнения операций на операндами
function applyOperation(a: number, b: number, operator: string): number {
  switch (operator) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return a / b;
    case '%': return (a / 100) * b;
    default: throw new Error(`Неизвестный оператор: ${operator}`);
  }
}

// функция определеяет приоритет оператора
function precedence(operator: string): number {
  switch (operator) {
    case '+':
    case '-':
      return 1;
    case '*':
    case '/':
    case '%':
      return 2;
    default:
      return 0;
  }
}

// функция перезаписывает инфиксную форму в постфикснуя для дальнейшего применения ОПЗ
function infixToPostfix(expression: string): string[] {
    debugger; // eslint-disable-line no-debugger
    // здесь мы вызываем функцию parseExpression, которая возращает каждый символ строки как элемент массива
  const tokens = parseExpression(expression);
  const output: string[] = [];
  const operatorStack: string[] = [];

  tokens.forEach((token) => {
    if (!isNaN(Number(token))) {
      output.push(token);
    } else if(token === '√'){
        operatorStack.push(token);
    } else if (token === '(') {
      operatorStack.push(token);
    } else if (token === ')') {
      while (operatorStack.length && operatorStack[operatorStack.length - 1] !== '(') {
        output.push(operatorStack.pop()!);
      }
      operatorStack.pop();

      if (operatorStack.length && operatorStack[operatorStack.length - 1] === '√') {
        output.push(operatorStack.pop()!);
      }

      console.log(operatorStack);
    } else if (/[+\-*/%]/.test(token)) {
      while (
        operatorStack.length &&
        precedence(operatorStack[operatorStack.length - 1]) >= precedence(token)
      ) {
        output.push(operatorStack.pop()!);
      }
      operatorStack.push(token);
    }
  });

  while (operatorStack.length) {
    output.push(operatorStack.pop()!);
  }

  return output;
}

// вычисляем строку с помощью ОПЗ
function evaluatePostfix(postfix: string[]): number {
  const stack: number[] = [];
  console.log("postfix" + postfix);

  postfix.forEach((token) => {
    if (!isNaN(Number(token))) {
      stack.push(Number(token));
    } else if (token === '√') {
      console.log(stack, postfix);
      const value = stack.pop();
      console.log(value);
      if (value !== undefined) stack.push(Math.sqrt(value));
    } else if (/[+\-*/%]/.test(token)) {
      const b = stack.pop()!;
      const a = stack.pop()!;
      stack.push(applyOperation(a, b, token));
    }
  });

  return stack[0];
}

// запуск вычислительных функций
export function evaluateExpression(expression: string): number {
  const postfix = infixToPostfix(expression);
  return evaluatePostfix(postfix);
}
