import {
  BEMComponent,
  HTMLElementWithComponent,
} from '@utils/devTools/scripts/ComponentCreationHelper';
import {
  FormDropdownItemQuantityListCustomEvents,
  FormDropdownItemQuantityListElementWithComponent,
} from './__item-quantity-list/form-dropdown__item-quantity-list';
import {
  FormDropdownDatepickerCustomEvents,
  FormDropdownDatepickerElementWithComponent,
} from './__datepicker/form-dropdown__datepicker';

type FormDropdownElement = HTMLDivElement;

type ExpandableItemElementWithComponent =
  | FormDropdownItemQuantityListElementWithComponent
  | FormDropdownDatepickerElementWithComponent;
type FormDropdownDOM = {
  expandButton: HTMLButtonElement;
  expandableItem: ExpandableItemElementWithComponent;
};

type FormDropdownCustomEvents = 'open';
type FormDropdownWithItemQuantityListCustomEvents =
  | FormDropdownCustomEvents
  | FormDropdownItemQuantityListCustomEvents;
type FormDropdownWithDatepickerCustomEvents =
  | FormDropdownCustomEvents
  | FormDropdownDatepickerCustomEvents;

class FormDropdown<
  TExpandableItemElementWithComponent extends ExpandableItemElementWithComponent,
  TCustomEvents extends
    | FormDropdownWithItemQuantityListCustomEvents
    | FormDropdownWithDatepickerCustomEvents
> extends BEMComponent<FormDropdownElement, FormDropdownCustomEvents | TCustomEvents> {
  protected readonly _DOM: Readonly<FormDropdownDOM>;

  constructor(formDropdownElement: FormDropdownElement) {
    super(formDropdownElement);

    this._DOM = this._initDOM();

    this._bindExpandButtonListeners();
  }

  getExpandableItemElement() {
    return this._DOM.expandableItem as TExpandableItemElementWithComponent;
  }

  protected _initDOM() {
    const expandButton = this.element.querySelector(
      '.form-dropdown__expand-btn'
    ) as FormDropdownDOM['expandButton'];
    const expandableItem = expandButton.nextElementSibling as FormDropdownDOM['expandableItem'];

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

type FormDropdownWithItemQuantityList = FormDropdown<
  FormDropdownItemQuantityListElementWithComponent,
  FormDropdownWithItemQuantityListCustomEvents
>;
type FormDropdownWithDatepicker = FormDropdown<
  FormDropdownDatepickerElementWithComponent,
  FormDropdownWithDatepickerCustomEvents
>;

type FormDropdownWithItemQuantityListElementWithComponent = HTMLElementWithComponent<
  FormDropdownElement,
  FormDropdownWithItemQuantityListCustomEvents,
  FormDropdown<
    FormDropdownItemQuantityListElementWithComponent,
    FormDropdownWithItemQuantityListCustomEvents
  >
>;
type FormDropdownWithDatepickerElementWithComponent = HTMLElementWithComponent<
  FormDropdownElement,
  FormDropdownWithDatepickerCustomEvents,
  FormDropdown<FormDropdownDatepickerElementWithComponent, FormDropdownWithDatepickerCustomEvents>
>;

const formDropdowns = Array.from(
  document.querySelectorAll('.form-dropdown') as NodeListOf<FormDropdownElement>,
  (formDropdownElement) => new FormDropdown(formDropdownElement)
);

export type {
  FormDropdownWithItemQuantityListCustomEvents,
  FormDropdownWithDatepickerCustomEvents,
  FormDropdownWithItemQuantityList,
  FormDropdownWithDatepicker,
  FormDropdownWithItemQuantityListElementWithComponent,
  FormDropdownWithDatepickerElementWithComponent,
};

export { formDropdowns as default };
