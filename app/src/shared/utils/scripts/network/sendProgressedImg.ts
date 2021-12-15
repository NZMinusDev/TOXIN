import { imgToBlob } from '@shared/utils/scripts/file';

const sendProgressedImg = (
  url: URL,
  img: HTMLImageElement,
  {
    name = 'image',
    progressCallback,
  }: {
    name?: string;
    progressCallback?: (event: ProgressEvent<EventTarget>) => void;
  } = {}
) => {
  const xhr = new XMLHttpRequest();

  xhr.upload.onprogress = (event) => {
    progressCallback?.(event);
  };

  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    xhr.onloadend = () => {
      resolve(xhr);
    };

    const blob = await imgToBlob(img);
    const formData = new FormData();

    if (blob !== null) {
      formData.append(name, blob, img.src);
    }

    xhr.open('POST', url.toString());
    xhr.send(blob);
  });
};

export { sendProgressedImg as default };
