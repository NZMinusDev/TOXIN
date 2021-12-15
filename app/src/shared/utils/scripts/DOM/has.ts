const has = (
  elements: NodeListOf<Element> | HTMLCollection | Element[],
  contained: string | Element
): Element | undefined => {
  const copiedElements = [...elements];

  if (typeof contained === 'string') {
    return copiedElements.find((element) => element.querySelector(contained));
  }

  return copiedElements.find((element) => element.contains(contained));
};

export { has as default };
