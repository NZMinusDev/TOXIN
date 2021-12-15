/** Cross-browsers document.documentElement.scrollHeight/scrollWidth */
const getDocumentSizes = () => ({
  scrollHeight: Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  ),
  scrollWidth: Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollWidth,
    document.body.offsetHeight,
    document.documentElement.offsetWidth,
    document.body.clientHeight,
    document.documentElement.clientWidth
  ),
});

export { getDocumentSizes as default };
