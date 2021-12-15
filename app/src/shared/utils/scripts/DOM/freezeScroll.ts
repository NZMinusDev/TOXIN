const freezeScroll = (element: HTMLElement, { shouldFreeze = true } = {}) => {
  const elementRef = element;

  if (shouldFreeze) {
    const clientWidthBeforeFreeze = element.clientWidth;
    elementRef.style.overflow = 'hidden';

    // vanished scrollbar size
    elementRef.style.padding += element.clientWidth - clientWidthBeforeFreeze;
  } else {
    elementRef.style.overflow = '';
  }
};

export { freezeScroll as default };
