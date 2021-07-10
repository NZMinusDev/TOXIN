const breakPointQuery = '(max-width: 992px)';
const expandableItemSelector = '.nav-bar__navigation-item_expandable';
const expandCheckboxSelector = '.nav-bar__navigation-item-dropdown-checkbox';
const listSelector = '.nav-bar__navigation-list';

let isCollapsible = window.matchMedia(breakPointQuery).matches;
const dropdownItems = document.querySelectorAll(expandableItemSelector);

const resetListMaxHeight = () => {
  dropdownItems.forEach((dropdownItem) => {
    const lists = dropdownItem.querySelectorAll<HTMLUListElement>(listSelector);

    lists.forEach((list) => {
      // eslint-disable-next-line no-param-reassign
      list.style.maxHeight = '';
    });
  });
};

const uncheckExpandCheckboxes = () => {
  dropdownItems.forEach((dropdownItem) => {
    const checkboxes = dropdownItem.querySelectorAll<HTMLInputElement>(expandCheckboxSelector);

    checkboxes.forEach((expandCheckbox) => {
      // eslint-disable-next-line no-param-reassign
      expandCheckbox.checked = false;
    });
  });
};

const windowOnResizeHandler = () => {
  isCollapsible = window.matchMedia(breakPointQuery).matches;

  if (!isCollapsible) {
    resetListMaxHeight();
  }
};

const windowOnClickHandler = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const eventDropdownItem = target.closest(expandableItemSelector);

  if (eventDropdownItem === null) {
    uncheckExpandCheckboxes();
    resetListMaxHeight();
  }
};

const toggleListSize = (dropdownItem: HTMLElement) => {
  const list = dropdownItem.querySelector(listSelector) as HTMLUListElement;

  const nestedDropdownLists = list.querySelectorAll(listSelector);
  let fullScrollHeight = list.scrollHeight;
  nestedDropdownLists.forEach((nestedDropdownList) => {
    fullScrollHeight += nestedDropdownList.scrollHeight;
  });

  if (list.style.maxHeight) {
    list.style.maxHeight = '';
  } else {
    list.style.maxHeight = `${fullScrollHeight}px`;
  }
};

window.addEventListener('resize', windowOnResizeHandler);
window.addEventListener('click', windowOnClickHandler);

dropdownItems.forEach((dropdownItem) => {
  const onChange = (event: Event) => {
    if (isCollapsible) {
      toggleListSize(dropdownItem as HTMLElement);
    }
  };

  const expandCheckbox = dropdownItem.querySelector(expandCheckboxSelector) as HTMLInputElement;

  expandCheckbox.addEventListener('change', onChange);
});
