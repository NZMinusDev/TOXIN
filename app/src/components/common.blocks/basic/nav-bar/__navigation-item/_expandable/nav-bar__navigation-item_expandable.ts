import { BEMModifier } from '@utils/devTools/scripts/ComponentCreationHelper';

import navBarNavigationItems, { NavBarNavigationItem } from '../nav-bar__navigation-item';

type NavBarExpandableNavigationItemDOM = {
  itemExpandCheckbox: HTMLInputElement;
  childList: HTMLUListElement;
  nestedLists: HTMLUListElement[];
};

class NavBarExpandableNavigationItemModifier extends BEMModifier<NavBarNavigationItem> {
  protected _DOM: NavBarExpandableNavigationItemDOM;

  protected _isMediaMatched: boolean;

  constructor(navBarNavigationItem: NavBarNavigationItem) {
    super(navBarNavigationItem, 'iavBarExpandableNavigationItemModifier');

    this._DOM = this._initDOM();

    this._isMediaMatched = NavBarExpandableNavigationItemModifier._initMediaBreakPointFlag();

    this._bindItemExpandCheckboxListeners()._bindWindowListeners();
  }

  protected _initDOM() {
    const listSelector = '.nav-bar__navigation-list';

    const itemExpandCheckbox = this.component.element.querySelector(
      '.nav-bar__navigation-item-dropdown-checkbox'
    ) as NavBarExpandableNavigationItemDOM['itemExpandCheckbox'];
    const childList = this.component.element.querySelector(
      listSelector
    ) as NavBarExpandableNavigationItemDOM['childList'];
    const nestedLists = [
      ...this.component.element.querySelectorAll(listSelector),
    ] as NavBarExpandableNavigationItemDOM['nestedLists'];

    return { itemExpandCheckbox, childList, nestedLists };
  }

  protected static _initMediaBreakPointFlag() {
    return window.matchMedia('(max-width: 992px)').matches;
  }

  protected _toggleChildListSize() {
    if (this._DOM.childList.style.maxHeight !== '') {
      this._collapseChildList();
    } else {
      this._openChildList();
    }

    return this;
  }

  protected _openChildList() {
    const childListScrollHeight = this._DOM.nestedLists.reduce(
      (scrollHeight, nestedList) =>
        scrollHeight + nestedList.scrollHeight - nestedList.clientHeight,
      this._DOM.childList.scrollHeight
    );

    this._DOM.childList.style.maxHeight = `${childListScrollHeight}px`;
  }
  protected _uncheckItemExpandCheckbox() {
    this._DOM.itemExpandCheckbox.checked = false;
  }
  protected _collapseChildList() {
    this._DOM.childList.style.maxHeight = '';

    return this;
  }

  protected _bindItemExpandCheckboxListeners() {
    this._DOM.itemExpandCheckbox.addEventListener(
      'change',
      this._itemExpandCheckboxEventListenerObject.handleItemExpandCheckboxChange
    );

    return this;
  }
  protected _itemExpandCheckboxEventListenerObject = {
    handleItemExpandCheckboxChange: (event: Event) => {
      if (this._isMediaMatched) {
        this._toggleChildListSize();
      }
    },
  };

  protected _bindWindowListeners() {
    window.addEventListener('resize', this._windowEventListenerObject.handleWindowResize);
    window.addEventListener('click', this._windowEventListenerObject.handleWindowClick);

    return this;
  }
  protected _windowEventListenerObject = {
    handleWindowResize: () => {
      this._isMediaMatched = NavBarExpandableNavigationItemModifier._initMediaBreakPointFlag();

      if (!this._isMediaMatched) {
        this._collapseChildList();
      } else if (this._DOM.itemExpandCheckbox.checked) {
        this._openChildList();
      }
    },
    handleWindowClick: (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const navBarExpandableNavigationItem = target.closest('.nav-bar__navigation-item_expandable');

      if (navBarExpandableNavigationItem === null) {
        this._uncheckItemExpandCheckbox();
        this._collapseChildList();
      }
    },
  };
}

const navBarExpandableNavigationItems = navBarNavigationItems.filter((navBarNavigationItem) =>
  navBarNavigationItem.element.classList.contains('nav-bar__navigation-item_expandable')
);

const navBarExpandableNavigationItemModifiers = navBarExpandableNavigationItems.map(
  (navBarExpandableNavigationItem) =>
    new NavBarExpandableNavigationItemModifier(navBarExpandableNavigationItem)
);
