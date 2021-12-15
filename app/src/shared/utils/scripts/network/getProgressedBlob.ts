import handleResponseProcess from './handleResponseProcess';
import { HandleResponseProcessOptions } from './types';

/**
 * Content-Length should be allowed by server
 */
const getProgressedBlob = async (
  url: URL,
  { fetchOptions = {}, progressCallback }: HandleResponseProcessOptions = {}
) => {
  const result = await handleResponseProcess(url, {
    fetchOptions,
    progressCallback,
  });

  if (result !== null) {
    return new Blob(result.chunks);
  }

  return null;
};

export { getProgressedBlob as default };
