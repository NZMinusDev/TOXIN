import {
  BEMComponent,
  HTMLElementWithComponent,
} from '@utils/devTools/scripts/ComponentCreationHelper';

import formTextFieldElements, { FormTextFieldElement } from './form-text-field-elements';

// eslint-disable-next-line @typescript-eslint/ban-types
type FormTextFieldCustomEvents = {};

class FormTextField extends BEMComponent<FormTextFieldElement, FormTextFieldCustomEvents> {
  // eslint-disable-next-line no-useless-constructor
  constructor(formTextFieldElement: FormTextFieldElement) {
    super(formTextFieldElement);
  }
}

type FormTextFieldElementWithComponent = HTMLElementWithComponent<
  FormTextFieldElement,
  FormTextFieldCustomEvents,
  FormTextField
>;

const formTextFields = Array.from(
  formTextFieldElements,
  (formTextFieldElement) => new FormTextField(formTextFieldElement)
);

export type { FormTextFieldCustomEvents, FormTextField, FormTextFieldElementWithComponent };

export { formTextFields as default };
