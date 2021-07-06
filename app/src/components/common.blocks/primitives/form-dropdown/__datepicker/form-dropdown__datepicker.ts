import { Plugin } from '@utils/devTools/scripts/PluginCreationHelper';

import cardDatePickers, {
  CardDatepickerEvents,
} from '@common.blocks/primitives/card-datepicker/card-datepicker';

import { Unpacked } from '@utils/devTools/scripts/TypingHelper';
import dropdowns from '../form-dropdown';

type DatepickerElement = HTMLDivElement;

type DropdownDatepickerDOM = {
  selection: HTMLParagraphElement;
  input: HTMLInputElement;
};

type DropdownDatepickerEvents = CardDatepickerEvents;

type ParentBlock = Unpacked<typeof dropdowns>;
type DatepickerBlock = Unpacked<typeof cardDatePickers>;

// TODO: aria-expanded менять для кнопки использовать dispatchEvent
class DropdownDatepicker implements Plugin<DropdownDatepickerEvents> {
  readonly element: DatepickerElement;
  protected readonly _dom: Readonly<DropdownDatepickerDOM>;

  protected _parentBlock: ParentBlock;
  protected _datepicker: DatepickerBlock;

  constructor(datepickerElement: DatepickerElement) {
    this.element = datepickerElement;
    this._dom = DropdownDatepicker._initDOM(datepickerElement);

    const subBlocks = this._initSubBlocks();
    this._parentBlock = subBlocks._parentBlock;
    this._datepicker = subBlocks._datepicker;

    this._bindParentBlockListeners();
    this._bindListeners();
    this._bindAltFieldsListeners();

    this._init();
  }

  show() {
    this.element.classList.remove('form-dropdown__datepicker_hidden');
  }
  hide() {
    this.element.classList.add('form-dropdown__datepicker_hidden');
  }

  protected static _initDOM(datepickerElement: DatepickerElement): DropdownDatepickerDOM {
    return {
      selection: datepickerElement.nextElementSibling as DropdownDatepickerDOM['selection'],
      input: datepickerElement.previousElementSibling as DropdownDatepickerDOM['input'],
    };
  }

  protected _initSubBlocks() {
    const outerDropdownElement = this.element.closest('.form-dropdown');
    const innerCardDatepickerElement = this.element.querySelector('.card-datepicker');

    const _datepicker = cardDatePickers.find(
      (cardDatePicker) => cardDatePicker.element === innerCardDatepickerElement
    ) as DatepickerBlock;
    const _parentBlock = dropdowns.find(
      (dropdown) => dropdown.element === outerDropdownElement
    ) as ParentBlock;

    return { _datepicker, _parentBlock };
  }

  protected _bindParentBlockListeners() {
    this._parentBlock.element.addEventListener(
      'open',
      this._parentBlockEventListenerObject.handleParentBlockOpen
    );
  }
  protected _parentBlockEventListenerObject = {
    handleParentBlockOpen: () => {
      this.show();
    },
  };

  protected _bindListeners() {
    this.element.addEventListener('change', this.onChange);
  }
  protected onChange = (e: Event) => {
    this._changeValue();

    this.hide();
  };

  protected _changeValue() {
    const $altFields = this._datepicker.get$altFields();

    const dates = this._datepicker.getDates().map((date) => date.toISOString());
    const dateTimes = this._datepicker.getDateTimes();

    const placeholder = this._dom.selection.dataset.placeholder || '';

    if ($altFields !== undefined) {
      const formattedDates = this._datepicker.getSlitFormattedDates();

      this._dom.input.value = dates[0] || '';
      this._dom.selection.innerHTML = dateTimes[0]
        ? `<time datetime="${dateTimes[0]}">${formattedDates[0] || placeholder}</time>`
        : placeholder;

      this._changeAltFieldsValues(dateTimes, formattedDates);
    } else {
      const formattedDate = this._datepicker.getFormattedDate();

      this._dom.input.value = dates.toString();
      this._dom.selection.innerHTML = dateTimes.toString()
        ? `<time datetime="${dateTimes.toString()}">${formattedDate || placeholder}</time>`
        : placeholder;
    }
  }
  protected _changeAltFieldsValues(dateTimes: string[], formattedDates: string[]) {
    const $altFields = this._datepicker.get$altFields();

    $altFields?.each((index, inputElement) => {
      const dateIndex = index + 1;
      const dateTime = dateTimes[dateIndex];
      const selection = inputElement.nextElementSibling as DropdownDatepickerDOM['selection'];
      const altFieldPlaceholder = selection.dataset.placeholder || '';

      // eslint-disable-next-line no-param-reassign
      inputElement.value = dateTime || '';
      // eslint-disable-next-line no-param-reassign
      selection.innerHTML = dateTime
        ? `<time datetime="${dateTime}">${formattedDates[dateIndex] || altFieldPlaceholder}</time>`
        : altFieldPlaceholder;
    });
  }

  protected _bindAltFieldsListeners() {
    const $altFields = this._datepicker.get$altFields();

    if ($altFields !== undefined) {
      $altFields.each((index, input) => {
        const altDropdown = dropdowns.find(
          (dropdown) => dropdown.element === input.closest('.form-dropdown')
        ) as ParentBlock;

        altDropdown.element.addEventListener(
          'open',
          this._altFieldEventListenerObject.handleAltFieldOpen
        );
      });
    }
  }
  protected _altFieldEventListenerObject = {
    handleAltFieldOpen: this._parentBlockEventListenerObject.handleParentBlockOpen,
  };

  protected _init() {
    this._changeValue();
  }
}

const dropdownsWithDatepicker = dropdowns.filter((dropdown) =>
  dropdown.element.querySelector('.form-dropdown__datepicker')
);

const datepickers = dropdownsWithDatepicker.map(
  (dropdownWithDatepicker) =>
    new DropdownDatepicker(
      dropdownWithDatepicker.element.querySelector(
        '.form-dropdown__datepicker'
      ) as DatepickerElement
    )
);

export { datepickers as default, DropdownDatepickerEvents };
