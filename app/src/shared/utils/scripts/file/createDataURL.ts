const createDataURL = (
  blobParts: BlobPart[],
  options: BlobPropertyBag = { type: 'text/plain' }
) => {
  const blob = new Blob(blobParts, options);

  return URL.createObjectURL(blob);
};

export { createDataURL as default };
