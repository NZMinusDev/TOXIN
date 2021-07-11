import { Unpacked } from '@utils/devTools/scripts/TypingHelper';

import ItemQuantityListOpeningMethodModifier from './coupling';
import itemQuantityLists from '../form-dropdown__item-quantity-list';

type ItemQuantityList = Unpacked<typeof itemQuantityLists>;

class ItemQuantityListSwitchableOpeningMethodModifier extends ItemQuantityListOpeningMethodModifier {
  constructor(itemQuantityList: ItemQuantityList) {
    super(itemQuantityList);

    this._bindParentComponentListeners();
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
      this.component.toggle();
    },
  };
}

const itemQuantityListWithSwitchableOpeningMethod = itemQuantityLists.filter((itemQuantityList) =>
  itemQuantityList.element.classList.contains(
    'form-dropdown__item-quantity-list_opening-method_switchable'
  )
);

const itemQuantityListSwitchableOpeningMethodModifier = itemQuantityListWithSwitchableOpeningMethod.map(
  (itemQuantityList) => new ItemQuantityListSwitchableOpeningMethodModifier(itemQuantityList)
);
