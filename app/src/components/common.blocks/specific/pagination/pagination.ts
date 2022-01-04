import BEMComponent, {
  HTMLElementWithComponent,
} from '@shared/utils/scripts/components/BEM/BEMComponent';

import type { PaginationAsyncAddressingMethodModifierCustomEvents } from './_addressing-method/pagination_addressing-method_async';
import paginationElements, { PaginationElement } from './pagination-elements';
import './pagination.scss';

type PaginationDOM = {
  list: HTMLUListElement;
  counter: HTMLParagraphElement;
};

type PaginationCustomEvents = {};
type PaginationWithAsyncAddressingMethodModifierCustomEvents =
  PaginationCustomEvents & PaginationAsyncAddressingMethodModifierCustomEvents;

class Pagination extends BEMComponent<
  PaginationElement,
  PaginationCustomEvents
> {
  protected readonly _DOM: Readonly<PaginationDOM>;

  constructor(paginationElement: PaginationElement) {
    super(paginationElement);

    this._DOM = this._initDOM();
  }

  protected _initDOM(): PaginationDOM {
    const list = this.element.querySelector(
      '.js-pagination__list'
    ) as PaginationDOM['list'];
    const counter = this.element.querySelector(
      '.js-pagination__counter'
    ) as PaginationDOM['counter'];

    return { list, counter };
  }
}

type PaginationElementWithComponent = HTMLElementWithComponent<
  PaginationElement,
  PaginationCustomEvents,
  Pagination
>;
type PaginationWithAsyncAddressingMethodModifierElementWithComponent =
  HTMLElementWithComponent<
    PaginationElement,
    PaginationWithAsyncAddressingMethodModifierCustomEvents,
    Pagination
  >;

const paginations = Array.from(
  paginationElements,
  (paginationElement) => new Pagination(paginationElement)
);

export type {
  PaginationCustomEvents,
  PaginationWithAsyncAddressingMethodModifierCustomEvents,
  Pagination,
  PaginationElementWithComponent,
  PaginationWithAsyncAddressingMethodModifierElementWithComponent,
};

export { paginations as default };
