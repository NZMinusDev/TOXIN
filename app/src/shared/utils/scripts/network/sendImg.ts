import { imgToBlob } from '@shared/utils/scripts/file';

const sendImg = async (
  url: URL,
  img: HTMLImageElement,
  { name = 'image' } = {}
) => {
  const blob = await imgToBlob(img);
  const formData = new FormData();

  if (blob !== null) {
    formData.append(name, blob, img.src);
  }

  return fetch(url.toString(), {
    method: 'POST',
    body: formData,
  });
};

export { sendImg as default };
