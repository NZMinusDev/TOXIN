import { DropdownDatepickerCustomEvents } from '@common.blocks/primitives/form-dropdown/__datepicker/form-dropdown__datepicker';
import { ItemQuantityListCustomEvents } from '@common.blocks/primitives/form-dropdown/__item-quantity-list/form-dropdown__item-quantity-list';
import { BEMComponent } from '@utils/devTools/scripts/ComponentCreationHelper';
import { getDatePeriod, MS_IN_A_DAY } from '@utils/devTools/scripts/DateHelper';

type RoomDefinitionCardElement = HTMLFormElement;

type RoomDefinitionCardDOM = {
  dayPayment: HTMLHeadingElement;
  arrivalDateDropdown: HTMLDivElement;
  totalDayPaymentSentence: HTMLSpanElement;
  totalDayPaymentAmount: HTMLSpanElement;
  servicesPaymentAmount: HTMLSpanElement;
  additionalServicesPaymentAmount: HTMLSpanElement;
  totalPaymentAmount: HTMLSpanElement;
};

type RoomDefinitionCardDatasetOptions = {
  dayPaymentRate: number;
  servicesPaymentRate: number;
  additionalServicesPaymentRate: number;
};

type RoomDefinitionCardCustomEvents = ItemQuantityListCustomEvents & DropdownDatepickerCustomEvents;

class RoomDefinitionCard implements BEMComponent<RoomDefinitionCardCustomEvents> {
  readonly element: RoomDefinitionCardElement;
  protected readonly _DOM: Readonly<RoomDefinitionCardDOM>;

  protected _datasetOptions: RoomDefinitionCardDatasetOptions;

  protected _days = 0;
  protected _currency = '₽';

  constructor(roomDefinitionCardElement: RoomDefinitionCardElement) {
    this.element = roomDefinitionCardElement;
    this._DOM = this._initDOM();

    this._datasetOptions = this._initOptionsFromDataset();

    this._bindArrivalDateDropdownListeners();
  }

  protected _initDOM(): RoomDefinitionCardDOM {
    const dayPayment = this.element.querySelector(
      '.room-definition-card__day-payment'
    ) as RoomDefinitionCardDOM['dayPayment'];
    const arrivalDateDropdown = this.element.querySelector(
      '.room-definition-card__arrival-date-dropdown'
    ) as RoomDefinitionCardDOM['arrivalDateDropdown'];

    const totalDayPayment = this.element.querySelector(
      '.room-definition-card__total-day-payment'
    ) as HTMLParagraphElement;
    const totalDayPaymentSentence = totalDayPayment.querySelector(
      '.room-definition-card__payment-sentence'
    ) as RoomDefinitionCardDOM['totalDayPaymentSentence'];
    const totalDayPaymentAmount = totalDayPayment.querySelector(
      '.room-definition-card__payment-amount'
    ) as RoomDefinitionCardDOM['totalDayPaymentAmount'];

    const servicesPaymentAmount = this.element.querySelector(
      '.room-definition-card__services-payment .room-definition-card__payment-amount'
    ) as RoomDefinitionCardDOM['servicesPaymentAmount'];
    const additionalServicesPaymentAmount = this.element.querySelector(
      '.room-definition-card__additional-services-payment .room-definition-card__payment-amount'
    ) as RoomDefinitionCardDOM['additionalServicesPaymentAmount'];
    const totalPaymentAmount = this.element.querySelector(
      '.room-definition-card__total-payment-amount'
    ) as RoomDefinitionCardDOM['totalPaymentAmount'];

    return {
      dayPayment,
      arrivalDateDropdown,
      totalDayPaymentSentence,
      totalDayPaymentAmount,
      servicesPaymentAmount,
      additionalServicesPaymentAmount,
      totalPaymentAmount,
    };
  }

  protected _initOptionsFromDataset() {
    const dayPaymentRate = Number(this._DOM.dayPayment.dataset.amount as string);
    const servicesPaymentRate = Number(this._DOM.servicesPaymentAmount.dataset.amount as string);
    const additionalServicesPaymentRate = Number(
      this._DOM.additionalServicesPaymentAmount.dataset.amount as string
    );

    return { dayPaymentRate, servicesPaymentRate, additionalServicesPaymentRate };
  }

  protected _bindArrivalDateDropdownListeners() {
    this._DOM.arrivalDateDropdown.addEventListener(
      'change',
      this._arrivalDateDropdownEventListenerObject.handleArrivalDateDropdownChange
    );
  }
  protected _arrivalDateDropdownEventListenerObject = {
    handleArrivalDateDropdownChange: (event: Event) => {
      if (!event.isTrusted) {
        const ISODatesValue = (event as CustomEvent).detail.value.toString() as string;
        const datesValue = ISODatesValue.split(',').map((ISODateString) => new Date(ISODateString));
        this._days = getDatePeriod(datesValue[0], datesValue[1]) / MS_IN_A_DAY;

        this._updatePaymentDisplay();
      }
    },
  };
  protected _updatePaymentDisplay() {
    const totalDayPaymentAmount = this._datasetOptions.dayPaymentRate * this._days;
    const totalPaymentAmount =
      totalDayPaymentAmount +
      Number(this._datasetOptions.servicesPaymentRate) +
      Number(this._datasetOptions.additionalServicesPaymentRate);

    this._DOM.totalDayPaymentSentence.textContent = `${this._datasetOptions.dayPaymentRate.toLocaleString()}${
      this._currency
    } x ${this._days.toLocaleString()} суток`;
    this._DOM.totalDayPaymentAmount.textContent = `${totalDayPaymentAmount.toLocaleString()}${
      this._currency
    }`;

    this._DOM.totalPaymentAmount.textContent = `${totalPaymentAmount.toLocaleString()}${
      this._currency
    }`;
  }
}

const roomDefinitionCardElements = Array.from(
  document.querySelectorAll('.room-definition-card')
) as RoomDefinitionCardElement[];

const roomDefinitionCards = roomDefinitionCardElements.map(
  (roomDefinitionCardElement) => new RoomDefinitionCard(roomDefinitionCardElement)
);

export { roomDefinitionCards as default, RoomDefinitionCardCustomEvents };
