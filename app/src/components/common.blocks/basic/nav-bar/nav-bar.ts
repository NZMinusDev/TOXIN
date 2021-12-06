import BEMComponent, {
  HTMLElementWithComponent,
} from '@shared/utils/scripts/components/BEM/BEMComponent';

import navBarElements, { NavBarElement } from './nav-bar-elements';

type NavBarCustomEvents = {};

class NavBar extends BEMComponent<NavBarElement, NavBarCustomEvents> {}

type NavBarElementWithComponent = HTMLElementWithComponent<
  NavBarElement,
  NavBarCustomEvents,
  NavBar
>;

const navBars = Array.from(
  navBarElements,
  (navBarElement) => new NavBar(navBarElement)
);

export type { NavBarCustomEvents, NavBar, NavBarElementWithComponent };

export { navBars as default };
