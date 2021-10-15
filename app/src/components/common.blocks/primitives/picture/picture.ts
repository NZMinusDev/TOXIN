import BEMComponent, {
  HTMLElementWithComponent,
} from '@utils/devTools/scripts/view/BEM/BEMComponent';

import pictureElements, { PictureElement } from './picture-elements';

type PictureDOM = {
  sources: HTMLSourceElement[];
  img: HTMLImageElement;
};

type PictureHTMLOptions = {
  src: string;
  srcsets: string[];
};
type PictureState = {
  isShown: boolean;
};

type PictureCustomEvents = {};

class Picture extends BEMComponent<PictureElement, PictureCustomEvents> {
  protected readonly _DOM: Readonly<PictureDOM>;

  protected readonly _options: PictureHTMLOptions;

  protected readonly _state: PictureState;

  constructor(pictureElement: PictureElement) {
    super(pictureElement);

    this._DOM = this._initDOM();

    this._options = this._initOptionsFromHTML();
    this._state = Picture._initState();

    this._bindWindowListeners();

    this._initDisplay();
  }

  show() {
    const { sources, img } = this._DOM;

    img.src = this._options.src;
    sources.forEach((source, index) => {
      const theSource = source;

      theSource.srcset = this._options.srcsets[index];
    });

    this._state.isShown = true;

    return this;
  }

  isShown() {
    return this._state.isShown;
  }

  protected _initDOM() {
    const sources = [
      ...this.element.querySelectorAll('.js-picture__source'),
    ] as PictureDOM['sources'];
    const img = this.element.querySelector(
      '.js-picture__img'
    ) as PictureDOM['img'];

    return { sources, img };
  }

  protected _initOptionsFromHTML() {
    const { sources, img } = this._DOM;

    const src = img.dataset.src || '';
    const srcsets = sources.map((source) => source.dataset.srcset || '');

    return { src, srcsets };
  }

  protected static _initState() {
    const isShown = false;

    return { isShown };
  }

  protected _bindWindowListeners() {
    window.addEventListener(
      'scroll',
      this._windowEventListenerObject.handleWindowScroll
    );

    return this;
  }

  protected _windowEventListenerObject = {
    handleWindowScroll: () => {
      if (!this.isShown() && this._isVisible()) {
        this.show();
      }
    },
  };

  protected _initDisplay() {
    if (this._isVisible()) {
      this.show();
    }

    return this;
  }

  protected _isVisible() {
    const coords = this.element.getBoundingClientRect();
    const windowHeight = document.documentElement.clientHeight;

    const topVisible = coords.top > 0 && coords.top < windowHeight;
    const bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

    return topVisible || bottomVisible;
  }
}

type PictureElementWithComponent = HTMLElementWithComponent<
  PictureElement,
  PictureCustomEvents,
  Picture
>;

const pictures = Array.from(
  pictureElements,
  (pictureElement) => new Picture(pictureElement)
);

export type { PictureCustomEvents, Picture, PictureElementWithComponent };

export { pictures as default };
