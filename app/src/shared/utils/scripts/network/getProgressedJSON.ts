import handleResponseProcess from './handleResponseProcess';
import { HandleResponseProcessOptions } from './types';

/**
 * Content-Length should be allowed by server
 */
const getProgressedJSON = async (
  url: URL,
  { fetchOptions = {}, progressCallback }: HandleResponseProcessOptions = {}
) => {
  const result = await handleResponseProcess(url, {
    fetchOptions,
    progressCallback,
  });

  if (result !== null) {
    const chunksAll = new Uint8Array(result.receivedLength);
    let position = 0;

    result.chunks.forEach((chunk) => {
      chunksAll.set(chunk, position);
      position += chunk.length;
    });

    return JSON.parse(new TextDecoder('utf-8').decode(chunksAll));
  }

  return null;
};

export { getProgressedJSON as default };
