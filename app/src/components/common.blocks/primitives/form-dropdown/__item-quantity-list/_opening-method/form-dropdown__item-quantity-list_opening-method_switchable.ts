import { Unpacked } from '@utils/devTools/scripts/TypingHelper';

import IQListOpeningMethodModifier from './coupling';
import iqLists from '../form-dropdown__item-quantity-list';

type IQList = Unpacked<typeof iqLists>;

class IQListSwitchableOpeningMethodModifier extends IQListOpeningMethodModifier {
  constructor(iqList: IQList) {
    super(iqList);

    this._bindParentBlockListeners();
  }

  protected _bindParentBlockListeners() {
    // eslint-disable-next-line dot-notation
    this.plugin['_parentBlock'].element.addEventListener(
      'open',
      this._parentBlockEventListenerObject.handleParentBlockOpen
    );
  }
  protected _parentBlockEventListenerObject = {
    handleParentBlockOpen: () => {
      this.plugin.toggle();
    },
  };
}

const iqListWithSwitchableOpeningMethod = iqLists.filter((iqList) =>
  iqList.element.classList.contains('form-dropdown__item-quantity-list_opening-method_switchable')
);

const iqListSwitchableOpeningMethodModifier = iqListWithSwitchableOpeningMethod.map(
  (iqList) => new IQListSwitchableOpeningMethodModifier(iqList)
);
