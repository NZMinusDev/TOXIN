import {
  BEMComponent,
  HTMLElementWithComponent,
} from '@utils/devTools/scripts/ComponentCreationHelper';

import {
  ItemQuantityListCustomEvents,
  ItemQuantityList,
  ItemQuantityListElementWithComponent,
} from './__item-quantity-list/form-dropdown__item-quantity-list';
import {
  DropdownDatepickerCustomEvents,
  DropdownDatepicker,
  DropdownDatepickerElementWithComponent,
} from './__datepicker/form-dropdown__datepicker';

type DropdownElement = HTMLDivElement;

type ExpandableItemElement =
  | ItemQuantityListElementWithComponent
  | DropdownDatepickerElementWithComponent;
type DropdownDOM = {
  expandButton: HTMLButtonElement;
  expandableItem: ExpandableItemElement;
};

type ExpandableItemComponent = ItemQuantityList | DropdownDatepicker;

type DropdownCustomEvents = 'open';
type ExpandableItemComponentCustomEvents =
  | ItemQuantityListCustomEvents
  | DropdownDatepickerCustomEvents;

class Dropdown<
  TExpandableItemComponent extends ExpandableItemComponent,
  TCustomEvents extends ExpandableItemComponentCustomEvents
> extends BEMComponent<DropdownElement, DropdownCustomEvents | TCustomEvents> {
  protected readonly _DOM: Readonly<DropdownDOM>;

  constructor(dropdownElement: DropdownElement) {
    super(dropdownElement);

    this._DOM = this._initDOM();

    this._bindExpandButtonListeners();
  }

  getExpandableItemComponent() {
    return this._DOM.expandableItem.component as TExpandableItemComponent;
  }

  protected _initDOM(): DropdownDOM {
    const expandButton = this.element.querySelector(
      '.form-dropdown__expand-btn'
    ) as DropdownDOM['expandButton'];
    const expandableItem = expandButton.nextElementSibling as DropdownDOM['expandableItem'];

    return {
      expandButton,
      expandableItem,
    };
  }

  protected _bindExpandButtonListeners() {
    this._DOM.expandButton.addEventListener(
      'click',
      this._expandButtonEventListenerObject.handleExpandButtonClick
    );

    return this;
  }
  protected _expandButtonEventListenerObject = {
    handleExpandButtonClick: (event: MouseEvent) => {
      this._DOM.expandableItem.dispatchEvent(new CustomEvent('open', { bubbles: true }));
    },
  };
}

type DropdownWithItemQuantityList = Dropdown<ItemQuantityList, ItemQuantityListCustomEvents>;
type DropdownWithDatepicker = Dropdown<DropdownDatepicker, DropdownDatepickerCustomEvents>;

type DropdownElementWithComponent = HTMLElementWithComponent<
  DropdownElement,
  DropdownCustomEvents,
  Dropdown<ExpandableItemComponent, ExpandableItemComponentCustomEvents>
>;

const dropdowns = Array.from(
  document.querySelectorAll('.form-dropdown') as NodeListOf<HTMLDivElement>,
  (dropdownElement) => new Dropdown(dropdownElement)
);

export type {
  DropdownCustomEvents,
  DropdownWithItemQuantityList,
  DropdownWithDatepicker,
  DropdownElementWithComponent,
};

export { dropdowns as default };
