import BEMComponent, {
  HTMLElementWithComponent,
} from '@shared/utils/scripts/components/BEM/BEMComponent';

import slideshowElements from '../slideshow-elements';

type SlideshowPictureElement = HTMLDivElement;

type SlideshowPictureCustomEvents = {};

class SlideshowPicture extends BEMComponent<
  SlideshowPictureElement,
  SlideshowPictureCustomEvents
> {
  constructor(slideshowPictureElement: SlideshowPictureElement) {
    super(slideshowPictureElement);

    this._initDisplay();
  }

  protected _initDisplay() {
    this._addPreloadStopTransition();

    return this;
  }

  protected _addPreloadStopTransition() {
    const transitionDuration = 2000;

    this.element.classList.add('slideshow__picture_transition_none');
    setTimeout(() => {
      this.element.classList.remove('slideshow__picture_transition_none');
    }, transitionDuration);
  }
}

type SlideshowPictureElementWithComponent = HTMLElementWithComponent<
  SlideshowPictureElement,
  SlideshowPictureCustomEvents,
  SlideshowPicture
>;

const slideshowPictures = Array.from(slideshowElements, (slideshowElement) =>
  Array.from(
    slideshowElement.querySelectorAll<SlideshowPictureElement>(
      '.js-slideshow__picture'
    ),
    (slideshowPictureElement) => new SlideshowPicture(slideshowPictureElement)
  )
).flat();

export type {
  SlideshowPictureCustomEvents,
  SlideshowPicture,
  SlideshowPictureElementWithComponent,
};

export { slideshowPictures as default };
