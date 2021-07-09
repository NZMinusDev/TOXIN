import { BEMComponent } from '@utils/devTools/scripts/ComponentCreationHelper';

import '@common.blocks/primitives/apply-control/apply-control.scss';
import '@common.blocks/primitives/apply-control/__clear-btn/apply-control__clear-btn.scss';
import '@common.blocks/primitives/apply-control/__clear-btn/_hidden/apply-control__clear-btn_hidden.scss';
import '@common.blocks/primitives/apply-control/__apply-btn/apply-control__apply-btn.scss';

import './__apply-control/card-datepicker__apply-control.scss';
import { formatToPeriodDateTime } from '@utils/devTools/scripts/DateHelper';

type CardDatepickerElement = HTMLDivElement;

type CardDatepickerStaticDOM = {
  $element: JQuery<CardDatepickerElement>;
  input: HTMLInputElement;
  $altFields?: JQuery<HTMLInputElement>;
};
type CardDatepickerGeneratedDOM = {
  $calendar: JQuery<HTMLDivElement>;
  clearBtn: HTMLButtonElement;
  applyBtn: HTMLButtonElement;
};

type CardDatepickerCustomEvents = 'select' | 'clear' | 'change';

interface CardDatepickerAPI extends BEMComponent<CardDatepickerCustomEvents> {
  readonly element: CardDatepickerElement;
}

class CardDatepicker implements CardDatepickerAPI {
  readonly element: CardDatepickerElement;
  protected readonly _staticDOM: Readonly<CardDatepickerStaticDOM>;
  protected readonly _generatedDOM: Readonly<CardDatepickerGeneratedDOM>;

  protected _applyControlTemplate = `<div class="card-datepicker__apply-control"><div class="apply-control"><input class="apply-control__clear-btn apply-control__clear-btn_hidden" type="button" value="очистить"><input class="apply-control__apply-btn" type="button" value="применить"></div></div>`;

  protected _dates: Date[] = [];
  protected _formattedDates = '';

  constructor(cardDatepickerElement: CardDatepickerElement) {
    this.element = cardDatepickerElement;
    this._staticDOM = this._initStaticDOM();
    this._initLibDatepicker();
    this._generatedDOM = this._initGeneratedDOM();

    this._bindApplyControlListeners();

    this._initDisplay();
  }

  getDates() {
    return [...this._dates];
  }
  getSplitFormattedDates() {
    return this._formattedDates.split(
      this._staticDOM.$element.data('datepicker').opts.multipleDatesSeparator
    );
  }
  getDateTimes() {
    if (
      this._staticDOM.$element.data('datepicker').opts.range &&
      this._staticDOM.$altFields === undefined
    ) {
      return this._dates.length === 2
        ? [formatToPeriodDateTime(this._dates[0].toISOString(), this._dates[1].toISOString())]
        : this._dates.map((date) => date.toISOString());
    }

    return this._dates.map((date) => date.toISOString());
  }
  getFormattedDate() {
    return this._formattedDates;
  }
  get$altFields() {
    return this._staticDOM.$altFields;
  }

  protected _initStaticDOM(): CardDatepickerStaticDOM {
    const $element = $(this.element);
    const input = this.element.previousElementSibling as CardDatepickerStaticDOM['input'];
    const $altFields =
      this.element.dataset.altFields !== undefined
        ? $<HTMLInputElement>(this.element.dataset.altFields)
        : undefined;

    return {
      $element,
      input,
      $altFields,
    };
  }
  private _initLibDatepicker() {
    this._staticDOM.$element.datepicker({
      prevHtml: `arrow_back`,
      nextHtml: `arrow_forward`,
      dateFormat:
        !!this.element.dataset.range && !this._staticDOM.$altFields ? 'dd M' : 'dd.mm.yyyy',
      minDate: new Date(),
      toggleSelected: false,
      onSelect: (formattedDate: string, date: Date | Array<Date>, inst) => {
        this._generatedDOM.clearBtn.classList.remove('apply-control__clear-btn_hidden');

        if (date) {
          this._dates = Array.isArray(date) ? date : [date];
        } else {
          this._dates = [];
        }

        this._formattedDates = formattedDate;

        this.element.dispatchEvent(new CustomEvent('select', { bubbles: true }));
      },
    });
  }
  protected _initGeneratedDOM(): CardDatepickerGeneratedDOM {
    const $calendar = this._staticDOM.$element.find(
      '.datepicker'
    ) as CardDatepickerGeneratedDOM['$calendar'];

    $calendar.get(0).insertAdjacentHTML('beforeend', this._applyControlTemplate);

    const applyControl = this.element.querySelector('.apply-control') as HTMLDivElement;
    const clearBtn = applyControl.querySelector(
      '.apply-control__clear-btn'
    ) as CardDatepickerGeneratedDOM['clearBtn'];
    const applyBtn = applyControl.querySelector(
      '.apply-control__apply-btn'
    ) as CardDatepickerGeneratedDOM['applyBtn'];

    return {
      $calendar,
      clearBtn,
      applyBtn,
    };
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
  }
  protected _applyControlEventListenerObject = {
    handleClearBtnClick: (e: MouseEvent) => {
      this._staticDOM.$element.data('datepicker').clear();

      this._generatedDOM.clearBtn.classList.add('apply-control__clear-btn_hidden');

      this.element.dispatchEvent(new CustomEvent('clear', { bubbles: true }));
    },
    handleApplyBtnClick: (e: MouseEvent) => {
      if (this._verifyApplying()) {
        const { selectedDates } = this._staticDOM.$element.data('datepicker');
        const ISOSelectedDates: string[] = selectedDates.map((selectedDate: Date) =>
          selectedDate.toISOString()
        );

        this._changeInputValue(ISOSelectedDates);
      }
    },
  };
  protected _verifyApplying() {
    const { selectedDates, opts } = this._staticDOM.$element.data('datepicker');

    let maxSelected = selectedDates.length;
    if (this._staticDOM.$altFields !== undefined) {
      maxSelected = this._staticDOM.$altFields.length + 1;
    } else if (opts.range) {
      maxSelected = 2;
    }

    return selectedDates.length === maxSelected || selectedDates.length === 0;
  }
  protected _changeInputValue(ISODates: string[]) {
    this._staticDOM.input.value = ISODates.toString();
    this._staticDOM.$altFields?.each((index, altField) => {
      // eslint-disable-next-line no-param-reassign
      altField.value = ISODates[index + 1];
    });

    this.element.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        detail: { value: this._staticDOM.input.value },
      })
    );
  }

  protected _initDisplay() {
    if (this._staticDOM.input.value) {
      const ISODates = this._staticDOM.input.value.split(',');

      this._staticDOM.$element
        .data('datepicker')
        .selectDate(ISODates.map((ISODate) => new Date(ISODate)));

      this._changeInputValue(ISODates);
    }
  }
}

const cardDatePickerElements = Array.from(
  document.querySelectorAll('.card-datepicker')
) as CardDatepickerElement[];

const cardDatePickers = cardDatePickerElements.map(
  (cardDatePickerElement) => new CardDatepicker(cardDatePickerElement)
);

export { cardDatePickers as default, CardDatepickerCustomEvents };
