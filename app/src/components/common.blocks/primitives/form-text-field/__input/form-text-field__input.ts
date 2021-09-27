import BEMComponent, {
  HTMLElementWithComponent,
} from '@utils/devTools/scripts/view/BEM/BEMComponent';

import formTextFieldElements from '../form-text-field-elements';

type FormTextFieldInputElement = HTMLInputElement;

type FormTextFieldInputHTMLOptions = { placeholder: string };

type FormTextFieldInputCustomEvents = {};

class FormTextFieldInput extends BEMComponent<
  FormTextFieldInputElement,
  FormTextFieldInputCustomEvents
> {
  protected readonly _options: FormTextFieldInputHTMLOptions;

  constructor(formTextFieldInputElement: FormTextFieldInputElement) {
    super(formTextFieldInputElement);

    this._options = this._initOptionsFromHTML();
  }

  getOptions() {
    return { ...this._options };
  }

  protected _initOptionsFromHTML() {
    const { placeholder } = this.element;

    return { placeholder };
  }
}

type FormTextFieldInputElementWithComponent = HTMLElementWithComponent<
  FormTextFieldInputElement,
  FormTextFieldInputCustomEvents,
  FormTextFieldInput
>;

const formTextFieldInputs = Array.from(
  formTextFieldElements,
  (formTextFieldElement) =>
    new FormTextFieldInput(
      formTextFieldElement.querySelector(
        '.js-form-text-field__input'
      ) as FormTextFieldInputElement
    )
);

export type {
  FormTextFieldInputCustomEvents,
  FormTextFieldInput,
  FormTextFieldInputElementWithComponent,
};

export { formTextFieldInputs as default };
