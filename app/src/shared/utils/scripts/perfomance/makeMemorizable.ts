/**
 * Memoize function to optimize the performance of recursive functions
 * @param memo - the original sequence array
 * @param formula - function of calculating
 * @returns a recursive function that manages the memo storage and calls the formula function as needed
 * @example
 * const fibonacci = makeMemorizable([0, 1], function (recur, n) {
 *   return recur(n - 1) + recur(n - 2);
 * });
 *
 * const factorial = makeMemorizable([1, 1], function (recur, n) {
 *   return n * recur(n - 1);
 * });
 */
const makeMemorizable = (
  memo: number[],
  formula: (recursionCallback: (n: number) => void, n: number) => number
) => {
  return function recursionCallback(n: number) {
    let result = memo[n];

    if (typeof result !== 'number') {
      result = formula(recursionCallback, n);

      const memoRef = memo;
      memoRef[n] = result;
    }

    return result;
  };
};

export { makeMemorizable as default };
