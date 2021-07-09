import { BEMComponent } from '@utils/devTools/scripts/ComponentCreationHelper';

type DropdownElement = HTMLDivElement;

type DropdownDOM = {
  expandButton: HTMLButtonElement;
};

type DropdownCustomEvents = 'open';

interface DropdownAPI extends BEMComponent<DropdownCustomEvents> {
  readonly element: DropdownElement;
}

class Dropdown implements DropdownAPI {
  readonly element: DropdownElement;
  protected readonly _DOM: Readonly<DropdownDOM>;

  constructor(dropdownElement: DropdownElement) {
    this.element = dropdownElement;
    this._DOM = this._initDOM();

    this.bindListeners();
  }

  protected _initDOM(): DropdownDOM {
    const expandButton = this.element.querySelector(
      '.form-dropdown__expand-btn'
    ) as DropdownDOM['expandButton'];

    return {
      expandButton,
    };
  }

  protected bindListeners() {
    this._DOM.expandButton.addEventListener('click', this.onClick);
  }
  protected onClick = (event: MouseEvent) => {
    this.element.dispatchEvent(new CustomEvent('open', { bubbles: true }));
  };
}

const dropdownElements = document.querySelectorAll('.form-dropdown') as NodeListOf<HTMLDivElement>;

const dropdowns = Array.from(dropdownElements).map(
  (dropdownElement) => new Dropdown(dropdownElement)
);

export { dropdowns as default, DropdownCustomEvents };
