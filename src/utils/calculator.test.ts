export {};

import { evaluateExpression } from './calculator';

describe('evaluateExpression', () => {
  test('должен корректно вычислять простые выражения', () => {
    expect(evaluateExpression('2+2')).toBe(4);
    expect(evaluateExpression('10-5')).toBe(5);
    expect(evaluateExpression('3*4')).toBe(12);
    expect(evaluateExpression('8/2')).toBe(4);
  });

  test('должен корректно обрабатывать сложные выражения', () => {
    expect(evaluateExpression('2+3*4')).toBe(14); // умножение выполняется первым
    expect(evaluateExpression('(2+3)*4')).toBe(20); // скобки меняют порядок выполнения
    expect(evaluateExpression('10/2+5')).toBe(10);
  });

  test('должен корректно обрабатывать операцию "sqrt"', () => {
    expect(evaluateExpression('√16')).toBe(4);
    expect(evaluateExpression('√(25)+5')).toBe(10);
  });

  test('должен корректно обрабатывать выражения с процентами', () => {
    expect(evaluateExpression('50%2')).toBe(1); // 50% от 2 = 1
    expect(evaluateExpression('100+10%100')).toBe(110); // 10% от 100 = 10
  });

  test('должен возвращать ошибку для некорректных выражений', () => {
    expect(() => evaluateExpression('2++2')).toThrow();
    expect(() => evaluateExpression('sqrt(-1)')).toThrow();
  });
});
