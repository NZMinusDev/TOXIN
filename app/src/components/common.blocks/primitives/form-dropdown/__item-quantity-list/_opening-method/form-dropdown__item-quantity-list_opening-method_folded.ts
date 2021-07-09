import { Unpacked } from '@utils/devTools/scripts/TypingHelper';

import ItemQuantityListOpeningMethodModifier from './coupling';
import itemQuantityLists from '../form-dropdown__item-quantity-list';

type ItemQuantityList = Unpacked<typeof itemQuantityLists>;

class ItemQuantityListFoldedOpeningMethodModifier extends ItemQuantityListOpeningMethodModifier {
  constructor(itemQuantityList: ItemQuantityList) {
    super(itemQuantityList);

    this._bindParentBlockListeners();
    this._bindWindowListeners();
  }

  protected _bindParentBlockListeners() {
    // eslint-disable-next-line dot-notation
    this.component['_parentBlock'].element.addEventListener(
      'open',
      this._parentBlockEventListenerObject.handleParentBlockOpen
    );
  }
  protected _parentBlockEventListenerObject = {
    handleParentBlockOpen: () => {
      this.component.open();
    },
  };

  protected _bindWindowListeners() {
    window.addEventListener('click', this._windowEventListenerObject.handleWindowClick);
  }
  protected _windowEventListenerObject = {
    handleWindowClick: (event: MouseEvent) => {
      // eslint-disable-next-line dot-notation
      if (this.component['_parentBlock'].element.contains(event.target as Element)) {
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
