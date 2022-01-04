import BEMComponent, {
  HTMLElementWithComponent,
} from '@shared/utils/scripts/components/BEM/BEMComponent';

import clickJackingProtectorElements, {
  ClickJackingProtectorElement,
} from './click-jacking-protector-elements';
import './click-jacking-protector.scss';

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
