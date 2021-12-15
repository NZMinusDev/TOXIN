const getWindowSizes = () => ({
  // window doesn't take into account scrollbar
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight,
});

export { getWindowSizes as default };
