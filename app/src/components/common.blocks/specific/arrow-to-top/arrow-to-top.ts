const arrowToTop = document.querySelector('.arrow-to-top') as HTMLElement;

const onClick = () => {
  window.scrollTo(window.pageXOffset, 0);
};

const onScroll = () => {
  arrowToTop.hidden = window.pageYOffset < document.documentElement.clientHeight;
};

arrowToTop.addEventListener('click', onClick);
window.addEventListener('scroll', onScroll);
