import { BEMModifier } from '@utils/devTools/scripts/ComponentCreationHelper';

import { FormTextFieldInput } from '../form-text-field__input';

abstract class FormTextFieldInputTypeModifier extends BEMModifier<FormTextFieldInput> {
  constructor(formTextFieldInput: FormTextFieldInput) {
    super(formTextFieldInput, 'formTextFieldInputTypeModifier');
  }

  protected abstract _initInputMask(): this;
}

export { FormTextFieldInputTypeModifier as default, FormTextFieldInput };
