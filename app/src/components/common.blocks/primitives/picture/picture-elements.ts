type PictureElement = HTMLPictureElement;

const pictureElements =
  document.querySelectorAll<PictureElement>('.js-picture');

export { pictureElements as default, PictureElement };
