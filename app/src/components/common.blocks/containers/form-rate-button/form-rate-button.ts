import BEMComponent, {
  HTMLElementWithComponent,
} from '@shared/utils/scripts/components/BEM/BEMComponent';
import '@common.blocks/primitives/heading/heading';

import formRateButtonElements, {
  FormRateButtonElement,
} from './form-rate-button-elements';
import './form-rate-button.scss';

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
      const { currentTarget } = event;

      const shouldClick = !event.repeat && event.code === 'Enter';

      if (currentTarget instanceof HTMLElement && shouldClick) {
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
