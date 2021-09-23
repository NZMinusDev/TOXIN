import {
  BEMComponent,
  HTMLElementWithComponent,
} from '@utils/devTools/scripts/ComponentCreationHelper';

import formExpandableCheckboxListElements from '../form-expandable-checkbox-list-elements';

type FormExpandableCheckboxListExpanderInputElement = HTMLInputElement;

type FormExpandableCheckboxListExpanderInputDOM = {
  expandableList: HTMLDivElement;
};

type FormExpandableCheckboxListExpanderInputCustomEvents = { change: {} };

class FormExpandableCheckboxListExpanderInput extends BEMComponent<
  FormExpandableCheckboxListExpanderInputElement,
  FormExpandableCheckboxListExpanderInputCustomEvents
> {
  protected readonly _DOM: Readonly<FormExpandableCheckboxListExpanderInputDOM>;

  constructor(
    formExpandableCheckboxListExpanderInputElement: FormExpandableCheckboxListExpanderInputElement
  ) {
    super(formExpandableCheckboxListExpanderInputElement);

    this._DOM = this._initDOM();

    this._bindListeners();

    this._initDisplay();
  }

  openList() {
    this._DOM.expandableList.style.maxHeight = `${this._DOM.expandableList.scrollHeight}px`;
  }

  closeList() {
    this._DOM.expandableList.style.maxHeight = '';
  }

  toggleList() {
    if (this.element.checked) {
      this.openList();
    } else {
      this.closeList();
    }
  }

  protected _initDOM() {
    const expandableList = this.element
      .nextElementSibling as FormExpandableCheckboxListExpanderInputDOM['expandableList'];

    return { expandableList };
  }

  protected _bindListeners() {
    this.element.addEventListener('change', this.onChange);

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onChange = (event: Event) => {
    this.toggleList();
  };

  protected _initDisplay() {
    if (this.element.checked) {
      this.openList();
    }

    return this;
  }
}

type FormExpandableCheckboxListExpanderInputElementWithComponent =
  HTMLElementWithComponent<
    FormExpandableCheckboxListExpanderInputElement,
    FormExpandableCheckboxListExpanderInputCustomEvents,
    FormExpandableCheckboxListExpanderInput
  >;

const formExpandableCheckboxListExpanderInputs = Array.from(
  formExpandableCheckboxListElements,
  (formExpandableCheckboxListElement) =>
    new FormExpandableCheckboxListExpanderInput(
      formExpandableCheckboxListElement.querySelector(
        '.js-form-expandable-checkbox-list__expander-input'
      ) as FormExpandableCheckboxListExpanderInputElement
    )
);

export type {
  FormExpandableCheckboxListExpanderInputCustomEvents,
  FormExpandableCheckboxListExpanderInput,
  FormExpandableCheckboxListExpanderInputElementWithComponent,
};

export { formExpandableCheckboxListExpanderInputs as default };
