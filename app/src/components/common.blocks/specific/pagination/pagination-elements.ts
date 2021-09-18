type PaginationElement = HTMLElement;

const paginationElements = document.querySelectorAll(
  '.js-pagination'
) as NodeListOf<PaginationElement>;

export { paginationElements as default, PaginationElement };
