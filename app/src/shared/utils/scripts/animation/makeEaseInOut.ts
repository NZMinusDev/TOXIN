/**
 *
 * @param timing - easeIn function
 * @returns easeInOut function
 * @example
 * function bounce(timeFraction) {
 *   for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
 *     if (timeFraction >= (7 - 4 * a) / 11) {
 *       return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
 *     }
 *   }
 * }
 *
 * let bounceEaseInOut = makeEaseInOut(bounce);
 */
const makeEaseInOut =
  (timingFunction: (timeFraction: number) => number) =>
  (timeFraction: number) => {
    if (timeFraction < 0.5) {
      return timingFunction(2 * timeFraction) / 2;
    }

    return (2 - timingFunction(2 * (1 - timeFraction))) / 2;
  };

export { makeEaseInOut as default };
