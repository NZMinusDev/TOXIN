import { getDatePeriod, MS_IN_A_DAY } from '@utils/devTools/scripts/DateHelper';

const currency = '₽';

const cards = document.querySelectorAll('.card-room-definition');

cards.forEach((card) => {
  const DOM = {
    dayPayment: card.querySelector('.card-room-definition__day-payment') as HTMLHeadingElement,
    totalDayPaymentSentence: card.querySelector(
      '.card-room-definition__total-day-payment .card-room-definition__payment-sentence'
    ) as HTMLSpanElement,
    totalDayPaymentAmount: card.querySelector(
      '.card-room-definition__total-day-payment .card-room-definition__payment-amount'
    ) as HTMLSpanElement,
    servicesPaymentAmount: card.querySelector(
      '.card-room-definition__services-payment .card-room-definition__payment-amount'
    ) as HTMLSpanElement,
    additionalServicesPaymentAmount: card.querySelector(
      '.card-room-definition__additional-services-payment .card-room-definition__payment-amount'
    ) as HTMLSpanElement,
    totalPaymentAmount: card.querySelector(
      '.card-room-definition__total-payment-amount'
    ) as HTMLSpanElement,
    arrivalDateDropdown: card.querySelector(
      '.card-room-definition__arrival-date-dropdown'
    ) as HTMLDivElement,
  };

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
