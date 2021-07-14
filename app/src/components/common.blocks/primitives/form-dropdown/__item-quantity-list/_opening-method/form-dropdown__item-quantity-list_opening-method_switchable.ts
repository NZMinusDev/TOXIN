import FormDropdownItemQuantityListOpeningMethodModifier, {
  FormDropdownItemQuantityList,
} from './coupling';
import formDropdownItemQuantityLists from '../form-dropdown__item-quantity-list';

class FormDropdownItemQuantityListSwitchableOpeningMethodModifier extends FormDropdownItemQuantityListOpeningMethodModifier {
  constructor(formDropdownItemQuantityList: FormDropdownItemQuantityList) {
    super(formDropdownItemQuantityList);

    this._bindComponentListeners();
  }

  protected _bindComponentListeners() {
    this.component.addEventListener('open', this._componentEventListenerObject.handleComponentOpen);

    return this;
  }
  protected _componentEventListenerObject = {
    handleComponentOpen: () => {
      this.component.toggle();
    },
  };
}

const formDropdownItemQuantityListSwitchableOpeningMethodModifiers = formDropdownItemQuantityLists
  .filter((formDropdownItemQuantityList) =>
    formDropdownItemQuantityList.element.classList.contains(
      'form-dropdown__item-quantity-list_opening-method_switchable'
    )
  )
  .map(
    (formDropdownItemQuantityList) =>
      new FormDropdownItemQuantityListSwitchableOpeningMethodModifier(formDropdownItemQuantityList)
  );

export { formDropdownItemQuantityListSwitchableOpeningMethodModifiers as default };
