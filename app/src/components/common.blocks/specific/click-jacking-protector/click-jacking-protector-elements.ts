type ClickJackingProtectorElement = HTMLDivElement;

const clickJackingProtectorElements = document.querySelectorAll<ClickJackingProtectorElement>(
  '.js-click-jacking-protector'
);

export { clickJackingProtectorElements as default, ClickJackingProtectorElement };
