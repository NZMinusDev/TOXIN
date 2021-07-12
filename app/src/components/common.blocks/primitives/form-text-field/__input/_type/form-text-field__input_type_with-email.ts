import inputMask from 'inputmask';

import FormTextFieldInputTypeModifier from './coupling';
import formTextFieldInputs, { FormTextFieldInput } from '../form-text-field__input';

class FormTextFieldInputWithEmailTypeModifier extends FormTextFieldInputTypeModifier {
  constructor(formTextFieldInput: FormTextFieldInput) {
    super(formTextFieldInput);

    this._initInputMask();

    this._bindFormTextFieldInputListeners();
  }

  protected _initInputMask() {
    inputMask('email', { autoUnmask: true, showMaskOnHover: false }).mask(this.component.element);

    return this;
  }

  protected _bindFormTextFieldInputListeners() {
    return this;
  }
  protected _formTextFieldInputEventListenerObject = {};
}

const formTextFieldInputWithEmailTypeModifiers = formTextFieldInputs
  .filter((formTextFieldInput) =>
    formTextFieldInput.element.classList.contains('form-text-field__input_type_with-email')
  )
  .map((formTextFieldInput) => new FormTextFieldInputWithEmailTypeModifier(formTextFieldInput));

export { formTextFieldInputWithEmailTypeModifiers as default };
