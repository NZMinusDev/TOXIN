import {
  BEMComponent,
  HTMLElementWithComponent,
} from '@utils/devTools/scripts/ComponentCreationHelper';
import { formatToPeriodDateTime } from '@utils/devTools/scripts/DateHelper';

import '@common.blocks/primitives/apply-control/apply-control.scss';
import '@library.blocks/primitives/datepicker-card/datepicker-card';

import datepickerCardElements, {
  DatepickerCardElement,
} from './datepicker-card-elements';

type LibElement = HTMLDivElement;
type DatepickerCardDOM = {
  $libElement: JQuery<LibElement>;
  input: HTMLInputElement;
  $altFields?: JQuery<HTMLInputElement>;
};
type DatepickerCardGeneratedDOM = {
  $calendar: JQuery<HTMLDivElement>;
  clearBtn: HTMLButtonElement;
  applyBtn: HTMLButtonElement;
};

type DatepickerCardState = {
  dates: Date[];
  formattedDates: string;
};

type DatepickerCardCustomEvents = {
  select: {};
  change: {};
};

class DatepickerCard extends BEMComponent<
  DatepickerCardElement,
  DatepickerCardCustomEvents
> {
  protected readonly _DOM: Readonly<DatepickerCardDOM>;

  protected readonly _generatedDOM: Readonly<DatepickerCardGeneratedDOM>;

  protected readonly _state: DatepickerCardState;

  protected _applyControlTemplate = `<div class="datepicker-card__apply-control"><div class="apply-control js-apply-control"><input class="apply-control__clear-btn js-apply-control__clear-btn apply-control__clear-btn_hidden" type="button" value="очистить"><input class="apply-control__apply-btn js-apply-control__apply-btn" type="button" value="применить"></div></div>`;

  constructor(datepickerCardElement: DatepickerCardElement) {
    super(datepickerCardElement);

    this._DOM = this._initDOM();
    this._generatedDOM = this._initLibDatepicker()._initGeneratedDOM();

    this._state = this._initState();

    this._bindApplyControlListeners();

    this._initDisplay();
  }

  getDates() {
    return [...this._state.dates];
  }

  getSplitFormattedDates() {
    return this._state.formattedDates.split(
      this._DOM.$libElement.data('datepicker').opts.multipleDatesSeparator
    );
  }

  getDateTimes() {
    const isSelfRanged =
      this._DOM.$libElement.data('datepicker').opts.range &&
      this._DOM.$altFields === undefined;
    const isDatesDefined = this._state.dates.length > 0;

    if (isSelfRanged && isDatesDefined) {
      const [theSmallestDate] = this._state.dates;
      const theLargestDate = this._state.dates[this._state.dates.length - 1];

      return [
        formatToPeriodDateTime(
          theSmallestDate.toISOString(),
          theLargestDate.toISOString()
        ),
      ];
    }

    return this._state.dates.map((date) => date.toISOString());
  }

  getFormattedDate() {
    return this._state.formattedDates;
  }

  get$altFields() {
    return this._DOM.$altFields;
  }

  protected _initDOM(): DatepickerCardDOM {
    const libElement = this.element.querySelector(
      '.js-datepicker-here'
    ) as LibElement;
    const $libElement = $(libElement);
    const input = this.element.querySelector(
      '.js-datepicker-card__input'
    ) as DatepickerCardDOM['input'];
    const $altFields =
      $libElement.data('altFields') !== undefined
        ? $<HTMLInputElement>($libElement.data('altFields'))
        : undefined;

    return {
      $libElement,
      input,
      $altFields,
    };
  }

  private _initLibDatepicker() {
    this._DOM.$libElement.datepicker({
      prevHtml: `arrow_back`,
      nextHtml: `arrow_forward`,
      dateFormat:
        Boolean(this._DOM.$libElement.data('range')) &&
        this._DOM.$altFields === undefined
          ? 'dd M'
          : 'dd.mm.yyyy',
      minDate: new Date(),
      toggleSelected: false,
      onSelect: (formattedDate: string, date: Date | Array<Date> | '') => {
        this._generatedDOM.clearBtn.classList.remove(
          'apply-control__clear-btn_hidden'
        );

        if (date !== '') {
          this._state.dates = Array.isArray(date) ? date : [date];
        } else {
          this._state.dates = [];
        }

        this._state.formattedDates = formattedDate;

        this.element.dispatchEvent(
          new CustomEvent('select', { bubbles: true })
        );
      },
    });

    return this;
  }

  protected _initGeneratedDOM(): DatepickerCardGeneratedDOM {
    const $calendar = this._DOM.$libElement.find(
      '.datepicker'
    ) as DatepickerCardGeneratedDOM['$calendar'];

    $calendar
      .get(0)
      .insertAdjacentHTML('beforeend', this._applyControlTemplate);

    const applyControl = this.element.querySelector(
      '.js-apply-control'
    ) as HTMLDivElement;
    const clearBtn = applyControl.querySelector(
      '.js-apply-control__clear-btn'
    ) as DatepickerCardGeneratedDOM['clearBtn'];
    const applyBtn = applyControl.querySelector(
      '.js-apply-control__apply-btn'
    ) as DatepickerCardGeneratedDOM['applyBtn'];

    return {
      $calendar,
      clearBtn,
      applyBtn,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  protected _initState() {
    const dates = [] as DatepickerCardState['dates'];
    const formattedDates = '' as DatepickerCardState['formattedDates'];

    return { dates, formattedDates };
  }

  protected _bindApplyControlListeners() {
    this._generatedDOM.clearBtn.addEventListener(
      'click',
      this._applyControlEventListenerObject.handleClearBtnClick
    );

    this._generatedDOM.applyBtn.addEventListener(
      'click',
      this._applyControlEventListenerObject.handleApplyBtnClick
    );

    return this;
  }

  protected _applyControlEventListenerObject = {
    handleClearBtnClick: () => {
      this._DOM.$libElement.data('datepicker').clear();

      this._generatedDOM.clearBtn.classList.add(
        'apply-control__clear-btn_hidden'
      );
    },
    handleApplyBtnClick: () => {
      const { selectedDates } = this._DOM.$libElement.data('datepicker');
      const ISOSelectedDates: string[] = selectedDates.map(
        (selectedDate: Date) => selectedDate.toISOString()
      );

      this._changeInputValue(ISOSelectedDates);
    },
  };

  protected _initDisplay() {
    if (this._DOM.input.value !== '') {
      const ISODates = this._DOM.input.value.split(',');

      this._DOM.$libElement
        .data('datepicker')
        .selectDate(ISODates.map((ISODate) => new Date(ISODate)));
    }

    return this;
  }

  protected _changeInputValue(ISODates: string[]) {
    this._DOM.input.value = ISODates.toString();
    this._DOM.$altFields?.each((index, altField) => {
      // eslint-disable-next-line no-param-reassign
      altField.value = ISODates[index + 1];
    });

    this._DOM.input.dispatchEvent(new Event('change'));
    this.element.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
      })
    );

    return this;
  }
}

type DatepickerCardElementWithComponent = HTMLElementWithComponent<
  DatepickerCardElement,
  DatepickerCardCustomEvents,
  DatepickerCard
>;

const datepickerCards = Array.from(
  datepickerCardElements,
  (datepickerCardElement) => new DatepickerCard(datepickerCardElement)
);

export type {
  DatepickerCardCustomEvents,
  DatepickerCard,
  DatepickerCardElementWithComponent,
};

export { datepickerCards as default };
