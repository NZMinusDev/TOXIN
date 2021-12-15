/**
 * Clone function
 * @param func function to clone
 * @returns clone of function
 * @example
 * const test1 =  function(a,b,c) {
 *   return a+b+c;
 * };
 *
 * console.log(test1 === cloneFunction(test1)); // false
 * console.log(test1(1,1,1) === cloneFunction(test1)(1,1,1)); // true
 * console.log(cloneFunction(test1)(1,1,1)); // 3
 */
const cloneFunction = <TFuncArgs extends unknown[], TFuncReturn>(func: {
  (...args: TFuncArgs): TFuncReturn;
  [key: string]: unknown;
}) => {
  const that = func;

  const temp = function temp(...args: TFuncArgs) {
    return that.apply(func, args);
  } as {
    (...args: TFuncArgs): TFuncReturn;
    [key: string]: unknown;
  };

  Object.keys(func).forEach((key) => {
    // eslint-disable-next-line no-prototype-builtins
    if (func.hasOwnProperty(key)) {
      temp[key] = func[key];
    }
  });

  Object.defineProperty(temp, 'name', { value: func.name });

  return temp;
};

export { cloneFunction as default };
