import { Unpacked } from '@utils/devTools/scripts/TypingHelper';

import ItemQuantityListOpeningMethodModifier from './coupling';
import itemQuantityLists from '../form-dropdown__item-quantity-list';

type ItemQuantityList = Unpacked<typeof itemQuantityLists>;

class ItemQuantityListFoldedOpeningMethodModifier extends ItemQuantityListOpeningMethodModifier {
  constructor(itemQuantityList: ItemQuantityList) {
    super(itemQuantityList);

    this._bindComponentListeners()._bindWindowListeners();
  }

  protected _bindComponentListeners() {
    this.component.element.addEventListener(
      'open',
      this._componentEventListenerObject.handleComponentOpen
    );

    return this;
  }
  protected _componentEventListenerObject = {
    handleComponentOpen: () => {
      this.component.open();
    },
  };

  protected _bindWindowListeners() {
    window.addEventListener('click', this._windowEventListenerObject.handleWindowClick);

    return this;
  }
  protected _windowEventListenerObject = {
    handleWindowClick: (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const dropdownElement = this.component.element.closest('.form-dropdown') as HTMLElement;

      if (!dropdownElement.contains(target)) {
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
