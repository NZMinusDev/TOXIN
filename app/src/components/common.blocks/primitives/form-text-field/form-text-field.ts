import BEMComponent, {
  HTMLElementWithComponent,
} from '@shared/utils/scripts/components/BEM/BEMComponent';

import formTextFieldElements, {
  FormTextFieldElement,
} from './form-text-field-elements';

type FormTextFieldCustomEvents = {};

class FormTextField extends BEMComponent<
  FormTextFieldElement,
  FormTextFieldCustomEvents
> {}

type FormTextFieldElementWithComponent = HTMLElementWithComponent<
  FormTextFieldElement,
  FormTextFieldCustomEvents,
  FormTextField
>;

const formTextFields = Array.from(
  formTextFieldElements,
  (formTextFieldElement) => new FormTextField(formTextFieldElement)
);

export type {
  FormTextFieldCustomEvents,
  FormTextField,
  FormTextFieldElementWithComponent,
};

export { formTextFields as default };
