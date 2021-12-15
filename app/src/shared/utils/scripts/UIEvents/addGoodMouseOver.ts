/**
 * `mouseenter` / `mouseleave` emulation with bubbling
 */
const addGoodMouseOver = (
  parent: HTMLElement,
  childSelector: string,
  {
    onmouseoverCallBack,
    onmouseoutCallBack,
  }: { onmouseoverCallBack?: () => void; onmouseoutCallBack?: () => void } = {}
) => {
  let currentElem: Element | null = null;

  const onMouseOver = (event: MouseEvent) => {
    if (currentElem !== null) {
      return;
    }

    const { currentTarget, target } = event;

    if (currentTarget instanceof HTMLElement && target instanceof HTMLElement) {
      const child = target.closest(childSelector);

      if (child === null || !currentTarget.contains(child)) {
        return;
      }

      currentElem = child;
    }

    onmouseoverCallBack?.();
  };

  const onMouseOut = (event: MouseEvent) => {
    if (currentElem === null) {
      return;
    }

    let { relatedTarget } = event;

    while (relatedTarget) {
      if (relatedTarget === currentElem) {
        return;
      }

      if (relatedTarget instanceof HTMLElement) {
        relatedTarget = relatedTarget.parentNode;
      }
    }

    currentElem = null;

    onmouseoutCallBack?.();
  };

  parent.addEventListener('mouseover', onMouseOver);
  parent.addEventListener('mouseout', onMouseOut);
};

export { addGoodMouseOver as default };
