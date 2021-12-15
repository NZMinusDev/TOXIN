/**
 *
 * @param event - event of handler
 * @param parent - HTMLElement with handlers
 * @param descendantSelector - necessary descendant
 * @returns result of checking
 */
const checkDelegatingEvents = (
  event: Event,
  parent: HTMLElement,
  descendantSelector: string
) => {
  const { target } = event;

  if (target instanceof HTMLElement) {
    const descendant = target.closest(descendantSelector);

    if (descendant === null && !parent.contains(descendant)) {
      return false;
    }
  }

  return true;
};

export { checkDelegatingEvents as default };
