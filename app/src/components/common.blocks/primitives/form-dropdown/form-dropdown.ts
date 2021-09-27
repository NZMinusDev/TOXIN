import BEMComponent, {
  HTMLElementWithComponent,
} from '@utils/devTools/scripts/view/BEM/BEMComponent';

import type {
  FormDropdownItemQuantityListCustomEvents,
  FormDropdownItemQuantityListElementWithComponent,
} from './__item-quantity-list/form-dropdown__item-quantity-list';
import './__item-quantity-list/form-dropdown__item-quantity-list';
import type {
  FormDropdownDatepickerCustomEvents,
  FormDropdownDatepickerElementWithComponent,
} from './__datepicker/form-dropdown__datepicker';
import './__datepicker/form-dropdown__datepicker';
import formDropdownElements, {
  FormDropdownElement,
} from './form-dropdown-elements';

type ExpandableItemElementWithComponent =
  | FormDropdownItemQuantityListElementWithComponent
  | FormDropdownDatepickerElementWithComponent;
type FormDropdownDOM = {
  expandButton: HTMLButtonElement;
  expandableItem: ExpandableItemElementWithComponent;
};

type FormDropdownCustomEvents = {};
type ExpandableItemCustomEvents = { open: {}; close: {} };
type FormDropdownWithItemQuantityListCustomEvents = FormDropdownCustomEvents &
  FormDropdownItemQuantityListCustomEvents;
type FormDropdownWithDatepickerCustomEvents = FormDropdownCustomEvents &
  FormDropdownDatepickerCustomEvents;

class FormDropdown<
  TExpandableItemElementWithComponent extends ExpandableItemElementWithComponent,
  TCustomEvents extends
    | FormDropdownWithItemQuantityListCustomEvents
    | FormDropdownWithDatepickerCustomEvents
> extends BEMComponent<FormDropdownElement, TCustomEvents> {
  protected readonly _DOM: Readonly<FormDropdownDOM>;

  constructor(formDropdownElement: FormDropdownElement) {
    super(formDropdownElement);

    this._DOM = this._initDOM();

    this._bindExpandButtonListeners()._bindExpandableItemListeners();
  }

  getExpandableItemElement() {
    return this._DOM.expandableItem as TExpandableItemElementWithComponent;
  }

  protected _initDOM() {
    const expandButton = this.element.querySelector(
      '.js-form-dropdown__expand-btn'
    ) as FormDropdownDOM['expandButton'];
    const expandableItem =
      expandButton.nextElementSibling as FormDropdownDOM['expandableItem'];

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
    handleExpandButtonClick: () => {
      this._open();

      const { expandableItem } = this._DOM;
      expandableItem.component.open();
    },
  };

  protected _bindExpandableItemListeners() {
    const { component } = this._DOM.expandableItem;

    component.addCustomEventListener(
      'open',
      this._expandableItemEventListenerObject.handleExpandableItemOpen
    );
    component.addCustomEventListener(
      'close',
      this._expandableItemEventListenerObject.handleExpandableItemClose
    );

    return this;
  }

  protected _expandableItemEventListenerObject = {
    handleExpandableItemOpen: () => {
      this._open();
    },
    handleExpandableItemClose: () => {
      this._close();
    },
  };

  protected _open() {
    const { expandButton } = this._DOM;

    expandButton.ariaExpanded = 'true';
    this.element.classList.add('form-dropdown_opened');
  }

  protected _close() {
    const { expandButton } = this._DOM;

    expandButton.ariaExpanded = 'false';
    this.element.classList.remove('form-dropdown_opened');
  }
}

type FormDropdownWithItemQuantityList = FormDropdown<
  FormDropdownItemQuantityListElementWithComponent,
  FormDropdownWithItemQuantityListCustomEvents
>;
type FormDropdownWithDatepicker = FormDropdown<
  FormDropdownDatepickerElementWithComponent,
  FormDropdownWithDatepickerCustomEvents
>;

type FormDropdownWithItemQuantityListElementWithComponent =
  HTMLElementWithComponent<
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
  FormDropdown<
    FormDropdownDatepickerElementWithComponent,
    FormDropdownWithDatepickerCustomEvents
  >
>;

const formDropdowns = Array.from(
  formDropdownElements,
  (formDropdownElement) => new FormDropdown(formDropdownElement)
);

export type {
  FormDropdownWithItemQuantityListCustomEvents,
  FormDropdownWithDatepickerCustomEvents,
  ExpandableItemCustomEvents,
  FormDropdownWithItemQuantityList,
  FormDropdownWithDatepicker,
  FormDropdownWithItemQuantityListElementWithComponent,
  FormDropdownWithDatepickerElementWithComponent,
};

export { formDropdowns as default };
