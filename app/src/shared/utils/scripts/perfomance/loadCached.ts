const loadCachedCache = new Map();

/**
 *
 * @param url - url for getting data
 * @returns Promise<string> with resolved or cached data
 * @example
 * // wait all
 * let urls = [
 *  'https://api.github.com/users/iliakan',
 *  'https://api.github.com/users/remy',
 *  'https://no-such-url'
 * ];
 *
 * Promise.allSettled(urls.map(url => loadCached(url)))
 *  .then(results => {
 *    results.forEach((result, num) => {
 *      if (result.status == "fulfilled") {
 *        alert(`${urls[num]}: ${result.value.status}`);
 *      }
 *      if (result.status == "rejected") {
 *       alert(`${urls[num]}: ${result.reason}`);
 *      }
 *   });
 * });
 *
 * // wait the fastest
 * Promise.race(urls.map(url => loadCached(url))).then(alert);
 */
const loadCached = (url: string): Promise<string> => {
  if (loadCachedCache.has(url)) {
    return Promise.resolve(loadCachedCache.get(url));
  }

  return fetch(url)
    .then((response) => response.text())
    .then((text) => {
      loadCachedCache.set(url, text);

      return text;
    });
};

export { loadCached as default };
