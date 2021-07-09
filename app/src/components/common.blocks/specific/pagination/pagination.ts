import { BEMComponent } from '@utils/devTools/scripts/ComponentCreationHelper';

type PaginationElement = HTMLElement;

type PaginationDOM = {
  list: HTMLUListElement;
  counter: HTMLParagraphElement;
};

type PaginationEvents = '';

class Pagination implements BEMComponent<PaginationEvents> {
  readonly element: PaginationElement;
  protected readonly _DOM: Readonly<PaginationDOM>;

  constructor(paginationElement: PaginationElement) {
    this.element = paginationElement;
    this._DOM = this._initDOM();
  }

  protected _initDOM(): PaginationDOM {
    const list = this.element.querySelector('.pagination__list') as PaginationDOM['list'];
    const counter = this.element.querySelector('.pagination__counter') as PaginationDOM['counter'];

    return { list, counter };
  }
}

const paginationElements = Array.from(
  document.querySelectorAll('.pagination')
) as PaginationElement[];

const paginations = paginationElements.map(
  (paginationElement) => new Pagination(paginationElement)
);

export { paginations as default };
