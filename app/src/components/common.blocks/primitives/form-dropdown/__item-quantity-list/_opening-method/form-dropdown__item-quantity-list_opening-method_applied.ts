import { Unpacked } from '@utils/devTools/scripts/TypingHelper';

import IQListOpeningMethodModifier from './coupling';
import iqLists from '../form-dropdown__item-quantity-list';

type IQListApplyOpeningMethodDOM = {
  clearBtn: HTMLButtonElement;
  applyBtn: HTMLButtonElement;
};

type IQList = Unpacked<typeof iqLists>;

class IQListApplyOpeningMethodModifier extends IQListOpeningMethodModifier {
  protected _dom: IQListApplyOpeningMethodDOM;

  constructor(iqList: IQList) {
    super(iqList);

    this._dom = this._initDOM();

    this._bindParentBlockListeners();
    this._bindComponentListeners();
    this._bindClearBtnListeners();
    this._bindApplyBtnListeners();

    this._init();
  }

  protected _initDOM(): IQListApplyOpeningMethodDOM {
    return {
      clearBtn: this.component.element.querySelector(
        '.apply-control__clear-btn'
      ) as IQListApplyOpeningMethodDOM['clearBtn'],
      applyBtn: this.component.element.querySelector(
        '.apply-control__apply-btn'
      ) as IQListApplyOpeningMethodDOM['applyBtn'],
    };
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

  protected _bindComponentListeners() {
    this.component.element.addEventListener(
      'select',
      this._componentEventListenerObject.handleComponentSelect
    );
  }
  protected _componentEventListenerObject = {
    handleComponentSelect: () => {
      this._updateClearBtnDisplay();
    },
  };

  protected _bindClearBtnListeners() {
    this._dom.clearBtn.addEventListener(
      'click',
      this._clearBtnEventListenerObject.handleClearBtnClick
    );
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
      this._dom.clearBtn.classList.add('apply-control__clear-btn_hidden');
    } else {
      this._dom.clearBtn.classList.remove('apply-control__clear-btn_hidden');
    }
  }

  protected _bindApplyBtnListeners() {
    this._dom.applyBtn.addEventListener(
      'click',
      this._applyBtnEventListenerObject.handleApplyBtnClick
    );
  }
  protected _applyBtnEventListenerObject = {
    handleApplyBtnClick: (event: MouseEvent) => {
      this.component.close();
    },
  };

  protected _init() {
    this._updateClearBtnDisplay();
  }
}

const iqListWithApplyOpeningMethod = iqLists.filter((iqList) =>
  iqList.element.classList.contains('form-dropdown__item-quantity-list_opening-method_applied')
);

const iqListApplyOpeningMethodModifier = iqListWithApplyOpeningMethod.map(
  (iqList) => new IQListApplyOpeningMethodModifier(iqList)
);
