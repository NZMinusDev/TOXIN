import BEMComponent, {
  HTMLElementWithComponent,
} from '@utils/devTools/scripts/view/BEM/BEMComponent';
import { Unpacked } from '@utils/devTools/scripts/TypingHelper';

import formRateButtonElements, {
  FormRateButtonElement,
} from './form-rate-button-elements';

type FormRateButtonDOM = {
  fieldset: HTMLFieldSetElement;
  buttonItems: HTMLInputElement[];
  icons: HTMLLabelElement[];
};

type FormRateButtonCustomEvents = {};

class FormRateButton extends BEMComponent<
  FormRateButtonElement,
  FormRateButtonCustomEvents
> {
  protected readonly _DOM: Readonly<FormRateButtonDOM>;

  constructor(formRateButtonElement: FormRateButtonElement) {
    super(formRateButtonElement);

    this._DOM = this._initDOM();

    this._bindIconsListeners();
  }

  protected _initDOM() {
    const fieldset = this.element.querySelector(
      '.js-form-rate-button__rating'
    ) as FormRateButtonDOM['fieldset'];
    const buttonItems = [
      ...fieldset.elements,
    ] as FormRateButtonDOM['buttonItems'];
    const icons = buttonItems.map(
      (button) => button.nextElementSibling
    ) as FormRateButtonDOM['icons'];

    return { fieldset, buttonItems, icons };
  }

  protected _bindIconsListeners() {
    const { icons } = this._DOM;

    icons.forEach((icon) => {
      icon.addEventListener(
        'keydown',
        this._iconsEventListenerObject.handleIconKeyDown
      );
    });

    return this;
  }

  protected _iconsEventListenerObject = {
    handleIconKeyDown: (event: KeyboardEvent) => {
      const currentTarget = event.currentTarget as Unpacked<
        FormRateButtonDOM['icons']
      >;

      if (!event.repeat && event.code === 'Enter') {
        currentTarget.click();
      }
    },
  };
}

type FormRateButtonElementWithComponent = HTMLElementWithComponent<
  FormRateButtonElement,
  FormRateButtonCustomEvents,
  FormRateButton
>;

const formRateButtons = Array.from(
  formRateButtonElements,
  (formRateButtonElement) => new FormRateButton(formRateButtonElement)
);

export type {
  FormRateButtonCustomEvents,
  FormRateButton,
  FormRateButtonElementWithComponent,
};

export { formRateButtons as default };
