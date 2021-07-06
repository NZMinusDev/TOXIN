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
    this._bindPluginListeners();
    this._bindClearBtnListeners();
    this._bindApplyBtnListeners();

    this._init();
  }

  protected _initDOM(): IQListApplyOpeningMethodDOM {
    return {
      clearBtn: this.plugin.element.querySelector(
        '.apply-control__clear-btn'
      ) as IQListApplyOpeningMethodDOM['clearBtn'],
      applyBtn: this.plugin.element.querySelector(
        '.apply-control__apply-btn'
      ) as IQListApplyOpeningMethodDOM['applyBtn'],
    };
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

  protected _bindPluginListeners() {
    this.plugin.element.addEventListener(
      'select',
      this._pluginEventListenerObject.handlePluginSelect
    );
  }
  protected _pluginEventListenerObject = {
    handlePluginSelect: () => {
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
      this.plugin.reset();
      this._updateClearBtnDisplay();
    },
  };

  protected _updateClearBtnDisplay() {
    const total = this.plugin.getTotalAmount();

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
      this.plugin.close();
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
