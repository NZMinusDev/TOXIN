type ToTopArrowElement = HTMLDivElement;

const toTopArrowElements = document.querySelectorAll(
  '.js-to-top-arrow'
) as NodeListOf<ToTopArrowElement>;

export { toTopArrowElements as default, ToTopArrowElement };
