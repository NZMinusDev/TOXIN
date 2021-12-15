/**
 * Replacement or str.slice() cause of surrogate couples support.
 */
const slice = (str: string, start: number, end: number) =>
  [...str].slice(start, end).join('');

export { slice as default };
