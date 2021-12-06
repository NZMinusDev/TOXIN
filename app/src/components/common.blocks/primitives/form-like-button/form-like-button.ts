import BEMComponent, {
  HTMLElementWithComponent,
} from '@shared/utils/scripts/components/BEM/BEMComponent';

import formLikeButtonElements, {
  FormLikeButtonElement,
} from './form-like-button-elements';

type FormLikeButtonDOM = { button: HTMLInputElement; counter: HTMLSpanElement };

type FormLikeButtonState = {
  likes: number;
};

type FormLikeButtonCustomEvents = {};

class FormLikeButton extends BEMComponent<
  FormLikeButtonElement,
  FormLikeButtonCustomEvents
> {
  protected readonly _DOM: Readonly<FormLikeButtonDOM>;

  protected readonly _state: FormLikeButtonState;

  constructor(formLikeButtonElement: FormLikeButtonElement) {
    super(formLikeButtonElement);

    this._DOM = this._initDOM();

    this._state = this._initState();

    this._bindButtonListeners();
  }

  protected _initDOM() {
    const button = this.element.querySelector(
      '.js-form-like-button__button'
    ) as FormLikeButtonDOM['button'];
    const counter = this.element.querySelector(
      '.js-form-like-button__counter'
    ) as FormLikeButtonDOM['counter'];

    return { button, counter };
  }

  protected _initState() {
    const likes = Number(this._DOM.counter.textContent);

    return {
      likes,
    };
  }

  protected _bindButtonListeners() {
    const { button } = this._DOM;

    button.addEventListener(
      'keydown',
      this._buttonEventListenerObject.handleButtonKeyDown
    );
    button.addEventListener(
      'change',
      this._buttonEventListenerObject.handleButtonChange
    );

    return this;
  }

  protected _buttonEventListenerObject = {
    handleButtonKeyDown: (event: KeyboardEvent) => {
      const currentTarget = event.currentTarget as FormLikeButtonDOM['button'];

      if (!event.repeat && event.code === 'Enter') {
        currentTarget.click();
      }
    },
    handleButtonChange: () => {
      const { button, counter } = this._DOM;

      if (button.checked) {
        this._state.likes += 1;
      } else {
        this._state.likes -= 1;
      }

      counter.textContent = `${this._state.likes}`;
    },
  };
}

type FormLikeButtonElementWithComponent = HTMLElementWithComponent<
  FormLikeButtonElement,
  FormLikeButtonCustomEvents,
  FormLikeButton
>;

const formLikeButtons = Array.from(
  formLikeButtonElements,
  (formLikeButtonElement) => new FormLikeButton(formLikeButtonElement)
);

export type {
  FormLikeButtonCustomEvents,
  FormLikeButton,
  FormLikeButtonElementWithComponent,
};

export { formLikeButtons as default };
