import {
  BEMComponent,
  HTMLElementWithComponent,
} from '@utils/devTools/scripts/ComponentCreationHelper';

import navBarElements from '../nav-bar-elements';

type NavBarNavigationItemElement = HTMLLIElement;

// eslint-disable-next-line @typescript-eslint/ban-types
type NavBarNavigationItemCustomEvents = {};

class NavBarNavigationItem extends BEMComponent<
  NavBarNavigationItemElement,
  NavBarNavigationItemCustomEvents
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(navBarNavigationItemElement: NavBarNavigationItemElement) {
    super(navBarNavigationItemElement);
  }
}

type NavBarNavigationItemElementWithComponent = HTMLElementWithComponent<
  NavBarNavigationItemElement,
  NavBarNavigationItemCustomEvents,
  NavBarNavigationItem
>;

const navBarNavigationItems = Array.from(navBarElements, (navBarElement) =>
  Array.from(
    navBarElement.querySelectorAll<NavBarNavigationItemElement>('.js-nav-bar__navigation-item'),
    (navBarNavigationItemElement) => new NavBarNavigationItem(navBarNavigationItemElement)
  )
).flat();

export type {
  NavBarNavigationItemCustomEvents,
  NavBarNavigationItem,
  NavBarNavigationItemElementWithComponent,
};

export { navBarNavigationItems as default };
