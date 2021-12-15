/**
 * Cross-browsers(be aware of https://bugs.webkit.org/show_bug.cgi?id=5991 and use document.body instead of document.documentElement for old browsers only) scrollBy
 */
const scrollBy = (element: HTMLElement, x: number, y: number) => {
  const elementRef = element;

  elementRef.scrollLeft += x;
  elementRef.scrollTop += y;
};

export { scrollBy as default };
