import { Unpacked } from '@utils/devTools/scripts/TypingHelper';

import ItemQuantityListOpeningMethodModifier from './coupling';
import itemQuantityLists from '../form-dropdown__item-quantity-list';

type ItemQuantityList = Unpacked<typeof itemQuantityLists>;

class ItemQuantityListFoldedOpeningMethodModifier extends ItemQuantityListOpeningMethodModifier {
  constructor(itemQuantityList: ItemQuantityList) {
    super(itemQuantityList);

    this._bindParentComponentListeners()._bindWindowListeners();
  }

  protected _bindParentComponentListeners() {
    // eslint-disable-next-line dot-notation
    this.component['_parentComponent'].element.addEventListener(
      'open',
      this._parentComponentEventListenerObject.handleParentComponentOpen
    );

    return this;
  }
  protected _parentComponentEventListenerObject = {
    handleParentComponentOpen: () => {
      this.component.open();
    },
  };

  protected _bindWindowListeners() {
    window.addEventListener('click', this._windowEventListenerObject.handleWindowClick);

    return this;
  }
  protected _windowEventListenerObject = {
    handleWindowClick: (event: MouseEvent) => {
      // eslint-disable-next-line dot-notation
      if (this.component['_parentComponent'].element.contains(event.target as Element)) {
        this.component.open();
      } else {
        this.component.close();
      }
    },
  };
}

const itemQuantityListWithFoldedOpeningMethod = itemQuantityLists.filter((itemQuantityList) =>
  itemQuantityList.element.classList.contains(
    'form-dropdown__item-quantity-list_opening-method_folded'
  )
);

const itemQuantityListFoldedOpeningMethodModifier = itemQuantityListWithFoldedOpeningMethod.map(
  (itemQuantityList) => new ItemQuantityListFoldedOpeningMethodModifier(itemQuantityList)
);
