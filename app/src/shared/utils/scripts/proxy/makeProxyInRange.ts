/**
 *
 * @param obj - proxy target
 * @returns proxy for which the operator "in" works like inRange tester
 * @example
 * let range = { start: 1, end: 10, };
 * alert(5 in range); // true
 * alert(50 in range); // false
 */
const makeProxyInRange = <
  TObj extends Record<string | number | symbol, unknown> & {
    start: number;
    end: number;
  }
>(
  obj: TObj
) =>
  new Proxy(obj, {
    has(target, propertyName: keyof TObj) {
      return (
        target[propertyName] >= target.start &&
        target[propertyName] <= target.end
      );
    },
  });

export { makeProxyInRange as default };
