const clickJackingProtectorElement = document.querySelector(
  '.click-jacking-protector'
) as HTMLDivElement;

if (window.top.document.domain === document.domain) {
  clickJackingProtectorElement.remove();
}
