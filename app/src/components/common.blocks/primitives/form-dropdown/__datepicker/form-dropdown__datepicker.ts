import {
  BEMComponent,
  HTMLElementWithComponent,
} from '@utils/devTools/scripts/ComponentCreationHelper';

import datepickerCards, {
  DatepickerCardCustomEvents,
  DatepickerCard,
} from '@common.blocks/primitives/datepicker-card/datepicker-card';

import dropdowns, { DropdownElementWithComponent } from '../form-dropdown';

type DropdownDatepickerElement = HTMLDivElement;

type DropdownDatepickerDOM = {
  selection: HTMLParagraphElement;
  input: HTMLInputElement;
};

type DropdownDatepickerDatasetOptions = { placeholder: string };

type DropdownDatepickerCustomEvents = DatepickerCardCustomEvents;

class DropdownDatepicker extends BEMComponent<
  DropdownDatepickerElement,
  DropdownDatepickerCustomEvents
> {
  protected readonly _DOM: Readonly<DropdownDatepickerDOM>;

  protected _datasetOptions: DropdownDatepickerDatasetOptions;

  protected _datepickerCard: DatepickerCard | undefined;

  constructor(dropdownDatepickerElement: DropdownDatepickerElement) {
    super(dropdownDatepickerElement);

    this._DOM = this._initDOM();

    this._datasetOptions = this._initOptionsFromDataset();

    const subComponents = this._initSubComponents();
    this._datepickerCard = subComponents._datepickerCard;

    this._bindListeners()._bindAltFieldsListeners();

    this._initDisplay();
  }

  show() {
    this.element.classList.remove('form-dropdown__datepicker_hidden');

    return this;
  }
  hide() {
    this.element.classList.add('form-dropdown__datepicker_hidden');

    return this;
  }

  protected _initDOM(): DropdownDatepickerDOM {
    const selection = this.element.nextElementSibling as DropdownDatepickerDOM['selection'];
    const input = this.element.querySelector(
      '.form-dropdown__datepicker-input'
    ) as DropdownDatepickerDOM['input'];

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

  protected _initSubComponents() {
    const _datepickerCard = datepickerCards.find((datepickerCard) =>
      this.element.contains(datepickerCard.element)
    ) as DatepickerCard;

    return { _datepickerCard };
  }

  protected _bindListeners() {
    this.element.addEventListener('open', this.onOpen);
    this.element.addEventListener('change', this.onChange);

    return this;
  }
  protected onOpen = (e: Event) => {
    this.show();
  };
  protected onChange = (e: Event) => {
    this._changeValue();

    this.hide();
  };

  protected _changeValue() {
    if (this._datepickerCard !== undefined) {
      const $altFields = this._datepickerCard.get$altFields();

      const dates = this._datepickerCard.getDates().map((date) => date.toISOString());
      const dateTimes = this._datepickerCard.getDateTimes();

      if ($altFields !== undefined) {
        const formattedDates = this._datepickerCard.getSplitFormattedDates();

        this._DOM.input.value = dates[0] || '';
        this._DOM.selection.innerHTML =
          dateTimes[0] !== ''
            ? `<time datetime="${dateTimes[0]}">${
                formattedDates[0] || this._datasetOptions.placeholder
              }</time>`
            : this._datasetOptions.placeholder;

        this._changeAltFieldsValues(dateTimes, formattedDates);
      } else {
        const formattedDate = this._datepickerCard.getFormattedDate();

        this._DOM.input.value = dates.toString();
        this._DOM.selection.innerHTML =
          dateTimes.toString() !== ''
            ? `<time datetime="${dateTimes.toString()}">${
                formattedDate || this._datasetOptions.placeholder
              }</time>`
            : this._datasetOptions.placeholder;
      }
    }

    return this;
  }
  protected _changeAltFieldsValues(dateTimes: string[], formattedDates: string[]) {
    const $altFields = this._datepickerCard?.get$altFields();

    $altFields?.each((index, inputElement) => {
      const dateIndex = index + 1;
      const dateTime = dateTimes[dateIndex];
      const selection = inputElement
        .closest('.form-dropdown')
        ?.querySelector('.form-dropdown__selection-text') as DropdownDatepickerDOM['selection'];
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
    const $altFields = this._datepickerCard?.get$altFields();

    if ($altFields !== undefined) {
      $altFields.each((index, input) => {
        const altDropdown = input.closest('.form-dropdown') as DropdownElementWithComponent;

        altDropdown.addEventListener('open', this._altFieldEventListenerObject.handleAltFieldOpen);
      });
    }

    return this;
  }
  protected _altFieldEventListenerObject = {
    handleAltFieldOpen: this.onOpen,
  };

  protected _initDisplay() {
    this._changeValue();

    return this;
  }
}

type DropdownDatepickerElementWithComponent = HTMLElementWithComponent<
  DropdownDatepickerElement,
  DropdownDatepickerCustomEvents,
  DropdownDatepicker
>;

const dropdownsWithDatepicker = dropdowns.filter((dropdown) =>
  dropdown.element.querySelector('.form-dropdown__datepicker')
);

const dropdownDatepickers = dropdownsWithDatepicker.map(
  (dropdownWithDatepicker) =>
    new DropdownDatepicker(
      dropdownWithDatepicker.element.querySelector(
        '.form-dropdown__datepicker'
      ) as DropdownDatepickerElement
    )
);

export type {
  DropdownDatepickerCustomEvents,
  DropdownDatepicker,
  DropdownDatepickerElementWithComponent,
};

export { dropdownDatepickers as default };
