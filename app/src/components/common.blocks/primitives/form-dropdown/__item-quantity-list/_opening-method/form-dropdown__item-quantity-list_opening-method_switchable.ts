import formDropdownItemQuantityLists from '../form-dropdown__item-quantity-list';
import FormDropdownItemQuantityListOpeningMethodModifier, {
  FormDropdownItemQuantityList,
} from './coupling';

class FormDropdownItemQuantityListSwitchableOpeningMethodModifier extends FormDropdownItemQuantityListOpeningMethodModifier {
  protected _state: { wasOpened: boolean };

  constructor(formDropdownItemQuantityList: FormDropdownItemQuantityList) {
    super(formDropdownItemQuantityList);

    this._state = this._initState();

    this._bindComponentListeners();
  }

  protected _initState() {
    const wasOpened = this.component.isOpen();

    return { wasOpened };
  }

  protected _bindComponentListeners() {
    this.component.addCustomEventListener(
      'open',
      this._componentEventListenerObject.handleComponentOpen
    );

    return this;
  }
  protected _componentEventListenerObject = {
    handleComponentOpen: () => {
      const { wasOpened } = this._state;

      if (wasOpened) {
        this.component.close();
      }

      this._state.wasOpened = this.component.isOpen();
    },
  };
}

const formDropdownItemQuantityListSwitchableOpeningMethodModifiers = formDropdownItemQuantityLists
  .filter((formDropdownItemQuantityList) =>
    formDropdownItemQuantityList.element.classList.contains(
      'js-form-dropdown__item-quantity-list_opening-method_switchable'
    )
  )
  .map(
    (formDropdownItemQuantityList) =>
      new FormDropdownItemQuantityListSwitchableOpeningMethodModifier(formDropdownItemQuantityList)
  );

export { formDropdownItemQuantityListSwitchableOpeningMethodModifiers as default };
