/**
 *
 * @param object - mapped object
 * @param mapFn - key changer
 * @returns a new object with the keys mapped using mapFn(key)
 */
const keyMap = (
  object: Record<string, unknown>,
  mapFn: (key: string) => string
) =>
  Object.fromEntries(
    Object.entries(object).map(([key, value]) => [mapFn(key), value])
  );

export { keyMap as default };
