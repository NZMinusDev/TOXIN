import BEMModifier from '@shared/utils/scripts/components/BEM/BEMModifier';

import navBarNavigationItems, {
  NavBarNavigationItem,
} from '../nav-bar__navigation-item';

type NavBarExpandableNavigationItemModifierDOM = {
  itemExpandCheckbox: HTMLInputElement;
  itemExpandCheckboxLabel: HTMLLabelElement;
  childList: HTMLUListElement;
  nestedLists: HTMLUListElement[];
};

type NavBarExpandableNavigationItemModifierState = {
  isSmallDesktopMediaMatched: boolean;
};

class NavBarExpandableNavigationItemModifier extends BEMModifier<NavBarNavigationItem> {
  protected readonly _DOM: Readonly<NavBarExpandableNavigationItemModifierDOM>;

  protected readonly _state: NavBarExpandableNavigationItemModifierState;

  constructor(navBarNavigationItem: NavBarNavigationItem) {
    super(navBarNavigationItem, 'iavBarExpandableNavigationItemModifier');

    this._DOM = this._initDOM();

    this._state = NavBarExpandableNavigationItemModifier._initState();

    this._bindItemExpandCheckboxListeners()
      ._bindItemExpandCheckboxLabelListeners()
      ._bindWindowListeners();
  }

  protected _initDOM() {
    const itemExpandCheckbox = this.component.element.querySelector(
      '.js-nav-bar__navigation-item-dropdown-checkbox'
    ) as NavBarExpandableNavigationItemModifierDOM['itemExpandCheckbox'];
    const itemExpandCheckboxLabel =
      itemExpandCheckbox.nextElementSibling as NavBarExpandableNavigationItemModifierDOM['itemExpandCheckboxLabel'];

    const listSelector = '.js-nav-bar__navigation-list';
    const childList = this.component.element.querySelector(
      listSelector
    ) as NavBarExpandableNavigationItemModifierDOM['childList'];
    const nestedLists = [
      ...this.component.element.querySelectorAll(listSelector),
    ] as NavBarExpandableNavigationItemModifierDOM['nestedLists'];

    return {
      itemExpandCheckbox,
      itemExpandCheckboxLabel,
      childList,
      nestedLists,
    };
  }

  protected static _initState() {
    const isSmallDesktopMediaMatched =
      NavBarExpandableNavigationItemModifier._getSmallDesktopMediaMatching();

    return { isSmallDesktopMediaMatched };
  }

  protected _bindItemExpandCheckboxListeners() {
    this._DOM.itemExpandCheckbox.addEventListener(
      'change',
      this._itemExpandCheckboxEventListenerObject.handleItemExpandCheckboxChange
    );

    return this;
  }

  protected _itemExpandCheckboxEventListenerObject = {
    handleItemExpandCheckboxChange: () => {
      if (this._state.isSmallDesktopMediaMatched) {
        this._toggleChildListMaxHeight();
      }
    },
  };

  protected _bindItemExpandCheckboxLabelListeners() {
    const { itemExpandCheckboxLabel } = this._DOM;

    itemExpandCheckboxLabel.addEventListener(
      'keydown',
      this._itemExpandCheckboxLabelEventListenerObject
        .handleItemExpandCheckboxLabelKeyDown
    );

    return this;
  }

  protected _itemExpandCheckboxLabelEventListenerObject = {
    handleItemExpandCheckboxLabelKeyDown: (event: KeyboardEvent) => {
      const { currentTarget } = event;

      const shouldClick = !event.repeat && event.code === 'Enter';

      if (currentTarget instanceof HTMLElement && shouldClick) {
        currentTarget.click();
      }
    },
  };

  protected _bindWindowListeners() {
    window.addEventListener(
      'resize',
      this._windowEventListenerObject.handleWindowResize
    );
    window.addEventListener(
      'click',
      this._windowEventListenerObject.handleWindowClick
    );

    return this;
  }

  protected _windowEventListenerObject = {
    handleWindowResize: () => {
      this._state.isSmallDesktopMediaMatched =
        NavBarExpandableNavigationItemModifier._getSmallDesktopMediaMatching();

      if (!this._state.isSmallDesktopMediaMatched) {
        this._removeMaxHeightFromChildList();
      } else if (this._DOM.itemExpandCheckbox.checked) {
        this._addMaxHeightToChildList();
      }
    },
    handleWindowClick: (event: MouseEvent) => {
      const { target } = event;

      if (target instanceof HTMLElement) {
        const navBarExpandableNavigationItem = target.closest(
          '.js-nav-bar__navigation-item_expandable'
        );

        if (navBarExpandableNavigationItem === null) {
          this._uncheckItemExpandCheckbox();
          this._removeMaxHeightFromChildList();
        }
      }
    },
  };

  protected static _getSmallDesktopMediaMatching() {
    return window.matchMedia('(max-width: 992px)').matches;
  }

  protected _addMaxHeightToChildList() {
    const fullScrollHeight = this._DOM.nestedLists.reduce(
      (scrollHeight, nestedList) =>
        scrollHeight + nestedList.scrollHeight - nestedList.clientHeight,
      this._DOM.childList.scrollHeight
    );

    this._DOM.childList.style.maxHeight = `${fullScrollHeight}px`;
  }

  protected _removeMaxHeightFromChildList() {
    this._DOM.childList.style.maxHeight = '';

    return this;
  }

  protected _toggleChildListMaxHeight() {
    if (this._DOM.childList.style.maxHeight !== '') {
      this._removeMaxHeightFromChildList();
    } else {
      this._addMaxHeightToChildList();
    }

    return this;
  }

  protected _uncheckItemExpandCheckbox() {
    this._DOM.itemExpandCheckbox.checked = false;
  }
}

const navBarExpandableNavigationItemModifiers = navBarNavigationItems
  .filter((navBarNavigationItem) =>
    navBarNavigationItem.element.classList.contains(
      'js-nav-bar__navigation-item_expandable'
    )
  )
  .map(
    (navBarNavigationItem) =>
      new NavBarExpandableNavigationItemModifier(navBarNavigationItem)
  );

export { navBarExpandableNavigationItemModifiers as default };
