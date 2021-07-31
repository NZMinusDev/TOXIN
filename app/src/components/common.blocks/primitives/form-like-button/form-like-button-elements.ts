type FormLikeButtonElement = HTMLDivElement;

const formLikeButtonElements = document.querySelectorAll<FormLikeButtonElement>(
  '.js-form-like-button'
);

export { formLikeButtonElements as default, FormLikeButtonElement };
