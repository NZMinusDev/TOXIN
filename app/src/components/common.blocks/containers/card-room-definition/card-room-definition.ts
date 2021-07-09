import { getDatePeriod, MS_IN_A_DAY } from '@utils/devTools/scripts/DateHelper';

const currency = '₽';

type CardRoomDefinitionElement = HTMLFormElement;

const cards = document.querySelectorAll('.card-room-definition') as NodeListOf<
  CardRoomDefinitionElement
>;

const _initDOM = (card: CardRoomDefinitionElement) => {
  const dayPayment = card.querySelector('.card-room-definition__day-payment') as HTMLHeadingElement;
  const arrivalDateDropdown = card.querySelector(
    '.card-room-definition__arrival-date-dropdown'
  ) as HTMLDivElement;

  const totalDayPayment = card.querySelector(
    '.card-room-definition__total-day-payment'
  ) as HTMLParagraphElement;
  const totalDayPaymentSentence = totalDayPayment.querySelector(
    '.card-room-definition__payment-sentence'
  ) as HTMLSpanElement;
  const totalDayPaymentAmount = totalDayPayment.querySelector(
    '.card-room-definition__payment-amount'
  ) as HTMLSpanElement;

  const servicesPaymentAmount = card.querySelector(
    '.card-room-definition__services-payment .card-room-definition__payment-amount'
  ) as HTMLSpanElement;
  const additionalServicesPaymentAmount = card.querySelector(
    '.card-room-definition__additional-services-payment .card-room-definition__payment-amount'
  ) as HTMLSpanElement;
  const totalPaymentAmount = card.querySelector(
    '.card-room-definition__total-payment-amount'
  ) as HTMLSpanElement;

  return {
    dayPayment,
    arrivalDateDropdown,
    totalDayPaymentSentence,
    totalDayPaymentAmount,
    servicesPaymentAmount,
    additionalServicesPaymentAmount,
    totalPaymentAmount,
  };
};

cards.forEach((card) => {
  const DOM = _initDOM(card);

  const dayPaymentRate = Number(DOM.dayPayment.dataset.amount as string);
  const [servicesPaymentRate, additionalServicesPaymentRate] = [
    DOM.servicesPaymentAmount.dataset.amount,
    DOM.additionalServicesPaymentAmount.dataset.amount,
  ];

  let days: number;
  const updatePaymentDisplay = () => {
    const totalDayPaymentAmount = dayPaymentRate * days;
    const totalPaymentAmount =
      totalDayPaymentAmount + Number(servicesPaymentRate) + Number(additionalServicesPaymentRate);

    DOM.totalDayPaymentSentence.textContent = `${dayPaymentRate.toLocaleString()}${currency} x ${days.toLocaleString()} суток`;
    DOM.totalDayPaymentAmount.textContent = `${totalDayPaymentAmount.toLocaleString()}${currency}`;

    DOM.totalPaymentAmount.textContent = `${totalPaymentAmount.toLocaleString()}${currency}`;
  };

  const handleArrivalDateDropdownChange = (event: Event) => {
    if (!event.isTrusted) {
      const ISODatesValue = (event as CustomEvent).detail.value.toString() as string;
      const datesValue = ISODatesValue.split(',').map((ISODateString) => new Date(ISODateString));
      days = getDatePeriod(datesValue[0], datesValue[1]) / MS_IN_A_DAY;

      updatePaymentDisplay();
    }
  };

  DOM.arrivalDateDropdown.addEventListener('change', handleArrivalDateDropdownChange);
});
