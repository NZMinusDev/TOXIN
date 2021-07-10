import { Unpacked } from '@utils/devTools/scripts/TypingHelper';

import ItemQuantityListOpeningMethodModifier from './coupling';
import itemQuantityLists from '../form-dropdown__item-quantity-list';

type ItemQuantityListApplyOpeningMethodDOM = {
  clearBtn: HTMLButtonElement;
  applyBtn: HTMLButtonElement;
};

type ItemQuantityList = Unpacked<typeof itemQuantityLists>;

class ItemQuantityListApplyOpeningMethodModifier extends ItemQuantityListOpeningMethodModifier {
  protected readonly _DOM: Readonly<ItemQuantityListApplyOpeningMethodDOM>;

  constructor(itemQuantityList: ItemQuantityList) {
    super(itemQuantityList);

    this._DOM = this._initDOM();

    this._bindParentBlockListeners()
      ._bindComponentListeners()
      ._bindClearBtnListeners()
      ._bindApplyBtnListeners();

    this._initDisplay();
  }

  protected _initDOM(): ItemQuantityListApplyOpeningMethodDOM {
    const applyControl = this.component.element.querySelector('.apply-control') as HTMLDivElement;
    const clearBtn = applyControl.querySelector(
      '.apply-control__clear-btn'
    ) as ItemQuantityListApplyOpeningMethodDOM['clearBtn'];
    const applyBtn = applyControl.querySelector(
      '.apply-control__apply-btn'
    ) as ItemQuantityListApplyOpeningMethodDOM['applyBtn'];

    return {
      clearBtn,
      applyBtn,
    };
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
      this.component.open();
    },
  };

  protected _bindComponentListeners() {
    this.component.element.addEventListener(
      'select',
      this._componentEventListenerObject.handleComponentSelect
    );

    return this;
  }
  protected _componentEventListenerObject = {
    handleComponentSelect: () => {
      this._updateClearBtnDisplay();
    },
  };

  protected _bindClearBtnListeners() {
    this._DOM.clearBtn.addEventListener(
      'click',
      this._clearBtnEventListenerObject.handleClearBtnClick
    );

    return this;
  }
  protected _clearBtnEventListenerObject = {
    handleClearBtnClick: () => {
      this.component.reset();
      this._updateClearBtnDisplay();
    },
  };

  protected _updateClearBtnDisplay() {
    const total = this.component.getTotalAmount();

    if (total === 0) {
      this._DOM.clearBtn.classList.add('apply-control__clear-btn_hidden');
    } else {
      this._DOM.clearBtn.classList.remove('apply-control__clear-btn_hidden');
    }

    return this;
  }

  protected _bindApplyBtnListeners() {
    this._DOM.applyBtn.addEventListener(
      'click',
      this._applyBtnEventListenerObject.handleApplyBtnClick
    );

    return this;
  }
  protected _applyBtnEventListenerObject = {
    handleApplyBtnClick: (event: MouseEvent) => {
      this.component.close();
    },
  };

  protected _initDisplay() {
    this._updateClearBtnDisplay();

    return this;
  }
}

const itemQuantityListWithApplyOpeningMethod = itemQuantityLists.filter((itemQuantityList) =>
  itemQuantityList.element.classList.contains(
    'form-dropdown__item-quantity-list_opening-method_applied'
  )
);

const itemQuantityListApplyOpeningMethodModifier = itemQuantityListWithApplyOpeningMethod.map(
  (itemQuantityList) => new ItemQuantityListApplyOpeningMethodModifier(itemQuantityList)
);
