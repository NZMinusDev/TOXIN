import { Direction } from './types';

/**
 * Cross-browsers(be aware of https://bugs.webkit.org/show_bug.cgi?id=5991 and use document.body instead of document.documentElement for old browsers only) extended scrollTo
 */
const scrollTo = (
  element: HTMLElement,
  pageX: number | Direction.Left | Direction.Right,
  pageY: number | Direction.Up | Direction.Down
) => {
  const elementRef = element;

  if (typeof pageX === 'number') {
    elementRef.scrollLeft = pageX;
  } else {
    switch (pageX) {
      case Direction.Left: {
        elementRef.scrollLeft = 0;

        break;
      }
      case Direction.Right: {
        elementRef.scrollLeft = Infinity;

        break;
      }

      // no default
    }
  }

  if (typeof pageY === 'number') {
    elementRef.scrollTop = pageY;
  } else {
    switch (pageY) {
      case Direction.Up: {
        elementRef.scrollTop = 0;

        break;
      }
      case Direction.Down: {
        elementRef.scrollTop = Infinity;

        break;
      }

      // no default
    }
  }
};

export { scrollTo as default };
