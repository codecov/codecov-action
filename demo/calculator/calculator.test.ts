import Calculator from './calculator';

test('adds 2 + 3 to equal 5', () => {
  const calc = new Calculator();
  expect(calc.add(2, 3)).toBe(5);
});

test('subtracts 2 - 3 to equal -1', () => {
  const calc = new Calculator();
  expect(calc.subtract(2, 3)).toBe(-1);
});
