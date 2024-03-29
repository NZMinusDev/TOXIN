import formDropdownItemQuantityLists from '../form-dropdown__item-quantity-list';
import AbstractFormDropdownItemQuantityListOpeningMethodModifier, {
  FormDropdownItemQuantityList,
} from './AbstractFormDropdownItemQuantityListOpeningMethodModifier';

type FormDropdownItemQuantityListAppliedOpeningTypeModifierDOM = {
  clearBtn: HTMLButtonElement;
  applyBtn: HTMLButtonElement;
};

class FormDropdownItemQuantityListAppliedOpeningTypeModifier extends AbstractFormDropdownItemQuantityListOpeningMethodModifier {
  protected readonly _DOM: Readonly<FormDropdownItemQuantityListAppliedOpeningTypeModifierDOM>;

  constructor(formDropdownItemQuantityList: FormDropdownItemQuantityList) {
    super(formDropdownItemQuantityList);

    this._DOM = this._initDOM();

    this._bindClearBtnListeners()
      ._bindApplyBtnListeners()
      ._bindWindowListeners()
      ._bindComponentListeners();

    this._initDisplay();
  }

  protected _initDOM() {
    const applyControl = this.component.element.querySelector(
      '.js-apply-control'
    ) as HTMLDivElement;
    const clearBtn = applyControl.querySelector(
      '.js-apply-control__clear-btn'
    ) as FormDropdownItemQuantityListAppliedOpeningTypeModifierDOM['clearBtn'];
    const applyBtn = applyControl.querySelector(
      '.js-apply-control__apply-btn'
    ) as FormDropdownItemQuantityListAppliedOpeningTypeModifierDOM['applyBtn'];

    return {
      clearBtn,
      applyBtn,
    };
  }

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

  protected _bindApplyBtnListeners() {
    this._DOM.applyBtn.addEventListener(
      'click',
      this._applyBtnEventListenerObject.handleApplyBtnClick
    );

    return this;
  }

  protected _applyBtnEventListenerObject = {
    handleApplyBtnClick: () => {
      this.component.close();
    },
  };

  protected _bindWindowListeners() {
    window.addEventListener(
      'click',
      this._windowEventListenerObject.handleWindowClick
    );

    return this;
  }

  protected _windowEventListenerObject = {
    handleWindowClick: (event: MouseEvent) => {
      const { target } = event;
      const dropdownElement =
        this.component.element.closest('.js-form-dropdown');

      const isElementsDefined =
        target instanceof HTMLElement && dropdownElement !== null;

      if (isElementsDefined) {
        const shouldClose =
          !dropdownElement.contains(target) && this.component.isOpen();

        if (shouldClose) {
          this.component.close();
        }
      }
    },
  };

  protected _bindComponentListeners() {
    this.component.addCustomEventListener(
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

  protected _initDisplay() {
    this._updateClearBtnDisplay();

    return this;
  }

  protected _updateClearBtnDisplay() {
    const total = this.component.getTotalItems();

    if (total === 0) {
      this._DOM.clearBtn.classList.add('apply-control__clear-btn_hidden');
    } else {
      this._DOM.clearBtn.classList.remove('apply-control__clear-btn_hidden');
    }

    return this;
  }
}

const formDropdownItemQuantityListAppliedOpeningTypeModifiers =
  formDropdownItemQuantityLists
    .filter((formDropdownItemQuantityList) =>
      formDropdownItemQuantityList.element.classList.contains(
        'js-form-dropdown__item-quantity-list_opening-method_applied'
      )
    )
    .map(
      (formDropdownItemQuantityList) =>
        new FormDropdownItemQuantityListAppliedOpeningTypeModifier(
          formDropdownItemQuantityList
        )
    );

export { formDropdownItemQuantityListAppliedOpeningTypeModifiers as default };
