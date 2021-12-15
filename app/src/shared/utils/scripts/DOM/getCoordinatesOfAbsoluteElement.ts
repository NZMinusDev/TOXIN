/**
 * @returns proper css coordinates for position:absolute
 *
 */
const getCoordinatesOfAbsoluteElement = (element: HTMLElement) => {
  const DOMRect = element.getBoundingClientRect();

  return {
    top: DOMRect.top + window.pageYOffset,
    right:
      document.documentElement.clientWidth - DOMRect.right + window.pageYOffset,
    left: DOMRect.left + window.pageXOffset,
    bottom:
      document.documentElement.clientHeight -
      DOMRect.bottom +
      window.pageXOffset,
  };
};

export { getCoordinatesOfAbsoluteElement as default };
