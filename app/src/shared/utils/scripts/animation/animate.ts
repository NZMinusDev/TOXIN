/**
 *
 * @param drawCallBack
 * @param duration
 * @param timing - calculating the current animation state function
 * @example
 * animate(
 * (progress) => { // draw
 *    elem.style.width = `${progress * 100}%`;
 *  }
 *  1000, // duration
 *  {timing: (timeFraction) => { // parabolic curve timing function
 *    return Math.pow(timeFraction, 2)
 *  }},
 * );
 *
 * // timing functions(but you can pass your own):
 * function circ(timeFraction) { return 1 - Math.sin(Math.acos(timeFraction)); }
 * function shotFromABow(x, timeFraction) { return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x) }
 * function bounce(timeFraction) {
 *   for (let a = 0, b = 1; 1; a += b, b /= 2) {
 *     if (timeFraction >= (7 - 4 * a) / 11) {
 *       return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
 *     }
 *   }
 * }
 * function elastic(x, timeFraction) {
 *   return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)
 * }
 */
const animate = (
  drawCallBack: (progress: number) => unknown,
  duration: number,
  { timing = (timeFraction: number) => timeFraction } = {}
) => {
  const start = performance.now();

  const newAnimate = (time: number) => {
    let timeFraction = (time - start) / duration;

    if (timeFraction > 1) {
      timeFraction = 1;
    }

    const progress = timing(timeFraction);

    drawCallBack(progress);

    if (timeFraction < 1) {
      window.requestAnimationFrame(newAnimate);
    }
  };

  window.requestAnimationFrame(newAnimate);
};

export { animate as default };
