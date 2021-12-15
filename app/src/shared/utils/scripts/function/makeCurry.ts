/**
 * Currying of function
 * @param func
 * @example
 * function sum(a, b, c) {
 *  return a + b + c;
 *}
 *
 *let curriedSum = makeCurry(sum);
 *
 *alert( curriedSum(1, 2, 3) ); // 6
 *alert( curriedSum(1)(2,3) ); // 6
 *alert( curriedSum(1)(2)(3) ); // 6
 */
const makeCurry = (func: (...args: unknown[]) => unknown) =>
  function curried<TThis>(this: TThis, ...args: unknown[]) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    }

    return function curriedWithConcat(this: TThis, ...args2: unknown[]) {
      return curried.apply(this, args.concat(args2));
    };
  };

export { makeCurry as default };
