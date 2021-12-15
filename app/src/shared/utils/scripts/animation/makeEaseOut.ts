/**
 *
 * @param timing - easeIn function
 * @returns easeOut function
 * @example
 * function bounce(timeFraction) {
 *   for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
 *     if (timeFraction >= (7 - 4 * a) / 11) {
 *       return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
 *     }
 *   }
 * }
 *
 * let bounceEaseOut = makeEaseOut(bounce);
 */
const makeEaseOut =
  (timingFunction: (timeFraction: number) => number) =>
  (timeFraction: number) =>
    1 - timingFunction(1 - timeFraction);

export { makeEaseOut as default };
