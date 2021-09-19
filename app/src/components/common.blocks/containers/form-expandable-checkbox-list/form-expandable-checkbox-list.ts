import {
  BEMComponent,
  HTMLElementWithComponent,
} from '@utils/devTools/scripts/ComponentCreationHelper';

import type {
  FormExpandableCheckboxListExpanderInputCustomEvents,
  FormExpandableCheckboxListExpanderInputElementWithComponent,
} from './__expander-input/form-expandable-checkbox-list__expander-input';
import './__expander-input/form-expandable-checkbox-list__expander-input';
import formExpandableCheckboxListElements, {
  FormExpandableCheckboxListElement,
} from './form-expandable-checkbox-list-elements';

type FormExpandableCheckboxListDOM = {
  expanderIcon: HTMLSpanElement;
  expanderInput: FormExpandableCheckboxListExpanderInputElementWithComponent;
};

type FormExpandableCheckboxListCustomEvents =
  {} & FormExpandableCheckboxListExpanderInputCustomEvents;

class FormExpandableCheckboxList extends BEMComponent<
  FormExpandableCheckboxListElement,
  FormExpandableCheckboxListCustomEvents
> {
  protected readonly _DOM: Readonly<FormExpandableCheckboxListDOM>;

  constructor(formExpandableCheckboxListElement: FormExpandableCheckboxListElement) {
    super(formExpandableCheckboxListElement);

    this._DOM = this._initDOM();

    this._bindExpanderInputListeners();
  }

  protected _initDOM() {
    const expanderIcon = this.element.querySelector(
      '.js-form-expandable-checkbox-list__expand-icon'
    ) as FormExpandableCheckboxListDOM['expanderIcon'];
    const expanderInput = this.element.querySelector(
      '.js-form-expandable-checkbox-list__expander-input'
    ) as FormExpandableCheckboxListDOM['expanderInput'];

    return { expanderIcon, expanderInput };
  }

  protected _bindExpanderInputListeners() {
    const expanderInput = this._DOM.expanderInput.component;

    expanderInput.addCustomEventListener(
      'change',
      this._expanderInputEventListenerObject.handleExpanderInputChange
    );

    return this;
  }
  protected _expanderInputEventListenerObject = {
    handleExpanderInputChange: (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      event: CustomEvent<FormExpandableCheckboxListExpanderInputCustomEvents['change']>
    ) => {
      const icon = this._DOM.expanderIcon.firstElementChild as HTMLElement;

      icon.textContent = icon.textContent === 'expand_less' ? 'expand_more' : 'expand_less';
    },
  };
}

type FormExpandableCheckboxListElementWithComponent = HTMLElementWithComponent<
  FormExpandableCheckboxListElement,
  FormExpandableCheckboxListCustomEvents,
  FormExpandableCheckboxList
>;

const formExpandableCheckboxLists = Array.from(
  formExpandableCheckboxListElements,
  (formExpandableCheckboxListElement) =>
    new FormExpandableCheckboxList(formExpandableCheckboxListElement)
);

export type {
  FormExpandableCheckboxListCustomEvents,
  FormExpandableCheckboxList,
  FormExpandableCheckboxListElementWithComponent,
};

export { formExpandableCheckboxLists as default };
