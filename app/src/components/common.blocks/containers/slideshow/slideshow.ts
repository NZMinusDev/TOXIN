import {
  BEMComponent,
  HTMLElementWithComponent,
} from '@utils/devTools/scripts/ComponentCreationHelper';

import slideshowElements, { SlideshowElement } from './slideshow-elements';

// eslint-disable-next-line @typescript-eslint/ban-types
type SlideshowCustomEvents = {};

class Slideshow extends BEMComponent<SlideshowElement, SlideshowCustomEvents> {
  // eslint-disable-next-line no-useless-constructor
  constructor(slideshowElement: SlideshowElement) {
    super(slideshowElement);
  }
}

type SlideshowElementWithComponent = HTMLElementWithComponent<
  SlideshowElement,
  SlideshowCustomEvents,
  Slideshow
>;

const slideshows = Array.from(
  slideshowElements,
  (slideshowElement) => new Slideshow(slideshowElement)
);

export type { SlideshowCustomEvents, Slideshow, SlideshowElementWithComponent };

export { slideshows as default };