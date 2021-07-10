import { BEMModifier } from '@utils/devTools/scripts/ComponentCreationHelper';
import { Unpacked } from '@utils/devTools/scripts/TypingHelper';

import itemQuantityLists from '../form-dropdown__item-quantity-list';

type ItemQuantityList = Unpacked<typeof itemQuantityLists>;

abstract class ItemQuantityListOpeningMethodModifier extends BEMModifier<ItemQuantityList> {
  constructor(itemQuantityList: ItemQuantityList) {
    super(itemQuantityList, 'itemQuantityListOpeningMethodModifier');
  }
}

export { ItemQuantityListOpeningMethodModifier as default };
