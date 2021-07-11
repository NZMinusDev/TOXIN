import { BEMComponent } from '@utils/devTools/scripts/ComponentCreationHelper';

type FormLikeButtonElement = HTMLDivElement;

type FormLikeButtonDOM = {
  button: HTMLInputElement;
  counter: HTMLSpanElement;
};

type FormLikeButtonCustomEvents = '';

class FormLikeButton extends BEMComponent<FormLikeButtonElement, FormLikeButtonCustomEvents> {
  protected readonly _DOM: Readonly<FormLikeButtonDOM>;

  protected _likes: number;

  constructor(formLikeButtonElement: FormLikeButtonElement) {
    super(formLikeButtonElement);

    this._DOM = this._initDOM();

    const state = this._initState();
    this._likes = state.likes;

    this._bindButtonListeners();
  }

  protected _initDOM() {
    const button = this.element.querySelector(
      '.form-like-button__button'
    ) as FormLikeButtonDOM['button'];
    const counter = this.element.querySelector(
      '.form-like-button__counter'
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
    this._DOM.button.addEventListener('change', this._buttonEventListenerObject.handleButtonChange);
  }
  protected _buttonEventListenerObject = {
    handleButtonChange: (event: Event) => {
      if (this._DOM.button.checked) {
        this._likes += 1;
      } else {
        this._likes -= 1;
      }

      this._DOM.counter.textContent = `${this._likes}`;
    },
  };
}

const formLikeButtons = Array.from(
  document.querySelectorAll('.form-like-button') as NodeListOf<FormLikeButtonElement>,
  (formLikeButtonElement) => new FormLikeButton(formLikeButtonElement)
);

export { formLikeButtons as default };
