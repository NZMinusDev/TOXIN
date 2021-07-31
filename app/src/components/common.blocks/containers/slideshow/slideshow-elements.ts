type SlideshowElement = HTMLDivElement;

const slideshowElements = document.querySelectorAll<SlideshowElement>('.js-slideshow');

export { slideshowElements as default, SlideshowElement };
