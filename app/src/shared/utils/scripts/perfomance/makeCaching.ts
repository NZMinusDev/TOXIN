/**
 *
 * @param func - heavy callback
 * @param hash - callback that creates a hash key by func arguments
 * @returns hashed result of func processing
 * @example
 *
 *let worker = {
 *  someMethod() {
 *    return 1;
 *  },
 *  slow(x:number, y:number):number {
 *
 *    // here heavy processing
 *
 *    return x + y + this.someMethod();
 *  },
 *};
 *
 *function hash(args:IArguments) {
 *  return [].join.call(args);// creates a key from a combination of arguments
 *}
 *
 *worker.slow = makeCaching(worker.slow, hash);
 *alert(worker.slow(3, 5)); // slow(3, 5) caching it
 *alert("Again: " + worker.slow(3, 5)); // returning from the cache
 */
const makeCaching = <
  TFunctionArgs extends unknown,
  TFunctionReturn extends unknown,
  THashReturn extends unknown
>(
  func: (...funcArgs: TFunctionArgs[]) => TFunctionReturn,
  hash: (funcArgs: TFunctionArgs[]) => THashReturn
): ((...funcArgs: TFunctionArgs[]) => TFunctionReturn) => {
  const cache = new Map();

  return function doCashed<TTHis>(this: TTHis, ...args: TFunctionArgs[]) {
    const key = hash(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func.apply(this, args);

    cache.set(key, result);

    return result;
  };
};

export { makeCaching as default };
