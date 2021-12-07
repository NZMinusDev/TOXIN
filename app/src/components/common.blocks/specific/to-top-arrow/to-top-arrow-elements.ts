type ToTopArrowElement = HTMLDivElement;

const toTopArrowElements =
  document.querySelectorAll<ToTopArrowElement>('.js-to-top-arrow');

export { toTopArrowElements as default, ToTopArrowElement };
