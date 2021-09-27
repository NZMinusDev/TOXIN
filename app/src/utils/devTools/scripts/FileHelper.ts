const createDataURL = (
  blobParts: BlobPart[],
  options: BlobPropertyBag = { type: 'text/plain' }
) => {
  const blob = new Blob(blobParts, options);

  return URL.createObjectURL(blob);
};

const createBase64 = (
  blobParts: BlobPart[],
  options: BlobPropertyBag = { type: 'text/plain' }
) => {
  const blob = new Blob(blobParts, options);

  const fileReader = new FileReader();
  fileReader.readAsDataURL(blob);

  return new Promise<string>((resolve) => {
    const onLoad = () => {
      resolve(fileReader.result as string);
    };

    fileReader.addEventListener('load', onLoad);
  });
};

const blobToArrayBuffer = (blob: Blob) => {
  const fileReader = new FileReader();
  fileReader.readAsArrayBuffer(blob);

  return new Promise<ArrayBuffer>((resolve) => {
    const onLoad = () => {
      resolve(fileReader.result as ArrayBuffer);
    };

    fileReader.addEventListener('load', onLoad);
  });
};

const imgToCanvas = (
  img: HTMLImageElement,
  imgProcessing?: (canvas: HTMLCanvasElement) => {}
) => {
  const canvas = document.createElement('canvas');
  canvas.width = img.clientWidth;
  canvas.height = img.clientHeight;

  const context = canvas.getContext('2d');
  context?.drawImage(img, 0, 0);

  imgProcessing?.(canvas);

  return canvas;
};

const imgToBlob = (
  img: HTMLImageElement,
  imgProcessing?: (canvas: HTMLCanvasElement) => {}
) => {
  const canvas = imgToCanvas(img, imgProcessing);

  return new Promise<Blob>((resolve) =>
    canvas.toBlob(resolve as BlobCallback, 'image/png')
  );
};

export {
  createDataURL,
  createBase64,
  blobToArrayBuffer,
  imgToCanvas,
  imgToBlob,
};
