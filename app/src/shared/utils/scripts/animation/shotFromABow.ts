const shotFromABow = (x: number, timeFraction: number) =>
  timeFraction ** 2 * ((x + 1) * timeFraction - x);

export { shotFromABow as default };
