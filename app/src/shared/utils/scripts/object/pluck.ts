/**
 *
 * @param o
 * @param propertyNames
 * @example
 * interface Car {
 *   manufacturer: string;
 *   model: string;
 *   year: number;
 * }
 *
 * let taxi: Car = {
 *   manufacturer: "Toyota",
 *   model: "Camry",
 *   year: 2014,
 * };
 *
 * // Manufacturer and model are both of type string,
 * // so we can pluck them both into a typed string array
 * let makeAndModel: string[] = pluck(taxi, ["manufacturer", "model"]);
 *
 * // If we try to pluck model and year, we get an
 * // array of a union type: (string | number)[]
 * let modelYear = pluck(taxi, ["model", "year"]);
 */
const pluck = <
  TObject extends Record<string, unknown>,
  TObjectKey extends keyof TObject
>(
  object: TObject,
  propertyNames: TObjectKey[]
): TObject[TObjectKey][] =>
  propertyNames.map((propertyName) => object[propertyName]);

export { pluck as default };
