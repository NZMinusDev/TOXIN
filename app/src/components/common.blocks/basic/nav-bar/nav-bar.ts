import BEMComponent, {
  HTMLElementWithComponent,
} from '@shared/utils/scripts/components/BEM/BEMComponent';
import '@common.blocks/primitives/logo/logo';
import '@common.blocks/primitives/button/button';

import './__navigation-item/nav-bar__navigation-item';
import navBarElements, { NavBarElement } from './nav-bar-elements';
import './nav-bar.scss';

type NavBarDOM = {
  burger: HTMLButtonElement;
  body: HTMLDivElement;
};

type NavBarState = {
  isMobile: boolean;
};

type NavBarCustomEvents = {};

const activeBurgerClass = 'nav-bar__burger_active';

class NavBar extends BEMComponent<NavBarElement, NavBarCustomEvents> {
  protected readonly _DOM: Readonly<NavBarDOM>;

  protected readonly _state: NavBarState;

  constructor(navBarElement: NavBarElement) {
    super(navBarElement);

    this._DOM = this._initDOM();

    this._state = NavBar._initState();

    this._bindBurgerListeners()._bindWindowListeners();

    this._initDisplay();
  }

  protected _initDOM() {
    const { element } = this;

    const burger = element.querySelector(
      '.js-nav-bar__burger'
    ) as NavBarDOM['burger'];
    const body = element.querySelector(
      '.js-nav-bar__body'
    ) as NavBarDOM['body'];

    return { burger, body };
  }

  protected static _initState() {
    const isMobile = NavBar.matchIsMobile();

    return { isMobile };
  }

  protected _bindBurgerListeners() {
    const { burger } = this._DOM;

    burger.addEventListener(
      'click',
      this._burgerEventListenerObject.handleBurgerClick
    );

    return this;
  }

  protected _burgerEventListenerObject = {
    handleBurgerClick: () => {
      this._toggleBody();
    },
  };

  protected _bindWindowListeners() {
    window.addEventListener(
      'resize',
      this._windowEventListenerObject.handleWindowResize
    );

    return this;
  }

  protected _windowEventListenerObject = {
    handleWindowResize: () => {
      const { isMobile } = this._state;
      const newIsMobile = NavBar.matchIsMobile();

      if (isMobile !== newIsMobile && newIsMobile) {
        const timeForRerendering = 500;

        this._turnOffSTransition();
        this._toggleBody(false);
        setTimeout(() => {
          this._turnOnSTransition();
        }, timeForRerendering);
      }

      this._state.isMobile = newIsMobile;
    },
  };

  protected _initDisplay() {
    this._turnOnSTransition();

    return this;
  }

  protected static matchIsMobile() {
    return window.matchMedia('(max-width: 992px)').matches;
  }

  protected _turnOnSTransition() {
    const { body } = this._DOM;

    body.classList.add('nav-bar__body_transition_active');

    return this;
  }

  protected _turnOffSTransition() {
    const { body } = this._DOM;

    body.classList.remove('nav-bar__body_transition_active');

    return this;
  }

  protected _toggleBody(forceOpen?: boolean) {
    const { burger } = this._DOM;

    if (forceOpen === false || burger.classList.contains(activeBurgerClass)) {
      burger.classList.remove(activeBurgerClass);
      burger.ariaExpanded = 'false';
    } else if (forceOpen === true || forceOpen === undefined) {
      burger.classList.add(activeBurgerClass);
      burger.ariaExpanded = 'true';
    }

    return this;
  }
}

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
