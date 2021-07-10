import { BEMComponent } from '@utils/devTools/scripts/ComponentCreationHelper';

type DropdownElement = HTMLDivElement;

type DropdownDOM = {
  expandButton: HTMLButtonElement;
};

type DropdownCustomEvents = 'open';

class Dropdown implements BEMComponent<DropdownCustomEvents> {
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

    return this;
  }
  protected onClick = (event: MouseEvent) => {
    this.element.dispatchEvent(new CustomEvent('open', { bubbles: true }));
  };
}

const dropdowns = Array.from(
  document.querySelectorAll('.form-dropdown') as NodeListOf<HTMLDivElement>,
  (dropdownElement) => new Dropdown(dropdownElement)
);

export { dropdowns as default, DropdownCustomEvents };
