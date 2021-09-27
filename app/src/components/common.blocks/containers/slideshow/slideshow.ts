import BEMComponent, {
  HTMLElementWithComponent,
} from '@utils/devTools/scripts/view/BEM/BEMComponent';

import slideshowElements, { SlideshowElement } from './slideshow-elements';

type SlideshowCustomEvents = {};

class Slideshow extends BEMComponent<SlideshowElement, SlideshowCustomEvents> {}

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
