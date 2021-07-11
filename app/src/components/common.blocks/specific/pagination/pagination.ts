import { BEMComponent } from '@utils/devTools/scripts/ComponentCreationHelper';

type PaginationElement = HTMLElement;

type PaginationDOM = {
  list: HTMLUListElement;
  counter: HTMLParagraphElement;
};

type PaginationCustomEvents = '';

class Pagination extends BEMComponent<PaginationElement, PaginationCustomEvents> {
  protected readonly _DOM: Readonly<PaginationDOM>;

  constructor(paginationElement: PaginationElement) {
    super(paginationElement);

    this._DOM = this._initDOM();
  }

  protected _initDOM(): PaginationDOM {
    const list = this.element.querySelector('.pagination__list') as PaginationDOM['list'];
    const counter = this.element.querySelector('.pagination__counter') as PaginationDOM['counter'];

    return { list, counter };
  }
}

const paginations = Array.from(
  document.querySelectorAll('.pagination') as NodeListOf<PaginationElement>,
  (paginationElement) => new Pagination(paginationElement)
);

export { paginations as default, PaginationCustomEvents };
