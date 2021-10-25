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

    const target = (event.target as HTMLElement).closest(childSelector);

    if (
      target === null ||
      !(event.currentTarget as HTMLElement).contains(target)
    ) {
      return;
    }

    currentElem = target;

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

      relatedTarget = (relatedTarget as HTMLElement).parentNode;
    }

    currentElem = null;

    onmouseoutCallBack?.();
  };

  parent.addEventListener('mouseover', onMouseOver);
  parent.addEventListener('mouseout', onMouseOut);
};

/**
 *
 * @param element - element to make it DragAndDrop
 * @param droppableSelector - selector of the another element where you need have access to place element
 * @param enterDroppable - callback with logic when you enter place of dropping
 * @param leaveDroppable - callback with logic when you leave place of dropping
 * @link https://learn.javascript.ru/mouse-drag-and-drop
 */
const addDragAndDrop = (
  element: HTMLElement,
  {
    droppableSelector = '[data-droppable]',
    enterDroppable,
    leaveDroppable,
  }: {
    droppableSelector?: string;
    enterDroppable?: (currentDroppable: Element) => void;
    leaveDroppable?: (currentDroppable: Element) => void;
  } = {}
) => {
  const elementRef = element;

  const onMouseDown = (event) => {
    const shiftX = event.clientX - elementRef.getBoundingClientRect().left;
    const shiftY = event.clientY - elementRef.getBoundingClientRect().top;

    elementRef.style.position = 'absolute';
    elementRef.style.zIndex = '1000';
    document.body.append(elementRef);

    const moveAt = (pageX, pageY) => {
      elementRef.style.left = `${pageX - shiftX}px`;
      elementRef.style.top = `${pageY - shiftY}px`;
    };

    moveAt(event.pageX, event.pageY);

    // потенциальная цель переноса, над которой мы пролетаем прямо сейчас
    let currentDroppable: Element | null = null;

    const onMouseMove = (mouseMoveEvent) => {
      moveAt(mouseMoveEvent.pageX, mouseMoveEvent.pageY);

      elementRef.hidden = true;
      const elemBelow = document.elementFromPoint(
        mouseMoveEvent.clientX,
        mouseMoveEvent.clientY
      );
      elementRef.hidden = false;

      if (elemBelow === null) {
        return;
      }

      const droppableBelow = elemBelow.closest(droppableSelector);

      if (currentDroppable !== droppableBelow) {
        if (currentDroppable !== null) {
          leaveDroppable?.(currentDroppable);
        }

        currentDroppable = droppableBelow;

        if (currentDroppable !== null) {
          enterDroppable?.(currentDroppable);
        }
      }
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      elementRef.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    elementRef.addEventListener('mouseup', onMouseUp);
  };

  elementRef.addEventListener('mousedown', onMouseDown);

  const onDragStart = () => false;

  elementRef.addEventListener('dragstart', onDragStart);

  elementRef.style.touchAction = 'none';
};

export { addGoodMouseOver, addDragAndDrop };
