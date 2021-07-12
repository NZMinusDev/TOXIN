import inputMask from 'inputmask';

import FormTextFieldInputTypeModifier from './coupling';
import formTextFieldInputs, { FormTextFieldInput } from '../form-text-field__input';

class FormTextFieldInputWithDateTypeModifier extends FormTextFieldInputTypeModifier {
  constructor(formTextFieldInput: FormTextFieldInput) {
    super(formTextFieldInput);

    this._initInputMask();

    this._bindFormTextFieldInputListeners();
  }

  protected _initInputMask() {
    inputMask('datetime', {
      inputFormat: 'dd.mm.yyyy',
      placeholder: this.component.getOptions().placeholder,
      autoUnmask: true,
      showMaskOnHover: false,
    }).mask(this.component.element);

    return this;
  }

  protected _bindFormTextFieldInputListeners() {
    return this;
  }

  protected _FormTextFieldInputEventListenerObject = {};
}

const formTextFieldInputWithDateTypeModifiers = formTextFieldInputs
  .filter((formTextFieldInput) =>
    formTextFieldInput.element.classList.contains('form-text-field__input_type_with-date')
  )
  .map((formTextFieldInput) => new FormTextFieldInputWithDateTypeModifier(formTextFieldInput));

export { formTextFieldInputWithDateTypeModifiers as default };
