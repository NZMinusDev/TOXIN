import BEMComponent, {
  HTMLElementWithComponent,
} from '@shared/utils/scripts/components/BEM/BEMComponent';

import formToggleElements, { FormToggleElement } from './form-toggle-elements';

type FormToggleDOM = {
  button: HTMLInputElement;
};

type FormToggleCustomEvents = {};

class FormToggle extends BEMComponent<
  FormToggleElement,
  FormToggleCustomEvents
> {
  protected readonly _DOM: Readonly<FormToggleDOM>;

  constructor(formToggleElement: FormToggleElement) {
    super(formToggleElement);

    this._DOM = this._initDOM();

    this._bindInputButtonListeners();
  }

  protected _initDOM() {
    const button = this.element.querySelector(
      '.js-form-toggle__button'
    ) as FormToggleDOM['button'];

    return { button };
  }

  protected _bindInputButtonListeners() {
    const { button } = this._DOM;

    button.addEventListener(
      'keydown',
      this._buttonEventListenerObject.handleInputButtonKeyDown
    );

    return this;
  }

  protected _buttonEventListenerObject = {
    handleInputButtonKeyDown: (event: KeyboardEvent) => {
      const currentTarget = event.currentTarget as FormToggleDOM['button'];

      if (!event.repeat && event.code === 'Enter') {
        currentTarget.click();
      }
    },
  };
}

type FormToggleElementWithComponent = HTMLElementWithComponent<
  FormToggleElement,
  FormToggleCustomEvents,
  FormToggle
>;

const formToggles = Array.from(
  formToggleElements,
  (formToggleElement) => new FormToggle(formToggleElement)
);

export type {
  FormToggleCustomEvents,
  FormToggle,
  FormToggleElementWithComponent,
};

export { formToggles as default };
