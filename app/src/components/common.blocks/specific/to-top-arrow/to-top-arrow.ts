import BEMComponent, {
  HTMLElementWithComponent,
} from '@shared/utils/scripts/view/BEM/BEMComponent';

import toTopArrowElements, { ToTopArrowElement } from './to-top-arrow-elements';

type ToTopArrowCustomEvents = {};

class ToTopArrow extends BEMComponent<
  ToTopArrowElement,
  ToTopArrowCustomEvents
> {
  constructor(toTopArrowElement: ToTopArrowElement) {
    super(toTopArrowElement);

    this._bindWindowListeners()._bindListeners();
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
      this.element.hidden =
        window.pageYOffset < document.documentElement.clientHeight;
    },
  };

  protected _bindListeners() {
    this.element.addEventListener('click', this.onClick);

    return this;
  }

  onClick = () => {
    window.scrollTo(window.pageXOffset, 0);
  };
}

type ToTopArrowElementWithComponent = HTMLElementWithComponent<
  ToTopArrowElement,
  ToTopArrowCustomEvents,
  ToTopArrow
>;

const toTopArrows = Array.from(
  toTopArrowElements,
  (toTopArrowElement) => new ToTopArrow(toTopArrowElement)
);

export type {
  ToTopArrowCustomEvents,
  ToTopArrow,
  ToTopArrowElementWithComponent,
};

export { toTopArrows as default };
