import { Unpacked } from '@utils/devTools/scripts/TypingHelper';

import IQListOpeningMethodModifier from './coupling';
import iqLists from '../form-dropdown__item-quantity-list';

type IQList = Unpacked<typeof iqLists>;

class IQListFoldedOpeningMethodModifier extends IQListOpeningMethodModifier {
  constructor(iqList: IQList) {
    super(iqList);

    this._bindParentBlockListeners();
    this._bindWindowListeners();
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
      this.plugin.open();
    },
  };

  protected _bindWindowListeners() {
    window.addEventListener('click', this._windowEventListenerObject.handleWindowClick);
  }
  protected _windowEventListenerObject = {
    handleWindowClick: (event: MouseEvent) => {
      // eslint-disable-next-line dot-notation
      if (this.plugin['_parentBlock'].element.contains(event.target as Element)) {
        this.plugin.open();
      } else {
        this.plugin.close();
      }
    },
  };
}

const iqListWithFoldedOpeningMethod = iqLists.filter((iqList) =>
  iqList.element.classList.contains('form-dropdown__item-quantity-list_opening-method_folded')
);

const iqListFoldedOpeningMethodModifier = iqListWithFoldedOpeningMethod.map(
  (iqList) => new IQListFoldedOpeningMethodModifier(iqList)
);
