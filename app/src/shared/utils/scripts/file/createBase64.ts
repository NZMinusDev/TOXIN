const createBase64 = (
  blobParts: BlobPart[],
  options: BlobPropertyBag = { type: 'text/plain' }
) => {
  const blob = new Blob(blobParts, options);

  const fileReader = new FileReader();
  fileReader.readAsDataURL(blob);

  return new Promise<string>((resolve) => {
    const onLoad = () => {
      if (typeof fileReader.result === 'string') {
        resolve(fileReader.result);
      }
    };

    fileReader.addEventListener('load', onLoad);
  });
};

export { createBase64 as default };
