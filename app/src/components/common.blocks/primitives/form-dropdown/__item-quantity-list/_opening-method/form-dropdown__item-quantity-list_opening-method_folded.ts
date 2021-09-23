import formDropdownItemQuantityLists from '../form-dropdown__item-quantity-list';
import FormDropdownItemQuantityListOpeningMethodModifier, {
  FormDropdownItemQuantityList,
} from './coupling';

class FormDropdownItemQuantityListFoldedOpeningMethodModifier extends FormDropdownItemQuantityListOpeningMethodModifier {
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
      const target = event.target as HTMLElement;
      const dropdownElement = this.component.element.closest(
        '.js-form-dropdown'
      ) as HTMLElement;

      if (!dropdownElement.contains(target) && this.component.isOpen()) {
        this.component.close();
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
