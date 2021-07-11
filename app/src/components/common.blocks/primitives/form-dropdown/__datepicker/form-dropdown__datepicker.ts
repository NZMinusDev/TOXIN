import { BEMComponent } from '@utils/devTools/scripts/ComponentCreationHelper';

import DatepickerCards, {
  DatepickerCardCustomEvents,
  DatepickerCardElementWithComponent,
} from '@common.blocks/primitives/datepicker-card/datepicker-card';

import { Unpacked } from '@utils/devTools/scripts/TypingHelper';
import dropdowns from '../form-dropdown';

type DatepickerElement = HTMLDivElement;

type DropdownDatepickerDOM = {
  selection: HTMLParagraphElement;
  input: HTMLInputElement;
};

type DropdownDatepickerDatasetOptions = { placeholder: string };

type DropdownDatepickerCustomEvents = DatepickerCardCustomEvents;

type ParentComponent = Unpacked<typeof dropdowns>;
type DatepickerComponent = Unpacked<typeof DatepickerCards>;

class DropdownDatepicker extends BEMComponent<DatepickerElement, DropdownDatepickerCustomEvents> {
  protected readonly _DOM: Readonly<DropdownDatepickerDOM>;

  protected _datasetOptions: DropdownDatepickerDatasetOptions;

  protected _parentComponent: ParentComponent;
  protected _datepickerComponent: DatepickerComponent;

  constructor(datepickerElement: DatepickerElement) {
    super(datepickerElement);

    this._DOM = this._initDOM();

    this._datasetOptions = this._initOptionsFromDataset();

    const subComponent = this._initSubComponent();
    this._parentComponent = subComponent._parentComponent;
    this._datepickerComponent = subComponent._datepickerComponent;

    this._bindParentComponentListeners()._bindListeners()._bindAltFieldsListeners();

    this._initDisplay();
  }

  show() {
    this.element.classList.remove('form-dropdown__datepickerComponent_hidden');

    return this;
  }
  hide() {
    this.element.classList.add('form-dropdown__datepickerComponent_hidden');

    return this;
  }

  protected _initDOM(): DropdownDatepickerDOM {
    const selection = this.element.nextElementSibling as DropdownDatepickerDOM['selection'];
    const input = this.element.previousElementSibling as DropdownDatepickerDOM['input'];

    return {
      selection,
      input,
    };
  }

  protected _initOptionsFromDataset(): DropdownDatepickerDatasetOptions {
    return {
      placeholder: this._DOM.selection.dataset.placeholder || '',
    };
  }

  protected _initSubComponent() {
    const outerDropdownElement = this.element.closest('.form-dropdown');
    const innerDatepickerCardElement = this.element.querySelector(
      '.datepicker-card'
    ) as DatepickerCardElementWithComponent;

    const _datepickerComponent = innerDatepickerCardElement.component;
    const _parentComponent = dropdowns.find(
      (dropdown) => dropdown.element === outerDropdownElement
    ) as ParentComponent;

    return { _datepickerComponent, _parentComponent };
  }

  protected _bindParentComponentListeners() {
    this._parentComponent.element.addEventListener(
      'open',
      this._parentComponentEventListenerObject.handleParentComponentOpen
    );

    return this;
  }
  protected _parentComponentEventListenerObject = {
    handleParentComponentOpen: () => {
      this.show();
    },
  };

  protected _bindListeners() {
    this.element.addEventListener('change', this.onChange);

    return this;
  }
  protected onChange = (e: Event) => {
    this._changeValue();

    this.hide();
  };

  protected _changeValue() {
    const $altFields = this._datepickerComponent.get$altFields();

    const dates = this._datepickerComponent.getDates().map((date) => date.toISOString());
    const dateTimes = this._datepickerComponent.getDateTimes();

    if ($altFields !== undefined) {
      const formattedDates = this._datepickerComponent.getSplitFormattedDates();

      this._DOM.input.value = dates[0] || '';
      this._DOM.selection.innerHTML =
        dateTimes[0] !== ''
          ? `<time datetime="${dateTimes[0]}">${
              formattedDates[0] || this._datasetOptions.placeholder
            }</time>`
          : this._datasetOptions.placeholder;

      this._changeAltFieldsValues(dateTimes, formattedDates);
    } else {
      const formattedDate = this._datepickerComponent.getFormattedDate();

      this._DOM.input.value = dates.toString();
      this._DOM.selection.innerHTML =
        dateTimes.toString() !== ''
          ? `<time datetime="${dateTimes.toString()}">${
              formattedDate || this._datasetOptions.placeholder
            }</time>`
          : this._datasetOptions.placeholder;
    }

    return this;
  }
  protected _changeAltFieldsValues(dateTimes: string[], formattedDates: string[]) {
    const $altFields = this._datepickerComponent.get$altFields();

    $altFields?.each((index, inputElement) => {
      const dateIndex = index + 1;
      const dateTime = dateTimes[dateIndex];
      const selection = inputElement.nextElementSibling as DropdownDatepickerDOM['selection'];
      const altFieldPlaceholder = selection.dataset.placeholder || '';

      // eslint-disable-next-line no-param-reassign
      inputElement.value = dateTime || '';
      // eslint-disable-next-line no-param-reassign
      selection.innerHTML =
        dateTime !== ''
          ? `<time datetime="${dateTime}">${
              formattedDates[dateIndex] || altFieldPlaceholder
            }</time>`
          : altFieldPlaceholder;
    });

    return this;
  }

  protected _bindAltFieldsListeners() {
    const $altFields = this._datepickerComponent.get$altFields();

    if ($altFields !== undefined) {
      $altFields.each((index, input) => {
        const altDropdown = dropdowns.find(
          (dropdown) => dropdown.element === input.closest('.form-dropdown')
        ) as ParentComponent;

        altDropdown.element.addEventListener(
          'open',
          this._altFieldEventListenerObject.handleAltFieldOpen
        );
      });
    }

    return this;
  }
  protected _altFieldEventListenerObject = {
    handleAltFieldOpen: this._parentComponentEventListenerObject.handleParentComponentOpen,
  };

  protected _initDisplay() {
    this._changeValue();

    return this;
  }
}

const dropdownsWithDatepicker = dropdowns.filter((dropdown) =>
  dropdown.element.querySelector('.form-dropdown__datepickerComponent')
);

const datepickers = dropdownsWithDatepicker.map(
  (dropdownWithDatepicker) =>
    new DropdownDatepicker(
      dropdownWithDatepicker.element.querySelector(
        '.form-dropdown__datepickerComponent'
      ) as DatepickerElement
    )
);

export { datepickers as default, DropdownDatepickerCustomEvents };
