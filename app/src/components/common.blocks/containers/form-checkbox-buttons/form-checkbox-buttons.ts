import BEMComponent, {
  HTMLElementWithComponent,
} from '@shared/utils/scripts/view/BEM/BEMComponent';
import { Unpacked } from '@shared/utils/scripts/TypingHelper';
import { addURLValues } from '@shared/utils/scripts/URLHelper';

import formCheckboxButtonsElements, {
  FormCheckboxButtonsElement,
} from './form-checkbox-buttons-elements';

type FormCheckboxButtonsDOM = {
  fieldset: HTMLFieldSetElement;
  buttonItems: HTMLInputElement[];
};

type FormCheckboxButtonsHTMLOptions = {
  isFilter: boolean;
};

type FormCheckboxButtonsCustomEvents = {};

class FormCheckboxButtons extends BEMComponent<
  FormCheckboxButtonsElement,
  FormCheckboxButtonsCustomEvents
> {
  protected readonly _DOM: Readonly<FormCheckboxButtonsDOM>;

  protected readonly _options: FormCheckboxButtonsHTMLOptions;

  constructor(formCheckboxButtonsElement: FormCheckboxButtonsElement) {
    super(formCheckboxButtonsElement);

    this._DOM = this._initDOM();

    this._options = this._initOptionsFromHTML();

    this._bindButtonItemsListeners();
  }

  protected _initDOM() {
    const fieldset = this.element.querySelector(
      '.js-form-checkbox-buttons__fieldset'
    ) as FormCheckboxButtonsDOM['fieldset'];
    const buttonItems = [
      ...fieldset.elements,
    ] as FormCheckboxButtonsDOM['buttonItems'];

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
        'keydown',
        this._buttonItemsEventListenerObject.handleButtonItemKeyDown
      );
      buttonItem.addEventListener(
        'change',
        this._buttonItemsEventListenerObject.handleButtonItemChange
      );
    });

    return this;
  }

  protected _buttonItemsEventListenerObject = {
    handleButtonItemKeyDown: (event: KeyboardEvent) => {
      const currentTarget = event.currentTarget as Unpacked<
        FormCheckboxButtonsDOM['buttonItems']
      >;

      if (!event.repeat && event.code === 'Enter') {
        currentTarget.click();
      }
    },
    handleButtonItemChange: (event: Event) => {
      const currentTarget = event.currentTarget as Unpacked<
        FormCheckboxButtonsDOM['buttonItems']
      >;

      if (this._options.isFilter) {
        addURLValues({ name: currentTarget.name, value: currentTarget.value });
      }
    },
  };
}

type FormCheckboxButtonsElementWithComponent = HTMLElementWithComponent<
  FormCheckboxButtonsElement,
  FormCheckboxButtonsCustomEvents,
  FormCheckboxButtons
>;

const formCheckboxButtonss = Array.from(
  formCheckboxButtonsElements,
  (formCheckboxButtonsElement) =>
    new FormCheckboxButtons(formCheckboxButtonsElement)
);

export type {
  FormCheckboxButtonsCustomEvents,
  FormCheckboxButtons,
  FormCheckboxButtonsElementWithComponent,
};

export { formCheckboxButtonss as default };
