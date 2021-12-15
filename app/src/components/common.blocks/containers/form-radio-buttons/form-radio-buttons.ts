import BEMComponent, {
  HTMLElementWithComponent,
} from '@shared/utils/scripts/components/BEM/BEMComponent';
import { addURLValues } from '@shared/utils/scripts/URL';

import formRadioButtonsElements, {
  FormRadioButtonsElement,
} from './form-radio-buttons-elements';

type FormRadioButtonsDOM = {
  fieldset: HTMLFieldSetElement;
  buttonItems: HTMLInputElement[];
};

type FormRadioButtonsHTMLOptions = {
  isFilter: boolean;
};

type FormRadioButtonsCustomEvents = {};

class FormRadioButtons extends BEMComponent<
  FormRadioButtonsElement,
  FormRadioButtonsCustomEvents
> {
  protected readonly _DOM: Readonly<FormRadioButtonsDOM>;

  protected readonly _options: FormRadioButtonsHTMLOptions;

  constructor(formRadioButtonsElement: FormRadioButtonsElement) {
    super(formRadioButtonsElement);

    this._DOM = this._initDOM();

    this._options = this._initOptionsFromHTML();

    this._bindButtonItemsListeners();
  }

  protected _initDOM() {
    const fieldset = this.element.querySelector(
      '.js-form-radio-buttons__fieldset'
    ) as FormRadioButtonsDOM['fieldset'];
    const buttonItems = [
      ...fieldset.elements,
    ] as FormRadioButtonsDOM['buttonItems'];

    return { fieldset, buttonItems };
  }

  protected _initOptionsFromHTML() {
    const isFilter = this._DOM.fieldset.dataset.isFilter !== undefined;

    return { isFilter };
  }

  protected _bindButtonItemsListeners() {
    const { buttonItems } = this._DOM;

    buttonItems.forEach((buttonItem) => {
      buttonItem.addEventListener(
        'change',
        this._buttonItemsEventListenerObject.handleButtonItemChange
      );
    });

    return this;
  }

  protected _buttonItemsEventListenerObject = {
    handleButtonItemChange: (event: Event) => {
      const { currentTarget } = event;

      if (currentTarget instanceof HTMLInputElement && this._options.isFilter) {
        addURLValues({ name: currentTarget.name, value: currentTarget.value });
      }
    },
  };
}

type FormRadioButtonsElementWithComponent = HTMLElementWithComponent<
  FormRadioButtonsElement,
  FormRadioButtonsCustomEvents,
  FormRadioButtons
>;

const formRadioButtonss = Array.from(
  formRadioButtonsElements,
  (formRadioButtonsElement) => new FormRadioButtons(formRadioButtonsElement)
);

export type {
  FormRadioButtonsCustomEvents,
  FormRadioButtons,
  FormRadioButtonsElementWithComponent,
};

export { formRadioButtonss as default };
