const dropdownItems = document.querySelectorAll('.nav-bar__navigation-item_isDropdown');
const activeItems: Array<HTMLElement> = [];
const toggledItems: Array<HTMLElement> = [];
let breakPointState = window.matchMedia('(max-width: 992px)').matches;

const NAVIGATION_LIST_SELECTOR = '.nav-bar__navigation-list';
const ITEM_IS_ACTIVE_SELECTOR = 'nav-bar__navigation-item_isActive';

const toggleListSize = (dropdownItem: HTMLElement) => {
  const list = dropdownItem.querySelector(NAVIGATION_LIST_SELECTOR) as HTMLUListElement;
  if (list.style.maxHeight) {
    list.style.maxHeight = null;
  } else {
    let accumulator = 0;
    list.querySelectorAll(NAVIGATION_LIST_SELECTOR).forEach((list: HTMLUListElement) => {
      accumulator += list.scrollHeight;
    });

    list.style.maxHeight = `${list.scrollHeight + accumulator}px`;
  }
};

dropdownItems.forEach((dropdownItem: HTMLElement) => {
  if (dropdownItem.classList.contains(ITEM_IS_ACTIVE_SELECTOR)) {
    activeItems.push(dropdownItem);

    if (breakPointState) {
      toggledItems.push(dropdownItem);
      toggleListSize(dropdownItem);
    }
  }

  const onClickHandler = function (event) {
    const targetIsCurrentTarget =
      event.target === event.currentTarget ||
      event.target === (event.currentTarget as HTMLElement).querySelector('.nav-bar__expand-icon');

    if (breakPointState && targetIsCurrentTarget) {
      if (!toggledItems.find((dropdownItem) => dropdownItem === this)) {
        toggledItems.push(this);
        this.classList.add(ITEM_IS_ACTIVE_SELECTOR);
      } else {
        toggledItems.splice(toggledItems.indexOf(this), 1);
        this.classList.remove(ITEM_IS_ACTIVE_SELECTOR);
      }

      toggleListSize(this);
    }
  };

  dropdownItem.addEventListener('click', onClickHandler);
});

const windowOnResizeHandler = () => {
  if (breakPointState && window.matchMedia('(min-width: 992px)').matches) {
    toggledItems.forEach((toggledItem) => {
      toggledItem.classList.remove(ITEM_IS_ACTIVE_SELECTOR);
      // eslint-disable-next-line no-param-reassign
      (toggledItem.querySelector(
        NAVIGATION_LIST_SELECTOR
      ) as HTMLUListElement).style.maxHeight = null;
    });
    toggledItems.splice(0);

    activeItems.forEach((activeItem) => {
      activeItem.classList.add(ITEM_IS_ACTIVE_SELECTOR);
    });

    breakPointState = false;
  } else if (!breakPointState && !window.matchMedia('(min-width: 992px)').matches) {
    activeItems.forEach((activeItem) => {
      toggledItems.push(activeItem);
      toggleListSize(activeItem);
    });
    breakPointState = true;
  }
};

window.addEventListener('resize', windowOnResizeHandler);
