const EVENTS = [
  'fullscreenchange',
  'fullscreenerror',
  'abort',
  'animationcancel',
  'animationend',
  'animationiteration',
  'animationstart',
  'auxclick',
  'beforeinput',
  'blur',
  'cancel',
  'canplay',
  'canplaythrough',
  'change',
  'click',
  'close',
  'compositionend',
  'compositionstart',
  'compositionupdate',
  'contextmenu',
  'cuechange',
  'dblclick',
  'drag',
  'dragend',
  'dragenter',
  'dragexit',
  'dragleave',
  'dragover',
  'dragstart',
  'drop',
  'durationchange',
  'emptied',
  'ended',
  'error',
  'focus',
  'focusin',
  'focusout',
  'gotpointercapture',
  'input',
  'invalid',
  'keydown',
  'keypress',
  'keyup',
  'load',
  'loadeddata',
  'loadedmetadata',
  'loadstart',
  'lostpointercapture',
  'mousedown',
  'mouseenter',
  'mouseleave',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'pause',
  'play',
  'playing',
  'pointercancel',
  'pointerdown',
  'pointerenter',
  'pointerleave',
  'pointermove',
  'pointerout',
  'pointerover',
  'pointerup',
  'progress',
  'ratechange',
  'reset',
  'resize',
  'scroll',
  'securitypolicyviolation',
  'seeked',
  'seeking',
  'select',
  'selectionchange',
  'selectstart',
  'stalled',
  'submit',
  'suspend',
  'timeupdate',
  'toggle',
  'touchcancel',
  'touchend',
  'touchmove',
  'touchstart',
  'transitioncancel',
  'transitionend',
  'transitionrun',
  'transitionstart',
  'volumechange',
  'waiting',
  'wheel',
  'copy',
  'cut',
  'paste',
];

/**
 * `mouseenter` / `mouseleave` emulation with bubbling
 */
const addGoodMouseOver = (
  parent: HTMLElement,
  childSelector: string,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  { onmouseoverCallBack = () => {}, onmouseoutCallBack = () => {} } = {}
) => {
  let currentElem: Element | null = null;

  const onMouseOver = (event: MouseEvent) => {
    if (currentElem) return;

    const target = (event.target as HTMLElement).closest(childSelector);

    if (!target) return;

    if (!(event.currentTarget as HTMLElement).contains(target)) return;

    currentElem = target;

    onmouseoverCallBack();
  };

  const onMouseOut = (event: MouseEvent) => {
    if (!currentElem) return;

    let { relatedTarget } = event;

    // eslint-disable-next-line no-loops/no-loops
    while (relatedTarget) {
      if (relatedTarget === currentElem) return;

      relatedTarget = (relatedTarget as HTMLElement).parentNode;
    }

    currentElem = null;

    onmouseoutCallBack();
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
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    enterDroppable = (currentDroppable: HTMLElement) => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    leaveDroppable = (currentDroppable: HTMLElement) => {},
  } = {}
) => {
  const onMouseDown = (event) => {
    const shiftX = event.clientX - element.getBoundingClientRect().left;
    const shiftY = event.clientY - element.getBoundingClientRect().top;

    // eslint-disable-next-line no-param-reassign
    element.style.position = 'absolute';
    // eslint-disable-next-line no-param-reassign
    element.style.zIndex = '1000';
    document.body.append(element);

    const moveAt = (pageX, pageY) => {
      // eslint-disable-next-line no-param-reassign
      element.style.left = `${pageX - shiftX}px`;
      // eslint-disable-next-line no-param-reassign
      element.style.top = `${pageY - shiftY}px`;
    };

    moveAt(event.pageX, event.pageY);

    // потенциальная цель переноса, над которой мы пролетаем прямо сейчас
    let currentDroppable: HTMLElement | null = null;

    // eslint-disable-next-line no-shadow
    const onMouseMove = (event) => {
      moveAt(event.pageX, event.pageY);

      // eslint-disable-next-line no-param-reassign
      element.hidden = true;
      const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      // eslint-disable-next-line no-param-reassign
      element.hidden = false;

      if (!elemBelow) return;

      const droppableBelow = elemBelow.closest(droppableSelector);

      if (currentDroppable !== droppableBelow) {
        if (currentDroppable) {
          leaveDroppable(currentDroppable);
        }

        currentDroppable = droppableBelow as HTMLElement;
        if (currentDroppable) {
          enterDroppable(currentDroppable);
        }
      }
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      element.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseup', onMouseUp);
  };

  element.addEventListener('mousedown', onMouseDown);

  const onDragStart = () => false;

  element.addEventListener('dragstart', onDragStart);

  // eslint-disable-next-line no-param-reassign
  element.style.touchAction = 'none';
};

export { EVENTS, addGoodMouseOver, addDragAndDrop };
