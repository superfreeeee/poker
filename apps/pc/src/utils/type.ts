/**
 * data is number
 * @param data
 * @returns
 */
export const isNumber = (data: unknown): data is number => {
  return typeof data === 'number';
};

export const isString = (data: unknown): data is string => {
  return typeof data === 'string';
};
