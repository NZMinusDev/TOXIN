const setFullHeight = (element: HTMLElement) => {
  const elementRef = element;
  elementRef.style.height = `${element.scrollHeight}px`;
};

export { setFullHeight as default };
