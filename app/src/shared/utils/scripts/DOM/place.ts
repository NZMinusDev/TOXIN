import getCoordinatesOfAbsoluteElement from './getCoordinatesOfAbsoluteElement';

const place = (element: HTMLElement, { position = 'absolute' } = {}) => {
  const elementRef = element;

  elementRef.style.position = position;

  const coords =
    position === 'absolute'
      ? getCoordinatesOfAbsoluteElement(element)
      : element.getBoundingClientRect();

  elementRef.style.left = `${coords.left}px`;
  elementRef.style.top = `${coords.bottom}px`;
};

export { place as default };
