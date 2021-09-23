type NavBarElement = HTMLElement;

const navBarElements = document.querySelectorAll(
  '.js-nav-bar'
) as NodeListOf<NavBarElement>;

export { navBarElements as default, NavBarElement };
