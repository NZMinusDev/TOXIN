interface BenchOptions<TArgs extends unknown> {
  funcArgs?: TArgs[];
  iterations?: number;
}

/**
 *
 * @param benchMarkingFunction - callback
 * @param funcArgs - callback args
 * @param iterations - amount of callback processing
 * @returns milliseconds
 * @example
 * // returns milliseconds
 * function diffDate(date1: Date, date2: Date) {
 *  return +date2 - +date1;
 * }
 *
 * const time = bench(diffDate); // process once with default parameters
 * bench(diffDate, { iterations: 200 }); // process once with optional parameter
 * bench(diffDate, { iterations: 400, funcArgs: [new Date(), new Date(24 * 60 * 60 * 1000)] }); //  process once with optional parameters (order doesn't matter)
 *
 * // process several times for more accurate results(you should process once before it)
 * for (let i = 0; i < 10; i++) time += bench(diffDate);
 */
const bench = <TArgs extends unknown, TReturn extends unknown>(
  benchMarkingFunction: (...funcArgs: TArgs[]) => TReturn,
  { funcArgs = [], iterations = 1 }: BenchOptions<TArgs> = {}
) => {
  const start = performance.now();

  for (let i = 0; i < iterations; i += 1) benchMarkingFunction(...funcArgs);

  return performance.now() - start;
};

export { bench as default };
