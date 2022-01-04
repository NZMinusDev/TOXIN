import BEMComponent, {
  HTMLElementWithComponent,
} from '@shared/utils/scripts/components/BEM/BEMComponent';
import '@common.blocks/primitives/icon/icon';
import '@common.blocks/primitives/picture/picture';

import './__picture/slideshow__picture';
import slideshowElements, { SlideshowElement } from './slideshow-elements';
import './slideshow.scss';

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
