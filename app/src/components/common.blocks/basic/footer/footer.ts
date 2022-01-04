import BEMComponent, {
  HTMLElementWithComponent,
} from '@shared/utils/scripts/components/BEM/BEMComponent';
import '@common.blocks/primitives/logo/logo';
import '@common.blocks/primitives/form-text-field/form-text-field';
import '@common.blocks/primitives/icon/icon';

import footerElements, { FooterElement } from './footer-elements';
import './footer.scss';

type FooterDOM = {
  listLabels: HTMLLabelElement[];
};

type FooterCustomEvents = {};

class Footer extends BEMComponent<FooterElement, FooterCustomEvents> {
  protected readonly _DOM: Readonly<FooterDOM>;

  constructor(footerElement: FooterElement) {
    super(footerElement);

    this._DOM = this._initDOM();

    this._bindListLabelsListeners();
  }

  protected _initDOM() {
    const listLabels = [
      ...this.element.querySelectorAll('.js-footer__list-label'),
    ] as FooterDOM['listLabels'];

    return { listLabels };
  }

  protected _bindListLabelsListeners() {
    const { listLabels } = this._DOM;

    listLabels.forEach((listLabel) => {
      listLabel.addEventListener(
        'keydown',
        this._listLabelsEventListenerObject.handleListLabelKeyDown
      );
    });

    return this;
  }

  protected _listLabelsEventListenerObject = {
    handleListLabelKeyDown: (event: KeyboardEvent) => {
      const { currentTarget } = event;

      const shouldClick = !event.repeat && event.code === 'Enter';

      if (currentTarget instanceof HTMLElement && shouldClick) {
        currentTarget?.click();
      }
    },
  };
}

type FooterElementWithComponent = HTMLElementWithComponent<
  FooterElement,
  FooterCustomEvents,
  Footer
>;

const footers = Array.from(
  footerElements,
  (footerElement) => new Footer(footerElement)
);

export type { FooterCustomEvents, Footer, FooterElementWithComponent };

export { footers as default };
