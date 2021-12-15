/**
 * Callback function for Array<string>.prototype.sort()
 */
const compareLocaleString = (a: string, b: string) =>
  a.normalize().localeCompare(b.normalize());

export { compareLocaleString as default };
