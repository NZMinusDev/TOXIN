const hasAll = (
  elements: NodeListOf<Element> | HTMLCollection | Element[],
  contained: string | Element
) => {
  const copiedElements = [...elements];
  let descendants: Element[] = [];

  if (typeof contained === 'string') {
    descendants = copiedElements.filter((element) =>
      element.querySelector(contained)
    );
  } else {
    descendants = copiedElements.filter((element) =>
      element.contains(contained)
    );
  }

  return descendants;
};

export { hasAll as default };
