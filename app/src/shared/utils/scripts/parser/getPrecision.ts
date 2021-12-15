/**
 * Get amount of digits after the decimal point
 * @param number A number
 * @returns amount of digits after the decimal point
 */
const getPrecision = (number: number) =>
  number.toString().includes('.')
    ? number.toString().split('.').pop()!.length
    : 0;

export { getPrecision as default };
