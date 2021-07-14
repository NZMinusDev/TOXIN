import {
  BEMComponent,
  HTMLElementWithComponent,
} from '@utils/devTools/scripts/ComponentCreationHelper';

type ToTopArrowElement = HTMLDivElement;

// eslint-disable-next-line @typescript-eslint/ban-types
type ToTopArrowCustomEvents = {};

class ToTopArrow extends BEMComponent<ToTopArrowElement, ToTopArrowCustomEvents> {
  constructor(toTopArrowElement: ToTopArrowElement) {
    super(toTopArrowElement);

    this._bindWindowListeners()._bindListeners();
  }

  protected _bindWindowListeners() {
    window.addEventListener('scroll', this._windowEventListenerObject.onScroll);

    return this;
  }
  protected _windowEventListenerObject = {
    onScroll: () => {
      this.element.hidden = window.pageYOffset < document.documentElement.clientHeight;
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

const toTopArrows = [new ToTopArrow(document.querySelector('.to-top-arrow') as ToTopArrowElement)];

export type { ToTopArrowCustomEvents, ToTopArrow, ToTopArrowElementWithComponent };

export { toTopArrows as default };
