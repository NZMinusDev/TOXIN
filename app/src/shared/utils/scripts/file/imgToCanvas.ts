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

export { imgToCanvas as default };
