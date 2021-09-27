import BEMComponent, {
  HTMLElementWithComponent,
} from '@utils/devTools/scripts/view/BEM/BEMComponent';

import clickJackingProtectorElements, {
  ClickJackingProtectorElement,
} from './click-jacking-protector-elements';

type ClickJackingProtectorCustomEvents = {};

class ClickJackingProtector extends BEMComponent<
  ClickJackingProtectorElement,
  ClickJackingProtectorCustomEvents
> {
  constructor(clickJackingProtectorElement: ClickJackingProtectorElement) {
    super(clickJackingProtectorElement);

    this._initDisplay();
  }

  protected _initDisplay() {
    if (window.top?.document.domain === document.domain) {
      this.element.remove();
    }

    return this;
  }
}

type ClickJackingProtectorElementWithComponent = HTMLElementWithComponent<
  ClickJackingProtectorElement,
  ClickJackingProtectorCustomEvents,
  ClickJackingProtector
>;

const clickJackingProtectors = Array.from(
  clickJackingProtectorElements,
  (clickJackingProtectorElement) =>
    new ClickJackingProtector(clickJackingProtectorElement)
);

export type {
  ClickJackingProtectorCustomEvents,
  ClickJackingProtector,
  ClickJackingProtectorElementWithComponent,
};

export { clickJackingProtectors as default };
