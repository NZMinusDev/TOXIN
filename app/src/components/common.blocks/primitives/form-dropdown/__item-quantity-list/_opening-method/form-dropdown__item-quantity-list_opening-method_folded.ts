import formDropdownItemQuantityLists from '../form-dropdown__item-quantity-list';
import AbstractFormDropdownItemQuantityListOpeningMethodModifier, {
  FormDropdownItemQuantityList,
} from './AbstractFormDropdownItemQuantityListOpeningMethodModifier';

class FormDropdownItemQuantityListFoldedOpeningMethodModifier extends AbstractFormDropdownItemQuantityListOpeningMethodModifier {
  constructor(formDropdownItemQuantityList: FormDropdownItemQuantityList) {
    super(formDropdownItemQuantityList);

    this._bindWindowListeners();
  }

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
}

const formDropdownItemQuantityListFoldedOpeningMethodModifiers =
  formDropdownItemQuantityLists
    .filter((formDropdownItemQuantityList) =>
      formDropdownItemQuantityList.element.classList.contains(
        'js-form-dropdown__item-quantity-list_opening-method_folded'
      )
    )
    .map(
      (formDropdownItemQuantityList) =>
        new FormDropdownItemQuantityListFoldedOpeningMethodModifier(
          formDropdownItemQuantityList
        )
    );

export { formDropdownItemQuantityListFoldedOpeningMethodModifiers as default };
