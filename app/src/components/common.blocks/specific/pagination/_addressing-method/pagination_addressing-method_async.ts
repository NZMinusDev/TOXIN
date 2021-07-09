import paginations from '../pagination';
import '../__item/_active/pagination__item_active.scss';
import '../__item/_previous/pagination__item_previous.scss';
import '../__item/_next/pagination__item_next.scss';

const createPaginationItem = (
  innerText: string,
  linkClickListener: (event: MouseEvent) => void,
  listItemClasses: Array<string>,
  attributes: { [attribute: string]: string } = {}
): HTMLLIElement => {
  const listItem = document.createElement('li');
  listItem.textContent = innerText;
  listItem.classList.add(...listItemClasses);
  listItem.addEventListener('click', linkClickListener);

  Object.entries(attributes).forEach(([qualifiedName, value]) => {
    listItem.setAttribute(qualifiedName, value);
  });

  return listItem;
};

const createPagination = (
  paginationElement: HTMLElement,
  activePage: number,
  displayed: number,
  total: number,
  text: string
  // eslint-disable-next-line sonarjs/cognitive-complexity
) => {
  const usedList = paginationElement.querySelector('.pagination__list') as HTMLElement;
  const counterElement = paginationElement.querySelector(
    '.pagination__counter'
  ) as HTMLParagraphElement;

  const pages = Math.ceil(total / displayed);

  // - Determine how many pages to show after the current page index
  let pageCutLow = activePage - 1;

  // - Determine how many pages to show before the current page index
  let pageCutHigh = activePage + 1;

  if (activePage === 1) {
    pageCutLow += 1;
    pageCutHigh += 1;
  }

  if (activePage >= pages) {
    pageCutLow -= 1;
    pageCutHigh = pages;
  }

  const counterFrom = (activePage - 1) * displayed + 1;
  const counterTo = activePage * displayed > total ? total : activePage * displayed;

  const counterToDigits = `${counterTo}`.length;
  const counterTotalDigits = `${total}`.length;

  const counterTotalText =
    counterTotalDigits > counterToDigits
      ? `${Math.floor(total / 10 ** counterToDigits) * 10 ** counterToDigits}+ `
      : `${total} `;
  const counterText = `${counterFrom} - ${counterTo} из ${counterTotalText}${text}`;

  const list = document.createElement('ul');
  list.classList.add('pagination__list');

  const createPaginationOnClickArgs = [
    paginationElement,
    activePage,
    displayed,
    total,
    text,
  ] as Parameters<typeof createPagination>;

  // Show the Previous button only if you are on a page other than the first
  if (activePage > 1) {
    // eslint-disable-next-line no-use-before-define
    showPreviousButton(list, activePage, createPaginationOnClickArgs);
  }

  // Show all the pagination elements if there are less than 6 pages total
  if (pages < 6) {
    // eslint-disable-next-line no-use-before-define
    showAllPaginationElements(list, pages, activePage, createPaginationOnClickArgs);
  }

  // Use "..." to collapse pages outside of a certain range
  else {
    /*
     * Show the very first page followed by a "..." at the beginning of the
     * pagination section (after the Previous button)
     */
    if (activePage > 2) {
      list.insertAdjacentElement(
        'beforeend',
        createPaginationItem(
          '1',
          () => createPagination(paginationElement, 1, displayed, total, text),
          ['pagination__item'],
          { title: 'на страницу 1' }
        )
      );
      if (activePage > 3) {
        // eslint-disable-next-line no-use-before-define
        addSeparatorPaginationElement(list, 2, createPaginationOnClickArgs);
      }
    }

    /*
     * Output the indexes for pages that fall inside the range of pageCutLow
     * and pageCutHigh
     */
    // eslint-disable-next-line no-use-before-define
    showPaginationElementsBeforeSeparator(
      list,
      pageCutLow,
      pageCutHigh,
      activePage,
      createPaginationOnClickArgs
    );

    /*
     * Show the very last page preceded by a "..." at the end of the pagination
     * section (before the Next button)
     */
    if (activePage < pages - 1) {
      if (activePage < pages - 2) {
        // eslint-disable-next-line no-use-before-define
        addSeparatorPaginationElement(list, activePage + 2, createPaginationOnClickArgs);
      }

      list.insertAdjacentElement(
        'beforeend',
        createPaginationItem(
          `${pages}`,
          () => createPagination(paginationElement, pages, displayed, total, text),
          ['pagination__item'],
          { title: `на страницу ${pages}` }
        )
      );
    }
  }

  // Show the Next button only if you are on a page other than the last
  if (activePage < pages) {
    // eslint-disable-next-line no-use-before-define
    showNextButton(list, activePage, createPaginationOnClickArgs);
  }

  // update pagination after item click
  usedList.replaceWith(list);

  // update counter
  counterElement.textContent = counterText;

  return list;
};

const showPreviousButton = (
  list: HTMLUListElement,
  activePage: number,
  createPaginationOnClickArgs: Parameters<typeof createPagination>
) => {
  const currentCreatePaginationOnClickArgs = [
    createPaginationOnClickArgs[0],
    activePage - 1,
    ...createPaginationOnClickArgs.slice(2),
  ] as typeof createPaginationOnClickArgs;

  list.insertAdjacentElement(
    'beforeend',
    createPaginationItem(
      'arrow_back',
      () => createPagination(...currentCreatePaginationOnClickArgs),
      ['pagination__item', 'pagination__item_previous'],
      { title: 'на предыдущую страницу' }
    )
  );
};

const showAllPaginationElements = (
  list: HTMLUListElement,
  pages: number,
  activePage: number,
  createPaginationOnClickArgs: Parameters<typeof createPagination>
) => {
  // eslint-disable-next-line no-loops/no-loops
  for (let p = 1; p <= pages; p += 1) {
    const itemIsActiveClass = activePage === p ? 'pagination__item_active' : '';
    const title = activePage === p ? 'текущая страница' : `на страницу ${p}`;

    const currentCreatePaginationOnClickArgs = [
      createPaginationOnClickArgs[0],
      p,
      ...createPaginationOnClickArgs.slice(2),
    ] as typeof createPaginationOnClickArgs;

    list.insertAdjacentElement(
      'beforeend',
      createPaginationItem(
        `${p}`,
        () => createPagination(...currentCreatePaginationOnClickArgs),
        ['pagination__item', itemIsActiveClass].filter((element) => element !== ''),
        { title }
      )
    );
  }
};

const addSeparatorPaginationElement = (
  list: HTMLUListElement,
  activePage: number,
  createPaginationOnClickArgs: Parameters<typeof createPagination>
) => {
  const currentCreatePaginationOnClickArgs = [
    createPaginationOnClickArgs[0],
    activePage,
    ...createPaginationOnClickArgs.slice(2),
  ] as typeof createPaginationOnClickArgs;

  const title = `на страницу ${activePage}`;

  list.insertAdjacentElement(
    'beforeend',
    createPaginationItem(
      '...',
      () => createPagination(...currentCreatePaginationOnClickArgs),
      ['pagination__item', 'pagination__item_out-of-range'],
      { title }
    )
  );
};

const showPaginationElementsBeforeSeparator = (
  list: HTMLUListElement,
  pageCutLow: number,
  pageCutHigh: number,
  activePage: number,
  createPaginationOnClickArgs: Parameters<typeof createPagination>
) => {
  // eslint-disable-next-line no-loops/no-loops
  for (let p = pageCutLow; p <= pageCutHigh; p += 1) {
    const itemIsActiveClass = activePage === p ? 'pagination__item_active' : '';
    const title = activePage === p ? 'текущая страница' : `на страницу ${p}`;

    const currentCreatePaginationOnClickArgs = [
      createPaginationOnClickArgs[0],
      p,
      ...createPaginationOnClickArgs.slice(2),
    ] as typeof createPaginationOnClickArgs;

    list.insertAdjacentElement(
      'beforeend',
      createPaginationItem(
        `${p}`,
        () => createPagination(...currentCreatePaginationOnClickArgs),
        ['pagination__item', itemIsActiveClass].filter((element) => element !== ''),
        { title }
      )
    );
  }
};

const showNextButton = (
  list: HTMLUListElement,
  activePage: number,
  createPaginationOnClickArgs: Parameters<typeof createPagination>
) => {
  const currentCreatePaginationOnClickArgs = [
    createPaginationOnClickArgs[0],
    activePage + 1,
    ...createPaginationOnClickArgs.slice(2),
  ] as typeof createPaginationOnClickArgs;

  list.insertAdjacentElement(
    'beforeend',
    createPaginationItem(
      'arrow_forward',
      () => createPagination(...currentCreatePaginationOnClickArgs),
      ['pagination__item', 'pagination__item_previous'],
      { title: 'на следующую страницу' }
    )
  );
};

const asyncPaginations = paginations.filter((pagination) => {
  if (pagination.element.classList.contains('pagination_addressing-method_async')) {
    createPagination(
      pagination.element,
      parseInt(pagination.element.dataset.page as string, 10),
      parseInt(pagination.element.dataset.displayed as string, 10),
      parseInt(pagination.element.dataset.total as string, 10),
      pagination.element.dataset.text as string
    );

    return true;
  }

  return false;
});

export { asyncPaginations as default };
