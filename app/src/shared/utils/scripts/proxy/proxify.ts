/*
 * //TODO: Apply for functions, Tip: do not forget change T variables on some readable variables
 *type Proxy<T> = {
 *  get(): T;
 *  set(value: T): void;
 *};
 *
 *type Proxify<T> = {
 *  [P in keyof T]: Proxy<T[P]>;
 *};
 *
 *function proxify<T>(object: T): Proxify<T> {
 *  // ... wrap proxies ...
 *}
 *
 *let props = { rooms: 4 };
 *let proxyProps = proxify(props);
 *
 *function unproxify<T>(t: Proxify<T>): T {
 *  let result = {} as T;
 *  for (const k in t) {
 *    result[k] = t[k].get();
 *  }
 *  return result;
 *}
 *
 *let originalProps = unproxify(proxyProps);
 */
