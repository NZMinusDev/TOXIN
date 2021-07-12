import {
  BEMComponent,
  HTMLElementWithComponent,
} from '@utils/devTools/scripts/ComponentCreationHelper';

type FormTextFieldElement = HTMLDivElement;

// eslint-disable-next-line @typescript-eslint/ban-types
type FormTextFieldDOM = {};

// eslint-disable-next-line @typescript-eslint/ban-types
type FormTextFieldHTMLOptions = {};

type FormTextFieldCustomEvents = '';

class FormTextField extends BEMComponent<FormTextFieldElement, FormTextFieldCustomEvents> {
  protected readonly _DOM: Readonly<FormTextFieldDOM>;

  protected _options: FormTextFieldHTMLOptions;

  constructor(formTextFieldElement: FormTextFieldElement) {
    super(formTextFieldElement);

    this._DOM = this._initDOM();

    this._options = this._initOptionsFromHTML();

    this._bindListeners();

    this._initDisplay();
  }

  // eslint-disable-next-line class-methods-use-this
  protected _initDOM() {
    return {};
  }

  // eslint-disable-next-line class-methods-use-this
  protected _initOptionsFromHTML() {
    return {};
  }

  protected _bindListeners() {
    return this;
  }

  protected _initDisplay() {
    return this;
  }
}

type FormTextFieldElementWithComponent = HTMLElementWithComponent<
  FormTextFieldElement,
  FormTextFieldCustomEvents,
  FormTextField
>;

const formTextFields = Array.from(
  document.querySelectorAll<FormTextFieldElement>('.form-text-field'),
  (formTextFieldElement) => new FormTextField(formTextFieldElement)
);

export type { FormTextFieldCustomEvents, FormTextField, FormTextFieldElementWithComponent };

export { formTextFields as default };
