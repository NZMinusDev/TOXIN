import {
  BEMComponent,
  HTMLElementWithComponent,
} from '@utils/devTools/scripts/ComponentCreationHelper';

import formExpandableCheckboxLists from '../form-expandable-checkbox-list';

type FormExpandableCheckboxListExpanderInputElement = HTMLInputElement;

type FormExpandableCheckboxListExpanderInputDOM = {
  expandableList: HTMLDivElement;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type FormExpandableCheckboxListExpanderInputHTMLOptions = {};

type FormExpandableCheckboxListExpanderInputCustomEvents = '';

class FormExpandableCheckboxListExpanderInput extends BEMComponent<
  FormExpandableCheckboxListExpanderInputElement,
  FormExpandableCheckboxListExpanderInputCustomEvents
> {
  protected readonly _DOM: Readonly<FormExpandableCheckboxListExpanderInputDOM>;

  protected _options: FormExpandableCheckboxListExpanderInputHTMLOptions;

  constructor(
    formExpandableCheckboxListExpanderInputElement: FormExpandableCheckboxListExpanderInputElement
  ) {
    super(formExpandableCheckboxListExpanderInputElement);

    this._DOM = this._initDOM();

    this._options = this._initOptionsFromHTML();

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

  // eslint-disable-next-line class-methods-use-this
  protected _initOptionsFromHTML() {
    return {};
  }

  protected _bindListeners() {
    this.element.addEventListener('change', this.onChange);

    return this;
  }
  onChange = (event: Event) => {
    this.toggleList();
  };

  protected _initDisplay() {
    if (this.element.checked) {
      this.openList();
    }

    return this;
  }
}

type FormExpandableCheckboxListExpanderInputElementWithComponent = HTMLElementWithComponent<
  FormExpandableCheckboxListExpanderInputElement,
  FormExpandableCheckboxListExpanderInputCustomEvents,
  FormExpandableCheckboxListExpanderInput
>;

const formExpandableCheckboxListExpanderInputs = formExpandableCheckboxLists
  .map((formExpandableCheckboxList) =>
    Array.from(
      formExpandableCheckboxList.element.querySelectorAll<
        FormExpandableCheckboxListExpanderInputElement
      >('.form-expandable-checkbox-list__expander-input'),
      (formExpandableCheckboxListExpanderInputElement) =>
        new FormExpandableCheckboxListExpanderInput(formExpandableCheckboxListExpanderInputElement)
    )
  )
  .flat();

export type {
  FormExpandableCheckboxListExpanderInputCustomEvents,
  FormExpandableCheckboxListExpanderInput,
  FormExpandableCheckboxListExpanderInputElementWithComponent,
};

export { formExpandableCheckboxListExpanderInputs as default };
