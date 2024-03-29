import BEMComponent, {
  HTMLElementWithComponent,
} from '@shared/utils/scripts/components/BEM/BEMComponent';
import { getDatePeriod, MS_IN_A_DAY } from '@shared/utils/scripts/date';
import type {
  FormDropdownWithItemQuantityListCustomEvents,
  FormDropdownWithDatepickerCustomEvents,
  FormDropdownWithItemQuantityList,
  FormDropdownWithDatepicker,
  FormDropdownWithItemQuantityListElementWithComponent,
  FormDropdownWithDatepickerElementWithComponent,
} from '@common.blocks/primitives/form-dropdown/form-dropdown';
import '@common.blocks/primitives/form-dropdown/form-dropdown';
import '@common.blocks/primitives/card-base/card-base';
import '@common.blocks/primitives/heading/heading';
import '@common.blocks/primitives/card-text/card-text';
import '@common.blocks/primitives/tooltip/tooltip';
import '@common.blocks/primitives/button/button';

import roomDefinitionCardElements, {
  RoomDefinitionCardElement,
} from './room-definition-card-elements';
import './room-definition-card.scss';

type RoomDefinitionCardDOM = {
  dayPayment: HTMLDivElement;
  arrivalDateDropdown: HTMLDivElement;
  guestsDropdown: HTMLDivElement;
  totalDayPaymentSentence: HTMLSpanElement;
  totalDayPaymentAmount: HTMLSpanElement;
  servicesPaymentAmount: HTMLSpanElement;
  additionalServicesPaymentAmount: HTMLSpanElement;
  totalPaymentAmount: HTMLSpanElement;
};

type RoomDefinitionCardSubComponents = {
  arrivalDateDropdown: FormDropdownWithDatepicker;
  guestsDropdown: FormDropdownWithItemQuantityList;
};

type RoomDefinitionCardHTMLOptions = {
  dayPaymentRate: number;
  servicesPaymentRate: number;
  additionalServicesPaymentRate: number;
};
type RoomDefinitionCardState = {
  dailyRange: number;
};
type RoomDefinitionCardContext = {
  currency: string;
};

type RoomDefinitionCardCustomEvents =
  FormDropdownWithItemQuantityListCustomEvents &
    FormDropdownWithDatepickerCustomEvents;

class RoomDefinitionCard extends BEMComponent<
  RoomDefinitionCardElement,
  RoomDefinitionCardCustomEvents
> {
  protected readonly _DOM: Readonly<RoomDefinitionCardDOM>;

  protected _subComponents: Readonly<RoomDefinitionCardSubComponents>;

  protected readonly _options: RoomDefinitionCardHTMLOptions;

  protected readonly _state: RoomDefinitionCardState;

  protected readonly _context: RoomDefinitionCardContext;

  constructor(roomDefinitionCardElement: RoomDefinitionCardElement) {
    super(roomDefinitionCardElement);

    this._DOM = this._initDOM();

    this._subComponents = this._initSubComponents();

    this._options = this._initOptionsFromHTML();
    this._state = this._initState();
    this._context = RoomDefinitionCard._initContext();

    this._bindArrivalDateDropdownListeners();
  }

  protected _initDOM(): RoomDefinitionCardDOM {
    const dayPayment = this.element.querySelector(
      '.js-room-definition-card__day-payment'
    ) as RoomDefinitionCardDOM['dayPayment'];
    const arrivalDateDropdown = this.element.querySelector(
      '.js-room-definition-card__arrival-date-dropdown'
    ) as RoomDefinitionCardDOM['arrivalDateDropdown'];
    const guestsDropdown = this.element.querySelector(
      '.js-room-definition-card__guests-dropdown'
    ) as RoomDefinitionCardDOM['guestsDropdown'];

    const totalDayPayment = this.element.querySelector(
      '.js-room-definition-card__total-day-payment'
    ) as HTMLParagraphElement;
    const totalDayPaymentSentence = totalDayPayment.querySelector(
      '.js-room-definition-card__payment-sentence'
    ) as RoomDefinitionCardDOM['totalDayPaymentSentence'];
    const totalDayPaymentAmount = totalDayPayment.querySelector(
      '.js-room-definition-card__payment-amount'
    ) as RoomDefinitionCardDOM['totalDayPaymentAmount'];

    const servicesPaymentAmount = this.element.querySelector(
      '.js-room-definition-card__services-payment .js-room-definition-card__payment-amount'
    ) as RoomDefinitionCardDOM['servicesPaymentAmount'];
    const additionalServicesPaymentAmount = this.element.querySelector(
      '.js-room-definition-card__additional-services-payment .js-room-definition-card__payment-amount'
    ) as RoomDefinitionCardDOM['additionalServicesPaymentAmount'];
    const totalPaymentAmount = this.element.querySelector(
      '.js-room-definition-card__total-payment-amount'
    ) as RoomDefinitionCardDOM['totalPaymentAmount'];

    return {
      dayPayment,
      arrivalDateDropdown,
      guestsDropdown,
      totalDayPaymentSentence,
      totalDayPaymentAmount,
      servicesPaymentAmount,
      additionalServicesPaymentAmount,
      totalPaymentAmount,
    };
  }

  protected _initSubComponents() {
    const arrivalDateDropdown = (
      this._DOM.arrivalDateDropdown
        .firstElementChild as FormDropdownWithDatepickerElementWithComponent
    ).component;
    const guestsDropdown = (
      this._DOM.guestsDropdown
        .firstElementChild as FormDropdownWithItemQuantityListElementWithComponent
    ).component;

    return { arrivalDateDropdown, guestsDropdown };
  }

  protected _initOptionsFromHTML() {
    const dayPaymentRate = Number(
      this._DOM.dayPayment.dataset.amount as string
    );
    const servicesPaymentRate = Number(
      this._DOM.servicesPaymentAmount.dataset.amount as string
    );
    const additionalServicesPaymentRate = Number(
      this._DOM.additionalServicesPaymentAmount.dataset.amount as string
    );

    return {
      dayPaymentRate,
      servicesPaymentRate,
      additionalServicesPaymentRate,
    };
  }

  protected _initState() {
    const dailyRange = this._getDailyRange();

    return { dailyRange };
  }

  protected static _initContext() {
    const currency = '₽';

    return { currency };
  }

  protected _bindArrivalDateDropdownListeners() {
    this._subComponents.arrivalDateDropdown.addCustomEventListener(
      'close',
      this._arrivalDateDropdownEventListenerObject
        .handleArrivalDateDropdownClose
    );

    return this;
  }

  protected _arrivalDateDropdownEventListenerObject = {
    handleArrivalDateDropdownClose: () => {
      this._state.dailyRange = this._getDailyRange();

      this._updatePaymentDisplay();
    },
  };

  protected _getDailyRange() {
    const [arrivalDate, departureDate] = this._subComponents.arrivalDateDropdown
      .getExpandableItemElement()
      .component.get()
      .map((ISODateString) => new Date(ISODateString));

    if (arrivalDate === undefined || departureDate === undefined) {
      return 0;
    }

    return getDatePeriod(arrivalDate, departureDate) / MS_IN_A_DAY;
  }

  protected _updatePaymentDisplay() {
    const totalDayPaymentAmount =
      this._options.dayPaymentRate * this._state.dailyRange;
    const totalPaymentAmount =
      totalDayPaymentAmount +
      Number(this._options.servicesPaymentRate) +
      Number(this._options.additionalServicesPaymentRate);

    this._DOM.totalDayPaymentSentence.textContent = `${this._options.dayPaymentRate.toLocaleString()}${
      this._context.currency
    } x ${this._state.dailyRange.toLocaleString()} суток`;
    this._DOM.totalDayPaymentAmount.textContent = `${totalDayPaymentAmount.toLocaleString()}${
      this._context.currency
    }`;

    this._DOM.totalPaymentAmount.textContent = `${totalPaymentAmount.toLocaleString()}${
      this._context.currency
    }`;

    return this;
  }
}

type RoomDefinitionCardElementWithComponent = HTMLElementWithComponent<
  RoomDefinitionCardElement,
  RoomDefinitionCardCustomEvents,
  RoomDefinitionCard
>;

const roomDefinitionCards = Array.from(
  roomDefinitionCardElements,
  (roomDefinitionCardElement) =>
    new RoomDefinitionCard(roomDefinitionCardElement)
);

export type {
  RoomDefinitionCardCustomEvents,
  RoomDefinitionCard,
  RoomDefinitionCardElementWithComponent,
};

export { roomDefinitionCards as default };
