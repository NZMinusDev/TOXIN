const bounce = (timeFraction: number) => {
  let a = 0;
  let b = 1;

  while (timeFraction < (7 - 4 * a) / 11) {
    a += b;
    b /= 2;
  }

  return -(((11 - 6 * a - 11 * timeFraction) / 4) ** 2) + b ** 2;
};

export { bounce as default };
