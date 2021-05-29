const arrowToTop = document.querySelector('.arrow-to-top');
if (arrowToTop) {
  const onClick = () => {
    window.scrollTo(window.pageXOffset, 0);
  };

  const onScroll = () => {
    (arrowToTop as HTMLElement).hidden = window.pageYOffset < document.documentElement.clientHeight;
  };

  (arrowToTop as HTMLElement).addEventListener('click', onClick);

  window.addEventListener('scroll', onScroll);
}
