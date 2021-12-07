import BEMComponent, {
  HTMLElementWithComponent,
} from '@shared/utils/scripts/components/BEM/BEMComponent';
import { addURLValues } from '@shared/utils/scripts/URLHelper';

import formTextFieldElements from '../form-text-field-elements';

type FormTextFieldInputElement = HTMLInputElement;

type FormTextFieldInputHTMLOptions = { placeholder: string; isFilter: boolean };

type FormTextFieldInputCustomEvents = {};

class FormTextFieldInput extends BEMComponent<
  FormTextFieldInputElement,
  FormTextFieldInputCustomEvents
> {
  protected readonly _options: FormTextFieldInputHTMLOptions;

  constructor(formTextFieldInputElement: FormTextFieldInputElement) {
    super(formTextFieldInputElement);

    this._options = this._initOptionsFromHTML();

    this._bindListeners();
  }

  getOptions() {
    return { ...this._options };
  }

  protected _initOptionsFromHTML() {
    const { placeholder } = this.element;
    const isFilter = this.element.dataset.isFilter !== undefined;

    return { placeholder, isFilter };
  }

  protected _bindListeners() {
    const { element } = this;

    element.addEventListener('change', this.onChange);

    return this;
  }

  protected onChange = (event: Event) => {
    const { currentTarget } = event;

    if (currentTarget instanceof HTMLInputElement && this._options.isFilter) {
      addURLValues({ name: currentTarget.name, value: currentTarget.value });
    }
  };
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
