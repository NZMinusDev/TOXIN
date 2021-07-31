import {
  BEMComponent,
  HTMLElementWithComponent,
} from '@utils/devTools/scripts/ComponentCreationHelper';

import clickJackingProtectorElements, {
  ClickJackingProtectorElement,
} from './click-jacking-protector-elements';

// eslint-disable-next-line @typescript-eslint/ban-types
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
    if (window.top.document.domain === document.domain) {
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
  (clickJackingProtectorElement) => new ClickJackingProtector(clickJackingProtectorElement)
);

export type {
  ClickJackingProtectorCustomEvents,
  ClickJackingProtector,
  ClickJackingProtectorElementWithComponent,
};

export { clickJackingProtectors as default };
