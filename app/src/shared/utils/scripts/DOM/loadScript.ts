/**
 *
 * @param src
 * @param callback
 * @example
 * // example 1
 * let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");
 *
 * promise.then(
 *  script => alert(`${script.src} loaded!`),
 *  error => alert(`Error: ${error.message}`)
 * );
 *
 * promise.then(script => alert('Another handler...'));
 *
 * // example 2
 * loadScript("/article/promise-chaining/one.js")
 *  .then(script => loadScript("/article/promise-chaining/two.js"))
 *  .then(script => loadScript("/article/promise-chaining/three.js"))
 *  .then(script => {
 *    // the scripts are loaded, we can use the functions declared in them
 *    one();
 *    two();
 *    three();
 * });
 *
 */
const loadScript = (src: URL) =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.src = src.toString();

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script loading error ${src}`));

    document.head.append(script);
  });

export { loadScript as default };
