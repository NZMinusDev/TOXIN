import BEMComponent, {
  HTMLElementWithComponent,
} from '@utils/devTools/scripts/view/BEM/BEMComponent';
import { Unpacked } from '@utils/devTools/scripts/TypingHelper';

import formCheckboxButtonsElements, {
  FormCheckboxButtonsElement,
} from './form-checkbox-buttons-elements';

type FormCheckboxButtonsDOM = {
  fieldset: HTMLFieldSetElement;
  buttonItems: HTMLInputElement[];
};

type FormCheckboxButtonsHTMLOptions = {};

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

    this._initDisplay();
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
    return {};
  }

  protected _bindButtonItemsListeners() {
    const { buttonItems } = this._DOM;

    buttonItems.forEach((buttonItem) => {
      buttonItem.addEventListener(
        'keydown',
        this._buttonItemsEventListenerObject.handleButtonItemKeyDown
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
  };

  protected _initDisplay() {
    return this;
  }
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
