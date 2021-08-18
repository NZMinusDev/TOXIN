const onKeyDown = (event) => {
  const isActive = !event.repeat && document.activeElement !== null;
  const clickIsEmulated = document.activeElement?.tagName === 'BUTTON';
  const shouldEmulate = !clickIsEmulated && isActive && event.code === 'Enter';

  if (shouldEmulate) {
    (document.activeElement as HTMLElement).click();
  }
};

document.addEventListener('keydown', onKeyDown);
