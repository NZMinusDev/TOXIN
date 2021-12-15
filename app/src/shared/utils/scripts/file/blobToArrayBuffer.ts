const blobToArrayBuffer = (blob: Blob) => {
  const fileReader = new FileReader();
  fileReader.readAsArrayBuffer(blob);

  return new Promise<ArrayBuffer>((resolve) => {
    const onLoad = () => {
      if (fileReader.result instanceof ArrayBuffer) {
        resolve(fileReader.result);
      }
    };

    fileReader.addEventListener('load', onLoad);
  });
};

export { blobToArrayBuffer as default };
