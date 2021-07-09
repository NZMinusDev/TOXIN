import { DropdownDatepickerCustomEvents } from '@common.blocks/primitives/form-dropdown/__datepicker/form-dropdown__datepicker';
import { ItemQuantityListCustomEvents } from '@common.blocks/primitives/form-dropdown/__item-quantity-list/form-dropdown__item-quantity-list';
import { BEMComponent } from '@utils/devTools/scripts/ComponentCreationHelper';
import { getDatePeriod, MS_IN_A_DAY } from '@utils/devTools/scripts/DateHelper';

type CardRoomDefinitionElement = HTMLFormElement;

type CardRoomDefinitionDOM = {
  dayPayment: HTMLHeadingElement;
  arrivalDateDropdown: HTMLDivElement;
  totalDayPaymentSentence: HTMLSpanElement;
  totalDayPaymentAmount: HTMLSpanElement;
  servicesPaymentAmount: HTMLSpanElement;
  additionalServicesPaymentAmount: HTMLSpanElement;
  totalPaymentAmount: HTMLSpanElement;
};

type CardRoomDefinitionDatasetOptions = {
  dayPaymentRate: number;
  servicesPaymentRate: number;
  additionalServicesPaymentRate: number;
};

type CardRoomDefinitionCustomEvents = ItemQuantityListCustomEvents & DropdownDatepickerCustomEvents;

class CardRoomDefinition implements BEMComponent<CardRoomDefinitionCustomEvents> {
  readonly element: CardRoomDefinitionElement;
  protected readonly _DOM: Readonly<CardRoomDefinitionDOM>;

  protected _datasetOptions: CardRoomDefinitionDatasetOptions;

  protected _days = 0;
  protected _currency = '₽';

  constructor(cardRoomDefinitionElement: CardRoomDefinitionElement) {
    this.element = cardRoomDefinitionElement;
    this._DOM = this._initDOM();

    this._datasetOptions = this._initOptionsFromDataset();

    this._bindArrivalDateDropdownListeners();
  }

  protected _initDOM(): CardRoomDefinitionDOM {
    const dayPayment = this.element.querySelector(
      '.card-room-definition__day-payment'
    ) as CardRoomDefinitionDOM['dayPayment'];
    const arrivalDateDropdown = this.element.querySelector(
      '.card-room-definition__arrival-date-dropdown'
    ) as CardRoomDefinitionDOM['arrivalDateDropdown'];

    const totalDayPayment = this.element.querySelector(
      '.card-room-definition__total-day-payment'
    ) as HTMLParagraphElement;
    const totalDayPaymentSentence = totalDayPayment.querySelector(
      '.card-room-definition__payment-sentence'
    ) as CardRoomDefinitionDOM['totalDayPaymentSentence'];
    const totalDayPaymentAmount = totalDayPayment.querySelector(
      '.card-room-definition__payment-amount'
    ) as CardRoomDefinitionDOM['totalDayPaymentAmount'];

    const servicesPaymentAmount = this.element.querySelector(
      '.card-room-definition__services-payment .card-room-definition__payment-amount'
    ) as CardRoomDefinitionDOM['servicesPaymentAmount'];
    const additionalServicesPaymentAmount = this.element.querySelector(
      '.card-room-definition__additional-services-payment .card-room-definition__payment-amount'
    ) as CardRoomDefinitionDOM['additionalServicesPaymentAmount'];
    const totalPaymentAmount = this.element.querySelector(
      '.card-room-definition__total-payment-amount'
    ) as CardRoomDefinitionDOM['totalPaymentAmount'];

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
  document.querySelectorAll('.card-room-definition')
) as CardRoomDefinitionElement[];

const roomDefinitionCards = roomDefinitionCardElements.map(
  (roomDefinitionCardElement) => new CardRoomDefinition(roomDefinitionCardElement)
);

export { roomDefinitionCards as default, CardRoomDefinitionCustomEvents };
