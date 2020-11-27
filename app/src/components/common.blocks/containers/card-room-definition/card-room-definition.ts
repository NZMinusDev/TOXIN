$(function () {
  const MS_IN_DAY = 1000 * 60 * 60 * 24;
  const CURRENCY = "₽";

  const cards = $(".card-room-definition");
  cards.each(function (index) {
    const dayPaymentValue = parseFloat(
      $(this).find(".card-room-definition__day-payment").attr("data-amount-js")
    );

    const paymentRatesJQElement = $(this).find(".card-room-definition__payment-rates");
    const paymentAmounts = paymentRatesJQElement.find(".card-room-definition__payment-amount");

    const totalDayPaymentSentenceJQElement = paymentRatesJQElement.find(
      ".card-room-definition__total-day-payment .card-room-definition__payment-sentence"
    );
    const totalDayPaymentAmountJQElement = paymentRatesJQElement.find(
      ".card-room-definition__total-day-payment .card-room-definition__payment-amount"
    );

    const totalPaymentAmountJQElement = $(this).find(".card-room-definition__total-payment-amount");

    const arrivalDropdownJQElement = $(this).find(".card-room-definition__arrival-date-dropdown");
    const arrivalInputJQElement = arrivalDropdownJQElement
      .find(".form-dropdown__datepicker")
      .prev("input[type='hidden']");
    const departureDropdownJQElement = $(this).find(
      ".card-room-definition__departure-date-dropdown"
    );
    const departureInputJQElement = departureDropdownJQElement
      .find(".form-dropdown__datepicker")
      .prev("input[type='hidden']");

    let arrivalDateString = arrivalInputJQElement.val() as string,
      departureDateString = departureInputJQElement.val() as string,
      days =
        Math.floor(
          Math.abs(Date.parse(departureDateString) - Date.parse(arrivalDateString)) / MS_IN_DAY
        ) + 1;

    const updatePaymentDisplay = () => {
      days =
        Math.floor(
          Math.abs(Date.parse(departureDateString) - Date.parse(arrivalDateString)) / MS_IN_DAY
        ) + 1;

      totalDayPaymentSentenceJQElement.text(
        `${dayPaymentValue.toLocaleString()}${CURRENCY} x ${days.toLocaleString()} суток`
      );
      totalDayPaymentAmountJQElement.text(`${(dayPaymentValue * days).toLocaleString()}${CURRENCY}`);
      totalDayPaymentAmountJQElement.attr("data-amount-js", dayPaymentValue * days);

      let accumulator = 0;
      paymentAmounts.each(function () {
        accumulator += parseFloat($(this).attr("data-amount-js"));
      });
      totalPaymentAmountJQElement.text(`${accumulator.toLocaleString()}${CURRENCY}`);
      totalPaymentAmountJQElement.attr("data-amount-js", accumulator);
    };
    updatePaymentDisplay();

    arrivalDropdownJQElement.on("valueIsChanged", (jqEvent, inputValue: string) => {
      arrivalDateString = inputValue;

      updatePaymentDisplay();
    });
    departureDropdownJQElement.on("valueIsChanged", (jqEvent, inputValue: string) => {
      departureDateString = inputValue;

      updatePaymentDisplay();
    });
  });
});
