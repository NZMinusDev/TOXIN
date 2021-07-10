import { Unpacked } from '@utils/devTools/scripts/TypingHelper';

import ItemQuantityListOpeningMethodModifier from './coupling';
import itemQuantityLists from '../form-dropdown__item-quantity-list';

type ItemQuantityList = Unpacked<typeof itemQuantityLists>;

class ItemQuantityListSwitchableOpeningMethodModifier extends ItemQuantityListOpeningMethodModifier {
  constructor(itemQuantityList: ItemQuantityList) {
    super(itemQuantityList);

    this._bindParentBlockListeners();
  }

  protected _bindParentBlockListeners() {
    // eslint-disable-next-line dot-notation
    this.component['_parentBlock'].element.addEventListener(
      'open',
      this._parentBlockEventListenerObject.handleParentBlockOpen
    );

    return this;
  }
  protected _parentBlockEventListenerObject = {
    handleParentBlockOpen: () => {
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
