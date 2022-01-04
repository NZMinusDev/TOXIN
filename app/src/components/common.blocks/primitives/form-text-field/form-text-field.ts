import BEMComponent, {
  HTMLElementWithComponent,
} from '@shared/utils/scripts/components/BEM/BEMComponent';
import '@common.blocks/primitives/heading/heading';
import '@common.blocks/primitives/icon/icon';

import './__input/form-text-field__input';
import formTextFieldElements, {
  FormTextFieldElement,
} from './form-text-field-elements';
import './form-text-field.scss';

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
