import {
  BEMComponent,
  HTMLElementWithComponent,
} from '@utils/devTools/scripts/ComponentCreationHelper';

import navBarElements, { NavBarElement } from './nav-bar-elements';

// eslint-disable-next-line @typescript-eslint/ban-types
type NavBarCustomEvents = {};

class NavBar extends BEMComponent<NavBarElement, NavBarCustomEvents> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(navBarElement: NavBarElement) {
    super(navBarElement);
  }
}

type NavBarElementWithComponent = HTMLElementWithComponent<
  NavBarElement,
  NavBarCustomEvents,
  NavBar
>;

const navBars = Array.from(navBarElements, (navBarElement) => new NavBar(navBarElement));

export type { NavBarCustomEvents, NavBar, NavBarElementWithComponent };

export { navBars as default };
