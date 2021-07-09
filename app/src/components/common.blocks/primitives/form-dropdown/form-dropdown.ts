import { BEMComponent } from '@utils/devTools/scripts/ComponentCreationHelper';

type DropdownElement = HTMLDivElement;

type DropdownDOM = {
  openingButton: HTMLButtonElement;
};

type DropdownEvents = 'open';

interface DropdownAPI extends BEMComponent<DropdownEvents> {
  readonly element: DropdownElement;
}

class Dropdown implements DropdownAPI {
  readonly element: DropdownElement;
  protected readonly _dom: Readonly<DropdownDOM>;

  constructor(dropdownElement: DropdownElement) {
    this.element = dropdownElement;
    this._dom = Dropdown._initDOM(dropdownElement);

    this.bindListeners();
  }

  protected static _initDOM(dropdownElement: DropdownElement): DropdownDOM {
    return {
      openingButton: dropdownElement.querySelector(
        '.form-dropdown__expand-btn'
      ) as DropdownDOM['openingButton'],
    };
  }

  protected bindListeners() {
    this._dom.openingButton.addEventListener('click', this.onClick);
  }
  protected onClick = (event: MouseEvent) => {
    this.element.dispatchEvent(new CustomEvent('open', { bubbles: true }));
  };
}

const dropdownElements = document.querySelectorAll('.form-dropdown') as NodeListOf<HTMLDivElement>;

const dropdowns = Array.from(dropdownElements).map(
  (dropdownElement) => new Dropdown(dropdownElement)
);

export { dropdowns as default, DropdownEvents };
