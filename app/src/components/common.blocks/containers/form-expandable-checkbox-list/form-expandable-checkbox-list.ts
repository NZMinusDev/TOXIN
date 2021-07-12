import {
  BEMComponent,
  HTMLElementWithComponent,
} from '@utils/devTools/scripts/ComponentCreationHelper';

type FormExpandableCheckboxListElement = HTMLDivElement;

// eslint-disable-next-line @typescript-eslint/ban-types
type FormExpandableCheckboxListDOM = {};

// eslint-disable-next-line @typescript-eslint/ban-types
type FormExpandableCheckboxListHTMLOptions = {};

type FormExpandableCheckboxListCustomEvents = '';

class FormExpandableCheckboxList extends BEMComponent<
  FormExpandableCheckboxListElement,
  FormExpandableCheckboxListCustomEvents
> {
  protected readonly _DOM: Readonly<FormExpandableCheckboxListDOM>;

  protected _options: FormExpandableCheckboxListHTMLOptions;

  constructor(formExpandableCheckboxListElement: FormExpandableCheckboxListElement) {
    super(formExpandableCheckboxListElement);

    this._DOM = this._initDOM();

    this._options = this._initOptionsFromHTML();

    this._bindListeners();
  }

  // eslint-disable-next-line class-methods-use-this
  protected _initDOM() {
    return {};
  }

  // eslint-disable-next-line class-methods-use-this
  protected _initOptionsFromHTML() {
    return {};
  }

  protected _bindListeners() {
    return this;
  }
}

type FormExpandableCheckboxListElementWithComponent = HTMLElementWithComponent<
  FormExpandableCheckboxListElement,
  FormExpandableCheckboxListCustomEvents,
  FormExpandableCheckboxList
>;

const formExpandableCheckboxLists = Array.from(
  document.querySelectorAll<FormExpandableCheckboxListElement>('.form-expandable-checkbox-list'),
  (formExpandableCheckboxListElement) =>
    new FormExpandableCheckboxList(formExpandableCheckboxListElement)
);

export type {
  FormExpandableCheckboxListCustomEvents,
  FormExpandableCheckboxList,
  FormExpandableCheckboxListElementWithComponent,
};

export { formExpandableCheckboxLists as default };
