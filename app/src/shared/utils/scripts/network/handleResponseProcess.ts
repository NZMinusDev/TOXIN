import { HandleResponseProcessOptions } from './types';

const handleResponseProcess = async (
  url: URL,
  { fetchOptions = {}, progressCallback }: HandleResponseProcessOptions = {}
) => {
  const response = await fetch(url.toString(), fetchOptions);

  if (response.body !== null) {
    const reader = response.body.getReader();

    // should be allowed by server
    const contentLengthAnswer = response.headers.get('Content-Length');

    if (contentLengthAnswer !== null) {
      const contentLength = Number(contentLengthAnswer);
      const chunks: Uint8Array[] = [];
      let receivedLength = 0;

      // should be for await..of in the future
      // eslint-disable-next-line no-constant-condition
      while (true) {
        // eslint-disable-next-line no-await-in-loop
        const { done, value } = await reader.read();

        if (done) {
          // Is there no more data to read?
          break;
        }

        if (value instanceof Uint8Array) {
          chunks.push(value);
          receivedLength += value.length;
        }

        progressCallback?.(receivedLength, contentLength);
      }

      return { receivedLength, chunks };
    }
  }

  return null;
};

export { handleResponseProcess as default };
