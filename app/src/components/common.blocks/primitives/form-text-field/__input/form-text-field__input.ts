import {
  BEMComponent,
  HTMLElementWithComponent,
} from '@utils/devTools/scripts/ComponentCreationHelper';

import formTextFields from '../form-text-field';

type FormTextFieldInputElement = HTMLInputElement;

// eslint-disable-next-line @typescript-eslint/ban-types
type FormTextFieldInputDOM = {};

type FormTextFieldInputHTMLOptions = { placeholder: string };

type FormTextFieldInputCustomEvents = '';

class FormTextFieldInput extends BEMComponent<
  FormTextFieldInputElement,
  FormTextFieldInputCustomEvents
> {
  protected readonly _DOM: Readonly<FormTextFieldInputDOM>;

  protected _options: FormTextFieldInputHTMLOptions;

  constructor(formTextFieldInputElement: FormTextFieldInputElement) {
    super(formTextFieldInputElement);

    this._DOM = this._initDOM();

    this._options = this._initOptionsFromHTML();

    this._bindListeners();

    this._initDisplay();
  }

  getOptions() {
    return { ...this._options };
  }

  // eslint-disable-next-line class-methods-use-this
  protected _initDOM() {
    return {};
  }

  protected _initOptionsFromHTML() {
    const { placeholder } = this.element;

    return { placeholder };
  }

  protected _bindListeners() {
    return this;
  }

  protected _initDisplay() {
    return this;
  }
}

type FormTextFieldInputElementWithComponent = HTMLElementWithComponent<
  FormTextFieldInputElement,
  FormTextFieldInputCustomEvents,
  FormTextFieldInput
>;

const formTextFieldInputs = formTextFields
  .map((formTextField) => {
    const formTextFieldInputElement = formTextField.element.querySelector<
      FormTextFieldInputElement
    >('.form-text-field__input');

    if (formTextFieldInputElement !== null) {
      return new FormTextFieldInput(formTextFieldInputElement);
    }

    return null;
  })
  .filter((formTextFieldInput) => formTextFieldInput !== null) as FormTextFieldInput[];

export type {
  FormTextFieldInputCustomEvents,
  FormTextFieldInput,
  FormTextFieldInputElementWithComponent,
};

export { formTextFieldInputs as default };
