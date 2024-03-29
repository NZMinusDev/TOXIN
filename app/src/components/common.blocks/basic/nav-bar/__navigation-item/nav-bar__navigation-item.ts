import BEMComponent, {
  HTMLElementWithComponent,
} from '@shared/utils/scripts/components/BEM/BEMComponent';

import navBarElements from '../nav-bar-elements';

type NavBarNavigationItemElement = HTMLLIElement;

type NavBarNavigationItemCustomEvents = {};

class NavBarNavigationItem extends BEMComponent<
  NavBarNavigationItemElement,
  NavBarNavigationItemCustomEvents
> {}

type NavBarNavigationItemElementWithComponent = HTMLElementWithComponent<
  NavBarNavigationItemElement,
  NavBarNavigationItemCustomEvents,
  NavBarNavigationItem
>;

const navBarNavigationItems = Array.from(navBarElements, (navBarElement) =>
  Array.from(
    navBarElement.querySelectorAll<NavBarNavigationItemElement>(
      '.js-nav-bar__navigation-item'
    ),
    (navBarNavigationItemElement) =>
      new NavBarNavigationItem(navBarNavigationItemElement)
  )
).flat();

export type {
  NavBarNavigationItemCustomEvents,
  NavBarNavigationItem,
  NavBarNavigationItemElementWithComponent,
};

export { navBarNavigationItems as default };
