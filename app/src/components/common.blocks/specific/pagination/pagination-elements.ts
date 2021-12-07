type PaginationElement = HTMLElement;

const paginationElements =
  document.querySelectorAll<PaginationElement>('.js-pagination');

export { paginationElements as default, PaginationElement };
