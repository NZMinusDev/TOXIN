interface CancellableFetchesOptions {
  ourAsyncTask?: (...args: unknown[]) => Promise<unknown>;
  ourAsyncTaskArgs?: unknown[];
  abortCallback?: (...args: unknown[]) => unknown;
}

/**
 * If you call controller.abort() from somewhere, it will interrupt all fetch calls
 * @param urls - fetch URLs
 * @param ourAsyncTask
 * @param ourAsyncTaskArgs
 * @returns controller - controller to abort, response - response of fetches and task
 */
const cancellableFetches = (
  urls: URL[],
  {
    ourAsyncTask = async () => {},
    ourAsyncTaskArgs = [],
    abortCallback = () => {},
  }: CancellableFetchesOptions = {}
) => {
  const controller = new AbortController();

  const ourJob = new Promise((resolve, reject) => {
    controller.signal.addEventListener('abort', reject);
    ourAsyncTask(...ourAsyncTaskArgs)
      .then((taskResult) => resolve(taskResult))
      .catch(reject);
  });

  const fetchJobs = urls.map((url) =>
    fetch(url.toString(), {
      signal: controller.signal,
    })
  );

  try {
    const response = Promise.all([...fetchJobs, ourJob]);

    return { controller, response };
  } catch (err) {
    if (err instanceof Error) {
      if (err.name === 'AbortError') {
        abortCallback();
      } else {
        throw err;
      }
    }
  }

  return null;
};

export { cancellableFetches as default };
