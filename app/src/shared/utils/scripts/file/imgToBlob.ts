import imgToCanvas from './imgToCanvas';

const imgToBlob = (
  img: HTMLImageElement,
  imgProcessing?: (canvas: HTMLCanvasElement) => {}
) => {
  const canvas = imgToCanvas(img, imgProcessing);

  return new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/png')
  );
};

export { imgToBlob as default };
