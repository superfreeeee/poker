import { isNumber } from '../type';

test('isNumber test', () => {
  expect(isNumber(123)).toBe(true);
  expect(isNumber('123')).toBe(false);
  expect(isNumber(true)).toBe(false);
  expect(isNumber(null)).toBe(false);
  expect(isNumber(undefined)).toBe(false);
  expect(isNumber({})).toBe(false);
  expect(isNumber(new Date())).toBe(false);
});
