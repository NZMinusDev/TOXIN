import BEMComponent, {
  HTMLElementWithComponent,
} from '@shared/utils/scripts/components/BEM/BEMComponent';
import type {
  DatepickerCardCustomEvents,
  DatepickerCard,
  DatepickerCardElementWithComponent,
} from '@common.blocks/primitives/datepicker-card/datepicker-card';
import '@common.blocks/primitives/datepicker-card/datepicker-card';

import formDropdownElements from '../form-dropdown-elements';
import type { ExpandableItemCustomEvents } from '../form-dropdown';

type FormDropdownDatepickerElement = HTMLDivElement;

type FormDropdownDatepickerDOM = {
  selection: HTMLParagraphElement;
  input: HTMLInputElement;
  datepickerCard: DatepickerCardElementWithComponent | null;
};

type FormDropdownDatepickerSubComponents = {
  datepickerCard?: DatepickerCard;
};

type FormDropdownDatepickerState = {
  dates?: string[];
};

type FormDropdownDatepickerHTMLOptions = { placeholder: string };

type FormDropdownDatepickerCustomEvents = DatepickerCardCustomEvents &
  ExpandableItemCustomEvents;

const selectors = {
  dropdown: 'js-form-dropdown',
  isHidden: 'form-dropdown__datepicker_hidden',
};

class FormDropdownDatepicker extends BEMComponent<
  FormDropdownDatepickerElement,
  FormDropdownDatepickerCustomEvents
> {
  protected readonly _DOM: Readonly<FormDropdownDatepickerDOM>;

  protected readonly _subComponents: Readonly<FormDropdownDatepickerSubComponents>;

  protected readonly _options: FormDropdownDatepickerHTMLOptions;

  protected readonly _state: FormDropdownDatepickerState;

  constructor(
    formFormDropdownDatepickerElement: FormDropdownDatepickerElement
  ) {
    super(formFormDropdownDatepickerElement);

    this._DOM = this._initDOM();

    this._subComponents = this._initSubComponents();

    this._options = this._initOptionsFromHTML();
    this._state = this._initState();

    this._bindDatepickerCardListeners()
      ._bindWindowListeners()
      ._bindAltFieldsListeners();

    this._initDisplay();
  }

  get() {
    return this._state.dates === undefined ? [] : [...this._state.dates];
  }

  open() {
    this.element.classList.remove(selectors.isHidden);

    this.element.dispatchEvent(new CustomEvent('open', { bubbles: true }));

    return this;
  }

  close() {
    this.element.classList.add(selectors.isHidden);

    this.element.dispatchEvent(new CustomEvent('close', { bubbles: true }));

    return this;
  }

  isOpened() {
    return !this.element.classList.contains(selectors.isHidden);
  }

  protected _initDOM(): FormDropdownDatepickerDOM {
    const selection = this.element
      .nextElementSibling as FormDropdownDatepickerDOM['selection'];
    const input = this.element.querySelector(
      '.js-form-dropdown__datepicker-input'
    ) as FormDropdownDatepickerDOM['input'];
    const datepickerCard = this.element.querySelector(
      '.js-datepicker-card'
    ) as FormDropdownDatepickerDOM['datepickerCard'];

    return {
      selection,
      input,
      datepickerCard,
    };
  }

  protected _initSubComponents() {
    const datepickerCard = this._DOM.datepickerCard?.component;

    return { datepickerCard };
  }

  protected _initOptionsFromHTML() {
    const placeholder = this._DOM.selection.dataset.placeholder || '';

    return {
      placeholder,
    };
  }

  protected _initState() {
    const dates = this._getDatesFromDatepickerCard();

    return { dates };
  }

  protected _bindDatepickerCardListeners() {
    const { datepickerCard } = this._subComponents;

    datepickerCard?.addCustomEventListener(
      'select',
      this._datepickerCardEventListenerObject.handleDatepickerCardSelect
    );
    datepickerCard?.addCustomEventListener(
      'change',
      this._datepickerCardEventListenerObject.handleDatepickerCardChange
    );

    return this;
  }

  protected _datepickerCardEventListenerObject = {
    handleDatepickerCardSelect: () => {
      this._changeValue();
    },
    handleDatepickerCardChange: () => {
      this.close();
    },
  };

  protected _bindWindowListeners() {
    window.addEventListener(
      'pointerdown',
      this._windowEventListenerObject.handleWindowPointerDown
    );

    return this;
  }

  protected _windowEventListenerObject = {
    // don't use click cause of rerender of cells
    handleWindowPointerDown: (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      const dropdownElement = target.closest(
        `.${selectors.dropdown}`
      ) as HTMLElement;
      const clickIsOutside = dropdownElement === null;

      if (clickIsOutside && this.isOpened()) {
        this.close();
      }
    },
  };

  protected _bindAltFieldsListeners() {
    const $altFields = this._subComponents.datepickerCard?.get$altFields();

    if ($altFields !== undefined) {
      $altFields.each((index, input) => {
        const altDropdown = input.closest(
          `.${selectors.dropdown}`
        ) as HTMLDivElement;

        altDropdown.addEventListener(
          'open',
          this._altFieldEventListenerObject.handleAltFieldOpen
        );
      });
    }

    return this;
  }

  protected _altFieldEventListenerObject = {
    handleAltFieldOpen: () => {
      this.open();
    },
  };

  protected _initDisplay() {
    this._changeValue();

    return this;
  }

  protected _getDatesFromDatepickerCard() {
    return this._subComponents.datepickerCard
      ?.getDates()
      .map((date) => date.toISOString());
  }

  protected _changeValue() {
    if (this._subComponents.datepickerCard !== undefined) {
      const $altFields = this._subComponents.datepickerCard.get$altFields();

      this._state.dates = this._getDatesFromDatepickerCard();
      const dateTimes = this._subComponents.datepickerCard.getDateTimes();

      if ($altFields !== undefined) {
        const formattedDates =
          this._subComponents.datepickerCard.getSplitFormattedDates();
        const [theFirstDate] = this._state.dates as string[];
        const [theFirstDatetime] = dateTimes;
        const [theFirstFormattedDate] = formattedDates;

        this._DOM.input.value = theFirstDate ?? '';
        this._DOM.selection.innerHTML =
          theFirstDatetime !== undefined
            ? `<time datetime="${theFirstDatetime}">${
                theFirstFormattedDate ?? this._options.placeholder
              }</time>`
            : this._options.placeholder;

        this._changeAltFieldsValues(dateTimes, formattedDates);
      } else {
        const formattedDate =
          this._subComponents.datepickerCard.getFormattedDate();

        this._changeRangedValue(dateTimes, formattedDate);
      }
    }

    return this;
  }

  protected _changeRangedValue(dateTimes: string[], formattedDate: string) {
    this._DOM.input.value = this._state.dates
      ? this._state.dates.toString()
      : '';
    this._DOM.selection.innerHTML =
      dateTimes.toString() !== ''
        ? `<time datetime="${dateTimes.toString()}">${
            formattedDate || this._options.placeholder
          }</time>`
        : this._options.placeholder;
  }

  protected _changeAltFieldsValues(
    dateTimes: string[],
    formattedDates: string[]
  ) {
    const $altFields = this._subComponents.datepickerCard?.get$altFields();

    $altFields?.each((index, altField) => {
      const altFieldRef = altField;
      const dateIndex = index + 1;
      const dateTime = dateTimes[dateIndex];
      const selection = altFieldRef
        .closest(`.${selectors.dropdown}`)
        ?.querySelector(
          '.js-form-dropdown__selection-text'
        ) as FormDropdownDatepickerDOM['selection'];
      const placeholder = selection.dataset.placeholder || '';

      altFieldRef.value = dateTime || '';

      selection.innerHTML =
        dateTime !== ''
          ? `<time datetime="${dateTime}">${
              formattedDates[dateIndex] || placeholder
            }</time>`
          : placeholder;
    });

    return this;
  }
}

type FormDropdownDatepickerElementWithComponent = HTMLElementWithComponent<
  FormDropdownDatepickerElement,
  FormDropdownDatepickerCustomEvents,
  FormDropdownDatepicker
>;

const formFormDropdownDatepickers = Array.from(
  formDropdownElements,
  (formDropdownElement) =>
    Array.from(
      formDropdownElement.querySelectorAll<FormDropdownDatepickerElement>(
        '.js-form-dropdown__datepicker'
      ),
      (formDropdownDatepickerElement) =>
        new FormDropdownDatepicker(formDropdownDatepickerElement)
    )
).flat();

export type {
  FormDropdownDatepickerCustomEvents,
  FormDropdownDatepicker,
  FormDropdownDatepickerElementWithComponent,
};

export { formFormDropdownDatepickers as default };
