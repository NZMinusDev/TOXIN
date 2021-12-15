const elastic = (x: number, timeFraction: number) =>
  2 ** (10 * (timeFraction - 1)) *
  Math.cos(((20 * Math.PI * x) / 3) * timeFraction);

export { elastic as default };
