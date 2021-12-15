interface HandleResponseProcessOptions {
  fetchOptions?: RequestInit;
  progressCallback?: (receivedLength: number, contentLength: number) => void;
}

export { HandleResponseProcessOptions };
